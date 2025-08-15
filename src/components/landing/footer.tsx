
import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';
import Logo from '../ui/logo';

export default function Footer() {
    return (
        <footer className="w-full border-t border-primary/10 py-8 mt-16 z-10 relative bg-background">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2 text-xl font-bold">
                    <Link href="/" className="flex items-center gap-2">
                        <Logo className="h-7 w-auto" />
                        <span className="text-gradient">AlgroChat.Ai</span>
                    </Link>
                </div>
                <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AlgroChat.Ai. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a href="https://github.com/Harshvardhan-Asnade" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Github /></a>
                    <a href="https://www.linkedin.com/in/harshai/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
                </div>
            </div>
        </footer>
    );
}
