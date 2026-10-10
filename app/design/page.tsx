import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/footer";
export const metadata: Metadata = { title: "设计", description: "视觉设计、品牌识别、字体设计与数字作品。", alternates: { canonical: "/design" } };
export default function DesignPage() { return <><section className="work-index section-pad"><div className="index-title"><div><p className="eyebrow">设计档案 / 2026</p><h1>设计<span className="accent">.</span></h1></div><p>视觉设计 / 品牌识别<br />字体设计 / 数字体验</p></div><p className="content-note index-note">作品档案 · 海报与 Banner 分类已收录上传作品，其余示例项目标有「概念 / 示例」。</p><ProjectGrid type="design" projects={projects.filter(p => p.type === "design")} /></section><ContactCTA /></>; }
