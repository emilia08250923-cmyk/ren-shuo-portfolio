import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/footer";
export const metadata: Metadata = { title: "Video", description: "Film, commercial, storytelling, and motion work.", alternates: { canonical: "/video" } };
export default function VideoPage() { return <><section className="work-index dark-page section-pad"><div className="index-title"><div><p className="eyebrow">Stories in moving image / 2026</p><h1>VIDEO<span className="accent">.</span></h1></div><p>Film / Commercial<br />Storytelling / Motion</p></div><p className="content-note index-note">示例影片封面 · 真实视频将在添加 Bilibili 链接后提供播放。</p><ProjectGrid type="video" projects={projects.filter(p => p.type === "video")} /></section><ContactCTA /></>; }
