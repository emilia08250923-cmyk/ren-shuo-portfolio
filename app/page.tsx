"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X, Pause, Play } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
const videoUrl = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4";
const contact = "mailto:3067382469@qq.com";
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [panel, setPanel] = useState<"projects" | "studio" | null>(null);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileMenuOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && index === 0) { event.preventDefault(); items.at(-1)?.focus(); }
        if (!event.shiftKey && index === items.length - 1) { event.preventDefault(); items[0]?.focus(); }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const close = () => { if (query.matches) setMobileMenuOpen(false); };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, destination: "home" | "projects" | "studio") => {
    event.preventDefault(); setMobileMenuOpen(false);
    if (destination !== "home") setPanel(destination);
  };
  const links = (mobile = false) => <>
    {(["Home", "Projects", "Studio"] as const).map(label => <a key={label} href={`#${label.toLowerCase()}`} onClick={event => navigate(event, label.toLowerCase() as "home" | "projects" | "studio")} className={mobile ? "text-3xl font-medium text-white/90 transition-colors hover:text-white" : "text-sm text-white/80 transition-colors hover:text-white"}>{label}</a>)}
    <a href={contact} onClick={() => setMobileMenuOpen(false)} className={mobile ? "text-3xl font-medium text-white/90 hover:text-white" : "text-sm text-white/80 transition-colors hover:text-white"}>Reach Us</a>
  </>;
  return (
    <main id="home" className="hero relative h-screen w-full overflow-hidden bg-black font-geist text-white">
      <video ref={videoRef} autoPlay muted loop playsInline aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-[70%_center]" src={videoUrl} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
      <header className="relative z-30 flex h-20 items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-14 lg:gap-20">
          <a href="#home" className="text-lg font-semibold tracking-tight text-white sm:text-xl" onClick={() => setMobileMenuOpen(false)}>Foldcraft</a>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">{links()}</nav>
        </div>
        <a href={contact} className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:block">Let&apos;s Talk</a>
        <button ref={toggleRef} type="button" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu" onClick={() => setMobileMenuOpen(open => !open)} className="relative z-50 flex size-10 items-center justify-center transition-transform active:scale-90 md:hidden">
          <Menu className={`absolute size-6 transition-all duration-300 ${mobileMenuOpen ? "rotate-90 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
          <X className={`absolute size-6 transition-all duration-300 ${mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-75 opacity-0"}`} />
        </button>
      </header>
      <div id="mobile-menu" ref={menuRef} aria-hidden={!mobileMenuOpen} inert={!mobileMenuOpen} className={`mobile-overlay absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${mobileMenuOpen ? "h-screen opacity-100" : "pointer-events-none h-0 opacity-0"}`}>
        <nav aria-label="Mobile navigation" className={`flex h-full flex-col justify-center gap-7 px-8 transition-all delay-100 duration-500 ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          {links(true)}
          <a href={contact} onClick={() => setMobileMenuOpen(false)} className="mt-6 w-fit rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform hover:scale-105">Let&apos;s Talk</a>
        </nav>
      </div>
      <section aria-label="Introduction" inert={mobileMenuOpen} className="hero-content relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 animate-[fadeSlideUp_0.8s_ease_0.2s_both] text-xs text-white/90 sm:mb-6 sm:text-sm">Brand &amp; Visual Storytelling</p>
          <h1 className="animate-[fadeSlideUp_0.8s_ease_0.4s_both] text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">Shaping visual<br />narratives,<br />one pixel at a time.</h1>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="mb-5 max-w-sm animate-[fadeSlideUp_0.8s_ease_0.7s_both] text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">Turning vision into reality through craft, motion, and an endless pursuit of beauty.</p>
            <button type="button" onClick={() => setPanel("projects")} className="inline-flex animate-[fadeSlideUp_0.8s_ease_0.9s_both] items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3">Explore Work <ArrowRight size={16} /></button>
          </div>
          <button type="button" aria-label={paused ? "Play background video" : "Pause background video"} onClick={() => { const video = videoRef.current; if (!video) return; if (paused) void video.play().then(() => setPaused(false)).catch(() => {}); else { video.pause(); setPaused(true); } }} className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white/80 transition-colors hover:bg-white/15">{paused ? <Play size={16} /> : <Pause size={16} />}</button>
        </div>
      </section>
      <Dialog open={panel !== null} onOpenChange={open => { if (!open) setPanel(null); }}>
        <DialogContent className="border-white/15 bg-[#111] font-geist text-white sm:max-w-3xl">
          <DialogTitle className="text-2xl font-medium tracking-tight">{panel === "projects" ? "Motion & visual storytelling" : "The studio"}</DialogTitle>
          <DialogDescription className="text-base leading-relaxed text-white/60">{panel === "projects" ? "A study in form, light, and movement." : "Turning vision into reality through craft, motion, and an endless pursuit of beauty."}</DialogDescription>
          {panel === "projects" ? <video src={videoUrl} controls autoPlay muted loop playsInline className="mt-2 aspect-video w-full rounded-lg bg-black object-cover" /> : <p className="py-6 text-3xl font-medium leading-tight tracking-tight">Shaping visual narratives,<br />one pixel at a time.</p>}
          <a href={contact} className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black">Let&apos;s Talk <ArrowRight size={16} /></a>
        </DialogContent>
      </Dialog>
    </main>
  );
}
