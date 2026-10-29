import React from 'react';
import { Phone, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <aside
      aria-label="Announcement"
      className="bg-[#171717] text-[#FAF9F6] border-b border-[#D4A017]/30 text-xs py-2 px-4 select-none relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#D4A017] shrink-0" />
          <span className="font-medium tracking-wide">
            Discover Modern Living with <strong className="text-[#D4A017] font-semibold">Mister Focus</strong>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-neutral-300 shrink-0">
          <span className="text-neutral-400">Direct Inquiries:</span>
          <a
            href="tel:0543291056"
            className="flex items-center gap-1.5 text-[#D4A017] hover:text-[#F3C648] transition-colors font-medium tabular-nums"
          >
            <Phone className="w-3 h-3" />
            0543291056
          </a>
        </div>
      </div>
    </aside>
  );
};
