import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { categoryLabel, nextProject, type Project } from "@/data/projects";
import { DesignCarousel } from "./design-carousel";
import { BilibiliEmbed } from "./bilibili-embed";
import { ResponsiveImage } from "./responsive-image";
export function ProjectDetail({ project }: { project: Project }) {
  const next = nextProject(project);
  return <div className={project.type === "video" ? "dark-page" : "light-page"}><section className="project-hero section-pad"><Link href={`/${project.type}`} className="text-link"><ArrowLeft size={15} />返回{project.type === "design" ? "设计作品" : "视频作品"}</Link><div className="project-heading-row"><p className="eyebrow">{categoryLabel(project)} / {project.year}</p>{project.demo && <span className="content-note">概念项目 · 示例项目，非个人履历</span>}</div><h1>{project.title}<span className="accent">.</span></h1><div className="project-information"><p className="project-description">{project.description}</p><dl><div><dt>创作职责</dt><dd>{project.role.join(" / ")}</dd></div><div><dt>制作工具</dt><dd>{project.tools.join(" / ")}</dd></div>{project.type === "video" && <div><dt>片长</dt><dd>{project.duration === "—" ? "待补充" : project.duration}</dd></div>}<div><dt>年份</dt><dd>{project.year}</dd></div></dl></div></section>
    {project.type === "design" ? <DesignCarousel images={project.images} type={project.carouselType} title={project.title} /> : <div className="section-pad film-detail-player"><BilibiliEmbed url={project.bilibiliUrl} bvid={project.bvid} cid={project.cid} cover={project.cover} title={project.title} /></div>}
    <section className="project-process section-pad"><div className="section-top"><p className="eyebrow">项目创作说明</p><span className="eyebrow">创作过程 / 01—03</span></div><div className="process-grid">{project.process.map((step, i) => <div key={step.title}><span className="eyebrow">0{i+1}</span><h2>{step.title}</h2><p>{step.text}</p></div>)}</div></section>
    <Link className="next-project section-pad" href={`/${next.type}/${next.slug}`}><div><span className="eyebrow">下一个项目</span><h2>{next.title}</h2><span className="text-link">继续浏览 <ArrowUpRight size={20} /></span></div><ResponsiveImage base={next.cover} alt={next.title} sizes="(max-width: 767px) 90vw, 35vw" /></Link>
  </div>;
}
