/* Native document navigation intentionally provides a reliable global route entry. */
/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
export function ContactCTA() {
  return <section className="contact-cta dark-page section-pad"><div className="section-top"><span className="eyebrow">从一个想法开始</span><span className="eyebrow">一起将创意变为现实 ↗</span></div><h2>一起创造<br />出色的作品<span className="accent">.</span></h2><div className="cta-links"><Link href="/contact" className="button button-dark">联系我 <ArrowUpRight size={17} /></Link><a className="text-link" href={profile.resume} download>下载简历{profile.resumeIsTemplate ? "模板" : ""} <ArrowDown size={16} /></a></div></section>;
}
export function Footer() {
  return <footer className="site-footer"><a href="/" className="wordmark">{profile.name}<span className="brand-dot" /></a><p>以设计传达意图，以故事传递情绪。</p><div><a href={`mailto:${profile.email}`}>邮箱 <ArrowUpRight size={14} /></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#main-content">回到顶部 ↑</a></div></footer>;
}
