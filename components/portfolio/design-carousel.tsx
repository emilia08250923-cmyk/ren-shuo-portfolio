"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ResponsiveImage } from "./responsive-image";
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
  if (!images.length) return <div className="empty-projects">Project images have not been added yet.</div>;
  const selected = images[current];
  return <section className={`design-carousel carousel-${type}`} aria-label={`${title} artwork`}>
    <div className="carousel-heading"><span className="eyebrow">The visual story</span><span className="eyebrow carousel-hint">Drag to explore / Use ← →</span></div>
    <Carousel setApi={setApi} opts={{ align: "center", loop: images.length > 1, duration: 28 }} tabIndex={0} aria-label="Artwork carousel. Use left and right arrow keys." className="artwork-carousel">
      <CarouselContent>{images.map((image, index) => {
        const distance = Math.min(Math.abs(index - current), images.length - Math.abs(index - current));
        return <CarouselItem key={image.base} className="artwork-slide" aria-label={`${index + 1} of ${images.length}`}><div className="artwork-frame">{distance <= 1 && <ResponsiveImage base={image.base} alt={image.alt} contain priority={index === current} sizes="(max-width: 767px) 94vw, 86vw" />}</div></CarouselItem>;
      })}</CarouselContent>
      <div className="carousel-controls"><div className="slide-number" aria-live="polite">{String(current + 1).padStart(2, "0")} <span>/ {String(images.length).padStart(2, "0")}</span></div><div className="carousel-progress" role="progressbar" aria-label="Artwork progress" aria-valuemin={1} aria-valuemax={images.length} aria-valuenow={current + 1}><span style={{ width: `${(current + 1) / images.length * 100}%` }} /></div><div className="carousel-buttons"><button onClick={() => setExpanded(true)} aria-label="Expand current artwork"><Expand size={18} /></button><button onClick={() => api?.scrollPrev()} disabled={images.length < 2} aria-label="Previous artwork"><ArrowLeft size={20} /></button><button onClick={() => api?.scrollNext()} disabled={images.length < 2} aria-label="Next artwork"><ArrowRight size={20} /></button></div></div>
    </Carousel>
    <Dialog open={expanded} onOpenChange={setExpanded}><DialogContent className="artwork-dialog"><DialogTitle className="sr-only">{selected.alt}</DialogTitle><DialogDescription className="sr-only">Full artwork with its original proportions.</DialogDescription><ResponsiveImage base={selected.base} alt={selected.alt} contain priority sizes="95vw" /></DialogContent></Dialog>
  </section>;
}
