export type ProjectImage = { base: string; alt: string };
type BaseProject = {
  id: number; slug: string; title: string; category: string; year: string;
  description: string; cover: string; role: string[]; tools: string[];
  selected?: boolean; demo?: boolean; process: { title: string; text: string }[];
};
export type DesignProject = BaseProject & { type: "design"; carouselType: "normal" | "showcase"; images: ProjectImage[] };
export type VideoProject = BaseProject & { type: "video"; duration: string; bilibiliUrl: string; bvid?: string; cid?: string; episodes?: { title: string; bvid: string }[]; assetsUrl?: string };
export type Project = DesignProject | VideoProject;

export const designCategories = [
  { id: "all", label: "全部" }, { id: "poster", label: "海报" }, { id: "banner", label: "Banner" },
  { id: "ip-design", label: "IP" }, { id: "app-icon", label: "App 图标" },
  { id: "launch-page", label: "启动页" }, { id: "typography", label: "字体设计" },
];
export const videoCategories = [{ id: "all", label: "全部" }];
export function categoryLabel(project: Pick<Project, "type" | "category">) {
  if (project.type === "video") return "视频作品";
  return (project.type === "design" ? designCategories : videoCategories).find(c => c.id === project.category)?.label ?? project.category;
}

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

const uploadedLaunchPages: DesignProject[] = [1, 2, 3].map((number, index) => ({
  id: 500 + number, slug: `launch-page-${String(number).padStart(2, "0")}`, title: `启动页 ${index + 1}`,
  category: "launch-page", type: "design", year: "", demo: false, carouselType: "normal", selected: index === 0,
  cover: `/media/design/launch-page-${String(number).padStart(2, "0")}/cover`,
  description: "启动页设计作品，点击图片可按原始比例放大查看。",
  role: ["启动页设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/launch-page-${String(number).padStart(2, "0")}/cover`, alt: `启动页 ${index + 1} 完整作品` }],
}));

const uploadedFonts: DesignProject[] = [1, 2, 3].map((number, index) => ({
  id: 600 + number, slug: `typography-${String(number).padStart(2, "0")}`, title: `字体设计 ${index + 1}`,
  category: "typography", type: "design", year: "", demo: false, carouselType: "normal", selected: index === 0,
  cover: `/media/design/typography-${String(number).padStart(2, "0")}/cover`,
  description: "字体设计设计作品，点击图片可按原始比例放大查看。",
  role: ["字体设计设计"], tools: ["待补充"], process: [],
  images: [{ base: `/media/design/typography-${String(number).padStart(2, "0")}/cover`, alt: `字体设计 ${index + 1} 完整作品` }],
}));

export const projects: Project[] = [
  { id: 709, slug: "tvc-4", title: "TVC 4", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/tvc-4/cover", description: "TVC 4。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Bwpe6JEhC/", bvid: "BV1Bwpe6JEhC", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1Bwpe6JEhC"}], assetsUrl: "/video/tvc-4/assets"
  },
  { id: 710, slug: "ootd", title: "ootd", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/ootd/cover", description: "ootd。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV17wpe6JEQY/", bvid: "BV17wpe6JEQY", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV17wpe6JEQY"}], assetsUrl: "/video/ootd/assets"
  },
  { id: 708, slug: "tvc-3", title: "TVC 3", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/tvc-3/cover", description: "TVC 3。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Bwpe6JErA/", bvid: "BV1Bwpe6JErA", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1Bwpe6JErA"}], assetsUrl: "/video/tvc-3/assets"
  },
  { id: 707, slug: "tvc-2", title: "TVC 2", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/tvc-2/cover", description: "TVC 2。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1fwpe6EEcw/", bvid: "BV1fwpe6EEcw", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1fwpe6EEcw"}], assetsUrl: "/video/tvc-2/assets"
  },
  { id: 706, slug: "tvc-1", title: "TVC 1", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/tvc-1/cover", description: "TVC 1。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1copY6XE3F/", bvid: "BV1copY6XE3F", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1copY6XE3F"}], assetsUrl: "/video/tvc-1/assets"
  },
  { id: 705, slug: "xiang-feng", title: "相逢", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/xiang-feng/cover", description: "相逢。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1FfpY6HE3k/", bvid: "BV1FfpY6HE3k", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1FfpY6HE3k"}], assetsUrl: "/video/xiang-feng/assets"
  },
  { id: 704, slug: "niu-tou-ren", title: "牛头人", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/niu-tou-ren/cover", description: "牛头人。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1zfpY6HE2Q/", bvid: "BV1zfpY6HE2Q", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1zfpY6HE2Q"}], assetsUrl: "/video/niu-tou-ren/assets"
  },
  { id: 703, slug: "hun-yin-bei-pan", title: "婚姻背叛", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/hun-yin-bei-pan/cover", description: "婚姻背叛。可在站内观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1FfpY6HEaA/", bvid: "BV1FfpY6HEaA", role: [], tools: [], process: [],
    episodes: [{title: "正片", bvid: "BV1FfpY6HEaA"}], assetsUrl: "/video/hun-yin-bei-pan/assets"
  },
  { id: 702, slug: "yue-jie-guan-xi", title: "越界关系", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/yue-jie-guan-xi/cover", description: "越界关系 · 第 1 集、第 2 集。可在站内选集观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1y8pe6FE1Y/", bvid: "BV1y8pe6FE1Y", role: [], tools: [], process: [],
    episodes: [{title: "第 1 集", bvid: "BV1y8pe6FE1Y"}, {title: "第 2 集", bvid: "BV1y8pe6FEqv"}], assetsUrl: "/video/yue-jie-guan-xi/assets"
  },
  { id: 701, slug: "heart", title: "Heart", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/heart/cover", description: "Heart · 第 1 集、第 2 集。可在站内选集观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1y8pe6FEmr/", bvid: "BV1y8pe6FEmr", role: [], tools: [], process: [],
    episodes: [{title: "第 1 集", bvid: "BV1y8pe6FEmr"}, {title: "第 2 集", bvid: "BV1s8pe6cEDy"}], assetsUrl: "/video/heart/assets"
  },
  { id: 700, slug: "chuan-yue-fan-pai", title: "穿越反派", category: "all", type: "video", year: "", duration: "—", demo: false,
    cover: "/media/video/chuan-yue-fan-pai/cover", description: "漫剧《穿越反派》· 第 1 集、第 2 集。可在站内选集观看，并浏览剧本与图片资产。",
    bilibiliUrl: "https://www.bilibili.com/video/BV1Ntpe6aEfx/", bvid: "BV1Ntpe6aEfx", role: ["待补充"], tools: ["待补充"], process: [],
    episodes: [{title: "第 1 集", bvid: "BV1Ntpe6aEfx"}, {title: "第 2 集", bvid: "BV1Cape6ZEJ2"}], assetsUrl: "/video/chuan-yue-fan-pai/assets"
  },
  ...uploadedPosters,
  ...uploadedBanners,
  ...uploadedIPs,
  ...uploadedApps,
  ...uploadedLaunchPages,
  ...uploadedFonts,
  ...[
    { slug: "after-hours", title: "夜幕之后", category: "short-film", description: "探索城市入夜后氛围与情绪的短片概念。" },
    { slug: "beyond-the-frame", title: "画面之外", category: "tvc", description: "围绕光影、形态与运动关系展开的商业影像概念。" },
    { slug: "parallel-worlds", title: "平行世界", category: "ai-live-action", description: "通过电影视角探索陌生世界的人工智能影像概念。" },
  ].map((item, index): VideoProject => ({
    ...item, category: "all", id: 20 + index, type: "video", year: "2026", duration: "—", demo: true, selected: index < 2,
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
