import React from 'react';
import { X, ShieldCheck } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
    >
      <div className="bg-white max-w-lg w-full rounded-sm border border-[#EAE7E2] shadow-2xl p-6 sm:p-8 relative text-[#171717] max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4A017]" />
            <h3 id="privacy-modal-title" className="text-lg font-serif font-bold text-[#171717]">
              Privacy &amp; Data Policy
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017]"
            aria-label="Close privacy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <p>
            At <strong className="text-[#171717]">Mister Focus</strong>, your privacy is respected. This notice outlines how we handle the contact details you provide when submitting inquiries regarding real estate development and residential construction.
          </p>

          <div>
            <h4 className="font-semibold text-[#171717] mb-1">Information Collected</h4>
            <p>
              We collect your full name, phone number, optional email address, and message specifics solely to address your questions and schedule project discussions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#171717] mb-1">Usage &amp; Storage</h4>
            <p>
              Information submitted via our contact forms is securely processed on our server and dispatched directly to the business owner and authorized construction advisors. We do not sell, rent, or distribute personal information to third-party advertisers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[#171717] mb-1">Direct Inquiries</h4>
            <p>
              If you wish to update or delete any submitted inquiry information, or if you prefer direct phone consultation, you may reach our management anytime at{' '}
              <a href="tel:0543291056" className="text-[#D4A017] font-semibold underline">
                0543291056
              </a>.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] rounded-xs cursor-pointer"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
