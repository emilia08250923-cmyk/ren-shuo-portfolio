import type { Metadata } from "next";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ContactForm } from "@/components/portfolio/contact-form";
export const metadata: Metadata = { title: "联系", description: "有项目、工作机会或创意想法？欢迎交流。", alternates: { canonical: "/contact" } };
export function ContactSection() { return <section id="contact" className="contact-page dark-page section-pad"><p className="eyebrow">联系与合作</p><h1>期待与你<br /><span className="serif-word">一起创作。</span><span className="accent">↗</span></h1><div className="contact-layout"><div className="contact-details"><h2>有项目、工作机会或创意想法？<br />欢迎交流。</h2><div><p className="eyebrow">邮箱</p><a className="email-link" href={`mailto:${profile.email}`}>{profile.email}<ArrowUpRight size={20} /></a></div><div className="contact-pair"><div><p className="eyebrow">电话</p><p>{profile.phone || "待添加"}</p></div><div><p className="eyebrow">微信</p><p>{profile.wechat || "待添加"}</p></div></div><div className="social-list">{profile.socials.map(s => s.url ? <a key={s.label} href={s.url} target="_blank" rel="noreferrer">{s.label} ↗</a> : <span key={s.label}>{s.label} <small>待添加</small></span>)}</div><a className="text-link" href={profile.resume} download>下载简历{profile.resumeIsTemplate ? "模板" : ""}<ArrowDown size={17} /></a></div><ContactForm /></div></section>; }

export default function ContactPage() { return <ContactSection />; }
