import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AuthProvider } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import './globals.css';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Maison Weave - Crafted Luxury Living',
  description:
    'Maison Weave - manufacturer and exporter of premium home textiles and decor. Private label manufacturing for brands, retailers and hospitality partners worldwide. Crafted Luxury Living.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Maison Weave - Crafted Luxury Living',
    description:
      'Manufacturer and exporter of premium home textiles and decor. Private label manufacturing for brands, retailers and hospitality partners worldwide.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B2B1F',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <SmoothScrollProvider>
                <Navbar />
                <main data-testid="site-main">{children}</main>
                <Footer />
              </SmoothScrollProvider>
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
