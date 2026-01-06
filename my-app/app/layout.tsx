import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const FontInter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['200'],
});

export const metadata: Metadata = {
  title: 'OpenBlog',
  description: 'Open blog for chat and discussions',
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={cn('antialiased', FontInter.variable)}>{children}</body>
    </html>
  );
}
