import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { categoryLabel, nextProject, type Project } from "@/data/projects";
import { DesignCarousel } from "./design-carousel";
import { BilibiliEmbed } from "./bilibili-embed";
import { ResponsiveImage } from "./responsive-image";
export function ProjectDetail({ project }: { project: Project }) {
  const next = nextProject(project);
  return <div className={project.type === "video" ? "dark-page" : "light-page"}><section className="project-hero section-pad"><Link href={`/${project.type}`} className="text-link"><ArrowLeft size={15} />Back to {project.type}</Link><div className="project-heading-row"><p className="eyebrow">{categoryLabel(project)} / {project.year}</p>{project.demo && <span className="content-note">Concept project · 示例项目，非个人履历</span>}</div><h1>{project.title}<span className="accent">.</span></h1><div className="project-information"><p className="project-description">{project.description}</p><dl><div><dt>Role</dt><dd>{project.role.join(" / ")}</dd></div><div><dt>Tools</dt><dd>{project.tools.join(" / ")}</dd></div>{project.type === "video" && <div><dt>Duration</dt><dd>{project.duration === "—" ? "To be added" : project.duration}</dd></div>}<div><dt>Year</dt><dd>{project.year}</dd></div></dl></div></section>
    {project.type === "design" ? <DesignCarousel images={project.images} type={project.carouselType} title={project.title} /> : <div className="section-pad film-detail-player"><BilibiliEmbed url={project.bilibiliUrl} bvid={project.bvid} cid={project.cid} cover={project.cover} title={project.title} /></div>}
    <section className="project-process section-pad"><div className="section-top"><p className="eyebrow">About the project</p><span className="eyebrow">The process / 01—03</span></div><div className="process-grid">{project.process.map((step, i) => <div key={step.title}><span className="eyebrow">0{i+1}</span><h2>{step.title}</h2><p>{step.text}</p></div>)}</div></section>
    <Link className="next-project section-pad" href={`/${next.type}/${next.slug}`}><div><span className="eyebrow">Next project</span><h2>{next.title}</h2><span className="text-link">Keep exploring <ArrowUpRight size={20} /></span></div><ResponsiveImage base={next.cover} alt={next.title} sizes="(max-width: 767px) 90vw, 35vw" /></Link>
  </div>;
}
