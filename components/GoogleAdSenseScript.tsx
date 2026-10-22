'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export default function GoogleAdSenseScript() {
  const pathname = usePathname();
  const isPublicShoppingPage =
    pathname === '/' || pathname === '/shop' || pathname.startsWith('/products/');

  if (!isPublicShoppingPage) {
    return null;
  }

  return (
    <Script
      id="google-adsense"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6339284570872258"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
