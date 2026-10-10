import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ResponsiveImage } from "./responsive-image";
import { Reveal } from "./motion";
export function Hero() {
  return <section className="home-hero dark-page"><div className="hero-meta"><span className="eyebrow">索引 01 / 视觉创作 / 2026</span><span className="availability"><i /> 期待合作机会</span></div><Reveal className="hero-title"><p className="eyebrow">{profile.name}</p><h1>视觉设计师<br /><span className="hero-secondary">与视频<br />创作者<span className="accent">.</span></span></h1></Reveal><div className="hero-bottom"><Reveal className="hero-intro" delay={.12}><p>{profile.tagline}</p><p className="hero-description">用设计建立鲜明表达。<br />用影像讲述值得记住的故事。</p><div className="hero-actions"><Link href="#selected-work" className="button button-dark">浏览精选作品 <ArrowDown size={16} /></Link><Link href="/about" className="text-link">关于我 <ArrowUpRight size={16} /></Link></div></Reveal><Reveal className="hero-art" delay={.2}><Link href="/design/poster-01" aria-label="查看海报 1"><ResponsiveImage base="/media/design/poster-01/cover" alt="海报 1 完整作品" priority sizes="(max-width: 767px) 90vw, 45vw" /><span className="hero-art-caption"><span>精选作品 / 海报 1</span><ArrowUpRight size={18} /></span></Link></Reveal></div><div className="hero-footnote"><span>以设计传达意图，以影像表达情绪。</span><span>向下滚动探索 ↓</span></div></section>;
}

