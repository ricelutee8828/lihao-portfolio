import React from 'react';
import { ArrowUpRight, Play, X } from 'lucide-react';
import { sharedArchive, videoWorks } from './videoWorks';

export default function VideoGallery({ onClose }) {
  const closeRef = React.useRef(null);
  const [filter, setFilter] = React.useState('全部');
  const categories = ['全部', ...new Set(videoWorks.map(work => work.category))];
  const visibleWorks = filter === '全部' ? videoWorks : videoWorks.filter(work => work.category === filter);

  React.useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return <div className="gallery-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title">
      <div className="gallery-header">
        <div><span className="gallery-kicker">LI HAO / VIDEO ARCHIVE</span><h2 id="gallery-title">我的其他项目<span>.</span></h2><p>从现场拍摄到后期剪辑，浏览我的项目索引。</p></div>
        <button className="gallery-close" type="button" onClick={onClose} ref={closeRef} aria-label="关闭作品窗口"><X size={24}/></button>
      </div>
      <div className="gallery-archive"><div><span>全部视频 / FEISHU DRIVE</span><strong>在飞书云盘查看完整作品文件夹</strong></div><a href={sharedArchive.url} target="_blank" rel="noopener noreferrer">打开作品文件夹 <ArrowUpRight size={20}/></a></div>
      <div className="gallery-filters" aria-label="按作品类型筛选">{categories.map(category => <button key={category} type="button" className={filter === category ? 'active' : ''} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <div className="gallery-grid">{visibleWorks.map((work, index) => {
        const content = <><div className="gallery-cover">{work.cover ? <img src={work.cover} alt="" loading="lazy"/> : <span className="gallery-cover-type">{work.category}<small>LI HAO / VISUAL STORIES</small></span>}<span className="gallery-cover-shade"/>{work.shareUrl && <span className="gallery-play"><Play size={22} fill="currentColor"/></span>}</div><div className="gallery-item-meta"><span>{work.category} {work.year && ` / ${work.year}`}</span><span>{String(index + 1).padStart(2, '0')}</span></div><div className="gallery-item-title"><div><h3>{work.title}</h3><p>{work.subtitle}</p></div>{work.shareUrl && <ArrowUpRight size={22}/>}</div></>;
        return work.shareUrl
          ? <a className="gallery-item" key={work.id} href={work.shareUrl} target="_blank" rel="noopener noreferrer" aria-label={`在飞书云盘观看${work.title} ${work.subtitle}`}>{content}</a>
          : <article className="gallery-item is-pending" key={work.id}>{content}</article>;
      })}</div>
    </section>
  </div>;
}
