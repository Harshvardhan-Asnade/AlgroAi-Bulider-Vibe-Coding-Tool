import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';
import { Badge } from '../ui/badge';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo className="h-8 w-auto glow-shadow-primary" />
          <Badge variant="outline" className="text-xs border-primary/50 text-primary animate-pulse">Beta</Badge>
        </Link>
      </div>
      <div className="text-sm text-muted-foreground">
        (version 0.1)
      </div>
      <div className="flex items-center gap-4">
        <Link href="/chat">
          <Button className="bg-gradient-to-r from-primary to-accent/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105">
            Get Early Access
          </Button>
        </Link>
      </div>
    </header>
  );
}
