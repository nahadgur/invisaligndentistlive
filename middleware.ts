import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The /services/<condition>/<city>/ combo pages were removed (near-duplicate
// thin/doorway pages on a YMYL health domain). Any old combo URL 308-redirects
// to its parent national condition page: /services/<condition>/<city>/ -> /services/<condition>/.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Match exactly two path segments after /services: /services/{a}/{b}/
  // (with or without a trailing slash). Leaves /services/, /services/{a}/,
  // /location/ and /location/{city}/ untouched.
  const match = pathname.match(/^\/services\/([^/]+)\/([^/]+)\/?$/);
  if (match) {
    const url = request.nextUrl.clone();
    url.pathname = `/services/${match[1]}/`; // preserve trailing slash
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/services/:path*',
};
