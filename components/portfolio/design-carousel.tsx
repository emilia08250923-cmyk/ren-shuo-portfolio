"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ResponsiveImage } from "./responsive-image";
import { mediaAsset } from "@/lib/media";
import { type ProjectImage } from "@/data/projects";

export function DesignCarousel({ images, type = "normal", title }: { images: ProjectImage[]; type?: "normal" | "showcase"; title: string }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    if (!api) return;
    const select = () => setCurrent(api.selectedScrollSnap());
    api.on("select", select);
    return () => { api.off("select", select); };
  }, [api]);
  if (!images.length) return <div className="empty-projects">暂未添加项目图片。</div>;
  const selected = images[current];
  return <section className={`design-carousel carousel-${type}`} aria-label={`${title}作品`}>
    <div className="carousel-heading"><span className="eyebrow">视觉作品 / 完整呈现</span><span className="eyebrow carousel-hint">拖动浏览 / 使用 ← →</span></div>
    <Carousel setApi={setApi} opts={{ align: "center", loop: images.length > 1, duration: 28 }} tabIndex={0} aria-label="作品轮播，可使用左右方向键浏览。" className="artwork-carousel">
      <CarouselContent>{images.map((image, index) => {
        const distance = Math.min(Math.abs(index - current), images.length - Math.abs(index - current));
        return <CarouselItem key={image.base} className="artwork-slide" aria-label={`${index + 1} / 共 ${images.length} 张`}><a className="artwork-frame" href={mediaAsset(image.base)?.variants.at(-1)?.src} target="_blank" rel="noreferrer" aria-label={`放大${image.alt}`}>{distance <= 1 && <ResponsiveImage base={image.base} alt={image.alt} contain priority={index === current} sizes="(max-width: 767px) 94vw, 86vw" />}</a></CarouselItem>;
      })}</CarouselContent>
      <div className="carousel-controls"><div className="slide-number" aria-live="polite">{String(current + 1).padStart(2, "0")} <span>/ {String(images.length).padStart(2, "0")}</span></div><div className="carousel-progress" role="progressbar" aria-label="作品浏览进度" aria-valuemin={1} aria-valuemax={images.length} aria-valuenow={current + 1}><span style={{ width: `${(current + 1) / images.length * 100}%` }} /></div><div className="carousel-buttons"><button onClick={() => setExpanded(true)} aria-label="放大当前作品"><Expand size={18} /></button><button onClick={() => api?.scrollPrev()} disabled={images.length < 2} aria-label="上一张作品"><ArrowLeft size={20} /></button><button onClick={() => api?.scrollNext()} disabled={images.length < 2} aria-label="下一张作品"><ArrowRight size={20} /></button></div></div>
    </Carousel>
    <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="artwork-dialog"><DialogTitle className="sr-only">{selected.alt}</DialogTitle><DialogDescription className="sr-only">按原始比例展示完整作品。</DialogDescription><ResponsiveImage base={selected.base} alt={selected.alt} contain priority sizes="95vw" /></DialogContent></Dialog>
  </section>;
}
