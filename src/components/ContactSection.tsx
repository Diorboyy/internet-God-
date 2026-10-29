import React, { useState, useEffect } from 'react';
import { InquiryCategory, ContactFormData } from '../types';
import { Phone, CheckCircle2, AlertCircle, Loader2, Send, Info, Eye } from 'lucide-react';

interface ContactSectionProps {
  initialCategory?: InquiryCategory;
  initialPropertyOrService?: string;
  onOpenOwnerInspector?: () => void;
}

const INQUIRY_OPTIONS: InquiryCategory[] = [
  'Property Inquiry',
  'Luxury Villa',
  'Modern Family Home',
  'Residential Development',
  'New Home Construction',
  'Custom Home Project',
  'General Question',
  'Other'
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialCategory = 'Property Inquiry',
  initialPropertyOrService = '',
  onOpenOwnerInspector
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: initialCategory,
    propertyOrService: initialPropertyOrService,
    message: '',
    honeypot: '' // Spam protection
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submissionFeedback, setSubmissionFeedback] = useState<{
    referenceId?: string;
    message?: string;
    deliveryStatus?: 'delivered' | 'pending_email_config' | 'delivery_failed';
    note?: string;
  } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Update form fields when prefill props change
  useEffect(() => {
    if (initialCategory) {
      setFormData((prev) => ({
        ...prev,
        inquiryType: initialCategory,
        propertyOrService: initialPropertyOrService || prev.propertyOrService,
        message:
          prev.message ||
          `Hello Mister Focus, I would like to inquire about ${
            initialPropertyOrService || initialCategory
          }. Please contact me.`
      }));
    }
  }, [initialCategory, initialPropertyOrService]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    // 1. Full Name required
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your real full name (at least 2 characters).';
    }

    // 2. Phone Number required
    if (!formData.phone.trim()) {
      errors.phone = 'Phone Number is required so our team can reach you.';
    } else {
      const clean = formData.phone.replace(/[^0-9]/g, '');
      if (clean.length < 7 || clean.length > 15) {
        errors.phone = 'Please enter a valid telephone number (7 to 15 digits).';
      }
    }

    // 3. Email optional, but validated if provided
    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address (e.g. name@example.com).';
      }
    }

    // 4. Inquiry Type
    if (!formData.inquiryType) {
      errors.inquiryType = 'Please select an inquiry type.';
    }

    // 5. Message required
    if (!formData.message.trim()) {
      errors.message = 'Please provide details regarding your inquiry.';
    } else if (formData.message.trim().length < 8) {
      errors.message = 'Your message is too short (at least 8 characters).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error on change
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Spam honeypot
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      // Discard silently
      return;
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit inquiry. Please try calling directly.');
      }

      setSubmitSuccess(true);
      setSubmissionFeedback({
        referenceId: result.inquiryId,
        message: result.message,
        deliveryStatus: result.deliveryStatus,
        note: result.deliveryNote
      });

      // Clear form on success
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        inquiryType: 'Property Inquiry',
        propertyOrService: '',
        message: '',
        honeypot: ''
      });
      setFormErrors({});

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected network error occurred.';
      setServerError(msg);
      setSubmitSuccess(false);
      // Preserves form contents on failure
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#EAE7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#D4A017]">
              CONNECT WITH US
            </p>
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Let&apos;s Talk About Your Dream Home
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Have a question about a property or planning a new home? Send us a message and let us know how we can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Direct Telephone Cards & Office Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-sm border border-[#EAE7E2] shadow-sm">
              <h3 className="text-lg font-serif font-bold text-[#171717] mb-2">
                Direct Contact Lines
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mb-6">
                Speak directly with the Mister Focus leadership team for prompt answers regarding residential projects and site discussions.
              </p>

              <div className="space-y-4">
                {/* Primary Direct Contact Line */}
                <a
                  href="tel:0543291056"
                  className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-[#EAE7E2] hover:border-[#D4A017] rounded-xs transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xs bg-white border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-[#171717] transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                        Direct Line
                      </p>
                      <p className="text-base font-semibold text-[#171717] tabular-nums group-hover:text-[#D4A017] transition-colors">
                        0543291056
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A017] group-hover:underline">
                    Call Now
                  </span>
                </a>
              </div>

              {/* Verified Company Note */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-start gap-3 text-xs text-neutral-500">
                <Info className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <p>
                  Mister Focus specializes in real estate development and home construction. We do not use automated marketing bots—every communication is handled by real team members.
                </p>
              </div>

              {/* Lead Inspector Modal Trigger */}
              {onOpenOwnerInspector && (
                <div className="mt-6 pt-4 border-t border-dashed border-neutral-200">
                  <button
                    type="button"
                    onClick={onOpenOwnerInspector}
                    className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-[#171717] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span>View Server Captured Leads (Diagnostic Panel)</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 rounded-sm border border-[#EAE7E2] shadow-md relative">
              
              {/* Submission Success Banner */}
              {submitSuccess && submissionFeedback && (
                <div
                  role="status"
                  className="mb-8 p-6 bg-emerald-50/90 border border-emerald-200 rounded-xs text-emerald-900"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-base font-semibold text-emerald-950">
                        Inquiry Received Successfully
                      </h4>
                      <p className="text-xs font-mono text-emerald-700 mt-0.5">
                        Reference Code: {submissionFeedback.referenceId}
                      </p>
                      <p className="text-sm text-emerald-800 mt-2 leading-relaxed">
                        {submissionFeedback.message}
                      </p>
                      
                      {submissionFeedback.deliveryStatus === 'pending_email_config' && (
                        <div className="mt-3 p-3 bg-white/70 border border-emerald-200 rounded-xs text-xs text-emerald-800">
                          <strong>Delivery Note:</strong> Your inquiry is safely archived in the server database. Live email delivery will be automatically dispatched once the owner configures the <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded-xs">OWNER_EMAIL</code> server setting.
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(null)}
                        className="mt-4 text-xs font-semibold uppercase tracking-wider text-emerald-900 underline underline-offset-4 cursor-pointer"
                      >
                        Send Another Inquiry
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Server Error Alert */}
              {serverError && (
                <div
                  role="alert"
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xs text-red-800 flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold">Submission Could Not Be Completed</p>
                    <p className="text-xs text-red-700 mt-0.5">{serverError}</p>
                    <p className="text-xs text-red-600 mt-1">
                      Your form content has been preserved. You can also call us directly at 0543291056.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Honeypot Spam Field (Hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="honeypot">Leave blank</label>
                  <input
                    type="text"
                    id="honeypot"
                    name="honeypot"
                    tabIndex={-1}
                    value={formData.honeypot}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>

                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="e.g. Anand Kumar"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border ${
                        formErrors.fullName ? 'border-red-500' : 'border-[#EAE7E2]'
                      } rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors`}
                      aria-invalid={Boolean(formErrors.fullName)}
                      aria-describedby={formErrors.fullName ? 'fullName-error' : undefined}
                    />
                    {formErrors.fullName && (
                      <p id="fullName-error" className="text-xs text-red-600 mt-1">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      placeholder="e.g. 0543291056"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border ${
                        formErrors.phone ? 'border-red-500' : 'border-[#EAE7E2]'
                      } rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors`}
                      aria-invalid={Boolean(formErrors.phone)}
                      aria-describedby={formErrors.phone ? 'phone-error' : undefined}
                    />
                    {formErrors.phone && (
                      <p id="phone-error" className="text-xs text-red-600 mt-1">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email Address (Optional) & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                    >
                      Email Address <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="e.g. anand@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border ${
                        formErrors.email ? 'border-red-500' : 'border-[#EAE7E2]'
                      } rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors`}
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="text-xs text-red-600 mt-1">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="inquiryType"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                    >
                      Inquiry Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      required
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border ${
                        formErrors.inquiryType ? 'border-red-500' : 'border-[#EAE7E2]'
                      } rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors`}
                    >
                      {INQUIRY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {formErrors.inquiryType && (
                      <p className="text-xs text-red-600 mt-1">{formErrors.inquiryType}</p>
                    )}
                  </div>
                </div>

                {/* Field 5: Property or Service of Interest (Optional) */}
                <div>
                  <label
                    htmlFor="propertyOrService"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                  >
                    Property or Service of Interest <span className="text-neutral-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    id="propertyOrService"
                    name="propertyOrService"
                    placeholder="e.g. Modern Luxury Villa or Custom Home Discussion"
                    value={formData.propertyOrService}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm bg-[#FAF9F6] border border-[#EAE7E2] rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors"
                  />
                </div>

                {/* Field 6: Message (Required) */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#171717] mb-1.5"
                  >
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your requirements, timeline, or any specific questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 text-sm bg-[#FAF9F6] border ${
                      formErrors.message ? 'border-red-500' : 'border-[#EAE7E2]'
                    } rounded-xs focus:bg-white focus:border-[#D4A017] transition-colors`}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="text-xs text-red-600 mt-1">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Field 7: Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] active:bg-[#B8860B] disabled:opacity-60 disabled:cursor-not-allowed transition-all rounded-xs shadow-md cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-neutral-400 mt-2">
                    Your contact information is kept strictly confidential for direct communication regarding your inquiry.
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
