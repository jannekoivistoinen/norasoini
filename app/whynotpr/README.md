# Why Not PR — mini-site + product portal

A standalone PR-agency mini-site and password-gated product portal, served on
the `whynotpr.norasoini.fi` subdomain from this same Next.js app. Product data
comes live from a published Google Sheet; product images are synced from Google
Drive into `public/whynotpr/products/`.

## How it routes

`proxy.ts` detects the `whynotpr.*` host and rewrites it onto the `/whynotpr`
route tree. The main site (next-intl, FI/EN) is untouched.

- `whynotpr.norasoini.fi/` → landing page (`app/whynotpr/page.tsx`)
- `whynotpr.norasoini.fi/portal` → product portal (password-gated)
- `whynotpr.norasoini.fi/login` → password screen

**Local dev:** visit `http://whynotpr.localhost:3000` (the `whynotpr.` prefix is
what triggers the rewrite).

## Environment variables (set in Vercel → Project → Settings → Environment Variables)

| Variable                      | Purpose                                              | Default (dev)        |
| ----------------------------- | --------------------------------------------------- | -------------------- |
| `WHYNOTPR_PASSWORD`           | Shared **portal** password (press)                  | `whynotpr`           |
| `WHYNOTPR_ADMIN_PASSWORD`     | **Admin** password for `/admin` (image management)  | `admin`              |
| `WHYNOTPR_SECRET`             | Random string used to sign the session cookies      | `dev-secret-change-me` |
| `WHYNOTPR_SHEET_CSV_URL`      | Published-to-web CSV URL of the product sheet       | (the current sheet)  |
| `WHYNOTPR_REVALIDATE_TOKEN`   | Token for the manual refresh endpoint               | `refresh`            |
| `WHYNOTPR_DRIVE_API_KEY`      | Google API key — used **only** by the image sync script (build/local), not at runtime | — |
| `UPSTASH_REDIS_REST_URL`      | Upstash Redis REST URL — stores admin image overrides | — (file fallback in dev) |
| `UPSTASH_REDIS_REST_TOKEN`    | Upstash Redis REST token                            | — (file fallback in dev) |

Set real values for `WHYNOTPR_PASSWORD`, `WHYNOTPR_ADMIN_PASSWORD`,
`WHYNOTPR_SECRET`, and `WHYNOTPR_REVALIDATE_TOKEN` in production.

## Admin: image management (`/admin`)

`whynotpr.norasoini.fi/admin` is a small editor (separate admin password) for
managing each product's photos: **hide** photos, **reorder** them, and **set the
main/thumbnail** photo. It does not upload or delete files — the Google Drive
sync + sheet remain the source of truth for which images exist.

Edits are stored as a small per-product override layer (`lib/whynotpr/overrides.ts`):
`{ [productId]: { hidden: [...], order: [...] } }`, merged on top of the sheet at
read time. New images added to the sheet later still appear automatically.

**Storage:** Upstash Redis (free tier) in production via `UPSTASH_REDIS_REST_URL`
+ `UPSTASH_REDIS_REST_TOKEN`. Create a free database at upstash.com, copy the two
REST values into Vercel. Without them (local dev), overrides fall back to a
gitignored `.whynotpr-overrides.json` file. Changes appear in the portal
immediately (no redeploy).

## Data: the Google Sheet

The sheet is read live via its **Publish to web → CSV** URL (File → Share →
Publish to web → entire document → CSV). Data is cached for 10 minutes
(`SHEET_REVALIDATE_SECONDS` in `lib/whynotpr/config.ts`). Edits in the sheet
appear automatically after that window.

To force an immediate refresh:

```
https://whynotpr.norasoini.fi/api/whynotpr/revalidate?token=YOUR_TOKEN
```

Only rows with `ProductVisibility = 1` are shown.

## Images: sync from Google Drive

Product images are served as static files from `public/whynotpr/products/`.
Filenames must match the values in the sheet's `ProductImages` column. Run the
sync script when the Drive photos change, then commit + redeploy:

```bash
WHYNOTPR_DRIVE_API_KEY=xxxx node scripts/sync-whynotpr-images.mjs
```

(See the script header for how to create the Google API key — one key, no OAuth.)
Missing/unmatched images degrade gracefully to an "Ei kuvaa" placeholder.

## DNS / domain setup (one-time)

1. In Vercel → `norasoini` project → Settings → Domains, add
   `whynotpr.norasoini.fi`.
2. At the DNS host for `norasoini.fi`, add the record Vercel shows
   (typically a `CNAME` `whynotpr` → `cname.vercel-dns.com`).

No second Vercel project or extra hosting cost — it's the same deployment.
