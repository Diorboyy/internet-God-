import React from 'react';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { Sparkles, Maximize2, ShieldCheck, MessagesSquare } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Modern and Elegant Home Design',
      desc: 'Architectural concepts that emphasize sleek proportions, abundant natural illumination, and enduring aesthetic appeal.',
      icon: Sparkles
    },
    {
      title: 'A Focus on Comfort and Functionality',
      desc: 'Thoughtfully planned floor layouts designed to support family routines, intuitive circulation, and quiet private zones.',
      icon: Maximize2
    },
    {
      title: 'Attention to Architectural Details',
      desc: 'Careful selection of contemporary materials, exterior textures, and precise detailing that elevate everyday residential living.',
      icon: ShieldCheck
    },
    {
      title: 'Direct Communication About Your Needs',
      desc: 'Transparent conversations directly with our experienced builders and coordinators to turn your specific ideas into viable blueprints.',
      icon: MessagesSquare
    }
  ];

  return (
    <section aria-label="Why Mister Focus" className="py-20 lg:py-28 bg-[#171717] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-[#D4A017]">
              OUR COMMITMENT
            </p>
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-5"
            style={{ textWrap: 'balance' }}
          >
            Designed Around Your Vision
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            At Mister Focus, our development and construction philosophy centers on thoughtful architectural execution and personalized client interaction.
          </p>
        </div>

        {/* 2-Column Split: Architectural Visual & 4 Themes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Architectural Visual Container */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="rounded-sm overflow-hidden aspect-4/3 border border-white/10 shadow-2xl relative">
              <ArchitecturalVisual
                scene="why-choose"
                className="w-full h-full"
                alt="Mister Focus Architectural Structural Planning"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#171717]/90 backdrop-blur-md p-4 border border-[#D4A017]/30 rounded-xs">
                <p className="text-xs font-serif italic text-white">
                  &ldquo;A perfect blend of modern design, elegance, and comfort.&rdquo;
                </p>
                <p className="text-[10px] tracking-wider uppercase text-[#D4A017] font-semibold mt-1">
                  MISTER FOCUS
                </p>
              </div>
            </div>
          </div>

          {/* 4 Themes List */}
          <div className="lg:col-span-7 order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-sm bg-[#1F1F1F] border border-white/10 hover:border-[#D4A017]/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xs bg-[#171717] border border-[#D4A017]/40 flex items-center justify-center text-[#D4A017] mb-4">
                    <Icon className="w-5 h-5 stroke-[1.5]" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
