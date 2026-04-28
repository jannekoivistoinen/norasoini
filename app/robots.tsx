import type { MetadataRoute } from "next";
import { COMPANY_METADATA } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai", "Bingbot", "cohere-ai"],
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/private/",
      },
    ],
    sitemap: COMPANY_METADATA.sitemapUrl,
    host: COMPANY_METADATA.url,
  };
}
