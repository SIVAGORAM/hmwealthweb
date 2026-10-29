# HM Wealth — Developer Onboarding & Modification Guide

## 1. Verified Development Commands

| Task | Command | Description |
|---|---|---|
| **Install Dependencies** | `npm install` | Installs all packages according to `package-lock.json`. |
| **Start Dev Server** | `npm run dev` | Runs Next.js local development server on `http://localhost:3000`. |
| **Type Check** | `npx tsc --noEmit` | Validates TypeScript contracts across all files without generating output files. |
| **Build for Production** | `npm run build` | Compiles and statically optimizes the production bundle. |
| **Start Production Server** | `npm run start` | Runs the compiled Next.js production build locally. |
| **Lint Code** | `npm run lint` | Runs ESLint checks. |

## 2. Common Developer Tasks & Where to Make Changes

### Task A: Updating Contact Info, Founder Details, or AMFI License
- **File to Edit:** `lib/site.ts`
- **Why:** `site.ts` is the single source of truth for the entire application. Modifying phone numbers, email, ARN (`ARN-341412`), EUIN, IRDAI credentials, or hours here automatically updates the Navbar, Hero, Contact page, Footer, and legal disclosures across the entire site.

### Task B: Modifying the Hero Heading or Rotating Headlines
- **File to Edit:** `components/home/Hero.tsx`
- **Why:** The rotating stories array (`STORIES`) and the static intro copy reside in `Hero.tsx`.

### Task C: Modifying Global Colors, Fonts, or Animations
- **File to Edit:** `app/globals.css`
- **Why:** Contains the Tailwind CSS v4 `@theme` block. For example, updating `--color-brand: #0b7a55` alters the primary theme color across all buttons, active tabs, and badges.

### Task D: Adding a New Financial Calculator
- **Step 1:** Define the new calculator ID and mathematical model in `lib/calc.ts` (add to `CalcId`, `CALCS` array with sliders, and implement computation inside `compute()`).
- **Step 2:** In `components/calculators/CalculatorSuite.tsx`, add an icon to `ICONS` matching the new ID.
- The UI automatically generates the tab, sliders, charts, and metric outputs!

### Task E: Adding a New Page Route
- **Step 1:** Create a directory under `app/` (e.g. `app/services/page.tsx`).
- **Step 2:** Export default React component and Next.js `metadata`.
- **Step 3:** Add the route to `nav` in `lib/site.ts` (`{ label: "Services", href: "/services" }`).
- The Navbar and mobile drawer automatically pick up the link and apply active route animations!

## 3. Strict Compliance Guidelines for Developers
Before committing any copy or UI changes, verify against Indian financial regulations:
- **Rule 1:** NEVER use prohibited terms: *advisor/adviser, advisory, consultant, financial planner/planning, wealth manager/management, wealth creator, "best", "No. 1", "guaranteed returns"*.
- **Rule 2:** Always retain the AMFI statutory disclaimer on mutual fund risk.
- **Rule 3:** Keep illustrative return rates on mutual fund calculator sliders capped at 13% per annum as per AMFI guidance.

