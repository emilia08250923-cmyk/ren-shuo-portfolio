"use client";
import Image from "next/image";
import { mediaAsset } from "@/lib/media";

export function ResponsiveImage({ base, alt, sizes = "(max-width: 767px) 100vw, 50vw", priority = false, className = "", contain = false }: {
  base: string; alt: string; sizes?: string; priority?: boolean; className?: string; contain?: boolean;
}) {
  const asset = mediaAsset(base);
  if (!asset) return <div className={`missing-media ${className}`} role="img" aria-label={alt}><span>暂未添加图片</span></div>;
  const mobile = asset.variants.filter(v => v.width <= 960);
  const srcSet = asset.variants.map(v => `${v.src} ${v.width}w`).join(", ");
  // Vinext's custom Image loader currently emits only one URL. Native picture
  // sources ensure real responsive selection while Image retains dimensions.
  return <picture style={{ display: "contents" }}>
    <source media="(max-width: 767px)" type="image/webp" srcSet={(mobile.length ? mobile : asset.variants.slice(0, 1)).map(v => `${v.src} ${v.width}w`).join(", ")} sizes={sizes} />
    <source type="image/webp" srcSet={srcSet} sizes={sizes} />
    <Image unoptimized src={asset.variants[0].src} alt={alt} width={asset.width} height={asset.height} sizes={sizes} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} draggable={false} className={`${contain ? "media-contain" : "media-cover"} ${className}`} />
  </picture>;
}
