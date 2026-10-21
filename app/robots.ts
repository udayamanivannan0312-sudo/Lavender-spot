import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/api/',
        '/account/',
        '/cart/',
        '/checkout/',
        '/login',
        '/signup',
        '/forgot-password',
        '/wishlist/',
        '/order-success/',
      ],
    },
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
  };
}
