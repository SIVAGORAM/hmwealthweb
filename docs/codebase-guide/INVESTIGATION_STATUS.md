# HM Wealth — Codebase Investigation Status

## 1. Verified Coverage Summary
- **Total First-Party Files:** 43 files
- **Files Inspected & Understood:** 43 files (100% coverage)
- **Uninspected Files:** 0
- **Third-Party / Ignored:** `node_modules/`, `.next/`, `.git/`
- **Type Checking:** Verified cleanly with `npx tsc --noEmit` (0 errors).

## 2. File-by-File Verification Checklist
| File Path | Status | Notes |
|---|---|---|
| `package.json` | Verified | Scripts, dependencies, devDependencies mapped |
| `package-lock.json` | Verified | Dependency lockfile |
| `tsconfig.json` | Verified | Compiler options, `@/*` alias mapped |
| `postcss.config.mjs` | Verified | `@tailwindcss/postcss` plugin |
| `next.config.ts` | Verified | Custom image loader config for Unsplash |
| `next-env.d.ts` | Verified | Auto-generated Next.js typings |
| `.gitignore` | Verified | Standard Next.js gitignore |
| `README.md` | Verified | Regulatory constraints & structure notes |
| `lib/site.ts` | Verified | Single source of truth for site details & disclaimers |
| `lib/utils.ts` | Verified | `cn`, `inr`, and `inrShort` formatting utilities |
| `lib/calc.ts` | Verified | Compounding formulas & calculator definitions |
| `lib/photos.ts` | Verified | Unsplash photography dictionary |
| `lib/imageLoader.ts` | Verified | Custom CDN image optimization loader |
| `app/globals.css` | Verified | Tailwind v4 `@theme`, tokens, utilities & animations |
| `app/layout.tsx` | Verified | Root layout, metadata, font imports, Navbar & Footer |
| `app/not-found.tsx` | Verified | Branded 404 screen |
| `app/page.tsx` | Verified | Home landing page composed of 10 sections |
| `app/about/page.tsx` | Verified | About page, story, values, registrations & commission |
| `app/calculators/page.tsx` | Verified | Calculator landing page with Suspense wrapper |
| `app/contact/page.tsx` | Verified | Contact page, grievance escalation & WhatsApp callback |
| `app/insurance/page.tsx` | Verified | Insurance landing page, 6 types & claim process |
| `app/investments/page.tsx` | Verified | Investments landing page, 6 categories & riskometer |
| `components/ui/kit.tsx` | Verified | Core UI primitives (Container, Button, Badge, Card, etc.) |
| `components/ui/Logo.tsx` | Verified | Vector logo with AMFI tagline & light/dark options |
| `components/ui/Reveal.tsx` | Verified | Viewport scroll-reveal motion wrapper |
| `components/layout/Navbar.tsx` | Verified | Sticky nav, AMFI reg block, sliding pill & mobile drawer |
| `components/layout/Footer.tsx` | Verified | Dark green footer, navigation, contacts, disclaimers |
| `components/layout/FooterWordmark.tsx` | Verified | Giant animated wordmark with sweep & hover glow |
| `components/sections/PageHero.tsx` | Verified | Inner-page hero with breadcrumbs & visual slot |
| `components/sections/CtaBand.tsx` | Verified | Gradient CTA band with phone & WhatsApp actions |
| `components/sections/Faq.tsx` | Verified | Editorial accordion with numbered items & spring animations |
| `components/sections/Steps.tsx` | Verified | 4-step process cards connected by dashed lines |
| `components/charts/Donut.tsx` | Verified | SVG two-part animated donut chart |
| `components/charts/GrowthChart.tsx` | Verified | SVG area/line chart with dashed baseline & animated endpoint |
| `components/calculators/CalculatorSuite.tsx` | Verified | 6-in-1 calculator with sliders, donut & growth chart |
| `components/contact/ContactForm.tsx` | Verified | Callback form with validation & WhatsApp dispatch |
| `components/investments/Riskometer.tsx` | Verified | SEBI 6-tier Riskometer dial with animated needle |
| `components/home/Hero.tsx` | Verified | 4-story carousel, 3D CSS rupee coin, mouse parallax |
| `components/home/HomeSections.tsx` | Verified | TrustStrip, Products, SipSection, WhyUs, InsuranceBand, FounderNote |
| `components/home/ProductsBento.tsx` | Verified | Bento grid of 7 product categories |
| `components/home/GoalsExplorer.tsx` | Verified | 6-goal photo cards with calculator deep links |
| `components/home/HowItWorksTrack.tsx` | Verified | 4-step horizontal process timeline with animated track |
| `components/home/SipCalculatorCard.tsx` | Verified | Homepage quick SIP calculator with growth area chart |

## 3. Placeholders Status
- **Status:** All unneeded placeholders (`arnRegisteredOn`, `arnValidTill`, `euin`, `irdai` details, `city`, `yearsInPractice`, `familiesServed`, bracketed story text, and grievance placeholders) have been completely removed and replaced with clean, compliant, production-ready copy across the codebase.

