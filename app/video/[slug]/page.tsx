import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectDetail } from "@/components/portfolio/project-detail";
import { projectMetadata } from "@/lib/metadata";
export function generateStaticParams() { return projects.filter(p => p.type === "video").map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const project = getProject("video", (await params).slug); return project ? projectMetadata(project) : { title: "Project not found" }; }
export default async function VideoProjectPage({ params }: { params: Promise<{ slug: string }> }) { const project = getProject("video", (await params).slug); if (!project) notFound(); return <ProjectDetail project={project} />; }
