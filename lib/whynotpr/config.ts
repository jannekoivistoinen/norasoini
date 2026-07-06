// Why Not PR — site configuration.
//
// Most of the copy below is PLACEHOLDER. Replace the values in `AGENCY`
// with the real agency details (and swap the brand colors/fonts in
// app/whynotpr/whynotpr.css + app/whynotpr/layout.tsx) before launch.

export const AGENCY = {
  name: "Why Not PR",
  // One or two sentences shown on the landing page.
  tagline: "Viestintä- ja PR-toimisto, joka tuo kauneus- ja lifestyle-brändit esiin.",
  introHeadline:
    "WHY NOT PR Oy on pieni ja asiantunteva PR- ja viestintätoimisto, joka tarjoaa asiakkailleen räätälöityjä ratkaisuja ja joustavaa yhteistyötä.",
  introBody: [
    "Perustettu elokuussa 2011, toimistomme on erikoistunut kauneusalan viestintään, ja meillä on vankat suhteet niin mediaan kuin alan asiantuntijoihin.",
    "Online Showroom palvelut saatavilla median edustajille 24/7: painokelpoiset kuvat, tuotteiden vähittäismyyntihinnat, tiedustelunumerot lehdistölle, lisätietoja tuotteista ja brändeistä, brändien jakelukanavat ja lehdistötiedotteet lanseerausjärjestyksessä.",
  ],
  contact: {
    name: "Nora Soini",
    email: "nora@whynotpr.fi",
    phone: "+358 40 550 1155",
  },
  instagram: {
    handle: "@whynotpr",
    url: "https://instagram.com/whynotpr",
  },
} as const;

// The published-to-web CSV URL of the product Google Sheet.
// Override with the WHYNOTPR_SHEET_CSV_URL env var in production.
export const SHEET_CSV_URL =
  process.env.WHYNOTPR_SHEET_CSV_URL ??
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS6SEdUMaXgILDrQVt1V_ssxfc7wuoNCHTTJniKpugMd6BRkX3Gth1T3W8RIpkuew/pub?output=csv";

// How long (seconds) to cache the sheet before re-fetching. Sheet edits
// appear automatically after this window (or instantly via /api/whynotpr/revalidate).
export const SHEET_REVALIDATE_SECONDS = 600;

// Public path where synced product images live (see scripts/sync-whynotpr-images.mjs).
export const IMAGE_BASE_PATH = "/whynotpr/products";

// Cache tag used for on-demand revalidation.
export const PRODUCTS_CACHE_TAG = "whynotpr-products";
