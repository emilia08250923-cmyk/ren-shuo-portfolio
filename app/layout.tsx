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
  title: { default: `${profile.name} — Visual Designer & Video Creator`, template: `%s — ${profile.name}` },
  description: "Design, motion, storytelling, and creative production. Explore visual identities, design projects, and moving-image work.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_US", siteName: profile.name, title: `${profile.name} — Visual Designer & Video Creator`, description: profile.tagline, images: [{ url: "/media/design/form-shift/cover-1440.webp", width: 1440, height: 1080, alt: "Foldcraft — Form / Shift concept" }] },
  twitter: { card: "summary_large_image", title: `${profile.name} — Visual Designer & Video Creator`, description: profile.tagline, images: ["/media/design/form-shift/cover-1440.webp"] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" /></head><body><a href="#main-content" className="skip-link">Skip to content</a><Navbar /><main id="main-content"><PageTransition>{children}</PageTransition></main><Footer /></body></html>;
}
