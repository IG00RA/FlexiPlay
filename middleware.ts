import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

function getLocaleFromRequest(request: NextRequest) {
  const country = request.headers.get('x-country-code');
  if (country === 'SK' || country === 'SI') return 'sk';
  return 'uk';
}

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const locale = getLocaleFromRequest(request);

    // Отримаємо query-параметри з початкового запиту
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    // Сформуємо новий URL з локаллю та query
    const redirectUrl = new URL(
      `/${locale}${queryString ? `?${queryString}` : ''}`,
      request.url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(uk|sk)/:path*'],
};
