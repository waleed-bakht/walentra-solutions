# Walentra Solutions — Official Website

> **Transforming Ideas into Digital Success.**

A world-class, production-ready website for **Walentra Solutions**, a premium digital agency.
Built with HTML5, CSS3, and Vanilla JavaScript — zero dependencies, zero frameworks.

---

## 🚀 Tech Stack

| Layer      | Technology                     |
|------------|-------------------------------|
| Structure  | HTML5 (semantic)              |
| Styling    | CSS3 (custom properties, grid, flex) |
| Logic      | Vanilla JavaScript (ES6+)     |
| Fonts      | Google Fonts (Poppins + Inter)|
| Icons      | SVG inline icons              |

---

## 📁 Project Structure

```
walentra-solutions/
├── index.html         — Main HTML (all sections)
├── style.css          — Complete design system & styles
├── script.js          — All JavaScript (interactions, animations)
├── README.md          — This file
└── assets/
    ├── images/        — Images (add your own)
    ├── icons/         — Custom icons (if needed)
    └── fonts/         — Self-hosted fonts (optional)
```

---

## ✨ Features

### Design
- 🎨 Premium purple → pink gradient brand system
- 🌙 Dark hero with animated mesh gradient blobs
- 💎 Glassmorphism floating cards on hero
- 🔮 Subtle gradient border effects
- ✦ Generous whitespace and 8-point spacing system

### Sections
1. **Loading Screen** — Branded, animated loader
2. **Navigation** — Sticky, frosted glass with scroll behavior + mobile hamburger
3. **Hero** — Full-screen dark hero with SVG illustration, floating cards, stats
4. **Trusted By** — Infinite marquee logo carousel
5. **About** — Company story, mission, values
6. **Services** — 16 services in filterable card grid
7. **Why Choose Us** — 6 premium feature cards on dark background
8. **Portfolio** — 9 filterable project showcase cards with hover overlays
9. **Process** — Animated 6-step timeline
10. **Statistics** — Animated counting numbers
11. **Testimonials** — Auto-playing carousel with touch/swipe support
12. **FAQ** — Smooth accordion
13. **Contact** — Full contact form with validation + success state
14. **Footer** — Multi-column with newsletter signup

### Performance & UX
- ⚡ Intersection Observer for scroll animations
- 📊 Scroll progress bar
- 🔝 Scroll-to-top button
- ♿ Full keyboard navigation
- 📱 Fully responsive (mobile-first)
- 🔍 SEO optimized (meta, OG, Twitter Card, Schema.org)

---

## 🎨 Brand Colors

```css
--purple-deep:   #5B21B6  /* Primary */
--purple-bright: #6D28D9  /* Primary alt */
--pink-hot:      #EC4899  /* Secondary */
--pink-light:    #F472B6  /* Secondary light */
--white:         #FFFFFF
--lavender-soft: #F5F3FF
--dark-text:     #1A1A1A
```

---

## 🛠️ Customization

### Update Company Info
- Email, phone, social links → `index.html` → Contact section & Footer
- Company statistics → `index.html` → `#stats` section (`.stat-num[data-count]`)
- Testimonials → Replace placeholder text in `.testimonial-card` elements

### Add Real Portfolio Images
- Replace `.portfolio-card-bg` gradient backgrounds with `<img>` tags
- Place images in `assets/images/`

### Connect Contact Form
- In `script.js`, replace the `await new Promise(...)` simulation in the form handler
- with a real `fetch()` call to your backend or a form service (Formspree, EmailJS, etc.)

### Update Colors
- All brand colors are CSS custom properties in `style.css` under `:root`
- Change once and they propagate everywhere

---

## 📋 SEO Checklist

- [x] Title tag
- [x] Meta description
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Schema.org Organization markup
- [x] Semantic HTML5
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Alt text on images/SVGs
- [x] Canonical URL
- [x] robots meta

---

## ⚙️ Deploy

This is a **static site** — no build step required.

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo>
git push -u origin main
# Enable Pages in repo settings → branch: main
```

**Netlify / Vercel:**
Simply drag the `walentra-solutions/` folder into the deploy zone.

**Traditional Hosting:**
Upload all files to your `public_html` or `www` directory via FTP.

---

## 📞 Support

Built for Walentra Solutions. For customizations or questions:
- ✉️ hello@walentra.com

---

© 2024 Walentra Solutions. All rights reserved.
