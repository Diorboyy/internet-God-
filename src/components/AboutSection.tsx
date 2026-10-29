import React, { useState } from 'react';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { ArrowRight, Phone } from 'lucide-react';

interface AboutSectionProps {
  onTalkToTeam: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onTalkToTeam }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // User provided image for Modern Residential Craftsmanship
  const craftsmanshipImageUrl = 'https://i.imgur.com/wugFrvE.png';

  return (
    <section id="about" className="py-20 lg:py-28 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Architectural Image Presentation */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden shadow-xl aspect-4/3 border border-[#EAE7E2] bg-[#141414]">
              {!imageError ? (
                <>
                  <img
                    src={craftsmanshipImageUrl}
                    alt="Mister Focus Modern Residential Craftsmanship"
                    referrerPolicy="no-referrer"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {!imageLoaded && (
                    <ArchitecturalVisual
                      scene="about-facade"
                      className="w-full h-full absolute inset-0"
                      alt="Mister Focus Architectural Concrete and Cedar Craftsmanship"
                    />
                  )}
                </>
              ) : (
                <ArchitecturalVisual
                  scene="about-facade"
                  className="w-full h-full"
                  alt="Mister Focus Architectural Concrete and Cedar Craftsmanship"
                />
              )}

              {/* Contrast and depth overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle Gold Corner Accent */}
              <div className="absolute top-4 left-4 border-t-2 border-l-2 border-[#D4A017] w-8 h-8 pointer-events-none" />
            </div>

            {/* Architectural Label */}
            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
              <span className="font-serif italic text-neutral-700 font-medium">Modern Residential Craftsmanship</span>
              <span className="font-mono text-[11px] text-[#D4A017] tracking-wider">ARCHITECTURAL FOCUS</span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#D4A017]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#D4A017]">
                ABOUT MISTER FOCUS
              </p>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] leading-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              Building Dreams. Creating Homes.
            </h2>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed mb-6">
              At <strong className="font-semibold text-[#171717]">Mister Focus</strong>, we believe a home should be more than a building. It should be a place where comfort meets thoughtful design and every detail contributes to a better living experience.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-8">
              Discover a vision of modern homes designed around your aspirations. Whether discussing new home construction, contemporary family residences, or custom residential plans, our team provides focused consultation tailored to your vision.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onTalkToTeam}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-[#D4A017] hover:bg-[#E5B537] active:bg-[#B8860B] transition-colors rounded-xs shadow-xs cursor-pointer"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-xs bg-white text-xs text-neutral-700">
                <Phone className="w-3.5 h-3.5 text-[#D4A017]" />
                <span className="text-neutral-500">Call:</span>
                <a href="tel:0543291056" className="font-semibold hover:text-[#D4A017] tabular-nums">0543291056</a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
