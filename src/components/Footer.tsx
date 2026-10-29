import React from 'react';
import { Logo } from './Logo';
import { Phone, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site Footer" className="bg-[#171717] text-neutral-300 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Logo & Brand Purpose */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <button
              type="button"
              onClick={() => onNavigate('hero')}
              className="text-left mb-4 cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-xs"
            >
              <Logo variant="light" size="md" showTagline />
            </button>
            
            <p className="font-serif italic text-white text-sm mb-3">
              &ldquo;Open The Door To Your Dream Home.&rdquo;
            </p>
            
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-sm mb-6">
              A perfect blend of modern design, elegance, and comfort. Committed to delivering thoughtful architectural living environments and custom home construction.
            </p>

            <div className="text-xs text-neutral-500">
              Real estate development and home construction.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A017] mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('properties')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Properties
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Services
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Property & Construction Disciplines */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A017] mb-4">
              Consultation
            </p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Property Inquiries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Home Construction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Residential Developments
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Verified Contact Numbers & Message Link */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A017] mb-4">
              Direct Contact
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:0543291056"
                className="flex items-center gap-2.5 text-sm text-neutral-200 hover:text-[#D4A017] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>0543291056</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] transition-colors rounded-xs shadow-xs cursor-pointer"
            >
              <span>Send Us a Message</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Privacy */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            &copy; {currentYear} Mister Focus. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-neutral-300 transition-colors underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
