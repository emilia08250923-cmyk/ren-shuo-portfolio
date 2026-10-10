import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ResponsiveImage } from "./responsive-image";
import { Reveal } from "./motion";
export function Hero() {
  return <section className="home-hero"><div className="hero-meta"><span className="eyebrow">Independent creative portfolio / 2026</span><span className="availability"><i /> Open to opportunities</span></div><Reveal className="hero-title"><p className="eyebrow">{profile.name}</p><h1>Visual Designer<br /><span className="hero-amp">&amp;</span> Video Creator<span className="accent">.</span></h1></Reveal><div className="hero-bottom"><Reveal className="hero-intro" delay={.12}><p>{profile.tagline}</p><p className="hero-description">Thoughtful identities. <br />Compelling images. Stories that stay.</p><div className="hero-actions"><Link href="#selected-work" className="button button-dark">View selected works <ArrowDown size={16} /></Link><Link href="/about" className="text-link">About me <ArrowUpRight size={16} /></Link></div></Reveal><Reveal className="hero-art" delay={.2}><Link href="/design/form-shift" aria-label="Explore Form / Shift concept project"><ResponsiveImage base="/media/design/form-shift/cover" alt="Form / Shift — typographic concept artwork" priority sizes="(max-width: 767px) 90vw, 45vw" /><span className="hero-art-caption"><span>Featured concept / Form · Shift</span><ArrowUpRight size={18} /></span></Link></Reveal></div><div className="hero-footnote"><span>DESIGN WITH INTENTION. MOVE WITH PURPOSE.</span><span>SCROLL TO EXPLORE ↓</span></div></section>;
}

