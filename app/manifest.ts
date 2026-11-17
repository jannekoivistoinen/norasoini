import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.company.name,
    short_name: SITE_CONFIG.company.name,
    description: SITE_CONFIG.company.description,
    start_url: "/",
    display: "standalone",
    background_color: SITE_CONFIG.theme.colors.background,
    theme_color: SITE_CONFIG.theme.colors.primary,
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
