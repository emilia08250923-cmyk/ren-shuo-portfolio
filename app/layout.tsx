import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Foldcraft — Brand & Visual Storytelling",
  description: "Shaping visual narratives, one pixel at a time. Turning vision into reality through craft, motion, and an endless pursuit of beauty.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </head><body className="antialiased">{children}</body></html>;
}
