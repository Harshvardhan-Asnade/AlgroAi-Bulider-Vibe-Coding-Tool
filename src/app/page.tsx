import dynamic from 'next/dynamic';
import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import BackgroundFx from '@/components/landing/background-fx';
import Footer from '@/components/landing/footer';

const HowItWorks = dynamic(() => import('@/components/landing/how-it-works'));
const ShowcaseSection = dynamic(() => import('@/components/landing/showcase-section'));
const FeaturesSection = dynamic(() => import('@/components/landing/features-section'));
const PipelineSection = dynamic(() => import('@/components/landing/pipeline-section'));
const CtaSection = dynamic(() => import('@/components/landing/cta-section'));

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-clip">
      <BackgroundFx />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      <Header />
      <main className="flex w-full flex-col items-center">
        <HeroSection />
        <HowItWorks />
        <ShowcaseSection />
        <FeaturesSection />
        <PipelineSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
