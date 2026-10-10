"use client";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { parseBilibili } from "@/lib/bilibili";
import { ResponsiveImage } from "./responsive-image";
export function BilibiliEmbed({ url = "", bvid = "", cid = "", cover, title = "Showreel" }: { url?: string; bvid?: string; cid?: string; cover: string; title?: string }) {
  const [active, setActive] = useState(false);
  const video = parseBilibili(url, bvid, cid);
  return <div className="film-player"><div className="film-stage">
    {active && video ? <iframe title={`${title} — Bilibili player`} src={video.embed} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <><ResponsiveImage base={cover} alt={`${title} cover`} sizes="(max-width: 767px) 100vw, 90vw" /><div className="film-shade" /><button className="play-film" onClick={() => setActive(true)} aria-label={`Load ${title} player`} disabled={!video}><span><Play size={22} fill="currentColor" /></span>{video ? "Play film" : "Film link coming soon"}</button></>}
  </div><div className="film-player-caption"><span>{video ? "Bilibili · Playback starts only when you choose" : "Concept cover / 示例封面 · 尚未添加视频"}</span>{video && <a href={video.url} target="_blank" rel="noreferrer">Watch on Bilibili <ArrowUpRight size={14} /></a>}</div></div>;
}
