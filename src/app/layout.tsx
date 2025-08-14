import type { Metadata } from 'next';
import { Space_Grotesk, Space_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import GooeyCursor from "@/components/landing/gooey-cursor";
import { cn } from '@/lib/utils';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'AlgroAI.build - Build Apps with Natural Language',
    template: '%s | AlgroAI.build',
  },
  description: 'Describe your idea, and let our AI handle the code, design, and deployment. Your words. Our AI. Complete apps — built, designed, and deployed.',
  keywords: ['AI', 'App Builder', 'Natural Language', 'Code Generation', 'Next.js', 'React', 'Firebase'],
  authors: [{ name: 'AlgroAI', url: 'https://algroai.build' }],
  openGraph: {
    title: 'AlgroAI.build - Build Apps with Natural Language',
    description: 'Describe your idea, and let our AI handle the code, design, and deployment. Your words. Our AI. Complete apps — built, designed, and deployed.',
    url: 'https://algroai.build',
    siteName: 'AlgroAI.build',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'AlgroAI.build platform interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgroAI.build - Build Apps with Natural Language',
    description: 'Describe your idea, and let our AI handle the code, design, and deployment. Your words. Our AI. Complete apps — built, designed, and deployed.',
    images: ['https://placehold.co/1200x630.png'], // Replace with actual Twitter image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "font-body bg-background text-foreground antialiased",
        spaceGrotesk.variable,
        spaceMono.variable
      )}>
        <GooeyCursor />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
