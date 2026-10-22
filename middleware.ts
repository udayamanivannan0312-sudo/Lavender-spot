import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { siteUrl } from '@/lib/site';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  if (
    process.env.VERCEL_ENV === 'production' &&
    request.nextUrl.hostname.endsWith('.vercel.app')
  ) {
    const canonicalUrl = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      siteUrl
    );
    return NextResponse.redirect(canonicalUrl, 308);
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
