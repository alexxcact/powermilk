# Power Milk · Sitio web

Sitio web estático para **Productos Alimenticios Power Milk**, elaborado en HTML5, CSS3 y JavaScript vanilla. Sin dependencias de frameworks, sin build step, listo para subir tal cual a cualquier hosting.

---

## Estructura del proyecto

```
powermilk-web/
├── index.html          # Página única con todas las secciones
├── styles.css          # Hojas de estilo (variables CSS, responsive, animaciones)
├── script.js           # Nav scroll, scroll-reveal, menú móvil, parallax
└── assets/
    ├── logo.png        # Logo Power Milk (fondo transparente)
    ├── mascota.png     # Vaquita mascota (fondo transparente)
    └── producto-*.jpg  # 8 imágenes de productos (del catálogo oficial)
```

**Peso total:** ~1.8 MB · Carga rápida en 4G rural.

---

## Secciones del sitio

1. **Hero** — Vaquita flotando con badges, stats y CTAs a catálogo / WhatsApp
2. **Marquee** — Cinta animada con todos los productos
3. **¿Quiénes somos?** — Texto institucional + card de valores
4. **Misión / Visión** — Cards en verde lima y cyan
5. **Catálogo** — 8 productos: Doble Crema (destacado), Tajado, Mozzarella, Requesón, Crema de Leche, Campesino, Cuajada, Dulce de Leche
6. **Política de calidad** — Fondo oscuro con 4 valores corporativos
7. **Ubicación** — Dirección de Pasto + Google Maps embed + WhatsApp
8. **CTA final** — Llamado a pedir por WhatsApp con la vaquita
9. **Footer** — Navegación, contacto y créditos
10. **Botón flotante de WhatsApp** — Animado, siempre visible

---

## Cómo desplegar el sitio

### Opción A · Netlify (recomendado, gratis y muy simple)

1. Crea cuenta en https://app.netlify.com (puedes usar GitHub).
2. Arrastra la carpeta `powermilk-web/` completa al área que dice "Drag and drop your site folder here".
3. Listo. Netlify te da una URL tipo `https://power-milk-xyz.netlify.app` en segundos.
4. (Opcional) En "Domain settings" puedes conectar un dominio propio (ej. `powermilk.com.co`).

### Opción B · Vercel

1. Crea cuenta en https://vercel.com.
2. New Project → "Import" → arrastra la carpeta.
3. Deploy.

### Opción C · GitHub Pages

1. Crea un repo en GitHub (ej. `powermilk-web`).
2. Sube todos los archivos al repo.
3. Settings → Pages → Source: `main` / `(root)` → Save.
4. URL: `https://[tu-usuario].github.io/powermilk-web/`

### Opción D · Hosting tradicional (Hostinger, GoDaddy, cPanel)

1. Entra al panel de tu hosting.
2. Abre el **File Manager** y entra a `public_html/`.
3. Sube TODO el contenido de la carpeta `powermilk-web/` (no la carpeta misma, sino lo que está adentro: `index.html`, `styles.css`, `script.js` y la carpeta `assets/`).
4. Listo. Visita tu dominio.

---

## Cómo editar el contenido

Todos los textos están en `index.html`. Búscalos por sección con `Ctrl+F`:

- **Cambiar dirección o teléfono**: busca `Calle 10` o `573207639891`. El número de WhatsApp aparece en 4 lugares: hero, sección WhatsApp, CTA final y botón flotante.
- **Agregar un producto**: copia uno de los bloques `<article class="producto">` y modifícalo. Para que la imagen aparezca, súbela a `assets/` y referénciala con `src="assets/tu-imagen.jpg"`.
- **Cambiar misión/visión**: están en `<section class="mv">`.
- **Modificar colores**: edita las variables CSS al inicio de `styles.css` (sección `:root`). Las principales son `--pm-green`, `--pm-blue`, `--pm-yellow`, `--pm-ink`.

---

## Cómo conectar un formulario de contacto (opcional)

El sitio usa WhatsApp como canal principal de contacto, lo cual es lo más práctico para este negocio. Pero si quisieras agregar un formulario de email en el futuro, recomiendo **Formspree** o **Web3Forms** (ambos gratis hasta cierto límite y no requieren backend).

---

## SEO incluido

- Meta tags de título, descripción y keywords
- OpenGraph para previews al compartir en WhatsApp / Facebook
- Estructura HTML5 semántica (header, nav, section, article, footer)
- Atributos `alt` en todas las imágenes
- Atributo `lang="es"` en el HTML

**Para mejorar SEO después del despliegue:**
1. Verifica el sitio en **Google Search Console** (https://search.google.com/search-console).
2. Crea un perfil de **Google Business** para que aparezca el punto de venta en Maps.
3. Agrega `schema.org/LocalBusiness` con JSON-LD (puedo ayudarte si lo necesitas).

---

## Tecnologías usadas

- **HTML5** semántico
- **CSS3** con variables, Grid, Flexbox y animaciones
- **JavaScript vanilla** (sin librerías externas)
- **Google Fonts**: Bricolage Grotesque, DM Sans, Caveat
- **SVG inline** para íconos (sin íconos de imagen, mejor performance)

**Sin frameworks** = sin npm, sin build, sin actualizaciones de dependencias. El sitio funciona literalmente con doble-clic en `index.html`.

---

## Soporte de navegadores

- Chrome / Edge / Brave: ✅ últimas 2 versiones
- Firefox: ✅ últimas 2 versiones
- Safari: ✅ versión 15+
- Móviles iOS / Android: ✅ todos los navegadores modernos

---

**Hecho con ⚡ del campo a tu mesa.**
