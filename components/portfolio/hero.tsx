import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ResponsiveImage } from "./responsive-image";
export function Hero() {
  return <section className="home-hero dark-page personal-hero"><div className="personal-intro"><p className="personal-name">任硕<span className="accent">.</span></p><h1>视觉设计师<br /><span className="hero-secondary">与视频创作者<span className="accent">.</span></span></h1><p className="personal-tagline">{profile.tagline}</p><p className="hero-description">用设计建立鲜明表达。<br />用影像讲述值得记住的故事。</p><div className="hero-actions"><a href="/design" className="button button-dark">浏览设计作品 <ArrowUpRight size={18} /></a><a href="/video" className="text-link">观看视频 <ArrowUpRight size={18} /></a></div></div><figure className="personal-photo"><ResponsiveImage base="/media/profile/ren-shuo" alt="任硕个人照片" priority contain sizes="(max-width: 767px) 90vw, 38vw" /></figure></section>;
}
