import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '@/lib/store/cart-context';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import MobileBottomNav from '@/components/MobileBottomNav';
import Toast from '@/components/Toast';
import GoogleAdSenseScript from '@/components/GoogleAdSenseScript';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: 'Lavender Spot | Skincare & Beauty Essentials in India',
    template: '%s | Lavender Spot',
  },
  description:
    'Shop thoughtfully crafted skincare and beauty essentials at Lavender Spot. Discover everyday rituals, skincare, hair care and body care for delivery across India.',
  keywords: [
    'Lavender Spot',
    'beauty products India',
    'skincare India',
    'skincare products',
    'beauty essentials',
    'hair care',
    'body care',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Lavender Spot | Skincare & Beauty Essentials in India',
    description:
      'Shop thoughtfully crafted skincare and beauty essentials at Lavender Spot, with delivery across India.',
    siteName: 'Lavender Spot',
    type: 'website',
    url: '/',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary',
    title: 'Lavender Spot | Skincare & Beauty Essentials in India',
    description:
      'Shop thoughtfully crafted skincare and beauty essentials at Lavender Spot, with delivery across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Lavender Spot',
    url: siteUrl.toString(),
    logo: new URL('/lavender-spot-emblem.svg', siteUrl).toString(),
    email: 'support@lavenderspot.com',
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Lavender Spot',
    url: siteUrl.toString(),
    inLanguage: 'en-IN',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: new URL('/shop?q={search_term_string}', siteUrl).toString(),
      },
      'query-input': 'required name=search_term_string',
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAdSenseScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="min-h-screen pb-16 md:pb-0">{children}</main>
          <MobileBottomNav />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
