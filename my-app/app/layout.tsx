import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import NavBar from '@/components/layout/NavBar';
import { ThemeProvider } from 'next-themes';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <EdgeStoreProvider>
      <SessionProvider session={session}>
        <html lang='pt-BR' suppressHydrationWarning>
          <body
            className={cn(
              'antialiased flex flex-col min-h-screen px-2',
              FontInter.variable,
            )}
          >
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <NavBar />
              <main className='grow bg-bg'>{children}</main>
              <footer>foooooter</footer>
            </ThemeProvider>
          </body>
        </html>
      </SessionProvider>
    </EdgeStoreProvider>
  );
}
