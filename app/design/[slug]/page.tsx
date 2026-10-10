import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectDetail } from "@/components/portfolio/project-detail";
import { projectMetadata } from "@/lib/metadata";
export function generateStaticParams() { return projects.filter(p => p.type === "design").map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const project = getProject("design", (await params).slug); return project ? projectMetadata(project) : { title: "项目未找到" }; }
export default async function DesignProjectPage({ params }: { params: Promise<{ slug: string }> }) { const project = getProject("design", (await params).slug); if (!project) notFound(); return <ProjectDetail project={project} />; }
