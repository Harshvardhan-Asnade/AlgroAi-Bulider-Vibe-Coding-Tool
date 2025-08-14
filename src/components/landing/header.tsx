import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  return (
    <header className="w-full z-50 flex h-20 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <CodeXml className="h-8 w-8 text-primary glow-shadow-primary" />
          <span className="text-white">AlgroAI.build</span>
        </Link>
      </div>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" asChild>
            <a href="#feedback">
                <MessageSquare className="h-4 w-4 mr-2" />
                Feedback
            </a>
        </Button>
        <Button className="glow-shadow-primary transition-all duration-300 hover:glow-shadow-accent">Get Started</Button>
      </nav>
    </header>
  );
}
