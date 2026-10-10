import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { profile, capabilities } from "@/data/profile";
import { Hero } from "@/components/portfolio/hero";
import { ProjectCard } from "@/components/portfolio/project-card";
import { Reveal } from "@/components/portfolio/motion";
import { AboutPreview } from "@/components/portfolio/about-preview";
import { BilibiliEmbed } from "@/components/portfolio/bilibili-embed";
import { ContactCTA } from "@/components/portfolio/footer";
export default function Home() {
  const selected = projects.filter(p => p.selected);
  return <><Hero /><section id="selected-work" className="selected-work dark-page section-pad"><div className="section-top"><div><p className="eyebrow">A selection of visual stories / 01—06</p><h2>SELECTED<br />WORKS<span className="accent">.</span></h2></div><Link className="text-link" href="/design">Explore all work <ArrowUpRight size={18} /></Link></div><p className="content-note work-note">Concept collection · 示例作品，待替换为真实项目</p><div className="projects-grid selected-grid">{selected.map((project, i) => <Reveal key={project.slug}><ProjectCard project={project} index={i} /></Reveal>)}</div></section><section className="services dark-page section-pad"><div className="section-top"><div><p className="eyebrow accent">System / disciplines</p><h2>WHAT I DO</h2></div><span className="eyebrow">One perspective. Multiple disciplines.</span></div><div className="service-row"><span className="eyebrow">01</span><h2>Design<span className="accent">.</span></h2><p>{capabilities.design.join(" / ")}</p><Link href="/design" aria-label="Explore design work" className="round-link"><ArrowUpRight /></Link></div><div className="service-row"><span className="eyebrow">02</span><h2>Video<span className="accent">.</span></h2><p>{capabilities.video.join(" / ")}</p><Link href="/video" aria-label="Explore video work" className="round-link"><ArrowUpRight /></Link></div></section><section className="showreel-section dark-page section-pad"><div className="section-top"><div><p className="eyebrow">Less explaining. More feeling.</p><h2>SHOWREEL 2026</h2></div><span className="eyebrow">Showreel / 2026</span></div><BilibiliEmbed url={profile.showreel.bilibiliUrl} bvid={profile.showreel.bvid} cid={profile.showreel.cid} cover={profile.showreel.cover} title="Showreel" /></section><AboutPreview /><ContactCTA /></>;
}
