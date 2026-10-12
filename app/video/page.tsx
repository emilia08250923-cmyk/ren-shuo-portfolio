import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/footer";
export const metadata: Metadata = { title: "视频", description: "短片、商业影像、故事表达与动态设计作品。", alternates: { canonical: "/video" } };
export default function VideoPage() { return <><section className="work-index dark-page section-pad"><div className="index-title"><div><p className="eyebrow">动态影像档案 / 2026</p><h1>动态<br />影像<span className="accent">.</span></h1></div><p>短片 / 商业影像<br />故事表达 / 动态设计</p></div><p className="content-note index-note">《Heart》《穿越反派》均已收录第 1、2 集，支持站内观看；其余概念项目标有「概念 / 示例」。</p><ProjectGrid type="video" projects={projects.filter(p => p.type === "video")} /></section><ContactCTA /></>; }
