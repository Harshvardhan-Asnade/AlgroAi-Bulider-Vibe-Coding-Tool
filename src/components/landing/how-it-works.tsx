import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BotMessageSquare, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: 'Describe Your Vision',
    description: 'Provide a detailed prompt of your application requirements and functionality.',
  },
  {
    icon: <Code className="h-8 w-8 text-primary" />,
    title: 'Code Generation',
    description: 'The AI engine interprets your prompt to produce a complete, production-ready codebase.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Iterate and Deploy',
    description: 'Review the generated application, provide feedback for adjustments, and deploy.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            A simple, conversational process to bring your ideas to life.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="group relative overflow-hidden border-primary/10 bg-card/80 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="relative z-10 flex flex-col items-center text-center p-8">
                <div className="mb-4 rounded-full bg-primary/10 p-4 border border-primary/20">
                    {step.icon}
                </div>
                <CardTitle className="text-xl font-bold">{step.title}</CardTitle>
                <CardDescription className="mt-2">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
