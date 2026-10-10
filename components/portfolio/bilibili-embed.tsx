"use client";
import { useState } from "react";
import { Play, ArrowUpRight } from "lucide-react";
import { parseBilibili } from "@/lib/bilibili";
import { ResponsiveImage } from "./responsive-image";
export function BilibiliEmbed({ url = "", bvid = "", cid = "", cover, title = "影像精选" }: { url?: string; bvid?: string; cid?: string; cover: string; title?: string }) {
  const [active, setActive] = useState(false);
  const video = parseBilibili(url, bvid, cid);
  return <div className="film-player"><div className="film-stage">
    {active && video ? <iframe title={`${title} — 哔哩哔哩播放器`} src={video.embed} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <><ResponsiveImage base={cover} alt={`${title}封面`} sizes="(max-width: 767px) 100vw, 90vw" /><div className="film-shade" /><button className="play-film" onClick={() => setActive(true)} aria-label={`播放${title}`} disabled={!video}><span><Play size={22} fill="currentColor" /></span>{video ? "播放影片" : "视频链接待添加"}</button></>}
  </div><div className="film-player-caption"><span>{video ? "哔哩哔哩 · 点击后加载播放" : "概念封面 · 尚未添加视频"}</span>{video && <a href={video.url} target="_blank" rel="noreferrer">前往哔哩哔哩观看 <ArrowUpRight size={14} /></a>}</div></div>;
}
