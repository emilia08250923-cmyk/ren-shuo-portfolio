import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ResponsiveImage } from "./responsive-image";
export function Portrait({ className = "" }: { className?: string }) {
  return <div className={`portrait ${className}`}>{profile.portrait ? <ResponsiveImage base={profile.portrait} alt={profile.name} sizes="(max-width: 767px) 90vw, 40vw" /> : <><div className="portrait-mark" aria-hidden="true">f<span>↗</span></div><span className="eyebrow">A person behind the pixels.</span><span className="portrait-placeholder">Portrait to be added / 待添加个人照片</span></>}</div>;
}
export function AboutPreview() {
  return <section className="about-preview section-pad"><Portrait /><div><p className="eyebrow">A little about me</p><h2>I CREATE VISUAL EXPERIENCES ACROSS DESIGN AND MOVING IMAGE.</h2><p>{profile.bio}</p>{profile.bioIsDraft && <span className="content-note">简介示例 · 待替换为个人介绍</span>}<Link href="/about" className="text-link">View about <ArrowUpRight size={17} /></Link></div></section>;
}
