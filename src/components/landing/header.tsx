import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 md:px-8 backdrop-blur-md bg-background/50 border-b border-border/50">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gradient">
        <CodeXml className="h-6 w-6 text-primary" />
        AlgroAI.build
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" asChild>
            <a href="#demos">See Demos</a>
        </Button>
        <Button asChild className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/40 transition-shadow">
          <a href="#hero">Start Building</a>
        </Button>
      </nav>
    </header>
  );
}
