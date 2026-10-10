import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import sharp from "sharp";
import { optimizeImages } from "../scripts/optimize-images.mjs";
sharp.cache(false);

test("image pipeline preserves dimensions, alpha, small originals, orientation, and caching", async t => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "foldcraft-images-"));
  t.after(async () => { assert.ok(root.startsWith(path.resolve(os.tmpdir()) + path.sep)); await fs.rm(root, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }); });
  const source = path.join(root, "source");
  const output = path.join(root, "media");
  const manifestPath = path.join(root, "manifest.json");
  await fs.mkdir(source);
  await sharp({ create: { width: 1800, height: 300, channels: 3, background: "red" } }).jpeg().toFile(path.join(source, "wide.jpg"));
  await sharp({ create: { width: 300, height: 1800, channels: 4, background: { r: 20, g: 80, b: 140, alpha: .4 } } }).png().toFile(path.join(source, "tall.png"));
  await sharp({ create: { width: 1800, height: 900, channels: 3, background: "blue" } }).withMetadata({ orientation: 6 }).jpeg().toFile(path.join(source, "rotated.jpeg"));
  const options = { source, output, manifestPath };
  const manifest = await optimizeImages(options);
  assert.deepEqual(manifest["/media/wide"].variants.map(v => v.width), [640, 960, 1440]);
  assert.deepEqual(manifest["/media/tall"].variants.map(v => v.width), [300]);
  assert.equal(manifest["/media/tall"].variants[0].height, 1800);
  assert.equal((await sharp(path.join(output, "tall-300.webp")).metadata()).hasAlpha, true);
  const alpha = await sharp(path.join(output, "tall-300.webp")).ensureAlpha().raw().toBuffer();
  assert.ok(alpha[3] > 0 && alpha[3] < 255);
  assert.equal(manifest["/media/rotated"].width, 900);
  assert.equal(manifest["/media/rotated"].height, 1800);
  for (const [base, asset] of Object.entries(manifest)) for (const v of asset.variants) {
    const meta = await sharp(path.join(output, v.src.slice(7))).metadata();
    assert.equal(meta.format, "webp");
    assert.ok(v.width <= asset.width, base);
    assert.ok(Math.abs(v.height - asset.height * v.width / asset.width) <= 1, base);
  }
  const before = await fs.stat(path.join(output, "wide-1440.webp"));
  assert.deepEqual(await optimizeImages(options), manifest);
  assert.equal((await fs.stat(path.join(output, "wide-1440.webp"))).mtimeMs, before.mtimeMs);
  assert.equal((await fs.readdir(source)).length, 3);
  await fs.copyFile(path.join(source, "wide.jpg"), path.join(source, "wide.png"));
  await assert.rejects(optimizeImages(options), /Conflicting image names/);
});
