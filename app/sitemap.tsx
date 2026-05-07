import type { MetadataRoute } from "next";
import { COMPANY_METADATA } from "@/lib/constants";
import { routing } from "@/i18n/routing";

type PathConfig = {
  en: string;
  fi: string;
};

type Pathnames = {
  [key: string]: PathConfig;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = COMPANY_METADATA;
  const baseUrl = url.endsWith("/") ? url.slice(0, -1) : url;

  // Get all unique pathnames from the routing configuration
  const pathnames = routing.pathnames as Pathnames;
  const paths = Object.keys(pathnames);

  // Create sitemap entries for each path and both languages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for Finnish paths (no locale prefix for default locale)
  paths.forEach((path) => {
    sitemapEntries.push({
      url: `${baseUrl}${pathnames[path].fi}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.8,
    });
  });

  // Add entries for English paths
  paths.forEach((path) => {
    sitemapEntries.push({
      url: `${baseUrl}/en${pathnames[path].en}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: path === "/" ? 1 : 0.8,
    });
  });

  // Add homepage entries (Finnish is the bare domain, English is /en)
  const homepageEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  return [...homepageEntries, ...sitemapEntries];
}
