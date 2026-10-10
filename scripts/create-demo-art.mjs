// Code-generated concept artwork; replace these clearly labelled demos with real work.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const designs = [
  { slug: "form-shift", title: ["形态", "转换"], bg: "#ef4c2d", fg: "#151515", accent: "#f0eddf", mode: 0 },
  { slug: "objects-of-tomorrow", title: ["未来", "物件"], bg: "#dedfce", fg: "#252f24", accent: "#89956d", mode: 1 },
  { slug: "soft-signal", title: ["柔和", "信号"], bg: "#b9afe8", fg: "#332856", accent: "#eceb83", mode: 2 },
  { slug: "type-in-motion", title: ["文字", "律动"], bg: "#1c2824", fg: "#e5f198", accent: "#94aa9b", mode: 3 },
  { slug: "new-perspectives", title: ["全新", "视角"], bg: "#3063cf", fg: "#e4edf5", accent: "#b8d64a", mode: 0 },
  { slug: "open-form", title: ["开放", "形态"], bg: "#e9e5dc", fg: "#20201e", accent: "#e74f31", mode: 1 },
  { slug: "quiet-garden", title: ["静谧", "花园"], bg: "#e8bca5", fg: "#253d35", accent: "#da643c", mode: 2 },
];

function designSvg(p, w, h, variant) {
  const size = Math.min(w, h), pad = size * .065;
  let art = "";
  if (p.mode === 0) {
    for (let i = 0; i < 19; i++) art += `<ellipse cx="${w * .64}" cy="${h * .51}" rx="${size * (.12 + i * .012)}" ry="${size * .36}" fill="none" stroke="${p.accent}" stroke-width="${size * .002}" transform="rotate(${i * 8 + variant * 18} ${w * .64} ${h * .51})"/>`;
  } else if (p.mode === 1) {
    art = `<rect x="${w * .43}" y="${h * .3}" width="${size * .35}" height="${size * .42}" rx="${size * .02}" fill="${p.accent}" transform="rotate(-12 ${w * .6} ${h * .5})"/><circle cx="${w * .7}" cy="${h * .53}" r="${size * .16}" fill="${p.fg}"/><circle cx="${w * .7}" cy="${h * .53}" r="${size * .08}" fill="${p.bg}"/><path d="M${w * .4} ${h * .69}h${size * .43}" stroke="${p.fg}" stroke-width="${size * .01}"/>`;
  } else if (p.mode === 2) {
    art = `<g transform="translate(${w * .67},${h * .5})"><rect x="${-size * .22}" y="${-size * .15}" width="${size * .44}" height="${size * .36}" rx="${size * .18}" fill="${p.accent}"/><ellipse cx="${-size * .09}" cy="${-size * .03}" rx="${size * .019}" ry="${size * .035}" fill="${p.fg}"/><ellipse cx="${size * .09}" cy="${-size * .03}" rx="${size * .019}" ry="${size * .035}" fill="${p.fg}"/><path d="M${-size * .06} ${size * .075}q${size * .06} ${size * .06} ${size * .12} 0" fill="none" stroke="${p.fg}" stroke-width="${size * .01}" stroke-linecap="round"/></g>`;
  } else {
    for (let i = 0; i < 6; i++) art += `<text x="${w * .42 + i * 10}" y="${h * .29 + i * size * .09}" font-family="Microsoft YaHei,Arial,sans-serif" font-weight="900" font-size="${size * .11}" fill="${i % 2 ? p.accent : p.fg}" transform="skewY(-9)">律动</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="${p.bg}"/><path d="M${pad} ${pad * 1.5}H${w-pad}" stroke="${p.fg}" opacity=".3"/><text x="${pad}" y="${pad}" fill="${p.fg}" font-family="Microsoft YaHei,Arial,sans-serif" font-size="${size * .018}" letter-spacing="3">FOLDCRAFT — 概念实验 / 2026</text>${art}<text x="${pad}" y="${h * .38}" fill="${p.fg}" font-family="Microsoft YaHei,Arial,sans-serif" font-weight="900" font-size="${size * .115}" letter-spacing="${-size * .006}">${p.title[0]}</text><text x="${pad}" y="${h * .38 + size * .115}" fill="${p.fg}" font-family="Microsoft YaHei,Arial,sans-serif" font-weight="900" font-size="${size * (p.title[1].length > 9 ? .075 : .115)}" letter-spacing="${-size * .005}">${p.title[1]}</text><text x="${pad}" y="${h - pad}" fill="${p.fg}" font-family="Microsoft YaHei,Arial,sans-serif" font-size="${size * .018}">视觉探索     /     ${String(variant + 1).padStart(2, "0")}</text><text x="${w - pad}" y="${h - pad}" text-anchor="end" fill="${p.fg}" font-family="Microsoft YaHei,Arial,sans-serif" font-size="${size * .018}">设计概念</text></svg>`;
}

for (const p of designs) {
  const dir = path.resolve("assets-source/design", p.slug);
  await fs.mkdir(dir, { recursive: true });
  for (const [name, w, h, v] of [["cover", 1920, 1440, 0], ["01", 1440, 1920, 0], ["02", 1920, 1440, 1], ["03", 1920, 1080, 2]]) {
    const file = path.join(dir, `${name}.png`);
    try { await fs.access(file); } catch { await sharp(Buffer.from(designSvg(p, w, h, v))).png().toFile(file); }
  }
}

for (const [slug, color, title] of [["after-hours", "#cb6343", "夜幕之后"], ["beyond-the-frame", "#c3c6b2", "画面之外"], ["parallel-worlds", "#a699da", "平行世界"]]) {
  const dir = path.resolve("assets-source/video", slug);
  await fs.mkdir(dir, { recursive: true });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080"><defs><radialGradient id="g"><stop stop-color="${color}"/><stop offset="1" stop-color="#101211"/></radialGradient><linearGradient id="s"><stop stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><rect width="1920" height="1080" fill="#111513"/><circle cx="1250" cy="450" r="620" fill="url(#g)"/><g transform="translate(1000,450) rotate(-24)"><ellipse rx="440" ry="135" fill="none" stroke="url(#s)" stroke-width="70"/><ellipse rx="320" ry="300" fill="none" stroke="url(#s)" stroke-width="24"/></g><text x="110" y="120" fill="#ddd" font-family="Microsoft YaHei,Arial" font-size="24" letter-spacing="6">FOLDCRAFT / 影像概念</text><text x="110" y="800" fill="#eee" font-family="Microsoft YaHei,Arial" font-size="104" font-weight="700" letter-spacing="-5">${title}</text><path d="M110 880H1810" stroke="#fff" opacity=".3"/><text x="110" y="960" fill="#bbb" font-family="Microsoft YaHei,Arial" font-size="24" letter-spacing="4">关于光影、形态与运动的实验</text><text x="1810" y="960" text-anchor="end" fill="#bbb" font-family="Microsoft YaHei,Arial" font-size="24">2026</text></svg>`;
  try { await fs.access(path.join(dir, "cover.png")); } catch { await sharp(Buffer.from(svg)).png().toFile(path.join(dir, "cover.png")); }
}
console.log("Concept artwork created. Existing source files were preserved.");
