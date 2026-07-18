"use client";

import { Header } from "@/components/portfolio/Header";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ThinkingSection } from "@/components/portfolio/ThinkingSection";
import { CaseStudiesSection } from "@/components/portfolio/CaseStudiesSection";
import { HeadingSection } from "@/components/portfolio/HeadingSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Footer } from "@/components/portfolio/Footer";
import { Marquee } from "@/components/portfolio/Marquee";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { SectionIndicator } from "@/components/portfolio/SectionIndicator";
import { PageLoader } from "@/components/portfolio/PageLoader";
import { KeyboardShortcuts } from "@/components/portfolio/KeyboardShortcuts";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { ReadingProgress } from "@/components/portfolio/ReadingProgress";

export default function Home() {
  return (
    <div className="grain relative flex min-h-screen flex-col bg-ocean">
      <PageLoader />
      <CursorGlow />
      <ScrollProgress />
      <Header />
      <SectionIndicator />
      <BackToTop />
      <ReadingProgress />
      <KeyboardShortcuts />
      <CommandPalette />

      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <Marquee />
        <ThinkingSection />
        <CaseStudiesSection />
        <HeadingSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
