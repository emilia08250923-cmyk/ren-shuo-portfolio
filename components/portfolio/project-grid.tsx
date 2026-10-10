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
  return <><div className="category-filter" role="group" aria-label={`${type} categories`}>{categories.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}>{item.label}<sup>{item.id === "all" ? projects.length : projects.filter(p => p.category === item.id).length}</sup></button>)}</div><p className="sr-only" role="status">{visible.length} projects</p>
    <motion.div layout className={`projects-grid archive-grid ${type}-archive`}><AnimatePresence mode="popLayout">{visible.map((project, index) => <motion.div layout key={project.slug} initial={{ opacity: 0, y: reduced ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .35 }}><ProjectCard project={project} index={index} priority={index < 2} /></motion.div>)}</AnimatePresence></motion.div>
    {!visible.length && <div className="empty-projects"><h2>A new story, coming soon.</h2><p>No projects in this category yet.</p><button className="text-link" onClick={() => setCategory("all")}>View all projects ↗</button></div>}
  </>;
}
