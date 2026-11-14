# Aunty Bingo (আন্টি বিঙ্গো) 🎯

> **A vibrant, interactive 3×3 Bingo game turning awkward Bengali family questions into wholesome fun!**  
> Built with React 19, Tailwind CSS v4, and Vite based on the complete Figma UI/UX design specification.

[![React 19](https://img.shields.io/badge/React-19.3-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Oxlint Clean](https://img.shields.io/badge/Oxlint-0%20Errors-brightgreen)](https://oxc.rs)

---

## 🎨 UI/UX Design System & Features

- **Exact 3×3 Bingo Grid (8 Winning Ways)**:
  - 3 rows, 3 columns, and 2 diagonals (8 ways to hit BINGO).
  - Tapping a tile applies an authentic checkmark stamp overlay.
  - Completing any winning line triggers an animated strikethrough line and tile highlight.
- **4 Authentic Occasion Presets**:
  - 🌙 **Eid Reunion** (*Emerald `#0F7B5F`*): Eidi negotiations, semai tasting, and family visits.
  - 💍 **Wedding / Dawot** (*Ruby `#A81D37`*): Matchmaking aunts, jewellery scrutiny, and biryani debates.
  - 🎓 **Post-Exam Results** (*Royal Blue `#1F50A8`*): GPA checks, BCS advice, and admissions.
  - ☕ **General Family Adda** (*Terracotta `#B84B12`*): Career checks and nostalgic lectures.
- **Dynamic Status Header**:
  - Automatically updates based on game progress: from *"Question incoming?"* to *"One question away..."* to *"BINGO! Keep going."*
- **Instant Bilingual Localization (EN | বাং)**:
  - Toggle between English and Bengali with persistent preference saved in `localStorage`.
- **Celebratory Victory Overlay**:
  - Confetti burst with `canvas-confetti`.
  - Cheerful celebrating Aunty mascot with arms raised.
  - Displays completion time and current time-of-day in both English and Bengali.
- **High-Resolution (1080×1350) Canvas PNG Card Exporter**:
  - Offscreen HTML5 Canvas generator creating branded 4:5 social-ready Instagram & WhatsApp story cards.
  - Native Web Share API support with automatic download fallback and toast notification.
- **Web Audio Sound Effects**:
  - Real-time synthesized stamp pop and victory fanfare using the Web Audio API with a one-click mute toggle.
- **Desktop & Mobile Responsive Layout**:
  - Mobile: Single-column streamlined touch experience.
  - Desktop: 3-column layout (Left: mascot sidebar, Center: 3×3 board, Right: controls card) with decorative festive margin borders.

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

### 5. Run Linter
```bash
npm run lint
```
