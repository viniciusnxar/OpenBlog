import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import NavBar from '@/components/layout/navbar';
import { ThemeProvider } from 'next-themes';

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
    <html lang='pt-BR' suppressHydrationWarning>
      <body
        className={cn(
          'antialiased flex flex-col min-h-screen px-2',
          FontInter.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          <main className='flex-grow bg-bg'>{children}</main>
          <footer>foooooter</footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
