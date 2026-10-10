"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { profile } from "@/data/profile";
const links = [{ label: "Home", href: "/" }, { label: "Design", href: "/design" }, { label: "Video", href: "/video" }, { label: "About", href: "/about" }, { label: "Contact", href: "/contact" }];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <Link href="/" className="wordmark" aria-label={`${profile.name} home`}>{profile.name}<span className="brand-dot" /></Link>
    <nav aria-label="Main navigation" className="desktop-nav">{links.map(link => <Link key={link.href} href={link.href} aria-current={(link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "page" : undefined}>{link.label}</Link>)}<a href={profile.resume} download title={profile.resumeIsTemplate ? "Download resume template (sample)" : "Download PDF resume"} className="resume-link">Resume <ArrowDown size={14} />{profile.resumeIsTemplate && <span className="sample-tag">Sample</span>}</a></nav>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="mobile-nav-trigger" aria-label="Open navigation"><Menu size={22} /></button></DialogTrigger>
      <DialogContent showCloseButton={false} className="mobile-navigation">
        <DialogTitle className="wordmark">{profile.name}<span className="brand-dot" /></DialogTitle><DialogDescription className="sr-only">Main navigation</DialogDescription>
        <DialogClose className="menu-close" aria-label="Close navigation"><X /></DialogClose>
        <nav aria-label="Mobile navigation">{links.map((link, i) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}><span className="eyebrow">0{i + 1}</span>{link.label}<ArrowUpRight /></Link>)}<a href={profile.resume} download onClick={() => setOpen(false)}>Resume <ArrowDown />{profile.resumeIsTemplate && <span className="sample-tag">Sample</span>}</a></nav>
      </DialogContent>
    </Dialog>
  </header>;
}
