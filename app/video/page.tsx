import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectGrid } from "@/components/portfolio/project-grid";
import { ContactCTA } from "@/components/portfolio/footer";
export const metadata: Metadata = { title: "视频", description: "短片、商业影像、故事表达与动态设计作品。", alternates: { canonical: "/video" } };
export default function VideoPage() { return <><section className="work-index dark-page section-pad"><div className="index-title"><div><p className="eyebrow">动态影像档案 / 2026</p><h1>动态<br />影像<span className="accent">.</span></h1></div><p>短片 / 商业影像<br />故事表达 / 动态设计</p></div><p className="content-note index-note">已收录《遗城觉醒（游戏宣传）》《真人格斗（游戏）》《ootd》《TVC 4》《TVC 3》《TVC 2》《TVC 1》《相逢》《牛头人》《婚姻背叛》《越界关系》《Heart》《穿越反派》，支持站内观看与资产浏览；概念项目标有「概念 / 示例」。</p><ProjectGrid type="video" projects={projects.filter(p => p.type === "video")} /></section><ContactCTA /></>; }
