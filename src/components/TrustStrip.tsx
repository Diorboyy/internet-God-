import React from 'react';
import { Compass, PenTool, Home, HeartHandshake } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const values = [
    {
      title: 'Modern Architecture',
      description: 'Clean lines and contemporary aesthetics',
      icon: Compass,
    },
    {
      title: 'Thoughtful Design',
      description: 'Functional spaces tailored for daily life',
      icon: PenTool,
    },
    {
      title: 'Comfort-Focused Living',
      description: 'Harmonious environments for modern families',
      icon: Home,
    },
    {
      title: 'Personalized Assistance',
      description: 'Direct communication from concept to completion',
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      aria-label="Core Values & Design Philosophy"
      className="bg-[#FAF9F6] border-y border-[#EAE7E2] py-8 sm:py-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center sm:items-start text-center sm:text-left group"
              >
                {/* Gold Line Icon */}
                <div className="w-12 h-12 rounded-xs bg-[#FAF9F6] border border-[#D4A017]/30 flex items-center justify-center mb-3 text-[#D4A017] shadow-xs group-hover:border-[#D4A017] group-hover:bg-white transition-colors">
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-[#171717] tracking-tight">
                  {val.title}
                </h3>
                <p className="text-xs text-neutral-600 mt-1 leading-snug">
                  {val.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
