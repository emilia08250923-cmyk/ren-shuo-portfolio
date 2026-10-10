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
  { id: "all", label: "全部" }, { id: "poster", label: "海报" }, { id: "banner", label: "Banner" },
  { id: "ip-design", label: "IP" }, { id: "app-icon", label: "App 图标" },
  { id: "launch-page", label: "启动页" }, { id: "typography", label: "字体设计" },
];
export const videoCategories = [
  { id: "all", label: "全部" }, { id: "comic-drama", label: "漫剧" },
  { id: "ai-live-action", label: "人工智能真人短剧" }, { id: "tvc", label: "电视广告" },
  { id: "game-promo", label: "游戏宣传片" }, { id: "promotion", label: "推广与种草" },
  { id: "short-film", label: "短片" }, { id: "entertainment", label: "娱乐短视频" },
];
export function categoryLabel(project: Pick<Project, "type" | "category">) {
  return (project.type === "design" ? designCategories : videoCategories).find(c => c.id === project.category)?.label ?? project.category;
}

const designSeed = [
  ["form-shift", "形态转换", "poster", "normal", "一组编辑风格海报实验，探索大字号、几何形态与留白之间的张力。"],
  ["objects-of-tomorrow", "未来物件", "app-icon", "showcase", "以日常物件与几何形态为起点，探索鲜明、简洁且易于识别的 App 图标视觉方向。"],
  ["soft-signal", "柔和信号", "ip-design", "showcase", "以角色为核心，探索柔和几何、亲切轮廓与富有趣味的视觉识别。"],
  ["type-in-motion", "文字律动", "typography", "normal", "通过节奏与重复，让文字本身成为视觉材料的字体实验。"],
  ["new-perspectives", "全新视角", "banner", "normal", "以模块化方式，将同一视觉创意延展至横向与纵向构图。"],
  ["open-form", "开放形态", "launch-page", "normal", "运用清晰网格、大标题和有序节奏，探索数字界面的视觉方向。"],
  ["quiet-garden", "静谧花园", "poster", "normal", "在有机形态、平面色彩与柔和对比之间寻找平衡的插画海报实验。"],
] as const;

const uploadedPosters: DesignProject[] = [1, 2, 3, 4, 7, 8, 9, 10].map((number, index) => ({
  id: 100 + number, slug: `poster-${String(number).padStart(2, "0")}`, title: `海报 ${index + 1}`,
  category: "poster", type: "design", year: "2026", demo: false, carouselType: "normal",
  cover: `/media/design/poster-${String(number).padStart(2, "0")}/cover`,
  description: "海报设计作品，点击图片可按原始比例放大查看。",
  role: ["海报设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/poster-${String(number).padStart(2, "0")}/cover`, alt: `海报 ${index + 1} 完整作品` }],
}));

const uploadedBanners: DesignProject[] = [1, 2, 3, 4, 6, 7, 8, 9].map((number, index) => ({
  id: 200 + number, slug: `banner-${String(number).padStart(2, "0")}`, title: `Banner ${index + 1}`,
  category: "banner", type: "design", year: "2026", demo: false, carouselType: "normal",
  cover: `/media/design/banner-${String(number).padStart(2, "0")}/cover`,
  description: "Banner 设计作品，点击图片可按原始比例放大查看。",
  role: ["Banner 设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/banner-${String(number).padStart(2, "0")}/cover`, alt: `Banner ${index + 1} 完整作品` }],
}));

const uploadedIPs: DesignProject[] = [1, 2, 3, 4, 5, 6].map((number, index) => ({
  id: 300 + number, slug: `ip-${String(number).padStart(2, "0")}`, title: `IP ${index + 1}`,
  category: "ip-design", type: "design", year: "", demo: false, carouselType: "normal", selected: index === 0,
  cover: `/media/design/ip-${String(number).padStart(2, "0")}/cover`,
  description: "IP 设计作品，点击图片可按原始比例放大查看。",
  role: ["IP 设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/ip-${String(number).padStart(2, "0")}/cover`, alt: `IP ${index + 1} 完整作品` }],
}));

const uploadedApps: DesignProject[] = [1, 2, 3].map((number, index) => ({
  id: 400 + number, slug: `app-icon-${String(number).padStart(2, "0")}`, title: `App 图标 ${index + 1}`,
  category: "app-icon", type: "design", year: "", demo: false, carouselType: "normal", selected: index === 0,
  cover: `/media/design/app-icon-${String(number).padStart(2, "0")}/cover`,
  description: "App 图标设计作品，点击图片可按原始比例放大查看。",
  role: ["App 图标设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/app-icon-${String(number).padStart(2, "0")}/cover`, alt: `App 图标 ${index + 1} 完整作品` }],
}));

export const projects: Project[] = [
  ...uploadedPosters,
  ...uploadedBanners,
  ...uploadedIPs,
  ...uploadedApps,
  ...designSeed.filter(item => item[2] !== "poster" && item[2] !== "banner" && item[2] !== "ip-design" && item[2] !== "app-icon").map(([slug, title, category, carouselType, description], index): DesignProject => ({
    id: index + 1, slug, title, category, carouselType, description, type: "design", year: "2026",
    cover: `/media/design/${slug}/cover`, selected: index < 4, demo: true,
    role: ["概念开发", "视觉指导", "视觉设计"], tools: ["Illustrator", "Photoshop"],
    images: ["01", "02", "03"].map((name, i) => ({ base: `/media/design/${slug}/${name}`, alt: `${title} — 概念构图 ${i + 1}` })),
    process: [
      { title: "创作方向", text: "从明确的视觉问题出发，确定字体与色彩方向。" },
      { title: "视觉探索", text: "在不同尺寸与媒介中，测试比例、间距和构图。" },
      { title: "视觉系统", text: "整合最有表现力的元素，形成统一的视觉语言。" },
    ],
  })),
  ...[
    { slug: "after-hours", title: "夜幕之后", category: "short-film", description: "探索城市入夜后氛围与情绪的短片概念。" },
    { slug: "beyond-the-frame", title: "画面之外", category: "tvc", description: "围绕光影、形态与运动关系展开的商业影像概念。" },
    { slug: "parallel-worlds", title: "平行世界", category: "ai-live-action", description: "通过电影视角探索陌生世界的人工智能影像概念。" },
  ].map((item, index): VideoProject => ({
    ...item, id: 20 + index, type: "video", year: "2026", duration: "—", demo: true, selected: index < 2,
    cover: `/media/video/${item.slug}/cover`, bilibiliUrl: "", role: ["概念策划", "创作方向", "剪辑"], tools: ["Premiere Pro", "After Effects"],
    process: [
      { title: "故事构思", text: "明确核心创意、情绪基调与叙事结构。" },
      { title: "制作", text: "先建立分镜与视觉参考，再推进制作。" },
      { title: "后期制作", text: "通过剪辑、声音与调色塑造影像节奏。" },
    ],
  })),
];

export function getProject(type: Project["type"], slug: string) { return projects.find(p => p.type === type && p.slug === slug); }
export function nextProject(project: Project) {
  const same = projects.filter(p => p.type === project.type);
  return same[(same.findIndex(p => p.slug === project.slug) + 1) % same.length];
}
