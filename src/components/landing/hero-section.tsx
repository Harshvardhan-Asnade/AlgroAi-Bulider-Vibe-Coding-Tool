import PromptForm from '@/components/landing/prompt-form';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight max-w-4xl font-headline">
        What do you want to <span className="text-gradient">create</span>?
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Type your idea, and let AI take it from there.
      </p>
      <div className="mt-8 w-full max-w-2xl">
        <PromptForm />
      </div>
       <div className="mt-4 flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">5/5 daily messages left. <a href="#" className="underline hover:text-white">Upgrade</a></p>
            <div className="flex gap-2">
                <a href="#" className="text-sm text-muted-foreground hover:text-white border border-muted-foreground/50 rounded-full px-3 py-1 transition-colors">Image compressor</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-white border border-muted-foreground/50 rounded-full px-3 py-1 transition-colors">QR code maker</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-white border border-muted-foreground/50 rounded-full px-3 py-1 transition-colors">Tic Tac Toe game</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-white border border-muted-foreground/50 rounded-full px-3 py-1 transition-colors">Modern landing page</a>
            </div>
      </div>
       <div className="absolute bottom-8 text-center text-xs text-muted-foreground space-y-2">
            <p><a href="#" className="underline hover:text-white">User guides</a></p>
            <p>By continuing, you agree to our <a href="#" className="underline hover:text-white">Special Terms</a></p>
      </div>
    </section>
  );
}
