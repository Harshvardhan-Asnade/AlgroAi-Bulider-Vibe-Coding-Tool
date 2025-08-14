import PromptForm from '@/components/landing/prompt-form';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/20 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight max-w-4xl font-headline">
        Build Apps with <span className="text-gradient">Natural Language</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Your words. Our AI. Complete apps — built, designed, and deployed.
      </p>
      <div className="mt-8 w-full max-w-2xl">
        <PromptForm />
      </div>
       <div className="mt-8 flex flex-wrap justify-center items-center gap-2 max-w-3xl">
          <span className="text-sm text-muted-foreground mr-2">Examples:</span>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors">Image compressor</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors">QR code maker</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors">SaaS landing page</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary hover:border-primary/50 border border-muted-foreground/20 rounded-full px-3 py-1 transition-colors">AI Chatbot UI</a>
      </div>
    </section>
  );
}
