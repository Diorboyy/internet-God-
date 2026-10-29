import React, { useState } from 'react';
import { Phone, MessageCircle, X, PhoneCall } from 'lucide-react';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Check if WhatsApp international phone number is explicitly configured
  // Note: Only activate WhatsApp when the international country code is configured (e.g. +910543291056)
  const whatsappPhone = import.meta.env.VITE_WHATSAPP_PHONE || '';
  const isWhatsAppConfigured = Boolean(
    whatsappPhone && whatsappPhone.trim().startsWith('+') && whatsappPhone.trim().length >= 10
  );

  const prefilledWhatsAppMessage = encodeURIComponent(
    'Hello Mister Focus, I would like to know more about your properties and home construction services.'
  );

  const whatsappUrl = isWhatsAppConfigured
    ? `https://wa.me/${whatsappPhone.replace(/[^0-9]/g, '')}?text=${prefilledWhatsAppMessage}`
    : null;

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-sm border border-[#EAE7E2] shadow-2xl p-4 text-[#171717] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#D4A017]">
              Direct Contact
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-xs cursor-pointer"
              aria-label="Close contact options"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* Call Direct Line */}
            <a
              href="tel:0543291056"
              className="flex items-center gap-3 p-2.5 rounded-xs bg-[#FAF9F6] hover:bg-[#D4A017]/10 border border-[#EAE7E2] hover:border-[#D4A017] transition-colors group"
            >
              <PhoneCall className="w-4 h-4 text-[#D4A017]" />
              <div className="text-left">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wide">Call Direct</p>
                <p className="text-xs font-semibold tabular-nums text-[#171717]">0543291056</p>
              </div>
            </a>

            {/* Optional WhatsApp (Only active if international code configured) */}
            {isWhatsAppConfigured && whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xs bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors text-emerald-900 group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <div className="text-left">
                  <p className="text-[10px] text-emerald-700 uppercase tracking-wide">WhatsApp Chat</p>
                  <p className="text-xs font-semibold">Message Builder</p>
                </div>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-[#171717] hover:bg-[#252525] text-[#D4A017] border-2 border-[#D4A017] shadow-xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017] cursor-pointer"
        aria-label="Contact Mister Focus directly"
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
};
