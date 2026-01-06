import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import NavBar from '@/components/layout/navbar';

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
      <body
        className={cn(
          'antialiased flex flex-col min-h-screen px-2',
          FontInter.variable
        )}
      >
        <NavBar/>
        <main className='flex-grow bg-blue-500'>{children}</main>
        <footer>foooooter</footer>
      </body>
    </html>
  );
}
