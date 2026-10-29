/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InquiryCategory } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { PropertyCategories } from './components/PropertyCategories';
import { PromotionalSection } from './components/PromotionalSection';
import { FeaturedProjects } from './components/FeaturedProjects';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { FloatingContact } from './components/FloatingContact';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { OwnerInquiriesModal } from './components/OwnerInquiriesModal';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory>('Property Inquiry');
  const [selectedContext, setSelectedContext] = useState<string>('');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [ownerInspectorOpen, setOwnerInspectorOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handler for category card clicks
  const handleSelectCategory = (category: InquiryCategory, contextTitle: string) => {
    setSelectedCategory(category);
    setSelectedContext(contextTitle);
    scrollToSection('contact');
  };

  // Handler for project showcase cards
  const handleRequestProjectInfo = (projectTitle: string, category: InquiryCategory) => {
    setSelectedCategory(category);
    setSelectedContext(projectTitle);
    scrollToSection('contact');
  };

  // Handler for service cards
  const handleInquireService = (serviceName: string, category: InquiryCategory) => {
    setSelectedCategory(category);
    setSelectedContext(serviceName);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#171717] antialiased selection:bg-[#D4A017]/25 selection:text-[#171717]">
      
      {/* 1. Slim Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header & Navigation */}
      <Header onNavigate={scrollToSection} />

      <main className="flex-1">
        {/* 3. Hero Photographic Banner */}
        <Hero
          onExploreProperties={() => scrollToSection('properties')}
          onContactTeam={() => scrollToSection('contact')}
        />

        {/* 4. Trust and Value Strip */}
        <TrustStrip />

        {/* 5. About the Company */}
        <AboutSection onTalkToTeam={() => scrollToSection('contact')} />

        {/* 6. Property Categories (6 circular/arch-inspired cards) */}
        <PropertyCategories onSelectCategory={handleSelectCategory} />

        {/* 7. Featured Promotional Section (Two-Column Charcoal/Bronze Banner) */}
        <PromotionalSection onDiscussNeeds={() => scrollToSection('contact')} />

        {/* 8. Featured Projects (Explore Modern Living - 3 Showcase Cards) */}
        <FeaturedProjects
          onRequestInformation={handleRequestProjectInfo}
          onViewAllCategories={() => scrollToSection('categories')}
        />

        {/* 9. Our Services (4 Solutions for Property Goals) */}
        <ServicesSection onInquireService={handleInquireService} />

        {/* 10. Why Choose Mister Focus (Dark Luxury Theme) */}
        <WhyChooseUs />

        {/* 11. Contact Form — Essential Feature (Validated & Server-Connected) */}
        <ContactSection
          initialCategory={selectedCategory}
          initialPropertyOrService={selectedContext}
          onOpenOwnerInspector={() => setOwnerInspectorOpen(true)}
        />
      </main>

      {/* 12. Floating Action Button: Phone & WhatsApp */}
      <FloatingContact />

      {/* 13. Footer (Charcoal Multi-Column Layout) */}
      <Footer
        onNavigate={scrollToSection}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />

      {/* Modals */}
      <PrivacyModal
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
      />

      <OwnerInquiriesModal
        isOpen={ownerInspectorOpen}
        onClose={() => setOwnerInspectorOpen(false)}
      />

    </div>
  );
}
