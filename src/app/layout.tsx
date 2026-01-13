import type { Metadata } from 'next';
import './globals.css';
import { Inter, Playfair_Display, Outfit } from "next/font/google";
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import LayoutWrapper from '@/components/LayoutWrapper';
import { ProductProvider } from '@/context/ProductContext';
import { CustomerProvider } from '@/context/CustomerContext';
import { BuyerProvider } from '@/context/BuyerContext';
import { ChatProvider } from '@/context/ChatContext';

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable}`}>
        <AuthProvider>
          <CartProvider>
            <ProductProvider>
              <CustomerProvider>
                <BuyerProvider>
                  <InvoiceProvider>
                    <ChatProvider>
                      <LayoutWrapper>
                        {children}
                      </LayoutWrapper>
                    </ChatProvider>
                  </InvoiceProvider>
                </BuyerProvider>
              </CustomerProvider>
            </ProductProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
