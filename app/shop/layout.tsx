import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Skincare, Hair & Body Care',
  description:
    'Explore skincare, hair care, body care and beauty essentials from Lavender Spot. Find your everyday ritual and shop online in India.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop Skincare, Hair & Body Care | Lavender Spot',
    description:
      'Explore skincare, hair care, body care and beauty essentials from Lavender Spot. Shop online in India.',
    url: '/shop',
    type: 'website',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
