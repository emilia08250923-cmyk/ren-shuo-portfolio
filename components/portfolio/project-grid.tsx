"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { designCategories, videoCategories, type Project } from "@/data/projects";
import { ProjectCard } from "./project-card";
export function ProjectGrid({ projects, type }: { projects: Project[]; type: Project["type"] }) {
  const [category, setCategory] = useState("all");
  const reduced = useReducedMotion();
  const visible = projects.filter(project => category === "all" || project.category === category);
  const categories = type === "design" ? designCategories : videoCategories;
  return <><div className="category-filter" role="group" aria-label={`${type === "design" ? "设计" : "视频"}作品分类`}>{categories.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}<sup>{item.id === "all" ? projects.length : projects.filter(p => p.category === item.id).length}</sup></button>)}</div><p className="sr-only" role="status">共 {visible.length} 个作品</p>
    <motion.div layout className={`projects-grid archive-grid ${type}-archive`}><AnimatePresence mode="popLayout">{visible.map((project, index) => <motion.div layout key={project.slug} initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35 }}><ProjectCard project={project} index={index} priority={index < 2} />{project.type === "video" && project.assetsUrl && <a className="button series-card-assets" href={project.assetsUrl}>资产 ↗</a>}</motion.div>)}</AnimatePresence></motion.div>
    {!visible.length && <div className="empty-projects"><h2>新的作品，即将呈现。</h2><p>此分类暂无作品。</p><button className="text-link" onClick={() => setCategory("all")}>浏览全部作品 ↗</button></div>}
  </>;
}
