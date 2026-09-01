"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SkillsCarousel from "@/components/SkillsCarousel";
import AboutMe from "@/components/AboutMe";
import Services from "@/components/Services";
import ClientReviews from "@/components/ClientReviews";
import YouTubeSection from "@/components/YouTubeSection";
import MarketingInsights from "@/components/MarketingInsights";
import StatsCTA from "@/components/StatsCTA";
import ConnectSection from "@/components/ConnectSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Modals
import VideoModal from "@/components/modals/VideoModal";
import WorkModal from "@/components/modals/WorkModal";
import AuditModal from "@/components/modals/AuditModal";
import CVModal from "@/components/modals/CVModal";
import LegalModal from "@/components/modals/LegalModal";
import Preloader from "@/components/Preloader";

import { VideoItem } from "@/data/videos";
import { ServiceItem } from "@/data/services";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [legalModalTitle, setLegalModalTitle] = useState<string | null>(null);

  const handleSelectService = (service: ServiceItem) => {
    // Open case studies or scroll to contact
    setIsWorkModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-cyan-500/30 selection:text-white">
      {/* Intro Death vs Developer Preloader Animation */}
      <Preloader />

      {/* 
        ABSOLUTE RULE:
        THE BACKGROUND MUST ALWAYS REMAIN STATIC BLACK (#000000).
        NO animated particles, NO moving background gradients, NO floating shapes on background.
        ONLY content and UI elements animate.
      */}

      {/* Fixed Sticky Navbar */}
      <Navbar onOpenAudit={() => setIsAuditModalOpen(true)} />

      {/* Main Page Content */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section */}
        <Hero
          onOpenWorkModal={() => setIsWorkModalOpen(true)}
          onOpenCVModal={() => setIsCVModalOpen(true)}
        />

        {/* My Skills Section (Single Horizontal Scrolling Line) */}
        <SkillsCarousel />

        {/* Services Section */}
        <Services onSelectService={handleSelectService} />

        {/* About Me Section */}
        <AboutMe />

        {/* YouTube Section */}
        <YouTubeSection onSelectVideo={(vid) => setSelectedVideo(vid)} />

        {/* Client Reviews */}
        <ClientReviews />

        {/* Marketing Insights Section */}
        <MarketingInsights />

        {/* Stats + Large CTA */}
        <StatsCTA onOpenAudit={() => setIsAuditModalOpen(true)} />

        {/* Connect Section */}
        <ConnectSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenLegal={(title) => setLegalModalTitle(title)} />

      {/* Interactive Modals */}
      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <WorkModal
        isOpen={isWorkModalOpen}
        onClose={() => setIsWorkModalOpen(false)}
      />

      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      <LegalModal
        title={legalModalTitle}
        onClose={() => setLegalModalTitle(null)}
      />
    </div>
  );
}
