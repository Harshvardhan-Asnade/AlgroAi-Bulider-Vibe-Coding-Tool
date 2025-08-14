import Header from '@/components/landing/header';
import HeroSection from '@/components/landing/hero-section';
import HowItWorks from '@/components/landing/how-it-works';
import ShowcaseSection from '@/components/landing/showcase-section';
import FeaturesSection from '@/components/landing/features-section';
import PipelineSection from '@/components/landing/pipeline-section';
import CtaSection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';
import BackgroundFx from '@/components/landing/background-fx';

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
