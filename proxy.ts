import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Intercept legacy WordPress query-based post/page permalinks (e.g. /?p=123, /?page_id=45)
  // Stripping the query parameter and permanently 301 redirecting to the root/canonical route.
  if (
    searchParams.has("p") ||
    searchParams.has("page_id") ||
    searchParams.has("attachment_id")
  ) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("p");
    url.searchParams.delete("page_id");
    url.searchParams.delete("attachment_id");
    url.pathname = "/";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match root and standard paths, excluding static assets and metadata routes
     */
    "/((?!_next/static|_next/image|images/|icons/|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
