
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileText, Image, FileDown, AppWindow } from 'lucide-react';
import Link from 'next/link';

const tools = [
  { 
    icon: <FileText className="h-6 w-6 text-primary" />, 
    title: "Text ➝ PDF Converter", 
    href: "/tools/text-to-pdf" 
  },
  { 
    icon: <Image className="h-6 w-6 text-primary" />, 
    title: "Image ➝ PDF Converter", 
    href: "/tools/image-to-pdf" 
  },
  { 
    icon: <FileDown className="h-6 w-6 text-primary" />, 
    title: "PDF ➝ Word / Excel / Text Extractor", 
    href: "/tools/pdf-extractor" 
  },
  { 
    icon: <AppWindow className="h-6 w-6 text-primary" />, 
    title: "All Tools", 
    href: "/tools" 
  },
];

export default function ToolsSection() {
    return (
        <section id="tools" className="w-full pb-12 -mt-10">
            <div className="container mx-auto px-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <Link href={tool.href} key={tool.title} className="group">
                            <Card 
                              className="text-center p-4 border-border/20 bg-secondary/30 hover:bg-secondary/80 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                            >
                                <CardHeader className="flex flex-col items-center justify-center p-2">
                                    <div className="mb-2">
                                        {tool.icon}
                                    </div>
                                    <CardTitle className="text-sm font-semibold">{tool.title}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
