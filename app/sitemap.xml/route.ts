import { createClient } from '@/lib/supabase/server';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-dynamic';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('slug, updated_at')
    .eq('status', 'active');

  if (error) {
    console.error('Failed to load active products for sitemap:', error);
    return new Response('Unable to generate sitemap.', { status: 500 });
  }

  const urls: Array<{
    loc: string;
    lastmod?: string;
    changefreq: string;
    priority: string;
  }> = [
    { loc: new URL('/', siteUrl).toString(), changefreq: 'weekly', priority: '1.0' },
    { loc: new URL('/shop', siteUrl).toString(), changefreq: 'daily', priority: '0.9' },
    ...(products || [])
      .filter((product) => Boolean(product.slug))
      .map((product) => ({
        loc: new URL(`/products/${encodeURIComponent(product.slug)}`, siteUrl).toString(),
        lastmod: product.updated_at || undefined,
        changefreq: 'weekly',
        priority: '0.8',
      })),
  ];

  const entries = urls
    .map(
      ({ loc, lastmod, changefreq, priority }) => `<url>
  <loc>${escapeXml(loc)}</loc>${lastmod ? `
  <lastmod>${escapeXml(lastmod)}</lastmod>` : ''}
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    }
  );
}
