import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Play, Aperture, Clapperboard, ScanLine, Sparkles } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import ProfileCard from './ProfileCard';
import AnimatedContent from './AnimatedContent';
import TechText from './TechText';
import SplitText from './SplitText';
import GradualBlur from './GradualBlur';
import Crosshair from './Crosshair';
import GridMotion from './GridMotion';
import './style.css';
import '../grainient-preview/preview.jsx';

const VideoGallery = React.lazy(() => import('./VideoGallery'));

const projects = [
  { no:'01', title:'黄凯芹 35 周年佛山巡演', sub:'回顾纪录片', year:'2025', type:'演出影像', image:'/project-chris-foshan.webp', cls:'stage' },
  { no:'02', title:'世界技能大赛广州邀请赛', sub:'活动纪实片', year:'2024', type:'活动纪实', image:'/project-skills-competition.webp', cls:'event' },
  { no:'03', title:'广州市技师学院交通装备系', sub:'宣传片', year:'2023', type:'校企宣传', image:'/project-college-automotive.webp', cls:'school' },
];
const strengths = [
  { n:'01', icon:Aperture, title:'现场拍摄', body:'熟悉演出、活动与宣传片现场，依据分镜完成镜头采集，也能应对现场变化。', tags:'摄影 · 灯光 · 镜头语言' },
  { n:'02', icon:Clapperboard, title:'叙事剪辑', body:'从脚本与素材出发梳理叙事结构，把握信息密度、情绪推进与画面节奏。', tags:'Premiere Pro · DaVinci Resolve' },
  { n:'03', icon:ScanLine, title:'影像完成度', body:'结合调色、字幕、包装与音效设计，保持成片视觉和声音的一致性。', tags:'调色 · After Effects · 声音' },
  { n:'04', icon:Sparkles, title:'多类型交付', body:'覆盖校企宣传、专题片、活动纪录片、微课及新媒体短视频。', tags:'品牌宣传 · 演出 · 新媒体' },
];
const revealProps = {
  distance: 32,
  direction: 'vertical',
  duration: 0.42,
  ease: 'power2.out',
  blur: 2,
  wipe: 'up',
  once: true,
  stagger: 0.08,
  threshold: 0.1
};
function Reveal({children, ...props}) { return <AnimatedContent {...revealProps} {...props}>{children}</AnimatedContent> }
function SectionLabel({index,children}) { return <div className="section-label"><span>{index} /</span> {children}</div> }
function AboutHeading() {
  const [narrow, setNarrow] = React.useState(() => window.matchMedia('(max-width: 1250px)').matches);
  React.useEffect(() => {
    const query = window.matchMedia('(max-width: 1250px)');
    const update = () => setNarrow(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const lines = narrow ? ['镜头之外，', '我在意故事', '如何被看见。'] : ['镜头之外，', '我在意故事如何被看见。'];
  return <h2 className="about-tech-heading" aria-label="镜头之外，我在意故事如何被看见。">
    {lines.map((line, index) => <span className={`about-tech-line${index ? ' is-accent' : ''}`} aria-hidden="true" key={line}>
      <TechText text={line} fontWeight={500} fontSize={72} letterSpacing={-0.065} align="left" reveal="letter" accentColor="#c9aa7b" specks={7} labels={false} guides={false} speed={0.7} intro="none" />
    </span>)}
  </h2>;
}
function ContactHeading() {
  const shared = { tag: 'span', effect: 'rise', splitType: 'chars', delay: 35, duration: 0.65, trigger: 'view', hoverEffect: 'lift', threshold: 0.15, rootMargin: '0px', textAlign: 'left' };
  return <h2 className="contact-split-heading" aria-label="下一个故事，我们一起完成。">
    <span className="contact-split-line"><SplitText {...shared} text="下一个故事，" /></span>
    <span className="contact-split-line is-accent"><SplitText {...shared} text="我们一起完成。" /></span>
  </h2>;
}
const gridMotionItems = [
  '/grid-motion/01-national-anniversary.webp',
  '/grid-motion/02-music-journey.webp',
  '/grid-motion/03-skills-craft.webp',
  '/grid-motion/04-foshan-stage.webp',
  '/grid-motion/05-singer-interview.webp',
  '/grid-motion/06-automotive-class.webp',
  '/grid-motion/07-lion-dance.webp',
  '/grid-motion/08-stage-dance.webp',
  '/grid-motion/09-skills-contest.webp',
  '/grid-motion/10-classroom-talk.webp',
  '/grid-motion/11-red-stage.webp',
  '/grid-motion/12-skills-guidance.webp',
  '/grid-motion/13-blue-stage.webp',
  '/grid-motion/14-maker-interview.webp',
  '/grid-motion/15-workshop-presenters.webp',
  '/grid-motion/16-skills-judges.webp',
  '/grid-motion/17-network-training.webp',
  '/grid-motion/18-blue-stage-singer.webp',
  '/grid-motion/19-worldskills-medals.webp',
  '/grid-motion/20-foshan-concert.webp',
  '/grid-motion/21-skills-panel.webp',
  '/grid-motion/22-cultural-exchange.webp',
  '/grid-motion/23-rooftop-guitar.webp',
  '/grid-motion/24-blue-guitar.webp'
];
function App(){
  const [pastHero, setPastHero] = React.useState(false);
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const otherProjectsRef = React.useRef(null);
  const workInteractionRef = React.useRef(null);
  const crosshairStartRef = React.useRef(null);
  const [crosshairBounds, setCrosshairBounds] = React.useState(null);
  const crosshairPreview = true;
  const gridMotionPreview = true;
  React.useLayoutEffect(() => {
    if (!crosshairPreview) return undefined;
    const host = workInteractionRef.current;
    const start = crosshairStartRef.current;
    const button = otherProjectsRef.current;
    if (!host || !start || !button) return undefined;
    const update = () => {
      const top = start.offsetTop;
      const side = Math.min(216, Math.max(20, window.innerWidth * 0.084));
      setCrosshairBounds({ top, side, height: button.parentElement.offsetTop + button.offsetHeight + 160 - top });
    };
    const observer = new ResizeObserver(update);
    [host, start, button].forEach(element => observer.observe(element));
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [crosshairPreview]);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = Array.from(document.querySelectorAll('main > section'));
    const content = sections.map(section => section.id === 'top'
      ? Array.from(section.querySelectorAll('.hero-content, .hero-bottom, .hero-side, .hero-rail'))
      : section.id === 'work'
        ? [section.querySelector(':scope > .shell')]
        : Array.from(section.children).filter(child => !child.classList.contains('contact-glow')));
    let frame = 0;
    const update = () => {
      frame = 0;
      const viewHeight = window.innerHeight;
      sections.forEach((section, index) => {
        const next = sections[index + 1];
        if (!next) return;
        const nextTop = next.getBoundingClientRect().top;
        const progress = Math.min(1, Math.max(0, (viewHeight - nextTop) / viewHeight));
        content[index].forEach(element => {
          if (element) element.style.opacity = progress > 0 ? String(1 - progress * 0.6) : '';
        });
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      sections.forEach((section, index) => {
        section.style.opacity = '';
        content[index].forEach(element => { if (element) element.style.opacity = ''; });
      });
    };
  }, []);
  React.useEffect(() => {
    let frame = 0;
    let threshold = 0;
    const measure = () => {
      threshold = (document.getElementById('top')?.offsetHeight ?? window.innerHeight) - 94;
      update();
    };
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setPastHero(previous => {
          const next = window.scrollY >= threshold;
          return previous === next ? previous : next;
        });
      });
    };
    measure();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', measure);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', measure); };
  }, []);
  return <>
  <header className={`nav${pastHero ? ' is-scrolled' : ''}`}><a className="brand" href="#top" aria-label="李灏，返回首页"><span className="brand-mark">L<span>H</span></span><span className="brand-name">LI HAO <small>VISUAL STORYTELLER</small></span></a><nav aria-label="主导航"><a href="#about">关于</a><a href="#work">作品</a><a href="#expertise">能力</a></nav><a className="nav-contact" href="#contact">联系合作 <ArrowUpRight size={16}/></a></header>
  <main>
    <section className="hero" id="top"><div className="hero-film"><video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster="/hero-chris-poster.jpg" aria-hidden="true"><source src="/hero-chris-highlights-v2.mp4" type="video/mp4"/></video></div><div className="hero-shade"/><Reveal className="hero-content shell" trigger="mount"><div className="hero-intro"><p>影视剪辑师 / 视频摄像<br/>FILM EDITOR & CINEMATOGRAPHER</p></div><div className="eyebrow"><span className="live-dot"/> LI HAO &nbsp; / &nbsp; SELECTED PORTFOLIO</div><h1><span>让每一帧</span><br/><em>都有叙事的力量<span>.</span></em></h1><p className="hero-desc">在拍摄与剪辑之间，寻找画面最准确的表达。<br/>常驻广州 · 开放影像项目合作</p><div className="hero-actions"><a className="button-primary" href="#work">探索作品 <ArrowUpRight size={18}/></a><a className="button-ghost" href="#contact">联系合作 <ArrowUpRight size={13}/></a></div></Reveal><Reveal className="hero-bottom shell" trigger="mount"><span>SCROLL TO EXPLORE <ArrowDownRight size={15}/></span><span>LI HAO &nbsp; / &nbsp; PORTFOLIO 2026</span></Reveal><div className="hero-side">FRAME BY FRAME &nbsp;·&nbsp; STORY BY STORY</div><div className="hero-rail">01&nbsp; / &nbsp; VISUAL STORIES</div></section>
    <section className="about section shell" id="about"><Reveal className="about-label" initialOpacity={0.65}><SectionLabel index="01">ABOUT / 关于我</SectionLabel></Reveal><Reveal className="about-layout"><ProfileCard className="about-profile" name="李灏" title="影视剪辑师 / 视频摄像" handle="lihao" status="开放合作" contactText="联系合作" avatarUrl="/resume-image.webp" iconUrl="/profile-pattern.svg" holo={0.95} glare={0.4} tiltStrength={11} parallax={10} radius={16} enableTilt={true} intro={true} showUserInfo={false} enableMobileTilt theme="dark" onContactClick={() => { window.location.href = "mailto:LINH_22@163.com"; }}/><div className="about-copy"><p className="kicker">THE PERSON BEHIND THE FRAME</p><AboutHeading/><p className="about-lead">你好，我是李灏，一名常驻广州的影视剪辑师 / 视频摄像。</p><p className="muted">约 5 年拍摄与后期制作相关经历，参与校企宣传片、专题片、活动纪实、微课、新媒体短视频及演出活动项目。从前期镜头采集，到后期剪辑、包装与成片交付，我熟悉完整的影像制作流程。</p><div className="stats"><div><strong>约 5<sup>年</sup></strong><span>拍摄与后期经历</span></div><div><strong>09<span>+</span></strong><span>简历收录项目</span></div><div><strong>05<span>类</span></strong><span>影像内容方向</span></div></div><div className="about-contact"><a href="mailto:LINH_22@163.com"><Mail size={16}/> LINH_22@163.com</a><a href="tel:13288474391"><Phone size={16}/> 132 8847 4391</a><span><MapPin size={16}/> 广州 · 白云</span></div></div></Reveal><Reveal className="experience"><span>RECENT EXPERIENCE</span><div><strong>广州蓝大传媒有限公司</strong><span>摄像剪辑</span><time>2024.09 — 2026.09</time></div><div><strong>广州捷影文化传媒有限公司</strong><span>拍摄 / 后期制作</span><time>2021.06 — 2024.05</time></div></Reveal></section>
    <section className="work section" id="work"><div className="shell"><Reveal className="section-head"><div><SectionLabel index="02">SELECTED WORK / 精选项目</SectionLabel><h2>画面，是作品的<br/><em>第一句话。</em></h2></div><p>从演出现场到城市活动，从人物到品牌。<br/>以下项目选自个人简历。</p></Reveal><div className="work-interaction-scope" ref={workInteractionRef}><Reveal className="project-list" blur={0}>{projects.map((p, i)=><article ref={i === 1 ? crosshairStartRef : null} className={'project-card '+p.cls} key={p.no}><div className="project-image" style={{backgroundImage:`url(${p.image})`}}/><div className="project-overlay"/><div className="project-top"><span>PROJECT {p.no}</span><span>{p.year} <ArrowUpRight size={18}/></span></div><div className="project-bottom"><div><small>{p.type}</small><h3>{p.title}<br/><span>{p.sub}</span></h3></div><span className="placeholder-note">项目实拍画面</span></div></article>)}</Reveal><Reveal className="other-projects-action"><button ref={otherProjectsRef} className="other-projects-button" type="button" onClick={() => setGalleryOpen(true)} aria-haspopup="dialog" aria-label="查看我的其他作品"><span className="other-projects-copy"><span className="other-projects-kicker">MORE WORK / 我的其他项目</span><strong>查看我的其他作品</strong><span className="other-projects-hint">演出影像 · 活动纪实 · 校企宣传 · 影视混剪</span></span><span className="other-projects-arrow" aria-hidden="true"><ArrowUpRight size={28}/></span></button></Reveal>{crosshairPreview && !galleryOpen && crosshairBounds && <Crosshair containerRef={workInteractionRef} proximityTargetRef={otherProjectsRef} listenGlobally targetSelector=".other-projects-button" color="#ffffff" targetEffect="lock" thickness={1} opacity={0.85} smoothing={0.35} showCoordinates={false} fade={0.95} style={{inset:"auto",left:-crosshairBounds.side,top:crosshairBounds.top,width:`calc(100% + ${crosshairBounds.side * 2}px)`,height:crosshairBounds.height}}/>}</div></div></section>
    <section className={`expertise section${gridMotionPreview ? ' expertise-grid-preview' : ''}`} id="expertise">{gridMotionPreview && <div className="expertise-motion" aria-hidden="true"><GridMotion items={gridMotionItems} rows={4} aspectRatio={1.33} gap={16} radius={14} angle={-12} tilt={0} speed={24} direction="alternate" parallax={0.5} spotlight={0.6} dim={0.35} fade={0.5} grayscale={false} noRepeat/></div>}<div className="shell expertise-content"><Reveal className="section-head"><div><SectionLabel index="03">CAPABILITIES / 个人优势</SectionLabel><h2>从现场到时间线，<br/><em>保持同一种判断力。</em></h2></div><p>以拍摄理解素材，以剪辑完成表达。<br/>让每个制作环节服务于最终叙事。</p></Reveal><Reveal className="strength-grid">{strengths.map(s=><SpotlightCard key={s.n} className="strength-card" theme="dark" spotlightColor="#ffffff" intensity={0.3} spotlightSize={250} softness={0.7} shape="circle" borderGlow={0.85} proximity={80} smoothing={0.3} grain={0.7} ambient={false} flare><div className="strength-top"><s.icon size={27} strokeWidth={1.25}/><span>{s.n}</span></div><div><h3>{s.title}</h3><p>{s.body}</p></div><small>{s.tags}</small></SpotlightCard>)}</Reveal></div></section>
    <section className="contact" id="contact"><div className="contact-glow"/><Reveal className="shell contact-content"><SectionLabel index="04">CONTACT / 联系方式</SectionLabel><div className="contact-main"><ContactHeading/></div><div className="contact-bottom"><div><span>EMAIL</span><a href="mailto:LINH_22@163.com">LINH_22@163.com</a></div><div><span>PHONE</span><a href="tel:13288474391">132 8847 4391</a></div><div><span>BASED IN</span><strong>中国 · 广州</strong></div><a className="backtop" href="#top">BACK TO TOP ↑</a></div><footer>© 2026 LI HAO. ALL RIGHTS RESERVED. <span>EDITED WITH INTENTION.</span></footer></Reveal></section>
  </main><GradualBlur target="page" position="bottom" height="4rem" strength={0.5} layers={7} curve="linear" exponential tint="rgba(18, 15, 23, 0.1)" autoHide opacity={0.4} saturation={0.2} hoverIntensity={0.8} zIndex={20}/>{galleryOpen && <React.Suspense fallback={null}><VideoGallery onClose={() => setGalleryOpen(false)}/></React.Suspense>}</> }
createRoot(document.getElementById('root')).render(<App/>);
