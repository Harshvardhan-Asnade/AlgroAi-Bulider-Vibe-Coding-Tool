
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import Logo from '../ui/logo';
import { Separator } from '../ui/separator';

export default function Footer() {
    return (
        <footer className="w-full border-t border-primary/10 py-8 mt-16 z-10 relative bg-background">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Logo className="h-7 w-auto" />
                    <Separator orientation="vertical" className="h-6 mx-4 hidden md:block" />
                    <p className="text-sm text-muted-foreground">Developer: Harshvardhan Asnade</p>
                </div>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/Harshvardhan-Asnade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github /></a>
                    <a href="https://www.linkedin.com/in/harshai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
                </div>
            </div>
        </footer>
    );
}
