import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 md:px-8 bg-transparent">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <CodeXml className="h-8 w-8 text-primary" />
          <span className="text-white">AlgroAI.build</span>
        </Link>
        <Badge variant="outline">Early Access</Badge>
      </div>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost" asChild>
            <a href="#feedback">
                <MessageSquare className="h-4 w-4 mr-2" />
                Feedback
            </a>
        </Button>
        <Button>Get Started</Button>
      </nav>
    </header>
  );
}
