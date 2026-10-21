import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

type ProductSeo = {
  name: string;
  description: string | null;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('name, description, slug')
    .eq('slug', params.slug)
    .eq('status', 'active')
    .maybeSingle();

  if (error) {
    console.error(`Failed to load SEO metadata for product "${params.slug}":`, error);
    throw new Error('Unable to load product SEO metadata.');
  }

  const product = data as ProductSeo | null;

  if (!product) {
    return {
      title: 'Product Not Found',
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const description =
    product.description?.trim().slice(0, 160) ||
    `Discover ${product.name} at Lavender Spot. Shop skincare and beauty essentials online in India.`;
  const title = `${product.name} | Buy Online in India`;
  const canonical = `/products/${encodeURIComponent(product.slug)}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return children;
}
