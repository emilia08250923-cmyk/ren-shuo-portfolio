import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/footer";
export const metadata: Metadata = { title: "Design", description: "Visual design, identity, typography, and digital work.", alternates: { canonical: "/design" } };
export default function DesignPage() { return <><section className="work-index section-pad"><div className="index-title"><div><p className="eyebrow">Selected visual explorations / 2026</p><h1>DESIGN<span className="accent">.</span></h1></div><p>Visual Design / Brand<br />Identity / Digital</p></div><p className="content-note index-note">示例作品集 · 以下概念项目用于展示版式与交互，可替换为真实作品。</p><ProjectGrid type="design" projects={projects.filter(p => p.type === "design")} /></section><ContactCTA /></>; }
