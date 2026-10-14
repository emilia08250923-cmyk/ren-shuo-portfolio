import { videoAssets } from '@/data/video-assets';
import type { VideoProject } from '@/data/projects';
import { DesignCarousel } from './design-carousel';
export function VideoAssets({project}: {project: VideoProject}) {
  const assets = videoAssets[project.slug];
  if (!assets) return null;
  return <section className="series-assets inline-video-assets section-pad" aria-label={`${project.title}制作资产`}>
    <h2>制作资产</h2>
    <section id="script"><div className="section-top"><h2>剧本脚本</h2><a className="button" href={`/assets/${project.slug}/script.docx`} download={`${project.title}-剧本脚本.docx`}>下载 Word 脚本 ↓</a></div>
      <details className="script-preview"><summary>在线阅读剧本脚本</summary>{assets.script.map((line,index)=><p key={index}>{line}</p>)}</details>
    </section>
    <section id="pictures"><h2>图片资产</h2><DesignCarousel images={assets.images} title={`${project.title}图片资产`} />
      <div className="asset-index">{assets.images.map((image,index)=><span key={image.base}>{index+1}. {image.alt}</span>)}</div>
    </section>
  </section>;
}
