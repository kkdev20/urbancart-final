import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { CheckoutProvider } from '@/context/CheckoutContext';
import { SearchProvider } from '@/context/SearchContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UrbanCart - Modern Ecommerce',
  description: 'Platform ecommerce modern dengan pengalaman belanja terbaik',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <CartProvider>
          <CheckoutProvider>
            <SearchProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </SearchProvider>
          </CheckoutProvider>
        </CartProvider>
      </body>
    </html>
  );
}