// Per-product image overrides (hide / reorder / set main photo).
//
// The Google Sheet stays the source of truth for which images exist; this is a
// thin layer on top. Stored as a single small JSON blob:
//   { [productId]: { hidden: string[], order: string[] } }
// where filenames are the raw values from the sheet's ProductImages column.
//
// Production: Upstash Redis (REST API, free tier) via env vars.
// Local dev (no Upstash env): a gitignored JSON file in the project root.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type ImageOverride = { hidden?: string[]; order?: string[] };
export type OverrideMap = Record<string, ImageOverride>;

const REDIS_KEY = "whynotpr:image-overrides";
const LOCAL_FILE = path.join(process.cwd(), ".whynotpr-overrides.json");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

async function redisCommand(command: (string | undefined)[]): Promise<unknown> {
  const res = await fetch(REDIS_URL!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash error: ${res.status} ${await res.text()}`);
  const data = (await res.json()) as { result?: unknown };
  return data.result;
}

export async function getOverrides(): Promise<OverrideMap> {
  try {
    if (useRedis) {
      const result = await redisCommand(["GET", REDIS_KEY]);
      return result ? (JSON.parse(result as string) as OverrideMap) : {};
    }
    const raw = await readFile(LOCAL_FILE, "utf8");
    return JSON.parse(raw) as OverrideMap;
  } catch {
    // Missing key/file or parse error → no overrides yet.
    return {};
  }
}

async function saveOverrides(map: OverrideMap): Promise<void> {
  const json = JSON.stringify(map);
  if (useRedis) {
    await redisCommand(["SET", REDIS_KEY, json]);
  } else {
    await writeFile(LOCAL_FILE, json, "utf8");
  }
}

// Replace one product's override (or delete it when empty).
export async function setProductOverride(
  productId: string,
  override: ImageOverride,
): Promise<void> {
  const map = await getOverrides();
  const hidden = override.hidden ?? [];
  const order = override.order ?? [];
  if (hidden.length === 0 && order.length === 0) {
    delete map[productId];
  } else {
    map[productId] = { hidden, order };
  }
  await saveOverrides(map);
}

// Apply an override to a product's raw image filename list, returning the
// ordered list of VISIBLE filenames. New images added to the sheet later
// (not referenced in the override) stay visible and are appended at the end.
export function applyOverride(
  rawFiles: string[],
  override?: ImageOverride,
): string[] {
  const hidden = new Set(override?.hidden ?? []);
  const order = override?.order ?? [];
  const orderIndex = new Map(order.map((f, i) => [f, i]));

  return rawFiles
    .filter((f) => !hidden.has(f))
    .map((f, originalIndex) => ({ f, originalIndex }))
    .sort((a, b) => {
      const ia = orderIndex.has(a.f) ? orderIndex.get(a.f)! : Infinity;
      const ib = orderIndex.has(b.f) ? orderIndex.get(b.f)! : Infinity;
      if (ia !== ib) return ia - ib;
      return a.originalIndex - b.originalIndex;
    })
    .map((x) => x.f);
}

// Filenames hidden for this product (that still exist in the sheet).
export function hiddenFiles(
  rawFiles: string[],
  override?: ImageOverride,
): string[] {
  const hidden = new Set(override?.hidden ?? []);
  return rawFiles.filter((f) => hidden.has(f));
}
