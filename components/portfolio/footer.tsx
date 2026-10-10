import Link from "next/link";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
export function ContactCTA() {
  return <section className="contact-cta dark-page section-pad"><div className="section-top"><span className="eyebrow">Have something in mind?</span><span className="eyebrow">Let&apos;s make it happen ↗</span></div><h2>LET&apos;S CREATE<br />SOMETHING GREAT<span className="accent">.</span></h2><div className="cta-links"><Link href="/contact" className="button button-dark">Contact me <ArrowUpRight size={17} /></Link><a className="text-link" href={profile.resume} download>Download resume{profile.resumeIsTemplate ? " template" : ""} <ArrowDown size={16} /></a></div></section>;
}
export function Footer() {
  return <footer className="site-footer"><Link href="/" className="wordmark">{profile.name}<span className="brand-dot" /></Link><p>Design with intention. Stories with feeling.</p><div><a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={14} /></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#main-content">Top ↑</a></div></footer>;
}
