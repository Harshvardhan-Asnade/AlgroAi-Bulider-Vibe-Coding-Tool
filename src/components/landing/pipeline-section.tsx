"use client";

import { MessageSquare, Cpu, Box, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const pipelineSteps = [
    { icon: MessageSquare, title: "Your Prompt", description: "The process begins with your detailed description." },
    { icon: Cpu, title: "AI Analysis", description: "The AI interprets your prompt and plans the codebase." },
    { icon: Box, title: "Code Generation", description: "Full-stack, production-quality code is written automatically." },
    { icon: Rocket, title: "Deployment", description: "Your application is built and deployed to the cloud." },
];

export default function PipelineSection() {
    return (
        <section id="pipeline" className="w-full py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">From Idea to App</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Witness the automated pipeline that brings your conversations to life.
                    </p>
                </div>
                <div className="mt-20 max-w-2xl mx-auto">
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-1 bg-border/50 rounded-full" />
                        
                        <div className="space-y-24">
                            {pipelineSteps.map((step, index) => (
                                <PipelineStep key={index} index={index} icon={step.icon} title={step.title} description={step.description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const PipelineStep = ({ index, icon: Icon, title, description }: { index: number, icon: React.ElementType, title: string, description: string }) => {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    if (ref.current) {
                        observer.unobserve(ref.current);
                    }
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div ref={ref} className={cn("relative flex items-center", index % 2 === 0 ? "justify-start" : "justify-end")}>
            <div className={cn("w-5/12", index % 2 === 0 ? "text-right pr-8" : "text-left pl-8")}>
                <h3 className={cn("text-xl font-bold text-primary transition-all duration-700", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>{title}</h3>
                <p className={cn("text-muted-foreground mt-1 transition-all duration-700 delay-100", inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")}>{description}</p>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                 <div className={cn("absolute w-12 h-12 rounded-full bg-primary/50 blur-lg transition-all duration-700", inView ? "opacity-100 scale-100" : "opacity-0 scale-50")} />
                 <Icon className={cn("relative z-10 h-6 w-6 text-accent transition-all duration-700", inView ? "opacity-100" : "opacity-50")} />
            </div>
        </div>
    );
};
