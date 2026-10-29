import React, { useState } from 'react';
import { InquiryCategory } from '../types';
import { ArchitecturalVisual } from './ArchitecturalVisual';
import { ArrowRight, Grid } from 'lucide-react';

interface FeaturedProjectsProps {
  onRequestInformation: (projectTitle: string, category: InquiryCategory) => void;
  onViewAllCategories: () => void;
}

interface ProjectCardData {
  title: string;
  category: InquiryCategory;
  description: string;
  architecturalStyle: string;
  scene: 'modern-villa' | 'family-residence' | 'elegant-home';
  imageUrl?: string;
}

const ProjectItemCard: React.FC<{
  proj: ProjectCardData;
  onRequest: (title: string, category: InquiryCategory) => void;
}> = ({ proj, onRequest }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group bg-white border border-[#EAE7E2] rounded-sm overflow-hidden flex flex-col hover:border-[#D4A017]/70 hover:shadow-xl transition-all duration-300">
      {/* Architectural Image */}
      <div className="relative aspect-16/10 overflow-hidden bg-neutral-900">
        {proj.imageUrl && !imageError ? (
          <>
            <img
              src={proj.imageUrl}
              alt={`Mister Focus ${proj.title}`}
              referrerPolicy="no-referrer"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && (
              <ArchitecturalVisual
                scene={proj.scene}
                className="w-full h-full absolute inset-0"
                alt={`Mister Focus ${proj.title}`}
              />
            )}
          </>
        ) : (
          <ArchitecturalVisual
            scene={proj.scene}
            className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            alt={`Mister Focus ${proj.title}`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Concept Showcase Notice */}
        <span className="absolute top-3 left-3 bg-[#171717]/85 backdrop-blur-xs text-[10px] tracking-wider uppercase font-semibold text-[#D4A017] px-2.5 py-1 border border-[#D4A017]/30 rounded-xs">
          Concept Showcase
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-xs text-[#76512D] font-medium mb-1 tracking-wide">
            {proj.architecturalStyle}
          </p>
          <h3 className="text-xl font-serif font-bold text-[#171717] mb-3">
            {proj.title}
          </h3>
          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            {proj.description}
          </p>
        </div>

        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onRequest(proj.title, proj.category)}
            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-wider uppercase text-[#171717] bg-[#FAF9F6] border border-[#D4A017]/50 hover:bg-[#D4A017] hover:border-[#D4A017] transition-all rounded-xs cursor-pointer shadow-xs"
          >
            <span>Request Information</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onRequestInformation,
  onViewAllCategories
}) => {
  const projects: ProjectCardData[] = [
    {
      title: 'Modern Luxury Villa',
      category: 'Luxury Villa',
      architecturalStyle: 'Cantilevered Balconies & Expansive Glass',
      description: 'A striking two-storey concept defined by floating horizontal planes, floor-to-ceiling glass pavilions, and seamless flow between living spaces and landscaped grounds.',
      scene: 'modern-villa',
      imageUrl: 'https://i.imgur.com/AuT6SB9.png'
    },
    {
      title: 'Contemporary Family Residence',
      category: 'Modern Family Home',
      architecturalStyle: 'Warm Cedar Accents & Thoughtful Proportions',
      description: 'An inviting residential layout blending rich natural wood finishes with durable masonry, crafted for multi-generational comfort and quiet elegance.',
      scene: 'family-residence',
      imageUrl: 'https://i.imgur.com/gUmFSdI.png'
    },
    {
      title: 'Elegant Modern Home',
      category: 'Property Inquiry',
      architecturalStyle: 'Geometric Volumes & Honed Stone Finishes',
      description: 'An architectural statement balancing geometric masonry, integrated light wells, and private interior courtyard spaces for a tranquil retreat.',
      scene: 'elegant-home'
    }
  ];

  return (
    <section id="properties" className="py-20 lg:py-28 bg-[#FAF9F6] border-b border-[#EAE7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4A017]">
                PROJECT SHOWCASE
              </p>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] tracking-tight mb-3"
              style={{ textWrap: 'balance' }}
            >
              Explore Modern Living
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Illustrative architectural showcases highlighting our design principles and spatial planning.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllCategories}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#171717] hover:text-[#D4A017] transition-colors py-2 border-b border-[#D4A017] self-start md:self-auto cursor-pointer"
          >
            <Grid className="w-4 h-4 text-[#D4A017]" />
            <span>View All Categories</span>
          </button>
        </div>

        {/* 3 Large Property Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <ProjectItemCard
              key={idx}
              proj={proj}
              onRequest={onRequestInformation}
            />
          ))}
        </div>

        {/* Quiet disclaimer as requested */}
        <div className="mt-8 text-center text-xs text-neutral-400 italic">
          *Visual showcases reflect design and construction capabilities. Specific project specifications, site locations, and custom plans are developed in direct consultation with the client.
        </div>

      </div>
    </section>
  );
};
