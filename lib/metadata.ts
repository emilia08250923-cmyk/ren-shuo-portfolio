import type { Metadata } from "next";
import { profile, siteOrigin } from "@/data/profile";
import { mediaUrl } from "@/lib/media";
import { type Project } from "@/data/projects";
export function projectMetadata(project: Project): Metadata {
  const image = mediaUrl(project.cover);
  const title = `${project.title} — ${profile.name}`;
  const description = `${project.demo ? "Concept example. " : ""}${project.description}`;
  return { title: { absolute: title }, description, alternates: { canonical: `/${project.type}/${project.slug}` }, openGraph: { title, description, url: `${siteOrigin}/${project.type}/${project.slug}`, type: "article", images: image ? [{ url: new URL(image, siteOrigin).toString(), alt: project.title }] : [] }, twitter: { card: "summary_large_image", title, description, images: image ? [new URL(image, siteOrigin).toString()] : [] } };
}
