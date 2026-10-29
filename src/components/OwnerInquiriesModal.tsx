import React, { useState, useEffect } from 'react';
import { X, RefreshCw, CheckCircle2, Clock, Mail, ShieldAlert } from 'lucide-react';
import { InquiryRecord } from '../types';

interface OwnerInquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwnerInquiriesModal: React.FC<OwnerInquiriesModalProps> = ({
  isOpen,
  onClose
}) => {
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [serverStatus, setServerStatus] = useState<{
    status: string;
    emailDeliveryConfigured: boolean;
    whatsappConfigured: boolean;
    totalInquiriesCaptured: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const [leadsRes, statusRes] = await Promise.all([
        fetch('/api/inquiries'),
        fetch('/api/status')
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setInquiries(data.inquiries || []);
      }
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setServerStatus(statusData);
      }
    } catch {
      setError('Unable to fetch live inquiries from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
    >
      <div className="bg-white max-w-2xl w-full rounded-sm border border-[#EAE7E2] shadow-2xl p-6 sm:p-8 relative text-[#171717] max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4 shrink-0">
          <div>
            <h3 id="owner-modal-title" className="text-lg font-serif font-bold text-[#171717]">
              Server Inquiry Diagnostic &amp; Dispatch Status
            </h3>
            <p className="text-xs text-neutral-500">
              Verified server integration for Mister Focus
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Server Email Setup Banner */}
        <div className="mb-4 p-4 rounded-xs border text-xs leading-relaxed shrink-0 bg-[#FAF9F6] border-[#D4A017]/40">
          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#171717]">
                Live Email Dispatch Configuration:
              </p>
              <p className="text-neutral-600 mt-1">
                All customer inquiries are safely validated and captured in the server database below. To have inquiries automatically delivered to your inbox, set your email in the server environment:
              </p>
              <div className="mt-2 bg-[#171717] text-[#FAF9F6] p-2 rounded-xs font-mono text-[11px]">
                OWNER_EMAIL=&quot;your-email@misterfocus.com&quot;
              </div>
              <p className="text-neutral-500 mt-1.5">
                Current status:{' '}
                {serverStatus?.emailDeliveryConfigured ? (
                  <span className="text-emerald-700 font-semibold">Active &amp; Configured</span>
                ) : (
                  <span className="text-amber-700 font-medium">Captured locally on server (Awaiting OWNER_EMAIL setup)</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Refresh & Count Bar */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <p className="text-xs font-semibold text-neutral-700">
            Captured Leads on Server ({inquiries.length})
          </p>
          <button
            type="button"
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs text-[#D4A017] hover:text-[#B8860B] font-medium cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {inquiries.length === 0 && !loading && (
            <div className="text-center py-10 border border-dashed border-neutral-200 rounded-xs text-neutral-400 text-xs">
              No inquiries submitted yet. Submit a message through the contact form to see it captured here in real-time.
            </div>
          )}

          {inquiries.map((inq) => (
            <div
              key={inq.id}
              className="p-3.5 bg-[#FAF9F6] border border-[#EAE7E2] rounded-xs text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-[#171717]">{inq.fullName}</span>
                <span className="font-mono text-[10px] text-neutral-400">{inq.id}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-neutral-600">
                <span>
                  <strong>Phone:</strong>{' '}
                  <a href={`tel:${inq.phone}`} className="text-[#D4A017] hover:underline tabular-nums">
                    {inq.phone}
                  </a>
                </span>
                {inq.email && (
                  <span>
                    <strong>Email:</strong> {inq.email}
                  </span>
                )}
                <span>
                  <strong>Category:</strong> {inq.inquiryType}
                </span>
              </div>

              {inq.propertyOrService && (
                <div className="text-neutral-600">
                  <strong>Interest:</strong> {inq.propertyOrService}
                </div>
              )}

              <div className="p-2 bg-white rounded-xs border border-neutral-200/60 text-neutral-700 italic">
                &ldquo;{inq.message}&rdquo;
              </div>

              <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(inq.createdAt).toLocaleString()}
                </span>
                <span className="flex items-center gap-1 text-neutral-500">
                  <CheckCircle2 className="w-3 h-3 text-[#D4A017]" />
                  {inq.deliveryStatus === 'delivered' ? 'Delivered to Owner' : 'Server Stored'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] rounded-xs cursor-pointer"
          >
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
};
