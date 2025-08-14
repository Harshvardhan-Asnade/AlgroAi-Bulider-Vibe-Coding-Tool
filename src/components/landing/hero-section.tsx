import PromptForm from '@/components/landing/prompt-form';

export default function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-48 bg-primary/30 rounded-full blur-[100px] z-[-1]"></div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight max-w-4xl font-headline">
        What do you want to{' '}
        <span className="text-gradient">build</span> today?
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Type your idea, let AI turn it into code. AlgroAI.build is a futuristic coding platform that lets you build apps through natural language prompts.
      </p>
      <div className="mt-8 w-full max-w-2xl">
        <PromptForm />
      </div>
       <div className="mt-4 flex gap-4">
            <p className="text-sm text-muted-foreground">Get started or</p>
            <a href="#demos" className="text-sm text-accent hover:underline">see the demos</a>
      </div>
    </section>
  );
}
