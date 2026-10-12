"use client";
import { useState } from "react";
import type { VideoProject } from "@/data/projects";
import { BilibiliEmbed } from "./bilibili-embed";
export function SeriesPlayer({project}: {project: VideoProject}) {
  const [episode, setEpisode] = useState(0);
  const current = project.episodes![episode];
  return <section aria-label={`${project.title}选集播放`}><div className="series-toolbar"><div role="group" aria-label="选择集数">{project.episodes!.map((item,i)=><button className="button" key={item.bvid} aria-pressed={episode===i} onClick={()=>setEpisode(i)}>{item.title}</button>)}</div><a className="button" href={project.assetsUrl}>资产 ↗</a></div><BilibiliEmbed key={current.bvid} bvid={current.bvid} cover={project.cover} title={`${project.title} · ${current.title}`} /></section>;
}
