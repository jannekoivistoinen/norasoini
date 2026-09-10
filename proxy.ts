import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The Why Not PR site used to be served from this app's /whynotpr route tree on
// the whynotpr.norasoini.fi subdomain. It now lives in its own project on
// whynotpr.fi, so anything still reaching the old subdomain — links, bookmarks,
// crawlers — is sent there permanently.
const LEGACY_WHYNOTPR_HOST = "whynotpr.norasoini.fi";

export default function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  if (host === LEGACY_WHYNOTPR_HOST) {
    const target = new URL(
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
      "https://whynotpr.fi",
    );
    return NextResponse.redirect(target, 301);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
