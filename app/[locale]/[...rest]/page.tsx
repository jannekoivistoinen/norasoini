import { notFound } from "next/navigation";

// Catch-all so unknown paths under a locale render the localized
// app/[locale]/not-found.tsx instead of the root (Finnish-only) 404.
export default function CatchAllPage() {
  notFound();
}
