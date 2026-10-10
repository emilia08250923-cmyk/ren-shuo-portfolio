"use client";
import { motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px 0px -35px 0px" }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <MotionConfig reducedMotion="user"><motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .35 }}>{children}</motion.div></MotionConfig>;
}
