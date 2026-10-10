import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import { categoryLabel, type Project } from "@/data/projects";
import { ResponsiveImage } from "./responsive-image";
export function ProjectCard({ project, index = 0, priority = false }: { project: Project; index?: number; priority?: boolean }) {
  return <Link className={`project-card ${project.type === "video" ? "video-card" : "design-card"}`} href={`/${project.type}/${project.slug}`}>
    <div className="project-cover"><ResponsiveImage base={project.cover} alt={`${project.title} — ${categoryLabel(project)}${project.demo ? " concept example" : ""}`} priority={priority} /><span className="project-index">{String(index + 1).padStart(2, "0")}</span>{project.demo && <span className="project-demo">Concept / 示例</span>}<span className="project-hover">{project.type === "video" ? <Play size={16} fill="currentColor" /> : <ArrowUpRight size={18} />}{project.type === "video" ? "View film" : "View project"}</span>{project.type === "video" && <span className="video-play"><Play size={22} fill="currentColor" /></span>}</div>
    <div className="project-caption"><div><h3><span className="catalog-number">{String(index + 1).padStart(2, "0")}</span>{project.title}</h3><p>{categoryLabel(project)}{project.type === "video" && project.duration !== "—" ? ` / ${project.duration}` : ""}</p><p className="editorial-description">{project.description}</p></div><span>{project.year}<ArrowUpRight size={17} /></span></div>
  </Link>;
}
