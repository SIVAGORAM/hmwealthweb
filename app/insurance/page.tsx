"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck, HeartPulse, Car, Plane, Building2, Users, CheckCircle2,
  PhoneCall, MessageCircle, FileText, Stethoscope, Laptop, Calculator,
  Scale, ArrowRight, Sparkles, ChevronRight, Clock, Check, Hospital,
  AlertCircle, Briefcase, UserCheck, HelpCircle, FileCheck, Send, Zap
} from "lucide-react";
import { Badge, Button, Card, Container, IconBox, Section, SectionTitle, type Tint } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";


const personalPlans = [
  {
    id: "term",
    name: "1. Term Life Insurance (Family Income Safety)",
    tag: "High Cover · Low Cost",
    whatItIs: "Pure life insurance for you.",
    whyYouNeedIt:
      "If something happens to you, your family gets a large lump sum so they can pay bills, finish school, and live without money worries.",
    goodToKnow: "Very low cost—often costs less than a cup of tea a day.",
    icon: ShieldCheck,
    tint: "green" as Tint,
    badgeColor: "bg-mint text-brand",
    sampleCost: "₹18 / day for ₹1 Cr cover",
  },
  {
    id: "health",
    name: "2. Health Insurance (Hospital Bill Cover)",
    tag: "Cashless Hospitalization",
    whatItIs: "Protection against big medical bills.",
    whyYouNeedIt:
      "Covers doctor fees, surgeries, hospital room costs, and medicines so you never have to break your fixed deposits or sell jewelry for medical treatment.",
    goodToKnow: "Cashless hospital treatment across top hospitals in India.",
    icon: HeartPulse,
    tint: "peach" as Tint,
    badgeColor: "bg-peach text-peach-ink",
    sampleCost: "Cashless at network hospitals",
  },
  {
    id: "motor",
    name: "3. Car & Bike Insurance (Vehicle Safety)",
    tag: "Instant Online Renewal",
    whatItIs: "Full protection for your car or two-wheeler.",
    whyYouNeedIt:
      "Covers damages from accidents, floods, fire, or theft, plus third-party legal protection.",
    goodToKnow: "Cashless repairs at authorized garages with fast claim approvals.",
    icon: Car,
    tint: "sky" as Tint,
    badgeColor: "bg-sky text-sky-ink",
    sampleCost: "Cashless repairs & zero-dep options",
  },
  {
    id: "travel",
    name: "4. Travel Insurance (Trip Cover)",
    tag: "Domestic & International",
    whatItIs: "Stress-free trips inside India and overseas.",
    whyYouNeedIt:
      "Covers medical emergencies abroad, lost baggage, flight delays, and emergency cancellations.",
    goodToKnow: "Required for Schengen and international visas.",
    icon: Plane,
    tint: "lilac" as Tint,
    badgeColor: "bg-lilac text-lilac-ink",
    sampleCost: "Mandatory for Schengen & US/UK visas",
  },
];

const businessPlans = [
  {
    title: "1. Group Health Cover for Employees",
    desc: "Give your team cashless hospital cover. Pre-existing disease cover as per policy terms. Includes maternity and newborn baby care. Helps you attract and keep the best workers.",
    points: [
      "Cashless hospitalization for your entire team",
      "Pre-existing disease cover as per policy terms",
      "Includes maternity and newborn baby care",
      "Helps you attract and retain top talent",
    ],
    badge: "For Teams of 5 to 500+",
    icon: Users,
  },
  {
    title: "2. Key Person & Partner Cover",
    desc: "Protects your business if a business partner or top leader falls seriously ill. Keeps your business running smoothly without cash flow shocks.",
    points: [
      "Protects profits if a vital partner or leader falls ill",
      "Safeguards business continuity and credit rating",
      "Prevents sudden cash flow shocks to the company",
      "Can be owned by the company with tax benefits",
    ],
    badge: "Business Continuity",
    icon: Building2,
  },
];

const professionals = [
  {
    role: "Doctors & Surgeons",
    icon: Stethoscope,
    desc: "Protects against patient complaints, clinical negligence claims, and medical lawsuits.",
    tint: "peach" as Tint,
  },
  {
    role: "IT Consultants & Agencies",
    icon: Laptop,
    desc: "Covers software bugs, milestone delays, intellectual property issues, or server data claims.",
    tint: "sky" as Tint,
  },
  {
    role: "CAs & Tax Consultants",
    icon: Calculator,
    desc: "Protects against inadvertent calculation errors, tax filing disputes, and audit liabilities.",
    tint: "gold" as Tint,
  },
  {
    role: "Lawyers & Legal Advisors",
    icon: Scale,
    desc: "Covers legal defense costs, client disputes, and breach of professional duty allegations.",
    tint: "lilac" as Tint,
  },
];

const claimSteps = [
  {
    num: "01",
    title: "One Phone Call",
    desc: "Just call or WhatsApp us as soon as someone goes to the hospital. We are ready to help.",
    icon: PhoneCall,
  },
  {
    num: "02",
    title: "We Talk to the Hospital",
    desc: "Our team coordinates directly with the hospital desk and insurance TPA for cashless approval.",
    icon: Hospital,
  },
  {
    num: "03",
    title: "Claim Support",
    desc: "We check all your documents to ensure the insurer processes the claim smoothly without unfair rejections.",
    icon: CheckCircle2,
  },
];

const insuranceFaqs = [
  {
    q: "I already have health insurance from my office. Do I still need personal cover?",
    a: "Yes! Company insurance stops the day you leave your job. Also, company cover is usually small (₹3–5 Lakhs) and has limits on room rent. Having your own policy provides continuous lifelong protection.",
    takeaway: "Lifelong coverage that stays with you regardless of job changes.",
  },
  {
    q: "What does 'Cashless Hospitalization' mean?",
    a: "It means you don't have to pay the hospital bill yourself. The insurance company pays the hospital directly, as long as you go to a network hospital.",
    takeaway: "Hospital bill settled directly by insurer with zero out-of-pocket stress.",
  },
  {
    q: "What is the right age to buy life and health insurance?",
    a: "The earlier, the better. When you are young and healthy, premiums are super low and you get approved with zero medical tests.",
    takeaway: "Locks in lowest lifetime premiums with instant no-medical approval.",
  },
];

export default function InsurancePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="bg-white text-ink selection:bg-mint-2 selection:text-ink">
      {/* =========================================================================
          SECTION 1: HERO (Clean, Modern & Premium Protection Portal)
      ========================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef8f3]/80 via-[#f8fcfa]/60 to-white pb-2 pt-1.5 sm:pb-2.5 sm:pt-2">
        {/* atmospheric background glow */}
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-[520px] rounded-full bg-[#19c38a]/15 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute -left-28 top-1/3 -z-10 size-[440px] rounded-full bg-sky/30 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.3] [background-image:linear-gradient(#e3ebe7_1px,transparent_1px),linear-gradient(90deg,#e3ebe7_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

        <Container className="relative">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-1.5 sm:mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-body">
            <Link href="/" className="transition hover:text-brand">Home</Link>
            <ChevronRight className="size-3.5 text-body/40" />
            <span className="text-ink">Insurance</span>
          </nav>

          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-col gap-3.5 sm:gap-4">
              {/* small badge */}
              <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-brand/20 bg-white/90 px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand shadow-[0_2px_12px_-4px_rgba(11,122,85,0.2)] backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                PROTECT WHAT MATTERS
              </div>

              {/* main heading */}
              <h1 className="text-[30px] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink xs:text-[33px] sm:text-[50px] xl:text-[58px]">
                Keep Your Family Safe.{" "}
                <span className="block bg-gradient-to-r from-brand via-[#19c38a] to-[#2f6fd6] bg-clip-text text-transparent">
                  No Matter What Happens.
                </span>
              </h1>

              {/* sub-headline */}
              <p className="max-w-[54ch] text-[15px] leading-relaxed text-body sm:text-[18px]">
                A medical emergency or unexpected event shouldn&apos;t wipe out your hard-earned savings. We help you pick the right insurance cover with no hidden tricks or fine print.
              </p>

              {/* CTA buttons */}
              <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Button href="/contact" className="group relative min-h-12 overflow-hidden px-6 text-[15px] sm:min-h-14 sm:px-8 sm:text-[16px] shadow-[0_16px_32px_-12px_rgba(11,122,85,0.5)]">
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                  <ShieldCheck className="relative size-[18px]" />
                  <span className="relative">Find the Right Cover (Free)</span>
                  <ArrowRight className="relative size-[18px] transition group-hover:translate-x-1" />
                </Button>

                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white/80 px-5 text-[15px] sm:min-h-14 sm:px-7 sm:text-[15.5px] font-bold text-ink shadow-sm backdrop-blur transition hover:border-brand/40 hover:bg-white"
                >
                  <MessageCircle className="size-5 text-brand" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Modern Family Protection Shield Card */}
            <div className="relative">
              <div aria-hidden className="absolute -inset-3 rounded-[36px] bg-gradient-to-br from-brand-bright/20 via-sky/30 to-mint/40 blur-2xl" />

              <div className="relative rounded-[32px] border border-white bg-white/95 p-5 sm:p-8 shadow-[0_30px_70px_-20px_rgba(15,31,26,0.12)] backdrop-blur-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-10 items-center justify-center rounded-2xl bg-mint text-brand">
                      <ShieldCheck className="size-5" />
                    </span>
                    <div>
                      <p className="text-[15px] font-bold text-ink">Family Security Shield</p>
                      <p className="text-[12px] text-body">Complete life &amp; health protection</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-mint px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">
                    Active Cover
                  </span>
                </div>

                {/* Plan Highlights inside visual */}
                <div className="mt-5 flex flex-col gap-3">
                  <div className="rounded-2xl border border-line bg-soft/70 p-4 transition hover:bg-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-body">Term Life Income Shield</span>
                      <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-bold text-brand">Term</span>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold text-ink">Protects family income, loans &amp; education</p>
                    <p className="mt-1 text-xs text-body/80">Premium depends on age, health and cover chosen</p>
                  </div>

                  <div className="rounded-2xl border border-line bg-soft/70 p-4 transition hover:bg-soft">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-body">Health Hospitalization</span>
                      <span className="rounded-full bg-sky px-2 py-0.5 text-[11px] font-bold text-sky-ink">Cashless</span>
                    </div>
                    <p className="mt-1 text-[14px] font-semibold text-ink">Surgeries, room rent, doctor fees covered</p>
                    <p className="mt-1 text-xs text-body/80">Direct settlement at the insurer’s network hospitals</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 rounded-2xl bg-gradient-to-r from-mint to-sky/40 p-4 text-xs font-bold text-ink">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <span className="flex items-center gap-1.5"><Hospital className="size-4 text-brand" /> Cashless Network Hospitals</span>
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="size-4 text-brand" /> 100% Paperless</span>
                  </div>
                </div>

                <p className="mt-4 text-center text-[11.5px] text-body/80">
                  Multiple top insurers compared side by side with zero hidden clauses.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Highlights: 3 Clean Glass Cards */}
          <div className="m-rail mt-4 sm:mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Cashless Network Hospitals",
                desc: "Walk in with your health card. The insurer pays the hospital bill directly without cash hassle.",
                icon: Hospital,
                badge: "Cashless Network",
              },
              {
                title: "We Help You with Claims",
                desc: "We coordinate with the hospital TPA desk and handle paperwork so your claim is paid smoothly.",
                icon: Users,
                badge: "Paperwork Handled",
              },
              {
                title: "No Hidden Terms",
                desc: "We explain waiting periods, room-rent caps, and exclusions in plain, straightforward English.",
                icon: CheckCircle2,
                badge: "100% Plain Words",
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
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 2: PERSONAL & FAMILY PLANS (4 Unified, High-End Cards)
      ========================================================================== */}
      <section id="family-plans" className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
              <ShieldCheck className="size-3.5" /> PERSONAL &amp; FAMILY
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              Protection Plans for You and Your Family
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              Simple, affordable plans that give you complete peace of mind.
            </p>
          </div>

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {personalPlans.map((p, i) => (
              <div
                key={p.id}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-card sm:p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-lift"
              >
                <div className="flex flex-col gap-4">
                  {/* top row */}
                  <div className="flex items-center justify-between">
                    <IconBox tint={p.tint} className="size-12">
                      <p.icon className="size-6" />
                    </IconBox>
                    <span className={cn("rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider", p.badgeColor)}>
                      {p.tag}
                    </span>
                  </div>

                  <h3 className="text-[19px] font-extrabold leading-tight text-ink">
                    {p.name}
                  </h3>

                  {/* what it is */}
                  <div className="rounded-2xl bg-soft p-3.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-body">What it is</p>
                    <p className="mt-1 text-[14px] font-semibold text-ink">{p.whatItIs}</p>
                  </div>

                  {/* why you need it */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-body">Why you need it</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-body">{p.whyYouNeedIt}</p>
                  </div>

                  {/* good to know */}
                  <div className="border-t border-line pt-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-brand">Good to know</p>
                    <p className="mt-1 text-[13.5px] font-medium text-ink">{p.goodToKnow}</p>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <Button href="/contact" variant="outline" className="w-full justify-between text-sm">
                    <span>Get a Quote</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 3: BUSINESS & TEAM HEALTH PLANS
      ========================================================================== */}
      <section id="business" className="relative overflow-hidden bg-soft py-6 sm:py-9 lg:py-11 border-y border-line">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <Briefcase className="size-3.5" /> FOR BUSINESSES &amp; STARTUPS
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              Take Care of Your Team. Protect Your Business.
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              Affordable group insurance plans for teams of 5 to 500+ employees.
            </p>
          </div>

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-6 lg:grid-cols-2">
            {businessPlans.map((b) => (
              <div
                key={b.title}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-mint text-brand shadow-sm">
                      <b.icon className="size-6" />
                    </span>
                    <span className="rounded-full bg-soft px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-brand ring-1 ring-line">
                      {b.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[20px] font-extrabold text-ink sm:text-[24px]">
                    {b.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-body">
                    {b.desc}
                  </p>

                  <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-3">
                    {b.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2.5 text-[13.5px] font-semibold text-ink">
                        <CheckCircle2 className="size-4 shrink-0 text-brand" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-2">
                  <Button href="/contact" className="w-full sm:w-fit min-h-11 text-sm">
                    <span>Talk to Us About Team Cover</span>
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 4: PROFESSIONAL SHIELD (FOR EXPERTS)
      ========================================================================== */}
      <section id="professional" className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
              <Scale className="size-3.5" /> PROFESSIONAL SHIELD
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              Legal Defense Cover for Professionals
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              If a client alleges professional error, omission, or service dispute, this indemnity policy covers legal defense and court-awarded damages.
            </p>
          </div>

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {professionals.map((prof) => (
              <div
                key={prof.role}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
              >
                <div>
                  <IconBox tint={prof.tint} className="size-11">
                    <prof.icon className="size-5" />
                  </IconBox>

                  <h3 className="mt-3 text-[17px] font-extrabold text-ink">
                    {prof.role}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">
                    {prof.desc}
                  </p>
                </div>

                <div className="mt-4 border-t border-line pt-2.5 text-xs font-bold text-brand">
                  ✓ Legal defense &amp; settlements covered
                </div>
              </div>
            ))}
          </div>

          {/* What it pays highlight box */}
          <div className="mt-2.5 sm:mt-3 rounded-2xl sm:rounded-3xl border border-line bg-gradient-to-r from-soft via-mint/30 to-soft p-3.5 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <Scale className="size-5" />
                </span>
                <div>
                  <p className="text-[15px] font-bold text-ink">What this policy pays for you</p>
                  <p className="mt-0.5 text-xs sm:text-sm text-body">
                    Lawyer fees, court costs, investigation expenses, and any settlement money ordered by the court.
                  </p>
                </div>
              </div>

              <Button href="/contact" variant="outline" className="w-full text-center border-brand/40 text-brand hover:bg-brand hover:text-white sm:w-auto min-h-10 text-xs sm:text-sm px-4">
                <span>Inquire About Professional Indemnity</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 5: HOW HM WEALTH HELPS YOU DURING CLAIMS (3-Step Roadmap)
      ========================================================================== */}
      <section id="claims" className="relative overflow-hidden bg-soft py-6 sm:py-9 lg:py-11 border-y border-line">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-4 py-1 text-[12px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <HeartPulse className="size-3.5" /> 3-STEP CLAIM PROMISE
            </span>
            <h2 className="mt-1 text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:mt-1.5 sm:text-[38px]">
              We Stand by You When You Need Us Most
            </h2>
            <p className="mt-1 text-[15px] sm:text-[16px] leading-relaxed text-body">
              Our 3-step claim promise ensures your family never faces hospital billing desks alone.
            </p>
          </div>

          <div className="relative mt-2 sm:mt-2.5">
            {/* connecting line on desktop */}
            <div aria-hidden className="absolute left-[16%] right-[16%] top-9 hidden border-t-2 border-dashed border-mint-2 lg:block" />

            <div className="m-rail grid gap-4 sm:grid-cols-3">
              {claimSteps.map((c, i) => (
                <div
                  key={c.num}
                  className="group relative flex flex-col justify-between rounded-3xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift sm:p-6"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-xs ring-2 ring-mint transition-transform duration-300 group-hover:scale-105">
                        <c.icon className="size-5" />
                      </span>
                      <span className="text-2xl font-extrabold text-ink/15 transition-colors group-hover:text-brand/30">
                        {c.num}
                      </span>
                    </div>

                    <p className="mt-3.5 text-xs font-bold uppercase tracking-wider text-brand">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-[18px] font-extrabold text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-body">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-line pt-2.5 text-xs font-bold text-brand">
                    ✓ Dedicated coordinator on call
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SECTION 6: SIMPLE INSURANCE FAQS (Clean Editorial Q&A)
      ========================================================================== */}
      <section id="faqs" className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.3fr] lg:gap-10">
            {/* Left Column: Direct Callout Box */}
            <div className="flex flex-col gap-3 sm:gap-3.5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-mint px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
                <HelpCircle className="size-3.5" /> SIMPLE INSURANCE FAQS
              </span>

              <h2 className="text-[28px] font-extrabold leading-[1.08] tracking-[-0.035em] text-ink sm:text-[38px]">
                Questions,<br />
                <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">
                  answered simply.
                </span>
              </h2>

              <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-body">
                The most important things families ask us before picking health and life coverage.
              </p>

              {/* Live Support Box */}
              <div className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-xs font-extrabold text-white ring-2 ring-mint">
                    HS
                  </span>
                  <div>
                    <p className="text-[14px] font-bold text-ink">{site.founder}</p>
                    <p className="text-xs text-body">Founder · Insurance Claim Support</p>
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

            {/* Right Column: Custom Accordion */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {insuranceFaqs.map((f, i) => {
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
                          <div className="border-t border-line px-6 pb-6 pt-4">
                            <p className="text-[15.5px] leading-relaxed text-body">{f.a}</p>
                            <div className="mt-3.5 inline-flex items-center gap-2 rounded-lg bg-mint px-3 py-1.5 text-xs font-bold text-brand">
                              <Zap className="size-3.5" /> {f.takeaway}
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
          SECTION 7: BOTTOM BANNER (Insurance Checkup CTA)
      ========================================================================== */}
      <section className="py-2 sm:py-2.5 bg-white">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px] border border-brand/20 bg-gradient-to-br from-mint/70 via-white to-soft px-5 py-5 sm:px-8 sm:py-7 shadow-card">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/4 -z-10 size-80 rounded-full bg-sky/20 blur-3xl" />

            <div className="relative flex flex-wrap items-center justify-between gap-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand shadow-2xs">
                  <ShieldCheck className="size-3.5 text-brand" /> FREE POLICY CHECKUP
                </span>
                <h2 className="mt-2.5 text-[28px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[40px]">
                  Not sure which insurance plan is right for you?
                </h2>
                <p className="mt-1.5 text-[15px] sm:text-[16px] leading-relaxed text-body">
                  Let our friendly team review your existing policies for free and explain cover options that fit your budget.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-body">
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> Free Policy Review</span>
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> No Pushy Sales Talk</span>
                  <span className="flex items-center gap-1.5"><Check className="size-4 text-brand" /> Dedicated Claim Support</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  className="min-h-12 px-7 text-[15px] font-bold"
                >
                  <ShieldCheck className="size-4" />
                  <span>Get a Free Insurance Checkup</span>
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
