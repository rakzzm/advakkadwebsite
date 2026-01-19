import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import Providers from '@/components/Providers';
import LayoutWrapper from '@/components/LayoutWrapper';

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Adavakkad Collections Wedding Center',
  description: 'Premium digital solutions and quality clothing for modern businesses and families.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0&display=swap" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
