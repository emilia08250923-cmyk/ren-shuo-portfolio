/* Native document navigation intentionally provides a reliable global route entry. */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { profile } from "@/data/profile";
const links = [{ label: "首页", href: "/" }, { label: "设计", href: "/design" }, { label: "视频", href: "/video" }, { label: "关于", href: "/about" }, { label: "联系", href: "/about#contact" }];
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <a href="/" className="wordmark" aria-label={`${profile.name}首页`}>{profile.name}<span className="brand-dot" /></a>
    <nav aria-label="主导航" className="desktop-nav">{links.map(link => <a key={link.href} href={link.href} aria-current={(link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "page" : undefined}>{link.label}</a>)}<a href={profile.resume} download title={profile.resumeIsTemplate ? "下载简历模板（示例）" : "下载 PDF 简历"} className="resume-link">简历 <ArrowDown size={14} />{profile.resumeIsTemplate && <span className="sample-tag">示例</span>}</a></nav>
    <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild><button className="mobile-nav-trigger" aria-label="打开导航"><Menu size={22} /></button></DialogTrigger>
      <DialogContent showCloseButton={false} className="mobile-navigation">
        <DialogTitle className="wordmark">{profile.name}<span className="brand-dot" /></DialogTitle><DialogDescription className="sr-only">主导航</DialogDescription>
        <DialogClose className="menu-close" aria-label="关闭导航"><X /></DialogClose>
        <nav aria-label="手机导航">{links.map((link, i) => <a key={link.href} href={link.href} onClick={() => setOpen(false)}><span className="eyebrow">0{i + 1}</span>{link.label}<ArrowUpRight /></a>)}<a href={profile.resume} download onClick={() => setOpen(false)}>简历 <ArrowDown />{profile.resumeIsTemplate && <span className="sample-tag">示例</span>}</a></nav>
      </DialogContent>
    </Dialog>
  </header>;
}
