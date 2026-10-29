# HM Wealth — Styling & Design System

## 1. Tailwind CSS v4 Modern Theme Architecture
The styling system is configured directly in `app/globals.css` using modern Tailwind v4 `@theme` block rules. There is no `tailwind.config.js`.

### Color Palette & Design Tokens
```css
@theme {
  --font-sans: "Plus Jakarta Sans Variable", ui-sans-serif, system-ui, sans-serif;

  /* Typography & Core Neutrals */
  --color-ink: #0f1f1a;          /* Headings & primary text */
  --color-body: #56665f;         /* Body copy & subtitles */
  --color-line: #e3ebe7;         /* Hairline borders & dividers */
  --color-soft: #f4f8f6;         /* Secondary section backgrounds */

  /* HM Wealth Green Palette (Primary Brand) */
  --color-brand: #0b7a55;        /* Primary brand green (buttons, badges, highlights) */
  --color-brand-dark: #075e41;   /* Hover states */
  --color-brand-deep: #053b2a;   /* Dark cards, hero backgrounds (#04261c also used) */
  --color-brand-bright: #19c38a; /* Neon mint for chart lines, glow effects, gradients */
  --color-mint: #e7f6ef;         /* Soft background tint for icons & badges */
  --color-mint-2: #cfeedf;       /* Subtle border accents & donut chart inactive track */

  /* Secondary & Accent Tints */
  --color-gold: #f2b33d;         /* Gold buttons, coin accents, special highlights */
  --color-gold-soft: #fff4dc;    /* Soft gold background tint */
  --color-sky: #e8f1fe;          /* Sky blue tint (Debt funds, Dream home, Motor) */
  --color-sky-ink: #2f6fd6;
  --color-peach: #fff0e8;        /* Peach tint (Retirement, Health) */
  --color-peach-ink: #d6662f;
  --color-lilac: #f1edfd;        /* Lilac tint (Education, ELSS, Hybrid) */
  --color-lilac-ink: #6b4fd1;

  /* Elevation Shadows */
  --shadow-card: 0 1px 2px rgb(15 31 26 / 0.04), 0 8px 24px -12px rgb(15 31 26 / 0.12);
  --shadow-lift: 0 2px 4px rgb(15 31 26 / 0.04), 0 24px 48px -20px rgb(11 122 85 / 0.28);
}
```

## 2. Typography
- **Primary Typeface:** Plus Jakarta Sans Variable (`@fontsource-variable/plus-jakarta-sans/wght.css`).
- **Heading Styles:** `h1, h2, h3 { text-wrap: balance; letter-spacing: -0.025em; }`
- **Tabular Figures:** Class `.tnum` applies `font-variant-numeric: tabular-nums` to ensure numbers in calculators and currency values don't wobble or jitter during animation.

## 3. Custom CSS Utilities & Range Sliders
In `app/globals.css`:
- `@utility range`: Customizes the HTML `<input type="range">` slider thumb and track.
  - The track uses a dynamic CSS variable `--fill` (`style={{ "--fill": `${fill}%` }}`) to fill the active slider track from bright green to muted line color.
  - Thumb features multi-layered box shadows with smooth focus rings.

## 4. Accessibility & Reduced Motion
In `app/globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
All Motion animation components (`components/ui/Reveal.tsx`, `components/home/Hero.tsx`, `components/charts/GrowthChart.tsx`, `components/layout/FooterWordmark.tsx`) call `useReducedMotion()`. If reduced motion is requested by the OS, initial animation states are disabled (`initial: false`) or durations set to zero.

