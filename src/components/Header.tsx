import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About Us', target: 'about' },
    { label: 'Properties', target: 'properties' },
    { label: 'Our Services', target: 'services' },
    { label: 'Contact Us', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-shadow duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Wordmark & Architectural Emblem */}
          <button
            type="button"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center text-left focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-sm py-1 cursor-pointer"
            aria-label="Mister Focus Home"
          >
            <Logo variant="dark" size="md" />
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-neutral-700"
          >
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => handleLinkClick(link.target)}
                className="whitespace-nowrap shrink-0 text-neutral-700 hover:text-[#171717] hover:border-b-2 hover:border-[#D4A017] pb-0.5 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] active:bg-[#B8860B] transition-colors rounded-sm shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Enquire Now
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="px-3 py-1.5 text-xs font-semibold uppercase text-[#171717] bg-[#D4A017] rounded-sm whitespace-nowrap cursor-pointer"
            >
              Enquire
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-[#171717] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-md cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 bg-white/98 px-6 py-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <button
                key={link.target}
                type="button"
                onClick={() => handleLinkClick(link.target)}
                className="text-left text-base font-medium text-neutral-800 hover:text-[#D4A017] py-2 border-b border-neutral-100 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="w-full text-center px-5 py-3 text-sm font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] rounded-sm shadow-xs cursor-pointer"
            >
              Enquire Now
            </button>

            <div className="pt-2 text-xs text-neutral-500 flex flex-col gap-1">
              <span className="font-semibold text-neutral-700">Direct Telephone Inquiries:</span>
              <a href="tel:0543291056" className="text-[#D4A017] font-semibold tabular-nums flex items-center gap-1.5 py-1">
                <PhoneCall className="w-3.5 h-3.5" /> 0543291056
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
