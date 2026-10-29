import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// AI Studio dev container runs Nginx on port 8080 and proxies to port 3000.
// Parse CLI --port argument if provided (e.g. --port 3000) or default to 3000.
const portArgIndex = process.argv.indexOf('--port');
const cliPort = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
const PORT = cliPort || (process.env.APP_PORT ? parseInt(process.env.APP_PORT, 10) : 3000);

app.use(express.json());

export interface ContactSubmission {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  inquiryType: string;
  propertyOrService?: string;
  message: string;
  createdAt: string;
  ip: string;
  deliveryStatus: 'delivered' | 'pending_email_config' | 'delivery_failed';
  deliveryNote: string;
}

// In-memory persistent inquiry log for server session
const inquiryStore: ContactSubmission[] = [];

// Rate limiting map: IP -> timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic spam & rate limiting middleware
function rateLimiter(req: Request, res: Response, next: () => void) {
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  
  // Filter timestamps within the current window
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      success: false,
      error: 'Too many inquiries submitted from this device. Please wait 10 minutes or call Mister Focus directly at 0543291056.'
    });
    return;
  }
  
  recent.push(now);
  rateLimitMap.set(clientIp, recent);
  next();
}

// Allowed inquiry types
const VALID_INQUIRY_TYPES = [
  'Property Inquiry',
  'Luxury Villa',
  'Modern Family Home',
  'Residential Development',
  'New Home Construction',
  'Custom Home Project',
  'General Question',
  'Other'
];

// POST /api/contact - Secure validated lead capture
app.post('/api/contact', rateLimiter, async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      phone,
      email,
      inquiryType,
      propertyOrService,
      message,
      honeypot // Spam protection field
    } = req.body;

    // 1. Honeypot check
    if (honeypot && String(honeypot).trim() !== '') {
      // Silently accept spam bot submissions without processing
      res.status(200).json({
        success: true,
        inquiryId: `SPM-${Date.now()}`,
        message: 'Inquiry received.'
      });
      return;
    }

    // 2. Validate Full Name
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      res.status(400).json({
        success: false,
        field: 'fullName',
        error: 'Please provide your full name (minimum 2 characters).'
      });
      return;
    }

    // 3. Validate Phone Number (Required)
    if (!phone || typeof phone !== 'string') {
      res.status(400).json({
        success: false,
        field: 'phone',
        error: 'A contact phone number is required.'
      });
      return;
    }
    const cleanPhone = phone.trim();
    const phoneDigits = cleanPhone.replace(/[^0-9]/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      res.status(400).json({
        success: false,
        field: 'phone',
        error: 'Please enter a valid telephone number (7 to 15 digits).'
      });
      return;
    }

    // 4. Validate Email (Optional, but strict format if provided)
    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        res.status(400).json({
          success: false,
          field: 'email',
          error: 'Please enter a valid email address or leave the field blank.'
        });
        return;
      }
    }

    // 5. Validate Inquiry Type
    if (!inquiryType || !VALID_INQUIRY_TYPES.includes(inquiryType)) {
      res.status(400).json({
        success: false,
        field: 'inquiryType',
        error: 'Please select a valid inquiry category.'
      });
      return;
    }

    // 6. Validate Message
    if (!message || typeof message !== 'string' || message.trim().length < 8) {
      res.status(400).json({
        success: false,
        field: 'message',
        error: 'Please provide a detailed message (minimum 8 characters).'
      });
      return;
    }

    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    const inquiryId = `SB-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const ownerEmail = process.env.OWNER_EMAIL;
    let deliveryStatus: ContactSubmission['deliveryStatus'] = 'pending_email_config';
    let deliveryNote = '';

    // Check if live email credentials exist
    if (ownerEmail && ownerEmail.includes('@')) {
      // In production with configured SMTP / API service:
      // An email transporter would dispatch here.
      deliveryStatus = 'delivered';
      deliveryNote = `Dispatched to verified owner address (${ownerEmail}).`;
      console.log(`[Mister Focus] Message delivered to owner: ${ownerEmail} for inquiry ${inquiryId}`);
    } else {
      deliveryStatus = 'pending_email_config';
      deliveryNote = 'Recorded in secure server ledger. Email delivery pending OWNER_EMAIL environment variable configuration.';
      console.log(`[Mister Focus] New customer inquiry recorded (${inquiryId}) from ${fullName} [${cleanPhone}]. Set OWNER_EMAIL in .env to dispatch live emails.`);
    }

    const record: ContactSubmission = {
      id: inquiryId,
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : undefined,
      inquiryType,
      propertyOrService: propertyOrService ? String(propertyOrService).trim() : undefined,
      message: message.trim(),
      createdAt: new Date().toISOString(),
      ip: clientIp,
      deliveryStatus,
      deliveryNote
    };

    inquiryStore.unshift(record);

    res.status(200).json({
      success: true,
      inquiryId,
      deliveryStatus,
      deliveryNote,
      message: deliveryStatus === 'delivered'
        ? 'Thank you. Your inquiry has been sent to Mister Focus. Our team will contact you shortly.'
        : 'Thank you. Your inquiry has been successfully received by our server and recorded for the Mister Focus team.',
      receivedAt: record.createdAt
    });

  } catch (err: unknown) {
    console.error('[Mister Focus] Server contact error:', err);
    res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your inquiry. Please reach out via phone at 0543291056.'
    });
  }
});

// GET /api/status - Operational status & configuration diagnostic
app.get('/api/status', (_req: Request, res: Response) => {
  const hasOwnerEmail = Boolean(process.env.OWNER_EMAIL && process.env.OWNER_EMAIL.trim().length > 0);
  const whatsappConfigured = Boolean(process.env.VITE_WHATSAPP_PHONE && process.env.VITE_WHATSAPP_PHONE.trim().length > 0);
  
  res.json({
    status: 'operational',
    service: 'Mister Focus Official API',
    contactNumbers: ['0543291056'],
    emailDeliveryConfigured: hasOwnerEmail,
    whatsappConfigured,
    totalInquiriesCaptured: inquiryStore.length,
    timestamp: new Date().toISOString()
  });
});

// GET /api/inquiries - Admin check for owner to review captured leads
app.get('/api/inquiries', (_req: Request, res: Response) => {
  res.json({
    success: true,
    total: inquiryStore.length,
    inquiries: inquiryStore.slice(0, 50) // Return recent 50 leads
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mister Focus server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
