import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CodeXml } from 'lucide-react';

export default function Header() {
  const navLinks = [
    { name: 'Community', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Enterprise', href: '#' },
    { name: 'Learn', href: '#' },
    { name: 'Launched', href: '#' },
  ];

  return (
    <header className="w-full z-50 flex h-20 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <CodeXml className="h-8 w-8 text-primary glow-shadow-primary" />
          <span className="text-white">AlgroAI.build</span>
        </Link>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2 sm:gap-4">
        <Button variant="ghost">
          Log in
        </Button>
        <Button className="glow-shadow-primary transition-all duration-300 hover:glow-shadow-accent">Get Started</Button>
      </div>
    </header>
  );
}
