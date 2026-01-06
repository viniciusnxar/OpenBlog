import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const FontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200"]
});


export const metadata: Metadata = {
  title: "OpenBlog",
  description: "Open blog for chat and discussions",
  icons: {icon: '/logo.svg'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${FontInter.variable} ${FontInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
