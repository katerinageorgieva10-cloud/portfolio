/* ========================================
   KAT ILLUSTRATES — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAV SCROLL STATE ----
  const nav = document.getElementById('nav');
  const onScroll = () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- MOBILE MENU ----
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  // ---- FADE-IN ON SCROLL ----
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeEls.forEach(el => fadeObserver.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ---- PARALLAX ON HERO IMAGE ----
  const parallaxEls = document.querySelectorAll('.parallax');

  if (parallaxEls.length && window.innerWidth > 768) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxEls.forEach(el => {
            const speed = parseFloat(el.dataset.speed) || 0.15;
            el.style.transform = `translateY(${scrollY * speed}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ---- LIGHTBOX ----
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbTitle = lightbox.querySelector('.lightbox__title');
    const lbMeta = lightbox.querySelector('.lightbox__meta');
    const lbDesc = lightbox.querySelector('.lightbox__desc');
    const lbClose = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
      item.addEventListener('click', () => {
        const src = item.dataset.lightbox;
        const title = item.dataset.title || '';
        const meta = item.dataset.meta || '';
        const desc = item.dataset.desc || '';

        lbImg.src = src;
        lbImg.alt = title;
        lbTitle.textContent = title;
        lbMeta.textContent = meta;
        lbDesc.textContent = desc;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ---- ABOUT SLIDESHOW ----
  const slides = document.querySelectorAll('.slideshow__img');
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('slideshow__img--active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('slideshow__img--active');
    }, 4500);
  }

  // ---- CONTACT FORM ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      btn.textContent = 'Sent';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = 'Send';
        btn.disabled = false;
        form.reset();
      }, 2500);
    });
  }

});
