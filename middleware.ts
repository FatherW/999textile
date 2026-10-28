import { NextResponse, type NextRequest } from "next/server";

import { locales, negotiateLocale } from "@/lib/i18n";

function pathnameHasLocale(pathname: string): boolean {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathnameHasLocale(pathname)) {
    return NextResponse.next();
  }

  const locale = negotiateLocale(request.headers.get("accept-language"));
  const suffix = pathname === "/" ? "" : pathname;
  request.nextUrl.pathname = `/${locale}${suffix}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
