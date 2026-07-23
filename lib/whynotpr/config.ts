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
    "WHY NOT PR on ketterä ja asiantunteva PR- ja viestintätoimisto, joka tarjoaa brändeille räätälöityjä ratkaisuja ja sujuvaa, joustavaa yhteistyötä.",
  introBody: [
    "Elokuussa 2011 perustettu toimistomme on erikoistunut kauneusalan viestintään. Vuosien aikana olemme rakentaneet vahvat suhteet mediaan ja vaikuttajiin, mikä auttaa asiakkaitamme saavuttamaan näkyvyyttä oikeissa kanavissa ja oikeille kohderyhmille.",
    "Räätälöimme viestinnän ja PR:n ratkaisut juuri brändisi tarpeisiin. Tuotamme vaikuttavaa sisältöä sosiaaliseen mediaan, toteutamme vaikuttajayhteistyöt alusta loppuun sekä suunnittelemme ja toteutamme tapahtumia kokonaisuuksina tai valittuina osa-alueina. Seuraamme näkyvyyttä printti- ja digitaalisessa mediassa sekä raportoimme tulokset selkeästi.",
    "Median ja yhteistyökumppaneiden käytettävissä on kuvapankki ympäri vuorokauden. Palvelusta löytyvät painokelpoiset kuvat ja tuotteiden vähittäismyyntihinnat.",
  ],
  introTagline: "Asiantuntevaa PR:ää. Pitkäjänteisiä suhteita. Vaikuttavia tuloksia.",
  contact: {
    name: "Nora Soini",
    company: "WHY NOT PR Oy",
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
