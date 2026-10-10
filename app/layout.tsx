/* The shared app layout loads this font on every route. */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { profile, siteOrigin } from "@/data/profile";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { PageTransition } from "@/components/portfolio/motion";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: { default: `${profile.name} — 视觉设计师与视频创作者`, template: `%s — ${profile.name}` },
  description: "视觉设计、动态影像、故事表达与创意制作。探索品牌识别、设计作品与视频创作。",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "zh_CN", siteName: profile.name, title: `${profile.name} — 视觉设计师与视频创作者`, description: profile.tagline, images: [{ url: "/media/design/form-shift/cover-1440.webp", width: 1440, height: 1080, alt: "Foldcraft — 形态转换概念作品" }] },
  twitter: { card: "summary_large_image", title: `${profile.name} — 视觉设计师与视频创作者`, description: profile.tagline, images: ["/media/design/form-shift/cover-1440.webp"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" /></head><body><a href="#main-content" className="skip-link">跳转至主要内容</a><Navbar /><main id="main-content"><PageTransition>{children}</PageTransition></main><Footer /></body></html>;
}
