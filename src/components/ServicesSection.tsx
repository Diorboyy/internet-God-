import React from 'react';
import { InquiryCategory } from '../types';
import { Building2, Hammer, Compass, MessageSquareQuote, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onInquireService: (serviceName: string, category: InquiryCategory) => void;
}

interface ServiceCardData {
  title: string;
  category: InquiryCategory;
  description: string;
  icon: typeof Building2;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onInquireService
}) => {
  const services: ServiceCardData[] = [
    {
      title: 'Property Inquiries',
      category: 'Property Inquiry',
      description: 'Consultations on residential properties, plots, and upcoming developmental avenues tailored to your family.',
      icon: Building2
    },
    {
      title: 'New Home Construction',
      category: 'New Home Construction',
      description: 'Discussions on turnkey residential building processes, from foundation work to exterior finishing.',
      icon: Hammer
    },
    {
      title: 'Residential Design',
      category: 'Property Inquiry',
      description: 'Exploration of spatial planning, modern facade concepts, functional daylighting, and contemporary materials.',
      icon: Compass
    },
    {
      title: 'Custom Home Discussions',
      category: 'Custom Home Project',
      description: 'One-on-one sessions to understand your lifestyle requirements and formulate a bespoke home building roadmap.',
      icon: MessageSquareQuote
    }
  ];

  return (
    <section id="services" className="py-20 lg:py-28 bg-white border-b border-[#EAE7E2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4A017]">
              OUR SERVICES
            </p>
            <span className="w-6 h-[2px] bg-[#D4A017]" aria-hidden="true" />
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#171717] tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Solutions for Your Property Goals
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
            We offer consultation across key real estate development and residential building disciplines. Reach out to start a conversation regarding your goals.
          </p>
        </div>

        {/* 4 Elegant Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between p-7 bg-[#FAF9F6] border border-[#EAE7E2] rounded-sm hover:border-[#D4A017]/70 hover:shadow-lg transition-all duration-300"
              >
                <div>
                  {/* Gold Line Icon */}
                  <div className="w-12 h-12 rounded-xs bg-white border border-[#D4A017]/40 flex items-center justify-center mb-6 text-[#D4A017] group-hover:bg-[#D4A017] group-hover:text-[#171717] transition-all shadow-xs">
                    <Icon className="w-6 h-6 stroke-[1.6]" />
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#171717] mb-3">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/60">
                  <button
                    type="button"
                    onClick={() => onInquireService(srv.title, srv.category)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171717] group-hover:text-[#D4A017] transition-colors cursor-pointer"
                  >
                    <span>Inquire About Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A017] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
