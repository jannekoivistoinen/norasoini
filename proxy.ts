import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// The Why Not PR mini-site + portal live on the whynotpr.* subdomain and are
// served from the /whynotpr route tree. Everything else is the localized main
// site handled by next-intl.
const WHYNOTPR_HOST_PREFIX = "whynotpr.";

export default function proxy(req: NextRequest) {
  const host = req.headers.get("host") ?? "";

  if (host.startsWith(WHYNOTPR_HOST_PREFIX)) {
    const url = req.nextUrl.clone();
    if (!url.pathname.startsWith("/whynotpr")) {
      url.pathname = `/whynotpr${url.pathname === "/" ? "" : url.pathname}`;
    }
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
