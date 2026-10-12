import assets from "@/data/tvc-1-assets.json";
import { DesignCarousel } from "@/components/portfolio/design-carousel";
export const metadata = {title: "TVC 1 · 资产"};
export default function AssetsPage() {
  return <main className="series-assets section-pad"><a className="text-link" href="/video/tvc-1">← 返回TVC 1</a><h1>TVC 1 · 资产</h1><nav className="series-toolbar" aria-label="资产分类"><a className="button" href="#script">剧本脚本</a><a className="button" href="#pictures">图片资产（10 张）</a></nav><section id="script"><div className="section-top"><h2>剧本脚本</h2><a className="button" href="/assets/tvc-1/script.docx" download="TVC 1-剧本脚本.docx">下载 Word 脚本 ↓</a></div><details className="script-preview"><summary>在线阅读剧本脚本</summary>{assets.script.map((line,i)=><p key={i}>{line}</p>)}</details></section><section id="pictures"><h2>图片资产</h2><DesignCarousel images={assets.images} title="TVC 1图片资产" /><div className="asset-index">{assets.images.map((item,i)=><span key={item.base}>{i+1}. {item.alt}</span>)}</div></section></main>;
}
