import React from 'react';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface PromotionalSectionProps {
  onDiscussNeeds: () => void;
}

export const PromotionalSection: React.FC<PromotionalSectionProps> = ({
  onDiscussNeeds
}) => {
  return (
    <section aria-label="Promotional Showcase" className="py-16 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Two-Column Promotional Banner */}
        <div className="rounded-sm overflow-hidden bg-[#171717] border border-[#D4A017]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Charcoal / Bronze with Gold & White Typography */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start text-left bg-gradient-to-br from-[#171717] via-[#1E1E1E] to-[#241C15]">
            
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#D4A017]">
                BESPOKE CONSULTATION
              </p>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight leading-tight mb-5"
              style={{ textWrap: 'balance' }}
            >
              Your Dream Home Starts with the Right Conversation
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Tell us what you&apos;re looking for, and let&apos;s discuss the possibilities. From custom site reviews to structural planning, we ensure every detail aligns with your personal vision of modern luxury.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onDiscussNeeds}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] active:bg-[#B8860B] transition-colors rounded-xs shadow-md cursor-pointer whitespace-nowrap"
              >
                <span>Discuss Your Property Needs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:0543291056"
                className="inline-flex items-center justify-center gap-2 px-5 py-4 text-xs font-medium tracking-wide text-neutral-300 hover:text-white border border-neutral-700 hover:border-neutral-500 rounded-xs transition-colors tabular-nums"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#D4A017]" />
                <span>Call 0543291056</span>
              </a>
            </div>

          </div>

          {/* Right Column: High Quality Contemporary Architectural Image */}
          <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-full">
            <ArchitecturalVisual
              scene="promo-estate"
              className="w-full h-full min-h-[320px]"
              alt="Mister Focus Contemporary Residential Architecture at Dusk"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Architectural Overlay Tag */}
            <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-xs px-3 py-1.5 border border-white/10 rounded-xs text-[11px] text-neutral-300">
              Contemporary Design Language
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
