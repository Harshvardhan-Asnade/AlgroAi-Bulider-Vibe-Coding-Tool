
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import BackgroundFx from '@/components/landing/background-fx';
import Footer from '@/components/landing/footer';
import HowItWorks from '@/components/landing/how-it-works';
import ShowcaseSection from '@/components/landing/showcase-section';
import FeaturesSection from '@/components/landing/features-section';
import PipelineSection from '@/components/landing/pipeline-section';
import CtaSection from '@/components/landing/cta-section';
import IntroAnimation from '@/components/landing/intro-animation';

function IntroWrapper({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000); // Duration of the intro animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro ? <IntroAnimation /> : children}
    </AnimatePresence>
  );
}


export default function Home() {
  return (
    <IntroWrapper>
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-clip">
        <BackgroundFx />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <Header />
        <main className="flex w-full flex-col items-center z-10">
          <HeroSection />
          <HowItWorks />
          <ShowcaseSection />
          <FeaturesSection />
          <PipelineSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </IntroWrapper>
  );
}
