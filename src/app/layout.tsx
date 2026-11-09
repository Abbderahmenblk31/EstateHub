import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/context/LanguageContext';
import { ThemeProvider } from '@/lib/context/ThemeContext';
import EstateNavbar from '@/components/layout/EstateNavbar';
import EstateFooter from '@/components/layout/EstateFooter';

export const metadata: Metadata = {
  title: 'EstateHub | Luxury Real Estate CRM & Floorplans',
  description: 'Tunisia’s premier luxury real estate marketplace, interactive CAD floorplans, mortgage amortization studio, and broker pipeline CRM.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 dark:bg-[#0c121e] text-stone-900 dark:text-stone-100 antialiased selection:bg-amber-500 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <EstateNavbar />
            <main className="flex-1">{children}</main>
            <EstateFooter />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
