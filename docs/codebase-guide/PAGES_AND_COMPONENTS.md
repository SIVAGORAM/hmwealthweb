# HM Wealth — Pages, Screens & Component Trees

## 1. Implemented Routes & Component Hierarchies

### Route 1: `/` (Home Page — `app/page.tsx`)
```
HomePage
├── Navbar (Sticky, scroll-reactive, animated active pill, mobile drawer)
├── Hero
│   ├── Registration Badge (Pulsing indicator, ARN link)
│   ├── Dynamic Headline & Goal Carousel (Auto-rotating 4 stories)
│   ├── Primary CTA (Start your SIP, Try SIP calculator)
│   ├── Trust Avatars & Story Progress Bars (Play/Pause control)
│   ├── Floating Goal Progress Card (Parallax spring motion)
│   └── 3D CSS Rupee Coin (10-layer CSS 3D rotating cylinder)
├── TrustStrip (4 trust badges: AMFI, Paperless KYC, In your name, Real people)
├── Products (ProductsBento — 7 editorial bento tiles)
├── SipSection
│   ├── Value proposition copy & facts cards
│   └── SipCalculatorCard (Quick sliders + real-time animated SVG area chart)
├── Goals (GoalsExplorer — 6 goal photo cards with duration tags & links)
├── HowItWorks (HowItWorksTrack — 4-step horizontal process with gradient line)
├── WhyUs (Photo with floating commission, asset allocation & lock cards)
├── InsuranceBand (Dark green banner linking to health, life, motor, business)
├── FounderNote (Founder quote block with credentials)
├── FAQ Section (Left: Still have a question card; Right: Faq accordion)
├── CtaBand (Free discovery call & WhatsApp CTA)
└── Footer (Navigation columns, contacts, mandatory disclosures, giant wordmark)
```

### Route 2: `/investments` (Mutual Funds — `app/investments/page.tsx`)
```
InvestmentsPage
├── PageHero (Breadcrumb, intro, preview card with 15-yr SIP growth chart)
├── Categories Section (6 fund cards: Equity, Debt, Hybrid, Index, ELSS, Gold)
├── Ways to Invest Section (SIP feature panel + Lumpsum, STP, SWP, Step-up SIP cards)
├── Riskometer Section (Interactive 6-tier SEBI Riskometer with spring needle)
├── Getting Started Section (Steps: KYC, Set goal, Choose funds, Track & review)
├── NRI Investing Band (NRE/NRO eligibility card)
├── FAQ Section (5 investment FAQs)
├── CtaBand
└── Footer
```

### Route 3: `/insurance` (Insurance — `app/insurance/page.tsx`)
```
InsurancePage
├── PageHero (Breadcrumb, intro, 4 floating category preview tiles)
├── Types Section (6 insurance cards: Term, Health, Motor, Business, Group, Travel)
├── Why Insure With Us (Comparison, fine print clarity, claim support, renewal reminders)
├── Claims Made Simple (Dark banner with 4-step claim process: Tell us -> Settle)
├── Download Policy Band (Insurer download or WhatsApp assistance)
├── FAQ Section (4 insurance FAQs)
├── CtaBand
└── Footer
```

### Route 4: `/calculators` (Financial Calculators — `app/calculators/page.tsx`)
```
CalculatorsPage
├── PageHero (Breadcrumb, title, intro)
├── Calculator Section (Suspense boundary)
│   └── CalculatorSuite
│       ├── Tablist (SIP, Lumpsum, Step-up SIP, SWP, Loan EMI, Goal SIP)
│       ├── Input Panel (Dynamic range sliders, active fill, Donut chart)
│       └── Output Panel (Animated counter, summary metrics, GrowthChart, CTA)
├── Good to Know Section (3 informational cards: Maths, What's not included, Next step)
├── CtaBand
└── Footer
```

### Route 5: `/about` (About HM Wealth — `app/about/page.tsx`)
```
AboutPage
├── PageHero (Breadcrumb, 4 metric stat cards: Experience, Families, Funds, Insurers)
├── Our Story Section (Photo of Indian family home + Founder story narrative)
├── Our Values Section (4 cards: You come first, Full transparency, Patience, Simple words)
├── Registrations Section (Verified cards for AMFI ARN, IRDAI licence, EUIN)
├── How We Are Paid Section (Detailed commission disclosure card)
├── Our Journey Timeline (Vertical milestone timeline)
├── CtaBand
└── Footer
```

### Route 6: `/contact` (Contact Us — `app/contact/page.tsx`)
```
ContactPage
├── PageHero (Breadcrumb, title, intro)
├── Quick Contact Cards (Call us, WhatsApp, Email)
├── Main Section
│   ├── ContactForm (Interactive validated form with automated WhatsApp submission)
│   └── Reach Us Directly (Hours, direct phone/email, AMFI ARN card)
├── Investor Grievance Section (Grievance officer, SEBI SCORES, SMART ODR escalation)
├── FAQ Section (Pre-call FAQ)
└── Footer
```

### Route 7: `not-found.tsx` (404 Error Screen)
- Clean, minimal 404 message with a direct link button back to `/`.

