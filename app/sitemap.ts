import type { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('status', 'active');

  if (error) {
    console.error('Failed to load active products for sitemap:', error);
    throw new Error('Unable to generate sitemap because active products could not be loaded.');
  }

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: new URL('/', siteUrl).toString(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: new URL('/shop', siteUrl).toString(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap = (products || [])
    .filter((product) => Boolean(product.slug))
    .map((product) => ({
      url: new URL(`/products/${encodeURIComponent(product.slug)}`, siteUrl).toString(),
      lastModified: product.updated_at ? new Date(product.updated_at) : undefined,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  return [...staticPages, ...productPages];
}
