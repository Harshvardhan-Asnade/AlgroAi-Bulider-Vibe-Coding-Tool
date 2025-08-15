import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <Logo className="h-8 w-auto glow-shadow-primary" />
        </Link>
      </div>
    </header>
  );
}
