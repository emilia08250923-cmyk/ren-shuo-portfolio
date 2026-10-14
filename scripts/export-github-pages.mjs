import { chromium } from 'file:///C:/Users/30673/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { projects,designCategories } from '../data/projects.ts';
const base='/ren-shuo-portfolio',origin='http://localhost:5173',out=path.resolve('.sites-runtime/github-pages');
const manifest=JSON.parse(await fs.readFile('data/media-manifest.json','utf8'));
await fs.mkdir(out,{recursive:true});
await fs.cp('public',out,{recursive:true});await fs.copyFile('scripts/pages-runtime.js',path.join(out,'pages-interactions.js'));
await fs.cp('dist/client/assets',path.join(out,'assets'),{recursive:true});
await fs.mkdir(path.join(out,'app'),{recursive:true});
const cssDir='dist/client/ren-shuo-portfolio/_next/static/css';
const css=(await fs.readdir(cssDir)).filter(n=>n.endsWith('.css'));
await fs.writeFile(path.join(out,'app/globals.css'),(await Promise.all(css.map(n=>fs.readFile(path.join(cssDir,n),'utf8')))).join('\n'));
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const routes=['/','/design','/video','/about',...projects.map(p=>`/${p.type}/${p.slug}`),...projects.filter(p=>p.assetsUrl).map(p=>p.assetsUrl)];
let count=0;
for(const route of routes){
 const page=await browser.newPage();
 const response=await page.goto(origin+base+route,{waitUntil:'domcontentloaded'});
 if(!response?.ok())throw Error(`Page failed: ${route} ${response?.status()}`);
 await page.waitForTimeout(700);
 const project=projects.find(p=>route===`/${p.type}/${p.slug}`);
 let images=project?.images;
 if(route.endsWith('/assets')){
  const slug=route.split('/')[2];const candidates=await fs.readdir('data');
  for(const name of candidates.filter(n=>n.endsWith('assets.json'))){const d=JSON.parse(await fs.readFile('data/'+name,'utf8'));if(d.images?.some(i=>i.base.includes('/'+slug+'/'))){images=d.images;break;}}
 }
 const data={base,project,images:images?.map(i=>({...i,src:manifest[i.base]?.variants.at(-1)?.src})),categories:designCategories,projects:route==='/design'?projects.filter(p=>p.type==='design'):undefined};
 await page.evaluate(({base,data,manifest})=>{
  document.querySelectorAll('script,link[rel=modulepreload],link[as=script],vite-error-overlay').forEach(e=>e.remove());
  document.querySelectorAll('#main-content>div,.projects-grid>div,.reveal').forEach(e=>{e.style.opacity='1';e.style.transform='none';});
  document.querySelectorAll('.design-carousel[data-images]').forEach(carousel=>{
   const images=JSON.parse(carousel.dataset.images);
   carousel.dataset.images=JSON.stringify(images.map(image=>({...image,src:manifest[image.base]?.variants.at(-1)?.src})));
  });
  document.querySelectorAll('[href],[src],[srcset]').forEach(e=>{for(const a of ['href','src','srcset']){let v=e.getAttribute(a);if(v){v=v.replace(/(^|,\s*)(\/(?!\/)[^\s,]*)/g,(m,lead,url)=>lead+(url.startsWith(base+'/')?url:base+url));e.setAttribute(a,v);}}});
  document.querySelectorAll('a[href]').forEach(a=>{const v=a.getAttribute('href');if(v===base+'/')return;if(v.startsWith(base+'/')&&!/\.[a-z0-9]+($|[?#])/i.test(v)){const hash=v.indexOf('#');a.setAttribute('href',hash<0?v.replace(/\/?$/,'/'):v.slice(0,hash).replace(/\/?$/,'/')+v.slice(hash));}});
  const script=document.createElement('script');script.type='application/json';script.id='pages-data';script.textContent=JSON.stringify(data).replace(/</g,'\\u003c');document.body.append(script);
  document.querySelectorAll('link[rel=stylesheet]').forEach(link=>{if(link.getAttribute('href')===base+'/app/globals.css')link.setAttribute('href',base+'/app/globals.css?v=20261014-update');});
  const js=document.createElement('script');js.src=base+'/pages-interactions.js?v=20261014-update';js.defer=true;document.body.append(js);
 },{base,data,manifest});
 const html=('<!doctype html>\n'+await page.locator('html').evaluate(e=>e.outerHTML)).replaceAll('https://foldcraft-studio.emilia08250923.chatgpt.site','https://emilia08250923-cmyk.github.io/ren-shuo-portfolio');
 const directory=path.join(out,route);await fs.mkdir(directory,{recursive:true});await fs.writeFile(path.join(directory,'index.html'),html);
 await page.close();console.log(`Exported ${++count}/${routes.length} ${route}`);
}
await browser.close();await fs.writeFile(path.join(out,'.nojekyll'),'');
await fs.writeFile(path.join(out,'404.html'),`<!doctype html><meta charset="utf-8"><title>页面未找到</title><a href="${base}/">返回任硕作品集首页</a>`);
console.log('GitHub Pages export complete');


