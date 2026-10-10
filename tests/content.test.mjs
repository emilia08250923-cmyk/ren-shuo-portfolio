import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { parseBilibili } from "../lib/bilibili.ts";
import { projects, nextProject, designCategories, videoCategories } from "../data/projects.ts";
test("Bilibili parser accepts supported IDs and rejects unrelated or invalid links", () => {
  const id = "BV1xx411c7mD";
  const result = parseBilibili(`https://www.bilibili.com/video/${id}/?p=2&other=value`);
  assert.equal(result.bvid, id);
  const url = new URL(result.embed);
  assert.equal(url.hostname, "player.bilibili.com");
  assert.equal(url.searchParams.get("page"), "2");
  assert.equal(url.searchParams.get("autoplay"), "0");
  assert.equal(new URL(parseBilibili("", id, "12345").embed).searchParams.get("cid"), "12345");
  assert.equal(parseBilibili(`https://evil.test/video/${id}`), null);
  assert.equal(parseBilibili(`https://bilibili.com.evil.test/video/${id}`), null);
  assert.equal(parseBilibili("https://www.bilibili.com/video/BVXXXXXXXX"), null);
  assert.equal(parseBilibili(""), null);
});
test("project assets, categories, unique slugs, and next-project loops are valid", () => {
  const manifest = JSON.parse(fs.readFileSync(new URL("../data/media-manifest.json", import.meta.url), "utf8"));
  assert.equal(new Set(projects.map(p => p.slug)).size, projects.length);
  assert.ok(projects.filter(p => p.selected).length >= 6);
  for (const p of projects) {
    assert.ok((p.type === "design" ? designCategories : videoCategories).some(c => c.id === p.category));
    assert.ok(manifest[p.cover], p.cover);
    assert.equal(nextProject(p).type, p.type);
    if (p.type === "design") for (const image of p.images) assert.ok(manifest[image.base], image.base);
  }
});
