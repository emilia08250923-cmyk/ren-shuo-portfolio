const data = JSON.parse(document.getElementById('pages-data').textContent), base = data.base;
const full = p => p.startsWith(base + '/') ? p : base + p;
document.querySelectorAll('.design-carousel').forEach(carousel => {
 const images = carousel.dataset.images ? JSON.parse(carousel.dataset.images) : data.images;
 if (!images?.length) return;
 const slides = [...carousel.querySelectorAll('.artwork-slide')], frames = [...carousel.querySelectorAll('.artwork-frame')];
 const track = carousel.querySelector('[data-slot="carousel-content"] > div');
 let current = Math.min(Number(carousel.dataset.initialIndex || 0), images.length - 1);
 images.forEach((image,index) => {
  const frame=frames[index];if(!frame||!image.src)return;
  const img=document.createElement('img');img.src=full(image.src);img.alt=image.alt;img.className='media-contain';img.style.cssText='width:100%;height:100%;object-fit:contain';frame.replaceChildren(img);
  const zoomId=frame.getAttribute('href')?.split('#')[1],zoom=zoomId&&document.getElementById(zoomId);
  if(zoom){zoom.querySelectorAll('picture,img').forEach(e=>e.remove());zoom.append(img.cloneNode(true));}
 });
 const previous=carousel.querySelector('[aria-label="上一张作品"]'),next=carousel.querySelector('[aria-label="下一张作品"]');
 previous.disabled=next.disabled=images.length<2;
 const show=()=>{
  if(track){track.style.transform='none';track.style.marginLeft='0';}
  slides.forEach((slide,index)=>{slide.hidden=index!==current;slide.style.display=index===current?'block':'none';slide.style.transform='none';slide.style.flexBasis='100%';slide.style.paddingLeft='0';slide.setAttribute('aria-hidden',String(index!==current));});
  carousel.querySelector('.slide-number').innerHTML=String(current+1).padStart(2,'0')+' <span>/ '+String(images.length).padStart(2,'0')+'</span>';
  const progress=carousel.querySelector('.carousel-progress');progress.setAttribute('aria-valuenow',String(current+1));progress.setAttribute('aria-valuemax',String(images.length));progress.querySelector('span').style.width=(current+1)/images.length*100+'%';
 };
 const move=offset=>{current=(current+offset+images.length)%images.length;show();};
 previous.onclick=()=>move(-1);next.onclick=()=>move(1);
 carousel.querySelector('[aria-label="放大当前作品"]').onclick=()=>{const hash=frames[current]?.getAttribute('href')?.split('#')[1];if(hash)location.hash=hash;};
 carousel.onkeydown=event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}};
 let touch;
 carousel.addEventListener('touchstart',event=>{touch=event.touches[0];},{passive:true});
 carousel.addEventListener('touchend',event=>{if(!touch)return;const dx=event.changedTouches[0].clientX-touch.clientX,dy=event.changedTouches[0].clientY-touch.clientY;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))move(dx<0?1:-1);touch=undefined;});
 show();
});
const episodeButtons=document.querySelectorAll('.series-toolbar [role=group] button');
episodeButtons.forEach((button,index)=>button.onclick=()=>{const episode=data.project?.episodes?.[index],iframe=document.querySelector('.film-stage iframe');if(!episode||!iframe)return;const url=new URL(iframe.src);url.searchParams.set('bvid',episode.bvid);iframe.src=url;episodeButtons.forEach((item,i)=>item.setAttribute('aria-pressed',String(i===index)));});
if(data.projects)document.querySelectorAll('.category-filter button').forEach((button,index)=>button.onclick=()=>{const category=data.categories[index].id;document.querySelectorAll('.projects-grid>div').forEach((item,i)=>item.hidden=category!=='all'&&data.projects[i].category!==category);document.querySelectorAll('.category-filter button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));});
const form=document.querySelector('.contact-form');
if(form)form.onsubmit=event=>{event.preventDefault();if(!form.reportValidity())return;const values=Object.fromEntries(new FormData(form));location.href='mailto:3067382469@qq.com?subject='+encodeURIComponent('作品集咨询：'+values.name)+'&body='+encodeURIComponent('姓名：'+values.name+'\n邮箱：'+values.email+'\n公司：'+(values.company||'—')+'\n\n'+values.message);form.querySelector('[role=status]').textContent='邮件草稿已准备，请在邮件应用中确认发送。';};
const menu=document.querySelector('.mobile-nav-trigger');
if(menu)menu.onclick=()=>{const overlay=document.createElement('div');overlay.style.cssText='position:fixed;inset:0;background:#f8f6f0;z-index:99999;padding:40px;display:flex;flex-direction:column;gap:28px;font-size:28px';const close=document.createElement('button');close.textContent='关闭 ×';close.onclick=()=>overlay.remove();overlay.append(close);document.querySelectorAll('.desktop-nav a').forEach(a=>overlay.append(a.cloneNode(true)));document.body.append(overlay);};
