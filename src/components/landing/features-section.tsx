import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BotMessageSquare, CodeXml, Combine, MonitorPlay } from 'lucide-react';

const features = [
  { icon: <BotMessageSquare className="h-6 w-6"/>, title: "Natural Language to App", description: "From simple text to a full-fledged application." },
  { icon: <CodeXml className="h-6 w-6"/>, title: "Full-Stack Output", description: "Generates UI, backend, auth, and database schemas." },
  { icon: <Combine className="h-6 w-6"/>, title: "Figma & Sketch Import", description: "Turn your static designs into interactive applications." },
  { icon: <MonitorPlay className="h-6 w-6"/>, title: "Live Preview & Deploy", description: "Visualize your app in real-time and deploy instantly." },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="w-full py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Powerful Features</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                        Everything you need to build, test, and deploy at the speed of thought.
                    </p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center p-4 border-primary/10 hover:bg-card/80 transition-colors duration-300">
                            <CardHeader>
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                                    {feature.icon}
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                                <CardDescription className="mt-2">{feature.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
