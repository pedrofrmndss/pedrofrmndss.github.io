window.addEventListener('DOMContentLoaded', () => {
  const gs = gsap;
  gs.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

  document.querySelectorAll('.carousel.infinite .carousel-track').forEach((track, i) => {
    track.innerHTML += track.innerHTML;
    const gap = parseFloat(getComputedStyle(track).gap || '0');
    const children = Array.from(track.children);
    const halfWidth = children.slice(0, children.length / 2)
      .reduce((w, el) => w + el.getBoundingClientRect().width, 0) + gap * ((children.length / 2) - 1);
    const speed = 40;
    const duration = halfWidth / speed;
    track.style.setProperty('--duration', `${duration}s`);
    if (i % 2 === 1) track.style.animationDirection = 'reverse';
  });

  const gallery = document.querySelector('.gallery .masonry');
  const images = Array.from(gallery.querySelectorAll('img'));
  const btnPrev = document.querySelector('.gallery-prev');
  const btnNext = document.querySelector('.gallery-next');
  const perPage = 5;
  let currentPage = 0;

  function showPage(page) {
    const start = page * perPage;
    const end = start + perPage;
    images.forEach((img, i) => {
      gsap.to(img, {
        opacity: i >= start && i < end ? 1 : 0,
        scale: i >= start && i < end ? 1 : 0.9,
        duration: 0.4,
        ease: 'power2.out',
        onStart: () => { if (i >= start && i < end) img.style.display = 'block'; },
        onComplete: () => { if (i < start || i >= end) img.style.display = 'none'; }
      });
    });
    gsap.fromTo(images.slice(start, end), { y: 20, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out'
    });
    currentPage = page;
  }

  showPage(0);
  btnNext.addEventListener('click', () => {
    const nextPage = (currentPage + 1) * perPage < images.length ? currentPage + 1 : 0;
    showPage(nextPage);
  });
  btnPrev.addEventListener('click', () => {
    const prevPage = currentPage > 0 ? currentPage - 1 : Math.floor((images.length - 1) / perPage);
    showPage(prevPage);
  });

  gs.fromTo('.scroll-indicator', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: 'power2.out' });

  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav');
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      navMenu.classList.toggle('open');
    });
  }

  gs.fromTo('.hero-logo', { scale: 0.5, opacity: 0, rotation: -15 }, {
    scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)'
  });
  gs.fromTo('.headline', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.3, ease: 'power3.out' });
  gs.fromTo('.subline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' });
  gs.fromTo('.hero-cta', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.65, ease: 'power3.out' });
  gs.fromTo('.chips span', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, delay: 0.75, duration: 0.8 });

  gs.to('.hero-overlay', {
    opacity: 0.5,
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  gs.to('.about-card .about-card-inner', {
    rotateX: 0, rotateY: 0, duration: 1.2, ease: 'power3.out',
    scrollTrigger: { trigger: '.about', start: 'top 70%' }
  });

  gs.utils.toArray('.feature').forEach((el, i) => {
    gs.fromTo(el, { y: 28, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, delay: i * 0.05,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  gs.utils.toArray('.gallery .grid img').forEach((img, i) => {
    gs.fromTo(img, { scale: 0.96, opacity: 0 }, {
      scale: 1, opacity: 1, duration: 0.6, delay: i * 0.03,
      scrollTrigger: { trigger: img, start: 'top 95%' }
    });
  });

  const cursor = document.querySelector('.cursor');
  window.addEventListener('mousemove', (e) => {
    gs.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' });
  });
  document.querySelectorAll('a, .btn, .feature, .chips span, .chips li').forEach(el => {
    el.addEventListener('mouseenter', () => gs.to(cursor, { scale: 1.6, opacity: 0.9, duration: 0.2 }));
    el.addEventListener('mouseleave', () => gs.to(cursor, { scale: 1, opacity: 0.6, duration: 0.2 }));
  });

  const header = document.querySelector('.site-header');
  let hasShown = false;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 150 && !hasShown) {
      header.classList.add('visible');
      hasShown = true;
    } else if (scrollY <= 150 && hasShown) {
      header.classList.remove('visible');
      hasShown = false;
    }
    header.classList.toggle('scrolled', scrollY > 300);
  });

  document.querySelectorAll('.nav a[href^="#"] , .hero-cta a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, { duration: 0.9, scrollTo: { y: target, offsetY: 60 }, ease: 'power4.inOut' });
      }
    });
  });

  try {
    const now = new Date();
    const localMinutes = now.getHours() * 60 + now.getMinutes();
    const dayNames = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
    const today = dayNames[now.getDay()];
    const listItems = document.querySelectorAll('.hours-list li');
    let todayHours = null;
    listItems.forEach(li => {
      const d = li.querySelector('span:first-child')?.textContent?.trim();
      const h = li.querySelector('span:last-child')?.textContent?.trim();
      if (d === today) todayHours = h;
    });
    const badge = document.querySelector('.floating-badge');
    if (!badge) return;
    if (!todayHours || /Fermé/i.test(todayHours)) {
      badge.textContent = '🔴 Fermé aujourd’hui';
      return;
    }
    const normalize = (str) => str.replace(/[–—]/g, '-').replace(/\s+/g, '');
    const toMins = (t) => {
      const [H, M] = t.split(':').map(n => parseInt(n, 10) || 0);
      return H * 60 + M;
    };
    const ranges = todayHours.split('/').map(p => normalize(p));
    let isOpen = false;
    for (const r of ranges) {
      const [start, end] = r.split('-');
      if (!start || !end) continue;
      const s = toMins(start);
      const e = toMins(end);
      if (localMinutes >= s && localMinutes < e) {
        isOpen = true;
        break;
      }
    }
    badge.textContent = isOpen ? '🟢 Ouvert maintenant' : '🔴 Fermé pour le moment';
  } catch (err) {
    console.error('Erreur badge horaires :', err);
  }
});

gsap.fromTo('.buffet-video video', { opacity: 0, y: 40 }, {
  opacity: 1, y: 0, duration: 1, ease: 'power3.out',
  scrollTrigger: { trigger: '.buffet-video', start: 'top 85%' }
});
