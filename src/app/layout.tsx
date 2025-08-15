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
    default: 'AlgroChat.Ai - Your Intelligent Chat Companion',
    template: '%s | AlgroChat.Ai',
  },
  description: 'AlgroChat.Ai is your intelligent chat companion, ready to assist with everything from coding to conversation. Experience the future of AI chat.',
  keywords: ['AI', 'Chatbot', 'Intelligent Assistant', 'Natural Language', 'Code Generation', 'Next.js', 'React', 'Firebase'],
  authors: [{ name: 'AlgroChat.Ai', url: 'https://algrochat.ai' }],
  openGraph: {
    title: 'AlgroChat.Ai - Your Intelligent Chat Companion',
    description: 'AlgroChat.Ai is your intelligent chat companion, ready to assist with everything from coding to conversation. Experience the future of AI chat.',
    url: 'https://algrochat.ai',
    siteName: 'AlgroChat.Ai',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', 
        width: 1200,
        height: 630,
        alt: 'AlgroChat.Ai platform interface',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlgroChat.Ai - Your Intelligent Chat Companion',
    description: 'AlgroChat.Ai is your intelligent chat companion, ready to assist with everything from coding to conversation. Experience the future of AI chat.',
    images: ['https://placehold.co/1200x630.png'], 
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
