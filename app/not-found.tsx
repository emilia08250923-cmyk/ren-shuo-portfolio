import Link from "next/link";
export default function NotFound() { return <section className="empty-projects section-pad"><p className="eyebrow">404 / 页面未找到</p><h1>这里还是一张空白画布。</h1><Link className="button button-dark" href="/">返回首页 ↗</Link></section>; }
