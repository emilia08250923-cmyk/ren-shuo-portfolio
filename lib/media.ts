import rawManifest from "@/data/media-manifest.json";
export type MediaAsset = { width: number; height: number; hasAlpha: boolean; variants: { src: string; width: number; height: number }[] };
export const mediaManifest = rawManifest as Record<string, MediaAsset>;
export function mediaAsset(base: string) { return mediaManifest[base.replace(/-\d+\.webp$/, "")]; }
export function mediaUrl(base: string, width = 1440) {
  const asset = mediaAsset(base);
  return asset?.variants.find(v => v.width >= width)?.src ?? asset?.variants.at(-1)?.src;
}
