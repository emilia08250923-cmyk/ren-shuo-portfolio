export type ProjectImage = { base: string; alt: string };
type BaseProject = {
  id: number; slug: string; title: string; category: string; year: string;
  description: string; cover: string; role: string[]; tools: string[];
  selected?: boolean; demo?: boolean; process: { title: string; text: string }[];
};
export type DesignProject = BaseProject & { type: "design"; carouselType: "normal" | "showcase"; images: ProjectImage[] };
export type VideoProject = BaseProject & { type: "video"; duration: string; bilibiliUrl: string; bvid?: string; cid?: string };
export type Project = DesignProject | VideoProject;

export const designCategories = [
  { id: "all", label: "All" }, { id: "poster", label: "Poster" }, { id: "banner", label: "Banner" },
  { id: "ip-design", label: "IP Design" }, { id: "brand-identity", label: "VI / Brand Identity" },
  { id: "launch-page", label: "Launch Page" }, { id: "typography", label: "Typography" }, { id: "illustration", label: "Illustration" },
];
export const videoCategories = [
  { id: "all", label: "All" }, { id: "comic-drama", label: "Comic Drama" },
  { id: "ai-live-action", label: "AI Live-action Drama" }, { id: "tvc", label: "TVC" },
  { id: "game-promo", label: "Game Promo" }, { id: "promotion", label: "Promotion / Seeding" },
  { id: "short-film", label: "Short Film" }, { id: "entertainment", label: "Entertainment Short Video" },
];
export function categoryLabel(project: Pick<Project, "type" | "category">) {
  return (project.type === "design" ? designCategories : videoCategories).find(c => c.id === project.category)?.label ?? project.category;
}

const designSeed = [
  ["form-shift", "Form / Shift", "poster", "normal", "An editorial poster study exploring tension between oversized type, geometric forms, and negative space."],
  ["objects-of-tomorrow", "Objects of Tomorrow", "brand-identity", "showcase", "A concept identity system built around everyday objects and a confident, adaptable typographic language."],
  ["soft-signal", "Soft Signal", "ip-design", "showcase", "A character-led visual study of soft geometry, friendly silhouettes, and a playful identity system."],
  ["type-in-motion", "Type in Motion", "typography", "normal", "A typographic exploration of rhythm and repetition, where the written word becomes a visual material."],
  ["new-perspectives", "New Perspectives", "banner", "normal", "A modular campaign study connecting a single visual idea across wide and tall compositions."],
  ["open-form", "Open Form", "launch-page", "normal", "A digital art-direction concept using a clear grid, oversized headlines, and a deliberate visual rhythm."],
  ["quiet-garden", "Quiet Garden", "illustration", "normal", "An illustration study balancing organic forms, flat color, and gentle contrasts."],
] as const;

export const projects: Project[] = [
  ...designSeed.map(([slug, title, category, carouselType, description], index): DesignProject => ({
    id: index + 1, slug, title, category, carouselType, description, type: "design", year: "2026",
    cover: `/media/design/${slug}/cover`, selected: index < 4, demo: true,
    role: ["Concept development", "Art direction", "Visual design"], tools: ["Illustrator", "Photoshop"],
    images: ["01", "02", "03"].map((name, i) => ({ base: `/media/design/${slug}/${name}`, alt: `${title} — concept composition ${i + 1}` })),
    process: [
      { title: "Direction", text: "Start with a focused visual question and establish a typographic and color direction." },
      { title: "Exploration", text: "Test scale, spacing, and composition across a range of formats." },
      { title: "System", text: "Bring the strongest elements together as a coherent visual language." },
    ],
  })),
  ...[
    { slug: "after-hours", title: "After Hours", category: "short-film", description: "A film concept exploring the atmosphere of a city after dark." },
    { slug: "beyond-the-frame", title: "Beyond the Frame", category: "tvc", description: "A commercial concept built around the interplay of light, form, and movement." },
    { slug: "parallel-worlds", title: "Parallel Worlds", category: "ai-live-action", description: "An AI film concept examining unfamiliar worlds through a cinematic lens." },
  ].map((item, index): VideoProject => ({
    ...item, id: 20 + index, type: "video", year: "2026", duration: "—", demo: true, selected: index < 2,
    cover: `/media/video/${item.slug}/cover`, bilibiliUrl: "", role: ["Concept", "Direction", "Editing"], tools: ["Premiere Pro", "After Effects"],
    process: [
      { title: "Story", text: "Define the central idea, emotional tone, and narrative structure." },
      { title: "Production", text: "Develop a storyboard and visual references before moving into production." },
      { title: "Post-production", text: "Shape the rhythm through editing, sound, and color." },
    ],
  })),
];

export function getProject(type: Project["type"], slug: string) { return projects.find(p => p.type === type && p.slug === slug); }
export function nextProject(project: Project) {
  const same = projects.filter(p => p.type === project.type);
  return same[(same.findIndex(p => p.slug === project.slug) + 1) % same.length];
}
