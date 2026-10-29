import React, { useState } from 'react';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreProperties: () => void;
  onContactTeam: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProperties,
  onContactTeam
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // User provided image URL
  const heroImageUrl = 'https://i.imgur.com/5bz2O6b.png';

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="relative min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#121316]"
    >
      {/* Background Hero Image with Fallback */}
      <div className="absolute inset-0 z-0">
        {!imageError ? (
          <>
            <img
              src={heroImageUrl}
              alt="Mister Focus Architectural Landmark"
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-700 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Display vector architectural backdrop while image is loading or as foundation */}
            {!imageLoaded && (
              <ArchitecturalVisual
                scene="hero-residence"
                className="w-full h-full absolute inset-0"
                alt="Mister Focus Modern Architectural Residence"
              />
            )}
          </>
        ) : (
          <ArchitecturalVisual
            scene="hero-residence"
            className="w-full h-full"
            alt="Mister Focus Modern Two-Storey Architectural Residence with Cantilever Balconies"
          />
        )}

        {/* Measured Contrast Scrim for 4.5:1 WCAG AA Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-black/30" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-3xl">
          
          {/* Small Label / Kicker (Clean unboxed text, no pill) */}
          <div className="mb-4 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#D4A017]" aria-hidden="true" />
            <p className="text-xs sm:text-sm font-semibold tracking-[0.24em] uppercase text-[#D4A017]">
              YOUR FUTURE STARTS HERE
            </p>
          </div>

          {/* Main Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] tracking-tight mb-6"
            style={{ textWrap: 'balance' }}
          >
            Open The Door To Your Dream Home
          </h1>

          {/* Supporting Headline */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-200/90 font-normal leading-relaxed max-w-2xl mb-10">
            A perfect blend of modern design, elegance, and comfort.
          </p>

          {/* Buttons: Explore Properties & Contact Our Team */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              type="button"
              onClick={onExploreProperties}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] active:bg-[#B8860B] transition-all rounded-xs shadow-lg hover:shadow-xl cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onContactTeam}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white bg-transparent hover:bg-white/10 active:bg-white/20 border border-white/40 hover:border-white transition-all rounded-xs cursor-pointer backdrop-blur-xs"
            >
              <span>Contact Our Team</span>
            </button>
          </div>

          {/* Quiet Trust Footnote */}
          <div className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6 text-xs text-neutral-300">
            <div>
              <span className="text-neutral-400">Direct Inquiries:</span>{' '}
              <a href="tel:0543291056" className="text-[#D4A017] hover:underline font-medium tabular-nums">
                0543291056
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/60 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
