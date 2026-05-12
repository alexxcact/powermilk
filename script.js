/* ============================================
   POWER MILK · JavaScript
   ============================================ */

(() => {
  'use strict';

  // ---------- Nav scroll behavior ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu ----------
  const burger = document.getElementById('burger');
  const navMobile = document.getElementById('navMobile');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navMobile.classList.toggle('open');
  });
  // Close mobile menu when clicking a link
  navMobile.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navMobile.classList.remove('open');
    });
  });

  // ---------- Scroll reveal ----------
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  reveals.forEach(el => io.observe(el));

  // ---------- Stagger reveals inside grids ----------
  document.querySelectorAll('.productos-grid, .valores').forEach(grid => {
    const items = grid.querySelectorAll('.reveal, .valor');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  // ---------- Smooth scroll with offset for fixed nav ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 12;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    });
  });

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Parallax-lite for hero cow ----------
  const heroCow = document.querySelector('.hero-cow-wrap');
  if (heroCow && window.matchMedia('(min-width: 1024px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < 800) {
        heroCow.style.transform = `translateY(${y * 0.15}px)`;
      }
    }, { passive: true });
  }

})();
