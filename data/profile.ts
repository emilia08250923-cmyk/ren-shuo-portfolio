export const profile = {
  name: "任硕",
  role: "视觉设计师与视频创作者",
  tagline: "视觉设计 · 动态影像 · 故事表达 · 创意制作",
  email: "3067382469@qq.com",
  phone: "13521438116",
  wechat: "w3067382469",
  location: "期待创意合作与工作机会",
  bio: "我在视觉设计与动态影像的交汇处展开创作，探索如何通过品牌、字体与叙事，将想法转化为可被感知的视觉体验。",
  bioIsDraft: false,
  portrait: "/media/profile/ren-shuo",
  resume: "/resume/ren-shuo-resume.pdf",
  resumeIsTemplate: false,
  contactApi: "",
  showreel: { cover: "/media/video/after-hours/cover", bilibiliUrl: "", bvid: "", cid: "" },
  experience: [] as { company: string; position: string; year: string; description: string }[],
  education: [] as { school: string; major: string; year: string }[],
  tools: ["Photoshop", "Illustrator", "After Effects", "Premiere Pro", "Figma", "人工智能创作流程"],
  socials: [
    { label: "LinkedIn", url: "" }, { label: "Behance", url: "" },
    { label: "哔哩哔哩", url: "" }, { label: "小红书", url: "" },
  ],
};

export const capabilities = {
  design: ["海报", "Banner", "IP", "App 图标", "启动页", "字体设计"],
  video: ["漫剧", "人工智能真人短剧", "电视广告", "游戏宣传片", "推广与种草", "短片", "娱乐短视频"],
};

export const siteOrigin = "https://foldcraft-studio.emilia08250923.chatgpt.site";
