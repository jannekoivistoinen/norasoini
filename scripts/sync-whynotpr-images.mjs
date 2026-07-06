#!/usr/bin/env node
/**
 * Sync Why Not PR product images from the shared Google Drive folder into
 * public/whynotpr/products/ so the portal can serve them as static assets.
 *
 * The Drive folder is shared "anyone with the link". Listing a public folder's
 * contents requires a Google API key (no OAuth / service account needed):
 *   1. https://console.cloud.google.com/ → create/select a project
 *   2. Enable the "Google Drive API"
 *   3. APIs & Services → Credentials → Create credentials → API key
 *   4. (Optional) restrict the key to the Drive API
 *
 * Usage:
 *   WHYNOTPR_DRIVE_API_KEY=xxxx node scripts/sync-whynotpr-images.mjs
 *   node scripts/sync-whynotpr-images.mjs --key xxxx --folder <folderId>
 *
 * Re-run whenever the photos in Drive change, then redeploy.
 */

import { mkdir, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "whynotpr", "products");

const DEFAULT_FOLDER = "1HKBILkdDVUZSCdmCQn33BKPERIexmyhz";

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 ? process.argv[i + 1] : undefined;
}

const API_KEY = arg("key") ?? process.env.WHYNOTPR_DRIVE_API_KEY;
const FOLDER_ID = arg("folder") ?? process.env.WHYNOTPR_DRIVE_FOLDER ?? DEFAULT_FOLDER;
const FORCE = process.argv.includes("--force");

if (!API_KEY) {
  console.error(
    "Missing API key. Set WHYNOTPR_DRIVE_API_KEY or pass --key <apiKey>.\n" +
      "See the comment at the top of this script for how to create one.",
  );
  process.exit(1);
}

async function listFolder(folderId) {
  const files = [];
  let pageToken;
  do {
    const url = new URL("https://www.googleapis.com/drive/v3/files");
    url.searchParams.set("q", `'${folderId}' in parents and trashed=false`);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("fields", "nextPageToken,files(id,name,mimeType)");
    url.searchParams.set("pageSize", "1000");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Drive list failed: ${res.status} ${await res.text()}`);
    }
    const data = await res.json();
    files.push(...(data.files ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken);
  return files;
}

async function downloadFile(id, dest) {
  const url = `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`download ${id}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  console.log(`Listing folder ${FOLDER_ID} …`);
  const all = await listFolder(FOLDER_ID);
  const images = all.filter((f) => (f.mimeType ?? "").startsWith("image/"));
  console.log(`Found ${images.length} images (of ${all.length} files).`);

  let downloaded = 0;
  let skipped = 0;
  for (const file of images) {
    const dest = path.join(OUT_DIR, file.name);
    if (!FORCE && existsSync(dest)) {
      skipped++;
      continue;
    }
    try {
      const size = await downloadFile(file.id, dest);
      downloaded++;
      console.log(`  ✓ ${file.name} (${(size / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.warn(`  ✗ ${file.name}: ${err.message}`);
    }
  }

  const onDisk = (await readdir(OUT_DIR)).length;
  console.log(
    `\nDone. Downloaded ${downloaded}, skipped ${skipped} existing. ` +
      `${onDisk} files in public/whynotpr/products.`,
  );
  console.log("Re-run with --force to overwrite existing files.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
