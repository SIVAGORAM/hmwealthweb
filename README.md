# hmwealthweb

**HM Wealth** — Production-grade wealth distribution & financial protection platform built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Motion, and Lucide icons.

## Overview
- **ARN**: 341412 (AMFI-Registered Mutual Fund Distributor)
- **Features**: Interactive Compounding & Wealth Studio (10 models), SIP Calculators, Family & Business Insurance Guides, Regulatory Grievance Portal, and Statutory Compliance Framework.

## Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## Production Build & Tests
```bash
npx tsc --noEmit
npm run build
npx tsx tests/finance-math.test.ts
```

## Regulatory Compliance
- Full adherence to AMFI Code of Conduct for Mutual Fund Distributors and SEBI IA Regulations 2013 (Reg 3(3) nomenclature).
- Mandatory disclaimers, ARN-341412 identification, trail commission disclosures, and multi-tier investor grievance redressal (Level 1: Support Desk, Level 2: Principal Officer, Level 3: SEBI SCORES & SMART ODR).
- Zero fee-based advisory claims and zero return guarantees.

## Architecture
- `app/` — App Router pages (`/`, `/investments`, `/insurance`, `/calculators`, `/about`, `/contact`, `/risk-factors`, `/terms-conditions`, `/investor-grievance`, `/important-links`, `/privacy-policy`)
- `components/calculators/` — WealthStudio and actuarial mathematical engines
- `components/home/` — Hero, ProductsBento, SipCalculatorCard, GoalsExplorer, HowItWorksTrack, and FounderNote
- `components/layout/` — Navbar, Footer, and regulatory identification blocks
- `components/sections/` — CtaBand, Faq, and reusable layout sections
- `components/ui/` — Design system primitives (Button, Badge, Card, Container, Reveal)
- `lib/` — Actuarial math, site config, regulatory disclosures, and assets
