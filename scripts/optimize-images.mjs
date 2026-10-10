import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const widths = [640, 960, 1440, 1920];
export async function optimizeImages({ source = path.resolve("assets-source"), output = path.resolve("public/media"), manifestPath = path.resolve("data/media-manifest.json") } = {}) {
  await fs.mkdir(source, { recursive: true });
  await fs.mkdir(output, { recursive: true });
  let previous = {};
  try { previous = JSON.parse(await fs.readFile(manifestPath, "utf8")); } catch {}
  const manifest = {};
  const seen = new Set();
  let processed = 0, skipped = 0;
  async function walk(directory) {
    for (const entry of (await fs.readdir(directory, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const absolute = path.join(directory, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) { await walk(absolute); continue; }
      if (!/\.(jpe?g|png)$/i.test(entry.name)) continue;
      const relative = path.relative(source, absolute).replaceAll(path.sep, "/");
      const stem = relative.replace(/\.[^.]+$/, "");
      const base = `/media/${stem}`;
      if (seen.has(base.toLowerCase())) throw new Error(`Conflicting image names: ${relative}. Use unique basenames, including case.`);
      seen.add(base.toLowerCase());
      const input = await fs.readFile(absolute);
      const hash = crypto.createHash("sha256").update(input).update("webp-q82-v1").digest("hex");
      const old = previous[base];
      if (old?.hash === hash && (await Promise.all(old.variants.map(v => fs.access(path.join(output, v.src.slice(7))).then(() => true, () => false)))).every(Boolean)) {
        manifest[base] = old; skipped++; continue;
      }
      const metadata = await sharp(input, { failOn: "error" }).metadata();
      if (!metadata.width || !metadata.height) throw new Error(`Could not read dimensions: ${relative}`);
      const rotated = [5, 6, 7, 8].includes(metadata.orientation);
      const width = rotated ? metadata.height : metadata.width;
      const height = rotated ? metadata.width : metadata.height;
      const targets = widths.filter(w => w <= width);
      // Small originals still need a usable variant; never enlarge them.
      if (!targets.length) targets.push(width);
      const variants = [];
      await fs.mkdir(path.dirname(path.join(output, stem)), { recursive: true });
      for (const target of targets) {
        const filename = `${stem}-${target}.webp`;
        const result = await sharp(input).rotate().resize({ width: target, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 100 }).toFile(path.join(output, filename));
        variants.push({ src: `/media/${filename}`, width: result.width, height: result.height });
      }
      manifest[base] = { width, height, hasAlpha: !!metadata.hasAlpha, hash, variants };
      // Remove only obsolete generated sizes for this same source image.
      for (const v of old?.variants ?? []) if (!variants.some(next => next.src === v.src)) {
        const target = path.resolve(output, v.src.slice(7));
        if (target.startsWith(path.resolve(output) + path.sep)) await fs.rm(target, { force: true });
      }
      processed++;
    }
  }
  await walk(source);
  await fs.mkdir(path.dirname(manifestPath), { recursive: true });
  await fs.writeFile(`${manifestPath}.tmp`, JSON.stringify(manifest, null, 2) + "\n");
  await fs.rename(`${manifestPath}.tmp`, manifestPath);
  console.log(`Images: ${processed} optimized, ${skipped} unchanged, ${Object.keys(manifest).length} in manifest.`);
  return manifest;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  optimizeImages().catch(error => { console.error(error.message); process.exitCode = 1; });
}
