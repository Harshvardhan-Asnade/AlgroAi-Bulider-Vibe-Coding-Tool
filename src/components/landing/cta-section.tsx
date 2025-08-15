import { Button } from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="w-full py-20 lg:py-32 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background/50 to-background" />
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Join the Future of Chatbots</h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                    Be part of the AI revolution with AlgroAI and experience natural, intelligent conversations at the speed of thought.
                </p>
                <div className="mt-8">
                    <Button size="lg" className="text-lg p-8 bg-gradient-to-r from-primary to-accent/80 text-primary-foreground hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
                        Get Early Access
                    </Button>
                </div>
            </div>
        </section>
    );
}
