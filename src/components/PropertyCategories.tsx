import React, { useState } from 'react';
import { InquiryCategory } from '../types';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { ArrowUpRight } from 'lucide-react';

interface PropertyCategoriesProps {
  onSelectCategory: (category: InquiryCategory, contextTitle: string) => void;
}

interface CategoryCardData {
  title: string;
  category: InquiryCategory;
  subtitle: string;
  scene: 'category-villa' | 'category-family' | 'category-contemporary' | 'category-development' | 'category-construction' | 'category-custom';
  imageUrl?: string;
}

const CategoryItemCard: React.FC<{
  cat: CategoryCardData;
  onSelect: (category: InquiryCategory, title: string) => void;
}> = ({ cat, onSelect }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group flex flex-col items-center text-center p-6 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm hover:border-[#D4A017]/60 hover:shadow-lg transition-all duration-300">
      {/* Circular Arch Image Portal */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 mb-6 rounded-full overflow-hidden border-2 border-[#D4A017]/40 shadow-md group-hover:scale-105 group-hover:border-[#D4A017] transition-transform duration-300 bg-[#171717]">
        {cat.imageUrl && !imageError ? (
          <>
            <img
              src={cat.imageUrl}
              alt={`Mister Focus ${cat.title}`}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <ArchitecturalVisual
                scene={cat.scene}
                className="w-full h-full absolute inset-0"
                alt={`Mister Focus ${cat.title} Category`}
              />
            )}
          </>
        ) : (
          <ArchitecturalVisual
            scene={cat.scene}
            className="w-full h-full"
            alt={`Mister Focus ${cat.title} Category`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
      </div>

      {/* Title & Description */}
      <h3 className="text-lg font-serif font-bold text-[#171717] group-hover:text-[#B8860B] transition-colors mb-2">
        {cat.title}
      </h3>

      <p className="text-xs sm:text-sm text-neutral-600 mb-6 max-w-xs leading-relaxed">
        {cat.subtitle}
      </p>

      {/* Make an Inquiry Link */}
      <button
        type="button"
        onClick={() => onSelect(cat.category, cat.title)}
        className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#D4A017] transition-colors cursor-pointer group-hover:underline underline-offset-4"
      >
        <span>Make an Inquiry</span>
        <ArrowUpRight className="w-3.5 h-3.5 text-[#D4A017] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
};

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  onSelectCategory
}) => {
  const categories: CategoryCardData[] = [
    {
      title: 'Luxury Villas',
      category: 'Luxury Villa',
      subtitle: 'Expansive private living & cantilevered outdoor terraces',
      scene: 'category-villa',
      imageUrl: 'https://i.imgur.com/AuT6SB9.png'
    },
    {
      title: 'Modern Family Homes',
      category: 'Modern Family Home',
      subtitle: 'Comfortable layouts designed for multi-generational living',
      scene: 'category-family',
      imageUrl: 'https://i.imgur.com/gUmFSdI.png'
    },
    {
      title: 'Contemporary Residences',
      category: 'Property Inquiry',
      subtitle: 'Clean architectural geometries and natural light flow',
      scene: 'category-contemporary'
    },
    {
      title: 'Residential Developments',
      category: 'Residential Development',
      subtitle: 'Planned community concepts and residential enclaves',
      scene: 'category-development'
    },
    {
      title: 'New Home Construction',
      category: 'New Home Construction',
      subtitle: 'End-to-end structural planning & project execution',
      scene: 'category-construction'
    },
    {
      title: 'Custom Home Projects',
      category: 'Custom Home Project',
      subtitle: 'Bespoke architectural concepts tailored to your exact brief',
      scene: 'category-custom'
    }
  ];

  return (
    <section id="categories" className="py-20 lg:py-28 bg-white border-b border-[#EAE7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4A017]">
              PORTFOLIO FOCUS
            </p>
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Explore Our Property Categories
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            Discover our core development and home construction categories. Select any category to discuss design specifications and initiate a consultation.
          </p>
          <p className="text-xs text-neutral-400 mt-2 italic">
            *Inquiry categories for architectural planning and project discussion.
          </p>
        </div>

        {/* 6 Circular / Arch-Inspired Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {categories.map((cat, idx) => (
            <CategoryItemCard
              key={idx}
              cat={cat}
              onSelect={onSelectCategory}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
