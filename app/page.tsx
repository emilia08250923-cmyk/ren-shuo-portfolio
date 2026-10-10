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
  return <><Hero /><section id="selected-work" className="selected-work dark-page section-pad"><div className="section-top"><div><p className="eyebrow">精选视觉叙事 / 01—06</p><h2>精选<br />作品<span className="accent">.</span></h2></div><Link className="text-link" href="/design">浏览全部作品 <ArrowUpRight size={18} /></Link></div><p className="content-note work-note">概念作品集 · 示例作品，待替换为真实项目</p><div className="projects-grid selected-grid">{selected.map((project, i) => <Reveal key={project.slug}><ProjectCard project={project} index={i} /></Reveal>)}</div></section><section className="services dark-page section-pad"><div className="section-top"><div><p className="eyebrow accent">创作体系 / 专业方向</p><h2>我的创作方向</h2></div><span className="eyebrow">统一视角，多元表达。</span></div><div className="service-row"><span className="eyebrow">01</span><h2>设计<span className="accent">.</span></h2><p>{capabilities.design.join(" / ")}</p><Link href="/design" aria-label="浏览设计作品" className="round-link"><ArrowUpRight /></Link></div><div className="service-row"><span className="eyebrow">02</span><h2>影像<span className="accent">.</span></h2><p>{capabilities.video.join(" / ")}</p><Link href="/video" aria-label="浏览视频作品" className="round-link"><ArrowUpRight /></Link></div></section><section className="showreel-section dark-page section-pad"><div className="section-top"><div><p className="eyebrow">让影像传递感受。</p><h2>2026 影像精选</h2></div><span className="eyebrow">影像精选 / 2026</span></div><BilibiliEmbed url={profile.showreel.bilibiliUrl} bvid={profile.showreel.bvid} cid={profile.showreel.cid} cover={profile.showreel.cover} title="影像精选" /></section><AboutPreview /><ContactCTA /></>;
}
