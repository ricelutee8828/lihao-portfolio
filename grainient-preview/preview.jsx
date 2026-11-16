import React from 'react';
import { createRoot } from 'react-dom/client';
import './preview.css';

function mountPreview() {
  const root = document.querySelector('#root');
  const about = document.querySelector('#about');
  if (!root || !about) { requestAnimationFrame(mountPreview); return; }
  if (root.querySelector('.grainient-preview-layer')) return;

  const layer = document.createElement('div');
  layer.className = 'grainient-preview-layer';
  layer.setAttribute('aria-hidden', 'true');
  root.prepend(layer);
  const hero = root.querySelector('#top');
  let frame = 0;
  const revealOnScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const height = hero?.offsetHeight || window.innerHeight;
      const start = height * 0.2;
      const end = height * 0.65;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      layer.style.opacity = String(progress * 0.72);
    });
  };
  window.addEventListener('scroll', revealOnScroll, { passive: true });
  window.addEventListener('resize', revealOnScroll);
  revealOnScroll();
  const observer = new IntersectionObserver(async entries => {
    if (!entries.some(entry => entry.isIntersecting)) return;
    observer.disconnect();
    const { default: Grainient } = await import('./Grainient');
    createRoot(layer).render(
      <Grainient
      colors={['#120f17', '#2a0f0a', '#9a3412', '#f97316', '#fed7aa']}
      angle={55}
      flow={0.8}
      silk={0.35}
      grainAmount={0.08}
      scale={1.75}
      grainSize={1}
      saturation={1.05}
        stir={0.65}
        dpr={1.25}
      />
    );
  });
  observer.observe(about);
}

mountPreview();
