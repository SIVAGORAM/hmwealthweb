import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Target,
  HeartHandshake,
  TrendingUp,
  Globe2,
  Stethoscope,
  Eye,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Compass,
} from "lucide-react";
import { site } from "@/lib/site";
import { Container, IconBox } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.about);

const pillars = [
  {
    icon: Target,
    tint: "green" as const,
    title: "1. Goal-Based Mutual Fund Investing",
    desc: "Helping you invest for children's higher education, dream homes, and comfortable retirement through systematic, disciplined SIPs and asset allocation.",
    tag: "Wealth Accumulation",
  },
  {
    icon: ShieldCheck,
    tint: "sky" as const,
    title: "2. Family & Business Insurance Protection",
    desc: "Guiding you toward pure term life, cashless hospital health cover, and employee benefit solutions through licensed insurance partners.",
    tag: "Risk Mitigation",
  },
  {
    icon: Globe2,
    tint: "peach" as const,
    title: "3. NRI Cross-Border Investment Desk",
    desc: "Assisting Indians living abroad to easily and compliantly invest in India's growth through seamless NRE/NRO accounts and paperless KYC.",
    tag: "Global Indians",
  },
  {
    icon: Stethoscope,
    tint: "lilac" as const,
    title: "4. Portfolio Health Checks & Audits",
    desc: "Reviewing existing investments and insurance policies to eliminate overlapping schemes and dangerous coverage gaps with zero consultation fee.",
    tag: "Free Review",
  },
];

const values = [
  {
    icon: Eye,
    title: "Complete Transparency",
    desc: "We explain every scheme, commission, and risk upfront in plain language. Zero hidden surprises or asterisks.",
    badge: "100% Disclosure",
  },
  {
    icon: Compass,
    title: "Goal-First, Not Product-First",
    desc: "We never push random financial products. Every distribution recommendation is tailored strictly to your timeline and risk comfort.",
    badge: "Bespoke Fit",
  },
  {
    icon: TrendingUp,
    title: "Discipline Over Emotion",
    desc: "When markets fluctuate, we help you stay calm and focused on long-term compound growth rather than panic-selling.",
    badge: "Calm Compounding",
  },
  {
    icon: HeartHandshake,
    title: "Standing By You at Claim Time",
    desc: "For insurance, we don't just facilitate a policy—we guide you through hospital paperwork, insurer approvals, and claim settlement.",
    badge: "Lifelong Support",
  },
];

const h2 = "text-[24px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]";

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "About Us", item: "/about" },
        ])}
      />
      {/* ======================================================================
          1. Hero Section
          ====================================================================== */}
      <section className="pb-4 pt-4 sm:pb-6 sm:pt-6">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#f5f6f3] p-5 ring-1 ring-line sm:rounded-[36px] sm:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/12 blur-[90px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 right-10 -z-10 size-80 rounded-full bg-gold/12 blur-[100px]" />

            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
              <div className="flex min-w-0 flex-col gap-3.5">
                <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] font-semibold text-body">
                  <Link href="/" className="transition-colors hover:text-brand">Home</Link>
                  <ChevronRight className="size-3.5 text-body/50" />
                  <span className="font-bold text-ink">About Us</span>
                </nav>
                <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand/20 bg-white/95 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-brand shadow-xs whitespace-nowrap sm:text-xs">
                  <ShieldCheck className="size-3.5 shrink-0" />
                  <span>AMFI-Registered Mutual Fund Distributor</span>
                </div>
                <h1 className="text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em] text-ink sm:text-[44px]">
                  Guiding your wealth.{" "}
                  <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">
                    Protecting your tomorrow.
                  </span>
                </h1>
                <p className="max-w-[56ch] text-[15px] leading-relaxed text-body sm:text-[16.5px]">
                  HM Wealth is an AMFI-registered Mutual Fund Distributor helping individuals, families, and businesses work towards their financial goals with confidence. We are the bridge between investors and Asset Management Companies (AMCs), with every interaction guided by transparency and compliance.
                </p>
                <div className="flex flex-col gap-2.5 pt-1 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/contact"
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[14px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(11,122,85,0.6)] transition hover:bg-brand-dark active:scale-[0.99] sm:w-auto sm:min-h-11 sm:text-[14.5px]"
                  >
                    <Phone className="size-4 shrink-0" />
                    <span className="whitespace-nowrap">Schedule a Free Call</span>
                    <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-[14px] font-bold text-ink shadow-2xs transition hover:border-brand hover:text-brand active:scale-[0.99] sm:w-auto sm:min-h-11 sm:text-[14.5px]"
                  >
                    <MessageCircle className="size-4 shrink-0 text-emerald-600 transition-transform group-hover:scale-110" />
                    <span className="whitespace-nowrap">WhatsApp Us</span>
                  </a>
                </div>
              </div>

              {/* Credibility Card */}
              <div className="min-w-0 rounded-[24px] bg-white p-4 shadow-[0_20px_50px_-25px_rgba(15,31,26,0.25)] ring-1 ring-line sm:p-5">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-mint text-brand">
                      <Award className="size-4" />
                    </span>
                    <p className="text-[12px] font-bold uppercase tracking-wider text-brand">Distribution Credentials</p>
                  </div>
                  <span className="rounded-full bg-mint px-2 py-0.5 text-[11px] font-extrabold text-brand">Active &amp; Verified</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  <div className="rounded-xl bg-soft/70 p-3">
                    <span className="text-[10.5px] font-semibold text-body">AMFI Status</span>
                    <p className="mt-0.5 text-[14px] font-extrabold text-brand">Registered MFD</p>
                    <p className="text-[10px] text-body">Active &amp; Verified</p>
                  </div>
                  <div className="rounded-xl bg-soft/70 p-3">
                    <span className="text-[10.5px] font-semibold text-body">Client Ownership</span>
                    <p className="mt-0.5 text-[14px] font-extrabold text-ink">100% Direct</p>
                    <p className="text-[10px] text-body">Units in your name</p>
                  </div>
                  <div className="rounded-xl bg-soft/70 p-3">
                    <span className="text-[10.5px] font-semibold text-body">Digital KYC</span>
                    <p className="mt-0.5 text-[14px] font-extrabold text-ink">Paperless</p>
                    <p className="text-[10px] text-body">Fast online setup</p>
                  </div>
                  <div className="rounded-xl bg-soft/70 p-3">
                    <span className="text-[10.5px] font-semibold text-body">Consultation Fee</span>
                    <p className="mt-0.5 text-[14px] font-extrabold text-brand">₹0 Direct</p>
                    <p className="text-[10px] text-body">Commission from AMCs</p>
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-xl border border-brand/20 bg-mint/40 p-2.5 text-[11.5px] leading-relaxed text-body">
                  <ShieldCheck className="size-4 shrink-0 text-brand mt-0.5" />
                  <span>Investments are deposited directly with SEBI-regulated fund houses. HM Wealth never handles client funds.</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          2. Mission & Vision Statements
          ====================================================================== */}
      <section className="py-5 sm:py-7">
        <Container>
          <div className="text-center">
            <span className="inline-flex rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              Purpose &amp; Horizon
            </span>
            <h2 className={`${h2} mt-2`}>Our Mission &amp; Vision</h2>
            <p className="mx-auto mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-body sm:text-[15.5px]">
              The bedrock principles that govern every client interaction, scheme recommendation, and service touchpoint.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <div className="flex flex-col justify-between rounded-[24px] bg-white p-5 ring-1 ring-line shadow-card sm:p-6">
              <div>
                <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-brand">
                  <Target className="size-5" />
                </span>
                <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wider text-brand">Our Mission</span>
                <h3 className="mt-1 text-[19px] font-extrabold text-ink sm:text-[21px]">Empowering Financial Destiny</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-body">
                  To empower individuals and families to take control of their financial destiny by providing simple, goal-oriented investment solutions and robust insurance safety nets.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-3 text-[12px] font-bold text-brand">
                <CheckCircle2 className="size-4" />Goal-oriented · Transparent · Jargon-free
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-[24px] bg-white p-5 ring-1 ring-line shadow-card sm:p-6">
              <div>
                <span className="flex size-11 items-center justify-center rounded-xl bg-sky text-sky-ink">
                  <Globe2 className="size-5" />
                </span>
                <span className="mt-3 inline-block text-[11px] font-bold uppercase tracking-wider text-sky-ink">Our Vision</span>
                <h3 className="mt-1 text-[19px] font-extrabold text-ink sm:text-[21px]">India’s Most Dependable Financial Companion</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-body">
                  To be the most dependable financial companion for families across India and Non-Resident Indians (NRIs) worldwide, recognized for unwavering integrity and client-first ethics.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-3 text-[12px] font-bold text-sky-ink">
                <CheckCircle2 className="size-4" />Across India · Worldwide NRIs · Lifelong Ethics
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          3. What We Do (Our Core Pillars)
          ====================================================================== */}
      <section className="py-5 sm:py-7 bg-soft/50 border-y border-line/60">
        <Container>
          <div className="text-center">
            <span className="inline-flex rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              What We Do
            </span>
            <h2 className={`${h2} mt-2`}>Our Core Wealth &amp; Protection Pillars</h2>
            <p className="mx-auto mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-body sm:text-[15.5px]">
              We combine strategic long-term wealth accumulation with comprehensive risk protection under one unified umbrella.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {pillars.map(({ icon: Icon, tint, title, desc, tag }, i) => (
              <Reveal key={title} delay={i * 0.04} className="flex h-full flex-col justify-between rounded-[22px] bg-white p-5 ring-1 ring-line shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between">
                    <IconBox tint={tint} className="size-10 rounded-xl"><Icon className="size-5" /></IconBox>
                    <span className="rounded-md bg-soft px-2 py-0.5 text-[10.5px] font-bold text-body">{tag}</span>
                  </div>
                  <h3 className="mt-3 text-[16px] font-extrabold leading-snug text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================================
          4. Our Core Values
          ====================================================================== */}
      <section className="py-5 sm:py-7">
        <Container>
          <div className="text-center">
            <span className="inline-flex rounded-full bg-mint px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
              Why Clients Trust Us
            </span>
            <h2 className={`${h2} mt-2`}>Our Four Uncompromising Core Values</h2>
            <p className="mx-auto mt-1.5 max-w-xl text-[14.5px] leading-relaxed text-body sm:text-[15.5px]">
              In an industry driven by product targets, we hold ourselves to strict ethical standards that place your security first.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
            {values.map(({ icon: Icon, title, desc, badge }, i) => (
              <Reveal key={title} delay={i * 0.04} className="flex h-full flex-col justify-between rounded-[22px] bg-white p-5 ring-1 ring-line shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-brand"><Icon className="size-5" /></span>
                    <span className="rounded-md bg-soft px-2 py-0.5 text-[10.5px] font-bold text-body">{badge}</span>
                  </div>
                  <h3 className="mt-3 text-[16px] font-extrabold leading-snug text-ink">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{desc}</p>
                </div>
                <div className="mt-3 border-t border-line/60 pt-2.5 text-[11px] font-bold text-brand flex items-center gap-1.5">
                  <CheckCircle2 className="size-3.5" />Core Standard
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================================================================
          5. Founder / Leadership Note
          ====================================================================== */}
      <section className="py-5 sm:py-7 bg-soft/50 border-t border-line/60">
        <Container>
          <div className="overflow-hidden rounded-[26px] border border-line bg-white p-5 shadow-card sm:p-8">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
              {/* Founder Monogram Card */}
              <div className="relative isolate flex aspect-[4/3] w-full max-w-[280px] mx-auto items-center justify-center overflow-hidden rounded-[22px] bg-[#04261c] text-white shadow-lift sm:aspect-[4/4]">
                <div aria-hidden className="absolute -right-12 -top-12 -z-10 size-48 rounded-full bg-[#19c38a]/30 blur-[50px]" />
                <div aria-hidden className="absolute -bottom-16 -left-8 -z-10 size-44 rounded-full bg-gold/15 blur-[50px]" />
                <span aria-hidden className="mb-8 bg-gradient-to-b from-white to-[#7ff0c4]/70 bg-clip-text text-[72px] font-extrabold leading-none tracking-tight text-transparent">
                  HS
                </span>
                <div className="absolute bottom-3 left-4 right-4 text-center">
                  <p className="text-[16px] font-extrabold">{site.founder}</p>
                  <p className="text-[11px] text-white/80">Founder &amp; Principal MFD</p>
                </div>
              </div>

              {/* Leadership Commitment Text */}
              <div className="flex flex-col gap-3">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-brand/20 bg-mint/50 px-3 py-0.5 text-xs font-bold text-brand">
                  <Award className="size-3.5" />Leadership Commitment
                </span>
                <h2 className="text-[22px] font-extrabold leading-tight text-ink sm:text-[28px]">
                  “We treat your hard-earned money with the exact same discipline as our own.”
                </h2>
                <blockquote className="rounded-xl border-l-4 border-brand bg-soft/80 p-3.5 text-[14px] italic leading-relaxed text-body">
                  “My personal commitment to every client is simple: we never suggest an investment scheme or insurance plan that I would not comfortably recommend to my own family. Finance is about trust, patience, and lifelong partnership.”
                </blockquote>
                <p className="text-[13.5px] leading-relaxed text-body sm:text-[14px]">
                  People don’t trust faceless corporate algorithms with their life savings—they trust real, dedicated specialists who answer their calls when market volatility spikes or when a family member is hospitalized. At HM Wealth, you have a direct relationship with a licensed professional who knows your story, your children’s dreams, and your retirement goals.
                </p>
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-brand-dark"
                  >
                    <Phone className="size-3.5" />Speak with {site.founder}
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-white px-4 py-2 text-xs font-bold text-brand transition hover:bg-mint"
                  >
                    <MessageCircle className="size-3.5 text-emerald-600" />Direct WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          6. Regulatory Registration & Statutory Disclosure
          ====================================================================== */}
      <section className="py-5 sm:py-6 bg-white border-t border-line/60">
        <Container>
          <div className="rounded-[22px] border border-line bg-soft/40 p-4 sm:p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-mint text-brand">
                <ShieldCheck className="size-4" />
              </span>
              <h3 className="text-[14.5px] sm:text-[15.5px] font-extrabold text-ink">
                Regulatory Registration &amp; Mandatory Statutory Disclosure
              </h3>
            </div>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-line bg-white p-3">
                <span className="font-semibold text-body">Registration Type:</span>
                <p className="mt-0.5 font-extrabold text-ink">AMFI-Registered Mutual Fund Distributor</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <span className="font-semibold text-body">AMFI Registration Number:</span>
                <p className="mt-0.5 font-extrabold text-brand tnum">{site.arn}</p>
              </div>
            </div>
            <div className="mt-3 rounded-xl border border-line bg-white p-3 text-[12px] sm:text-[12.5px] leading-relaxed text-body">
              <p>
                <strong>Regulatory Clarification:</strong> HM Wealth is an AMFI-registered Mutual Fund Distributor engaged in the distribution of mutual fund schemes. We earn commission from Asset Management Companies (AMCs) on regular plans. We are not a SEBI-registered Investment Adviser and do not provide fee-based investment advice. Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          7. Call to Action
          ====================================================================== */}
      <section className="py-5 sm:py-6 bg-white">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[26px] border border-brand/20 bg-gradient-to-br from-mint/70 via-white to-soft p-5 text-center shadow-card sm:p-8">
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand-bright/15 blur-[70px]" />
            <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-64 rounded-full bg-gold/15 blur-[70px]" />

            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-bold text-brand shadow-xs">
              <Sparkles className="size-3.5 text-gold" />Start Your Financial Journey
            </span>

            <h2 className="mt-2.5 text-[24px] font-extrabold leading-tight tracking-tight text-ink sm:text-[32px]">
              Ready to start your financial journey with{" "}
              <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">HM Wealth</span>?
            </h2>

            <p className="mx-auto mt-1.5 max-w-lg text-[14px] leading-relaxed text-body sm:text-[15px]">
              Book a free, 20-minute introductory call. No sales pressure, just an honest conversation about your goals and how to achieve them.
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[14px] font-bold text-white shadow-xs transition hover:bg-brand-dark sm:w-auto sm:min-h-11"
              >
                <Phone className="size-4 shrink-0" />
                <span className="whitespace-nowrap">Schedule a Free Call</span>
                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand/30 bg-white px-6 text-[14px] font-bold text-ink transition hover:bg-mint hover:border-brand sm:w-auto sm:min-h-11"
              >
                <MessageCircle className="size-4 shrink-0 text-emerald-600" />
                <span className="whitespace-nowrap">WhatsApp Us Directly</span>
              </a>
            </div>

            <p className="mt-3 text-[11px] font-medium text-body/80">
              AMFI-Registered MFD · Zero consultation fee · Transparent scheme review
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
