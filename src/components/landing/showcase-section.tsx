import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from 'next/image';

const templates = [
  { name: "AI Assistant", image: "https://placehold.co/600x400.png", hint: "AI assistant" },
  { name: "AI Chatbot", image: "https://placehold.co/600x400.png", hint: "chatbot interface" },
  { name: "SaaS Support Bot", image: "https://placehold.co/600x400.png", hint: "customer support" },
  { name: "Portfolio Assistant", image: "https://placehold.co/600x400.png", hint: "portfolio design" },
  { name: "E-commerce Bot", image: "https://placehold.co/600x400.png", hint: "online shopping" },
];

export default function ShowcaseSection() {
  return (
    <section id="demos" className="w-full py-20 lg:py-32 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Pre-Built Chat Experiences</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Get started with ready-to-use chatbot modes designed for your needs.
          </p>
        </div>
        <div className="mt-12">
            <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {templates.map((template) => (
                        <CarouselItem key={template.name} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="overflow-hidden group border-primary/10 hover:border-primary/50 transition-colors">
                                    <CardContent className="p-0 flex aspect-video items-center justify-center relative">
                                        <Image
                                            src={template.image}
                                            alt={`AI-generated template for a ${template.name}`}
                                            width={600}
                                            height={400}
                                            className="transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={template.hint}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{template.name}</h3>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="text-foreground bg-background/50 hover:bg-primary/20" />
                <CarouselNext className="text-foreground bg-background/50 hover:bg-primary/20" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
