"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  TrendingUp, Landmark, Scale, Receipt, Globe2, ShieldCheck, CheckCircle2,
  PhoneCall, Target, Compass, Wallet, LineChart, MessageCircle,
  Smartphone, Headphones, Lock, ArrowRight, Sparkles, ChevronRight,
  Clock, ShieldAlert, Award, Star, Zap, Check, ArrowUpRight, HelpCircle
} from "lucide-react";
import { GrowthChart } from "@/components/charts/GrowthChart";
import { Badge, Button, Card, Container, IconBox, type Tint } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { compute } from "@/lib/calc";
import { site } from "@/lib/site";
import { cn, inr, inrShort } from "@/lib/utils";

/* --------------------------------------------------------------------------
   DATA DEFINITIONS (All User Content Exactly Preserved)
--------------------------------------------------------------------------- */
const steps = [
  {
    num: "01",
    title: "Share Your Goals",
    text: "Tell us what you are saving for, how much you want to invest, and when you will need the money.",
    tag: "Tell Us Your Goals",
    icon: Target,
    tint: "green" as Tint,
    detail: "House down-payment, child education, or retirement milestones.",
  },
  {
    num: "02",
    title: "Compare Your Options",
    text: "We walk you through scheme options with their risks and costs, so you can choose.",
    tag: "Tailored For You",
    icon: Compass,
    tint: "sky" as Tint,
    detail: "A curated shortlist with risks and costs explained in plain English.",
  },
  {
    num: "03",
    title: "Start with Any Amount",
    text: "Start small with an easy monthly SIP (even ₹1,000/month) or invest a lump sum.",
    tag: "From ₹1,000 / mo",
    icon: Wallet,
    tint: "gold" as Tint,
    detail: "100% paperless KYC. Bank auto-debit on the date you choose.",
  },
  {
    num: "04",
    title: "Track & Relax",
    text: "We check your investments regularly and help you make adjustments as your life changes.",
    tag: "Ongoing Support",
    icon: LineChart,
    tint: "lilac" as Tint,
    detail: "Annual portfolio reviews, rebalancing, and support at claim time.",
  },
];

type PlanId = "equity" | "debt" | "hybrid" | "elss" | "nri";

const plans: {
  id: PlanId;
  name: string;
  category: string;
  badge: string;
  bestFor: string;
  howItWorks: string;
  whyChoose: string;
  icon: typeof TrendingUp;
  tint: Tint;
  allocation: { stocks: number; bonds: number; gold?: number };
  horizonYears: string;
  riskRating: string;
  statHighlight: string;
}[] = [
  {
    id: "equity",
    name: "Long-Term Growth (Equity Funds)",
    category: "1. Equity Funds",
    badge: "5+ Years Horizon",
    bestFor: "Buying a home, children's college fund, retirement (5+ years).",
    howItWorks: "Your money is invested in listed Indian companies with the objective of seeking long-term capital growth.",
    whyChoose: "Suited to long-term goals of 5+ years, with higher ups and downs.",
    icon: TrendingUp,
    tint: "green",
    allocation: { stocks: 95, bonds: 5 },
    horizonYears: "5+ Years",
    riskRating: "High (Long-Term Compounding)",
    statHighlight: "Targeted Long-Term Capital Growth",
  },
  {
    id: "debt",
    name: "Capital Preservation Focus (Debt & Liquid Funds)",
    category: "2. Debt & Liquid Funds",
    badge: "1 to 3 Years Horizon",
    bestFor: "Emergency savings, holidays, or goals coming up in 1 to 3 years.",
    howItWorks: "Your money goes into high-quality government securities and corporate debt instruments designed for lower volatility.",
    whyChoose: "Much better flexibility than fixed deposits, with easy withdrawals anytime.",
    icon: Landmark,
    tint: "sky",
    allocation: { stocks: 0, bonds: 100 },
    horizonYears: "1 to 3 Years",
    riskRating: "Low to Moderate Risk",
    statHighlight: "Instant Withdrawal Flexibility",
  },
  {
    id: "hybrid",
    name: "Best of Both Worlds (Balanced / Hybrid Funds)",
    category: "3. Balanced / Hybrid Funds",
    badge: "Balanced Growth",
    bestFor: "Investors who want good growth without big market ups and downs.",
    howItWorks: "Mixes debt securities with equities. When stocks fluctuate, bonds provide stability to cushion portfolio movements.",
    whyChoose: "Smooth, disciplined investing for long-term peace of mind.",
    icon: Scale,
    tint: "lilac",
    allocation: { stocks: 65, bonds: 35 },
    horizonYears: "3 to 5 Years",
    riskRating: "Moderate Risk",
    statHighlight: "Cushioned Against Volatility",
  },
  {
    id: "elss",
    name: "Save Tax & Grow (ELSS Tax Saver)",
    category: "4. ELSS Tax Saver",
    badge: "Section 80C Benefit",
    bestFor: "Anyone paying income tax under the old tax regime (Section 80C).",
    howItWorks: "Save up to ₹46,800 in tax every year while growing your money in the market.",
    whyChoose: "Only has a 3-year lock-in—the shortest among all tax-saving options in India.",
    icon: Receipt,
    tint: "gold",
    allocation: { stocks: 90, bonds: 10 },
    horizonYears: "3-Year Lock-in",
    riskRating: "Equity Growth + Tax Shield",
    statHighlight: "Save up to ₹46,800 Tax / yr",
  },
  {
    id: "nri",
    name: "NRI Investment Desk (For Indians Abroad)",
    category: "5. NRI Desk",
    badge: "For Indians Abroad",
    bestFor: "Non-Resident Indians who want to invest back home in India.",
    howItWorks: "100% paperless account setup with full support for NRE and NRO bank accounts.",
    whyChoose: "Tap into India’s growing economy easily from anywhere in the world.",
    icon: Globe2,
    tint: "peach",
    allocation: { stocks: 80, bonds: 20 },
    horizonYears: "Any Horizon",
    riskRating: "Direct INR India Growth",
    statHighlight: "NRE / NRO Full Support",
  },
];

const reasons = [
  {
    icon: ShieldCheck,
    title: "Objective Guidance, Always",
    text: "We explain options based on your needs, and disclose our commission on request.",
    badge: "Client-Centric",
    tint: "green" as Tint,
  },
  {
    icon: Smartphone,
    title: "100% Digital & Paperless",
    text: "Open your account, set up monthly payments, and check your balance right from your phone.",
    badge: "10-Min Onboarding",
    tint: "sky" as Tint,
  },
  {
    icon: Headphones,
    title: "Real Human Support",
    text: "Whenever you have a question, talk directly to a real person—no annoying automated robots.",
    badge: "Real Team",
    tint: "lilac" as Tint,
  },
  {
    icon: Lock,
    title: "Direct Folios in Your Name",
    text: "Your money goes straight to verified mutual fund companies, not into our pockets.",
    badge: "Direct Folios",
    tint: "gold" as Tint,
  },
];

const faqs = [
  {
    q: "Can I start with a small amount?",
    a: "Yes! You can start a monthly SIP with as little as ₹1,000 or ₹2,000 per month. You can increase or stop it anytime.",
    highlight: "Start from just ₹1,000/month with zero penalty to pause.",
  },
  {
    q: "Can I take my money out whenever I want?",
    a: "Yes. For most mutual funds, you can withdraw your money online anytime. The money reaches your bank account in 1 to 2 working days.",
    highlight: "Direct online redemption to your verified bank in 1-2 days.",
  },
  {
    q: "What is an SIP?",
    a: "SIP stands for Systematic Investment Plan. It just means investing a fixed amount every month automatically from your bank, like a digital piggy bank that grows with interest.",
    highlight: "Automated monthly compounding without timing the market.",
  },
];

/* --------------------------------------------------------------------------
   PAGE COMPONENT
--------------------------------------------------------------------------- */
export default function InvestmentsPage() {
  // Hero Interactive Micro-SIP visualizer state
  const [sipAmount, setSipAmount] = useState(5000);
  const [sipYears, setSipYears] = useState(15);
  const sipResult = useMemo(() => compute("sip", { amount: sipAmount, rate: 12, years: sipYears }), [sipAmount, sipYears]);

  // Section 3 Active Plan Navigator State
  const [activePlanId, setActivePlanId] = useState<PlanId>("equity");
  const activePlan = plans.find((p) => p.id === activePlanId) || plans[0];

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white text-ink selection:bg-mint-2 selection:text-ink">
      {/* =========================================================================
          SECTION 1: HERO — "THE MODERN WEALTH PORTAL" (Clean, Luxury Light Canvas)
      ========================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef8f3]/80 via-[#f8fcfa]/60 to-white pb-2 pt-1.5 sm:pb-2.5 sm:pt-2">
        {/* subtle atmospheric mesh glow */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[540px] rounded-full bg-[#19c38a]/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -left-28 top-1/3 -z-10 size-[440px] rounded-full bg-gold/15 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3] [background-image:linear-gradient(#e3ebe7_1px,transparent_1px),linear-gradient(90deg,#e3ebe7_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

        <Container className="relative">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
            <Link href="/" className="transition hover:text-brand">Home</Link>
            <ChevronRight className="size-3.5 text-body/40" />
            <span className="text-ink">Investments</span>
          </nav>

          <div className="grid max-w-3xl items-center gap-8">
            {/* Left Content */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* small badge */}
              <div className="inline-flex w-fit max-w-full items-center gap-2.5 rounded-full border border-brand/20 bg-white/90 px-4 py-1 text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-brand shadow-[0_2px_12px_-4px_rgba(11,122,85,0.2)] backdrop-blur-md whitespace-nowrap">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                EASY &amp; HONEST INVESTING
              </div>

              {/* main heading */}
              <h1 className="text-[30px] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink xs:text-[33px] sm:text-[50px] xl:text-[58px]">
                Make Your Money Work For You.{" "}
                <span className="block bg-gradient-to-r from-brand via-[#19c38a] to-[#c98a12] bg-clip-text text-transparent">
                  One Simple Step at a Time.
                </span>
              </h1>

              {/* sub-headline */}
              <p className="max-w-[54ch] text-[15px] leading-relaxed text-body sm:text-[18px]">
                Whether you want to buy a home, plan for your child&apos;s education, or retire comfortably, we explain mutual fund options in plain words, without confusing financial terms.
              </p>

              {/* CTA actions */}
              <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Button href="/contact" className="group relative min-h-12 overflow-hidden px-6 text-[15px] sm:min-h-14 sm:px-8 sm:text-[16px] shadow-[0_16px_32px_-12px_rgba(11,122,85,0.5)]">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <PhoneCall className="relative size-[18px]" />
                  <span className="relative">Book a free call</span>
                  <ArrowRight className="relative size-[18px] transition group-hover:translate-x-1" />
                </Button>
                <a
                  href="#options"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white/80 px-5 text-[15px] sm:min-h-14 sm:px-7 sm:text-[15.5px] font-bold text-ink shadow-sm backdrop-blur transition hover:border-brand/40 hover:bg-white"
                >
                  <span>Explore Plans</span>
                  <ChevronRight className="size-4 text-body" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Highlights: 3 Glass Trust Cards */}
          <div className="m-rail mt-2.5 sm:mt-3 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Registered with AMFI",
                subtitle: "SEBI-regulated fund houses",
                desc: "Officially registered mutual fund distributor following AMFI and SEBI guidelines.",
                icon: ShieldCheck,
                badge: "Govt Regulated",
              },
              {
                title: "Zero Hidden Charges",
                subtitle: "Complete honesty with your money",
                desc: "You pay zero direct client fees. Transparent commission from fund houses on regular plans.",
                icon: CheckCircle2,
                badge: "100% Transparent",
              },
              {
                title: "Clear, Transparent Guidance",
                subtitle: "No pushy sales talk",
                desc: "We listen to your life goals first and explain options in plain, calm language.",
                icon: Headphones,
                badge: "Friendly Support",
              },
            ].map((h) => (
              <div
                key={h.title}
                className="group relative flex flex-col justify-between gap-3 rounded-3xl border border-line bg-white/90 p-6 shadow-card backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <h.icon className="size-5" />
                    </span>
                    <span className="rounded-full bg-soft px-3 py-1 text-[11px] font-bold text-brand ring-1 ring-line">
                      {h.badge}
                    </span>
                  </div>
                  <p className="mt-4 text-[17px] font-extrabold text-ink">{h.title}</p>
                  <p className="text-[13.5px] font-semibold text-brand">{h.subtitle}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-body">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* =========================================================================
          SECTION 3: SIMPLE INVESTMENT OPTIONS (Interactive Plan Navigator)
      ========================================================================== */}
      <section id="options" className="relative overflow-hidden bg-soft py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <Sparkles className="size-3.5" /> PLAN SELECTOR
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              Choose the Plan That Fits Your Life
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              Pick based on when you need your money and what you want to achieve.
            </p>
          </div>

          {/* Interactive Plan Switcher Bar */}
          <div className="mt-2 sm:mt-2.5 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="Investment options"
              className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-line bg-white p-1.5 shadow-card"
            >
              {plans.map((p) => {
                const isSelected = activePlanId === p.id;
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActivePlanId(p.id)}
                    className={cn(
                      "relative flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-[13.5px] font-bold transition-colors",
                      isSelected ? "text-white" : "text-body hover:text-ink"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="active-plan-pill"
                        className="absolute inset-0 rounded-xl bg-brand shadow-md"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <Icon className="relative size-4" />
                    <span className="relative whitespace-nowrap">{p.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Featured Plan Spotlight Card */}
          <div className="mt-3 sm:mt-3.5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-[28px] sm:rounded-[32px] border border-line bg-white p-5 shadow-lift sm:p-7"
              >
                <div className="grid gap-6 lg:grid-cols-[1.2fr_0.9fr] lg:gap-8">
                  {/* Left Column: Details */}
                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <IconBox tint={activePlan.tint} className="size-11">
                          <activePlan.icon className="size-5" />
                        </IconBox>
                        <span className="rounded-full bg-soft px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-ink ring-1 ring-line">
                          {activePlan.badge}
                        </span>
                        <span className="rounded-full bg-mint px-3 py-0.5 text-xs font-bold text-brand">
                          {activePlan.statHighlight}
                        </span>
                      </div>

                      <h3 className="mt-3 text-[22px] font-extrabold text-ink sm:text-[28px]">
                        {activePlan.name}
                      </h3>

                      {/* Best For callout */}
                      <div className="mt-3 rounded-2xl bg-soft p-3 sm:p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-body">Best For</p>
                        <p className="mt-0.5 text-[14.5px] font-semibold text-ink">{activePlan.bestFor}</p>
                      </div>

                      {/* How It Works */}
                      <div className="mt-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-body">How it works</p>
                        <p className="mt-0.5 text-[14px] leading-relaxed text-body">{activePlan.howItWorks}</p>
                      </div>

                      {/* Why Choose It */}
                      <div className="mt-3 rounded-2xl border border-mint-2 bg-mint/50 p-3 sm:p-3.5">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-brand">Why choose it</p>
                        <p className="mt-0.5 text-[14px] font-semibold text-ink">{activePlan.whyChoose}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap sm:items-center">
                      <Button href="/contact" className="w-full justify-center gap-2 shadow-md sm:w-auto min-h-11 text-sm">
                        <PhoneCall className="size-4" />
                        <span>Ask about this option</span>
                      </Button>
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-4 text-[13.5px] font-bold text-ink transition hover:border-brand/40 sm:w-auto"
                      >
                        <MessageCircle className="size-4" />
                        <span>Ask on WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Visual Breakdown Card */}
                  <div className="flex flex-col justify-between gap-4 rounded-2xl sm:rounded-3xl border border-line bg-gradient-to-br from-soft to-white p-4 sm:p-5">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-body">Plan Architecture</p>
                      <p className="mt-0.5 text-lg font-extrabold text-ink">Asset Composition</p>

                      {/* Bar Allocation */}
                      <div className="mt-3">
                        <div className="flex justify-between text-xs font-bold text-body">
                          <span>Stocks / Equity ({activePlan.allocation.stocks}%)</span>
                          <span>Bonds / Debt ({activePlan.allocation.bonds}%)</span>
                        </div>
                        <div className="mt-1.5 flex h-2.5 overflow-hidden rounded-full bg-line">
                          <div
                            className="bg-brand transition-all duration-500"
                            style={{ width: `${activePlan.allocation.stocks}%` }}
                          />
                          <div
                            className="bg-sky-ink transition-all duration-500"
                            style={{ width: `${activePlan.allocation.bonds}%` }}
                          />
                        </div>
                      </div>

                      {/* Metrics cards */}
                      <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
                        <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                          <p className="font-medium text-body">Suggested Horizon</p>
                          <p className="mt-0.5 text-[14px] font-extrabold text-ink">{activePlan.horizonYears}</p>
                        </div>
                        <div className="rounded-xl border border-line bg-white p-3 shadow-xs">
                          <p className="font-medium text-body">Risk Profile</p>
                          <p className="mt-0.5 text-[14px] font-extrabold text-ink">{activePlan.riskRating.split(" ")[0]}</p>
                        </div>
                      </div>

                      {/* Features list */}
                      <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-3 text-[13px]">
                        <li className="flex items-center gap-2 text-ink font-medium">
                          <Check className="size-3.5 text-brand" /> Zero lock-in on standard open-ended plans
                        </li>
                        <li className="flex items-center gap-2 text-ink font-medium">
                          <Check className="size-3.5 text-brand" /> Units credited directly in your own folio
                        </li>
                        <li className="flex items-center gap-2 text-ink font-medium">
                          <Check className="size-3.5 text-brand" /> Portfolio review every year
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl bg-mint p-2.5 text-center text-xs font-bold text-brand">
                      ✓ No separate client fees · Paperless portfolio onboarding
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Quick-browse cards for remaining plans */}
          <div className="m-rail mt-3.5 sm:mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {plans
              .filter((p) => p.id !== activePlanId)
              .slice(0, 4)
              .map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePlanId(p.id)}
                  className="group flex flex-col justify-between gap-2.5 rounded-2xl border border-line bg-white p-4 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand">{p.badge}</span>
                    <ArrowUpRight className="size-3.5 text-body transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                  </div>
                  <p className="text-[14.5px] font-bold text-ink leading-snug">{p.name}</p>
                  <p className="text-xs text-body line-clamp-2">{p.bestFor}</p>
                </button>
              ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: WHY CHOOSE HM WEALTH? (The Trust Matrix)
      ========================================================================== */}
      <section className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
              <Award className="size-3.5" /> REPUTATION &amp; INTEGRITY
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              Why People Trust HM Wealth
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              We operate on honesty, digital convenience, and long-term personal commitment.
            </p>
          </div>

          {/* 4 Cards Matrix */}
          <div className="m-rail mt-2 sm:mt-2.5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-soft text-brand ring-1 ring-line transition-transform duration-300 group-hover:scale-105 group-hover:bg-mint">
                      <r.icon className="size-5 text-brand" />
                    </span>
                    <span className="rounded-full bg-soft px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-body ring-1 ring-line">
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[17px] font-extrabold text-ink leading-snug">{r.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-body">{r.text}</p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-brand">
                  <CheckCircle2 className="size-3.5" /> Verified Commitment
                </div>
              </div>
            ))}
          </div>

          {/* Peace of mind reassurance bar */}
          <div className="mt-2 sm:mt-2.5 rounded-2xl sm:rounded-3xl border border-line bg-gradient-to-r from-soft via-mint/40 to-soft p-3.5 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink">Zero separate client fees. AMFI-registered distributor.</p>
                  <p className="text-xs sm:text-sm text-body">We share the commission structure for any scheme upon your request.</p>
                </div>
              </div>
              <Button href="/contact" className="gap-2 min-h-10 text-xs sm:text-sm px-4 sm:px-5 py-2">
                <span>Book a Free Call</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: SIMPLE FAQS (Clean Editorial Q&A with Live Help Desk)
      ========================================================================== */}
      <section className="relative overflow-hidden bg-soft py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.3fr] lg:gap-10">
            {/* Left: Help Desk Callout */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand shadow-xs">
                <HelpCircle className="size-3.5" /> SIMPLE FAQS
              </span>

              <h2 className="text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[38px]">
                Questions,<br />
                <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">
                  answered simply.
                </span>
              </h2>

              <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-body">
                The top things investors ask us before making their first investment, explained in plain language.
              </p>

              {/* Live Support Box */}
              <div className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-xs font-extrabold text-white ring-2 ring-mint">
                    HS
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-ink">{site.founder}</p>
                    <p className="text-xs text-body">Founder · Direct Investor Support</p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-brand">
                  <span className="size-2 rounded-full bg-brand animate-pulse" /> Direct Desk Support
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={site.phoneHref}
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-brand text-xs font-bold text-white transition hover:bg-brand-dark"
                  >
                    <PhoneCall className="size-3.5" /> Call us
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-line bg-soft text-xs font-bold text-ink transition hover:bg-white"
                  >
                    <MessageCircle className="size-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Custom Rich Accordion */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {faqs.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={f.q}
                    className="overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition-colors duration-200"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-3 p-4 sm:p-5 text-left"
                    >
                      <span className="text-[15.5px] font-extrabold text-ink sm:text-[17px]">
                        {f.q}
                      </span>
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 text-sm",
                          isOpen ? "rotate-45 border-brand bg-brand text-white" : "border-line bg-soft text-ink"
                        )}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-line px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                            <p className="text-[14px] sm:text-[15px] leading-relaxed text-body">{f.a}</p>
                            <div className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-mint px-2.5 py-1 text-xs font-bold text-brand">
                              <Zap className="size-3.5" /> {f.highlight}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: BOTTOM BANNER (Start Your Journey Today)
      ========================================================================== */}
      <section className="py-2 sm:py-2.5 bg-white">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px] border border-brand/20 bg-gradient-to-br from-mint/70 via-white to-soft px-5 py-5 sm:px-8 sm:py-7 shadow-card">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 size-80 rounded-full bg-gold/15 blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-2xs">
                  <Star className="size-3.5 text-gold" /> START TODAY
                </span>
                <h2 className="mt-2.5 text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]">
                  Ready to start growing your money?
                </h2>
                <p className="mt-1.5 text-[15px] sm:text-[16px] leading-relaxed text-body">
                  Talk to HM Wealth today. The first call is free and friendly.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-body">
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> Free 15-Minute Consultation</span>
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> Zero Obligations</span>
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> AMFI Registered MFD</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  className="min-h-12 px-7 text-[15px] font-bold"
                >
                  <PhoneCall className="size-4" />
                  <span>Start Investing Today</span>
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href={site.whatsappHref}
                  external
                  variant="outline"
                  className="min-h-12 px-6 text-[15px] border-brand/30 hover:bg-mint hover:border-brand"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                  <span>WhatsApp us</span>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
