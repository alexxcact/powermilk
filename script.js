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
  
  if (burger) {
    // Establecer estado inicial de accesibilidad
    burger.setAttribute('aria-expanded', 'false');
    
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      navMobile.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile menu when clicking a link
  if (navMobile) {
    navMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (burger) {
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
        navMobile.classList.remove('open');
      });
    });
  }

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

  // ---------- Lightbox para imágenes de productos ----------
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev  = document.getElementById('lightboxPrev');
  const lightboxNext  = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (lightbox) {
    const imgs = Array.from(document.querySelectorAll('.producto-media img'));
    let current = 0;

    const showImage = (index) => {
      current = (index + imgs.length) % imgs.length;
      lightboxImg.src = imgs[current].src;
      lightboxImg.alt = imgs[current].alt;
      lightboxCounter.textContent = `${current + 1} / ${imgs.length}`;
    };

    imgs.forEach((img, i) => {
      img.addEventListener('click', () => {
        showImage(i);
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => showImage(current - 1));
    lightboxNext.addEventListener('click', () => showImage(current + 1));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft')   showImage(current - 1);
      if (e.key === 'ArrowRight')  showImage(current + 1);
    });
  }

  // ---------- Tablas Nutricionales ----------
  const NUTRI_DATA = {
    'doble-crema': {
      nombre: 'Queso Doble Crema',
      presentaciones: [
        {
          etiqueta: '450 g', porcion: '1 tajada (30 g)', porciones: '15',
          kcal100: 303, kcalPorcion: 91,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '6,9 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '4,7 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,5 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '5,6 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '129 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER', porPorcion: '277 µg ER' },
            { nombre: 'Vitamina D', por100: '0 µg',      porPorcion: '0 µg' },
            { nombre: 'Calcio',     por100: '418 mg',    porPorcion: '125 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',   porPorcion: '0,11 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '0,87 mg' },
          ]
        },
        {
          etiqueta: '220 g', porcion: '1 tajada (30 g)', porciones: 'Aprox. 7',
          kcal100: 303, kcalPorcion: 91,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '6,9 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '4,7 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,5 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '5,6 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '129 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER',  porPorcion: '277 µg ER' },
            { nombre: 'Vitamina D', por100: '0,14 µg',    porPorcion: '0,04 µg' },
            { nombre: 'Calcio',     por100: '418 mg',     porPorcion: '125 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',    porPorcion: '0,11 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',     porPorcion: '0,87 mg' },
          ]
        }
      ]
    },
    'tajado': {
      nombre: 'Doble Crema Tajado',
      presentaciones: [
        {
          etiqueta: '420 g', porcion: '2 tajadas (38 g)', porciones: 'Aprox. 11',
          kcal100: 303, kcalPorcion: 115,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '8,7 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,3 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '5,9 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,9 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '7,1 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '163 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER', porPorcion: '351 µg ER' },
            { nombre: 'Vitamina D', por100: '0,0 µg',    porPorcion: '0,0 µg' },
            { nombre: 'Calcio',     por100: '418 mg',    porPorcion: '159 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',   porPorcion: '0,07 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '1,1 mg' },
          ]
        },
        {
          etiqueta: '210 g', porcion: '2 tajadas (38 g)', porciones: 'Aprox. 6',
          kcal100: 303, kcalPorcion: 115,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '8,7 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,3 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '5,9 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,9 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '7,1 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '163 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER', porPorcion: '351 µg ER' },
            { nombre: 'Vitamina D', por100: '0,0 µg',    porPorcion: '0,0 µg' },
            { nombre: 'Calcio',     por100: '418 mg',    porPorcion: '159 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',   porPorcion: '0,07 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '1,1 mg' },
          ]
        },
        {
          etiqueta: '400 g', porcion: '1 tajada (25 g)', porciones: '16',
          kcal100: 303, kcalPorcion: 76,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '5,8 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '3,9 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,3 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '4,7 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '108 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER', porPorcion: '231 µg ER' },
            { nombre: 'Vitamina D', por100: '0,0 µg',    porPorcion: '0,0 µg' },
            { nombre: 'Calcio',     por100: '418 mg',    porPorcion: '105 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',   porPorcion: '0,09 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '0,73 mg' },
          ]
        },
        {
          etiqueta: '200 g', porcion: '1 tajada (25 g)', porciones: '8',
          kcal100: 303, kcalPorcion: 76,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '23 g',    porPorcion: '5,8 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,8 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '16 g',    porPorcion: '3,9 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '0 mg',    porPorcion: '0 mg',   nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '5,1 g',   porPorcion: '1,3 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '19 g',    porPorcion: '4,7 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '430 mg',  porPorcion: '108 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '922 µg ER', porPorcion: '231 µg ER' },
            { nombre: 'Vitamina D', por100: '0,0 µg',    porPorcion: '0,0 µg' },
            { nombre: 'Calcio',     por100: '418 mg',    porPorcion: '105 mg' },
            { nombre: 'Hierro',     por100: '0,37 mg',   porPorcion: '0,09 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '0,73 mg' },
          ]
        }
      ]
    },
    'mozzarella': {
      nombre: 'Queso Mozzarella',
      presentaciones: [
        {
          etiqueta: '450 g (entero)', porcion: '1 tajada (30 g)', porciones: '15',
          kcal100: 296, kcalPorcion: 89,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '20 g',    porPorcion: '6 g',    nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,7 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '13 g',    porPorcion: '3,9 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '310 mg',  porPorcion: '93 mg',  nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '3,1 g',   porPorcion: '0,9 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '1,9 g',   porPorcion: '0,6 g',  nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '23 g',    porPorcion: '6,9 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '373 mg',  porPorcion: '112 mg', nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '241 µg ER', porPorcion: '72 µg ER' },
            { nombre: 'Vitamina D', por100: '0,4 µg',    porPorcion: '0,12 µg' },
            { nombre: 'Calcio',     por100: '517 mg',    porPorcion: '155 mg' },
            { nombre: 'Hierro',     por100: '0,2 mg',    porPorcion: '0,06 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '0,87 mg' },
          ]
        },
        {
          etiqueta: '450 g (tajado)', porcion: '1 tajada (23 g)', porciones: '20',
          kcal100: 296, kcalPorcion: 68,
          nutrientes: [
            { nombre: 'Grasa Total',           por100: '20 g',    porPorcion: '4,6 g',  nivel: 0 },
            { nombre: 'Grasa Poliinsaturada',  por100: '0,7 g',   porPorcion: '0,2 g',  nivel: 1 },
            { nombre: 'Grasa Saturada',        por100: '13 g',    porPorcion: '3,0 g',  nivel: 1 },
            { nombre: 'Grasas Trans',          por100: '310 mg',  porPorcion: '71 mg',  nivel: 1 },
            { nombre: 'Carbohidratos Totales', por100: '3,1 g',   porPorcion: '0,7 g',  nivel: 0 },
            { nombre: 'Fibra Dietaria',        por100: '0 g',     porPorcion: '0 g',    nivel: 1 },
            { nombre: 'Azúcares Totales',      por100: '1,9 g',   porPorcion: '0,4 g',  nivel: 1 },
            { nombre: 'Azúcares Añadidos',     por100: '0 g',     porPorcion: '0 g',    nivel: 2 },
            { nombre: 'Proteína',              por100: '23 g',    porPorcion: '5,3 g',  nivel: 0 },
            { nombre: 'Sodio',                 por100: '373 mg',  porPorcion: '86 mg',  nivel: 0 },
          ],
          micronutrientes: [
            { nombre: 'Vitamina A', por100: '241 µg ER', porPorcion: '55 µg ER' },
            { nombre: 'Vitamina D', por100: '0,4 µg',    porPorcion: '0,09 µg' },
            { nombre: 'Calcio',     por100: '517 mg',    porPorcion: '119 mg' },
            { nombre: 'Hierro',     por100: '0,2 mg',    porPorcion: '0 mg' },
            { nombre: 'Zinc',       por100: '2,9 mg',    porPorcion: '0,67 mg' },
          ]
        }
      ]
    }
  };

  const nutriModal  = document.getElementById('nutriModal');
  const nutriClose  = document.getElementById('nutriClose');
  const nutriTitle  = document.getElementById('nutriTitle');
  const nutriTabs   = document.getElementById('nutriTabs');
  const nutriBody   = document.getElementById('nutriBody');

  if (nutriModal) {
    let activeProd = null;

    const renderNutri = (productKey, sizeIdx) => {
      activeProd = productKey;
      const prod = NUTRI_DATA[productKey];
      const pres = prod.presentaciones[sizeIdx];

      nutriTitle.textContent = prod.nombre;

      nutriTabs.innerHTML = prod.presentaciones.length > 1
        ? prod.presentaciones.map((p, i) =>
            `<button class="nutri-tab${i === sizeIdx ? ' active' : ''}" data-size="${i}">${p.etiqueta}</button>`
          ).join('')
        : '';

      const macroRows = pres.nutrientes.map(n => {
        const cls = 'nutri-row' + (n.nivel === 1 ? ' l1' : n.nivel === 2 ? ' l2' : '');
        return `<tr class="${cls}">
          <td class="nc">${n.nombre}</td>
          <td>${n.por100}</td>
          <td>${n.porPorcion}</td>
        </tr>`;
      }).join('');

      const microRows = pres.micronutrientes.map(m =>
        `<tr class="nutri-row nutri-micro">
          <td class="nc">${m.nombre}</td>
          <td>${m.por100}</td>
          <td>${m.porPorcion}</td>
        </tr>`
      ).join('');

      nutriBody.innerHTML = `
        <div class="nutri-info-bar">
          <span>Tamaño de la porción: <b>${pres.porcion}</b></span>
          <span>Porciones por envase: <b>${pres.porciones}</b></span>
        </div>
        <table class="nutri-table">
          <thead>
            <tr>
              <th class="nth-label">Cantidad por</th>
              <th>100 g</th>
              <th>Porción</th>
            </tr>
          </thead>
          <tbody>
            <tr class="nutri-kcal">
              <td class="nc">Calorías (kcal)</td>
              <td>${pres.kcal100}</td>
              <td>${pres.kcalPorcion}</td>
            </tr>
            ${macroRows}
            <tr class="nutri-sep"><td colspan="3"></td></tr>
            ${microRows}
          </tbody>
        </table>`;
    };

    const openNutriModal = (productKey, sizeIdx = 0) => {
      renderNutri(productKey, sizeIdx);
      nutriModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeNutriModal = () => {
      nutriModal.classList.remove('open');
      document.body.style.overflow = '';
    };

    nutriTabs.addEventListener('click', e => {
      const tab = e.target.closest('[data-size]');
      if (tab && activeProd) renderNutri(activeProd, parseInt(tab.dataset.size, 10));
    });

    document.querySelectorAll('.btn-nutri').forEach(btn => {
      btn.addEventListener('click', () => openNutriModal(btn.dataset.product));
    });

    nutriClose.addEventListener('click', closeNutriModal);
    nutriModal.addEventListener('click', e => { if (e.target === nutriModal) closeNutriModal(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nutriModal.classList.contains('open')) closeNutriModal();
    });

    // Auto-abrir modal si viene de un QR (?nutri=doble-crema&size=0)
    const params = new URLSearchParams(window.location.search);
    const nutriParam = params.get('nutri');
    if (nutriParam && NUTRI_DATA[nutriParam]) {
      const sizeParam = Math.max(0, parseInt(params.get('size') || '0', 10));
      openNutriModal(nutriParam, sizeParam);
    }
  }

})();
