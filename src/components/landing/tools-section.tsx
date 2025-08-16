
'use client';

import { FileText, Image, FileDown, AppWindow } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const tools = [
  { 
    icon: <FileText className="h-6 w-6 text-primary" />, 
    title: "Text ➝ PDF Converter", 
    description: "Convert any text into a professional PDF document.",
    href: "/tools/text-to-pdf" 
  },
  { 
    icon: <Image className="h-6 w-6 text-primary" />, 
    title: "Image ➝ PDF Converter", 
    description: "Combine multiple images into a single PDF file.",
    href: "/tools/image-to-pdf" 
  },
  { 
    icon: <FileDown className="h-6 w-6 text-primary" />, 
    title: "PDF ➝ Word / Excel", 
    description: "Extract text and data from PDFs into editable formats.",
    href: "/tools/pdf-extractor" 
  },
  { 
    icon: <AppWindow className="h-6 w-6 text-primary" />, 
    title: "All Tools", 
    description: "Explore our full suite of powerful conversion tools.",
    href: "/tools" 
  },
];

export default function ToolsSection() {
    const { toast } = useToast();

    const handleCardClick = () => {
        toast({
            title: "Coming Soon!",
            description: "This feature is under development.",
        });
    };

    return (
        <section id="tools" className="w-full pb-12 -mt-16">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <div key={tool.title} className="group cursor-pointer" onClick={handleCardClick}>
                           <div className="relative p-px rounded-2xl bg-gradient-to-b from-primary/50 to-accent/50 transition-all duration-300 hover:bg-gradient-to-b hover:from-primary hover:to-accent h-full">
                                <div className="relative bg-gradient-to-b from-background to-secondary/50 rounded-2xl p-4 h-full flex flex-col">
                                    <div className="mb-3">
                                        {tool.icon}
                                    </div>
                                    <h3 className="text-base font-bold text-foreground mb-1">{tool.title}</h3>
                                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
