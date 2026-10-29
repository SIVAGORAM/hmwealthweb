# HM Wealth — Technology Stack Report

| Technology | Purpose in HM Wealth | Evidence in Codebase | What You Need to Learn |
|---|---|---|---|
| **Next.js 16 (App Router)** | Primary full-stack framework providing hybrid Server Components, Client Components, dynamic metadata, file-system routing, and production optimization. | `package.json` (`"next": "^16.4.3"`), `next.config.ts`, `app/layout.tsx`, `app/**/page.tsx` | How Next.js App Router separates Server Components (default) from Client Components (`"use client"`), metadata exports, and custom image loaders. |
| **React 19** | Component-driven UI library utilizing the latest React 19 primitives, hooks, and concurrent features. | `package.json` (`"react": "^19.2.0"`, `"react-dom": "^19.2.0"`), `tsconfig.json` (`"jsx": "react-jsx"`) | React hooks (`useState`, `useEffect`, `useMemo`, `useId`), event handling, and form control. |
| **TypeScript 5** | Static type checking and strict contracts across mathematical formulas, calculator parameters, and UI components. | `tsconfig.json`, `package.json` (`"typescript": "^5"`), `lib/calc.ts` (`CalcId`, `SliderDef`, `Result`) | TypeScript interfaces, type aliases, discriminated unions, and generic helpers. |
| **Tailwind CSS v4** | Next-generation utility-first styling system using pure modern CSS `@theme` and `@utility` rules without a legacy `tailwind.config.js`. | `package.json` (`"tailwindcss": "^4"`, `"@tailwindcss/postcss": "^4"`), `postcss.config.mjs`, `app/globals.css` | Tailwind v4 `@theme` block syntax, custom CSS variables, `@utility` definitions, and responsive prefixes (`sm:`, `md:`, `lg:`). |
| **Motion (`motion/react`)** | Fluid physics-based animations, layout transitions, spring counters, and interactive scroll triggers. | `package.json` (`"motion": "^14.7.1"`), `components/ui/Reveal.tsx`, `components/charts/GrowthChart.tsx`, `components/home/Hero.tsx` | `motion.div`, `AnimatePresence`, `layoutId`, `useMotionValue`, `useTransform`, `useReducedMotion`, and spring configs. |
| **Lucide React** | Modern, consistent icon library used across all feature cards, action pills, and trust indicators. | `package.json` (`"lucide-react": "^1.63.0"`), imported in almost every component. | Finding icon names from Lucide and passing responsive size/stroke props. |
| **clsx & tailwind-merge** | Safe conditional class merging utility (`cn(...)`) preventing conflicting Tailwind utility classes. | `package.json` (`"clsx": "^2.1.1"`, `"tailwind-merge": "^3.3.0"`), `lib/utils.ts` | How `cn(...)` resolves duplicate class clashes (e.g. `p-4` vs `p-6`). |
| **Plus Jakarta Sans** | Modern geometric sans-serif variable font loaded locally via Fontsource to ensure 0 external Google Fonts latency or privacy issues. | `package.json` (`"@fontsource-variable/plus-jakarta-sans"`), `app/layout.tsx`, `app/globals.css` | Variable font weights (`wght.css`) and typographic scale. |
| **Custom Unsplash Image Loader** | Bypasses Next.js image optimization server overhead by instructing the browser to load directly from Unsplash's CDN with custom resize parameters. | `next.config.ts` (`loader: "custom"`, `loaderFile: "./lib/imageLoader.ts"`), `lib/photos.ts` | How Next.js `loaderFile` operates on `next/image` components. |

## Recommended Learning Order
1. **Next.js App Router Fundamentals**: Understand how page routes (`app/page.tsx`, `app/about/page.tsx`) wrap children into `app/layout.tsx`.
2. **Tailwind CSS v4 `@theme` & Token Architecture**: Understand how colors like `var(--color-brand)` and classes like `text-brand`, `bg-soft`, and `shadow-lift` are configured in `app/globals.css`.
3. **Motion (`motion/react`)**: Understand how `Reveal`, `layoutId`, and animated SVG paths operate.
4. **Financial Domain Logic (`lib/calc.ts`)**: Understand compound interest, monthly compounding formulas, and series generation.

