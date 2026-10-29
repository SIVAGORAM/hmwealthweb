import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ShieldCheck,
  CheckCircle2,
  Zap,
  Target,
  HeartHandshake,
  TrendingUp,
  FileCheck,
  Globe2,
  Stethoscope,
  Eye,
  Smile,
  Phone,
  MessageCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Building2,
  Users,
  Compass,
  Award,
} from "lucide-react";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";
import { Badge, Button, Card, Container, IconBox, Section, SectionTitle } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About Us | Guiding Your Wealth. Protecting Your Tomorrow. | HM Wealth",
  description:
    "HM Wealth is an AMFI-registered mutual fund distributor (ARN-341412) committed to helping families, professionals, and NRIs build lasting financial independence through honest, disciplined guidance.",
};

const pillars = [
  {
    icon: Target,
    title: "1. Goal-Based Mutual Fund Investing",
    desc: "Helping you save for children's higher education, dream homes, and comfortable retirement through systematic, disciplined SIPs and smart asset allocation.",
    tag: "Wealth Accumulation",
  },
  {
    icon: ShieldCheck,
    title: "2. Family & Business Insurance Protection",
    desc: "Guiding you toward pure term life, 10,000+ cashless hospital health cover, and employee benefit solutions that actually pay out when life throws a curveball.",
    tag: "Risk Mitigation",
  },
  {
    icon: Globe2,
    title: "3. NRI Cross-Border Investment Desk",
    desc: "Assisting Indians living abroad to easily and compliantly invest in India's growth story through seamless NRE/NRO accounts and zero-paperwork KYC.",
    tag: "Global Indians",
  },
  {
    icon: Stethoscope,
    title: "4. Portfolio Health Checks & Audits",
    desc: "Auditing existing investments and insurance policies to eliminate overlapping funds, hidden expense ratios, and dangerous coverage gaps with zero fee.",
    tag: "Free Review",
  },
];

const values = [
  {
    icon: Eye,
    title: "Complete Transparency",
    desc: "We explain every scheme, charge, and risk upfront in plain language. Zero hidden surprises or asterisks.",
    badge: "100% Disclosure",
  },
  {
    icon: Compass,
    title: "Goal-First, Not Product-First",
    desc: "We never push random financial products. Every recommendation is tailored strictly to your specific timeline and risk comfort.",
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
    desc: "For insurance, we don't just hand you a policy—we guide you through hospital paperwork, insurer approvals, and claim settlement.",
    badge: "Lifelong Support",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ======================================================================
          1. Hero Section (Who We Are in One Line)
          ====================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-mint/60 via-soft/70 to-white pb-2 pt-1.5 sm:pb-2.5 sm:pt-2">
        {/* Ambient atmospheric lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-10 -z-10 size-96 rounded-full bg-gold/15 blur-[120px]"
        />

        <Container>
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
            {/* Left Column: Core Positioning */}
            <div className="flex min-w-0 flex-col gap-3.5 sm:gap-4 lg:col-span-7">
              {/* Quick Trust Badges Strip */}
              <div className="-mx-4 flex flex-nowrap items-center gap-2 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden">
                <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-brand/20 bg-white px-3 py-1 text-xs font-extrabold text-brand shadow-xs">
                  <ShieldCheck className="size-3.5" />
                  AMFI-Registered MFD (ARN-341412)
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-semibold text-body shadow-xs">
                  <HeartHandshake className="size-3.5 text-brand" />
                  Investor-Centric Approach
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-line bg-white/80 px-3 py-1 text-xs font-semibold text-body shadow-xs">
                  <Zap className="size-3.5 text-gold" />
                  100% Paperless &amp; Transparent
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-[28px] font-extrabold leading-[1.08] tracking-tight text-ink xs:text-[30px] sm:text-[44px] lg:text-[48px]">
                Guiding Your Wealth.{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Protecting Your Tomorrow.
                </span>
              </h1>

              {/* Sub-headline */}
              <p className="max-w-2xl text-[15px] leading-relaxed text-body sm:text-[17px]">
                HM Wealth is an AMFI-registered mutual fund distributor and financial protection firm committed to helping families, professionals, and entrepreneurs build lasting financial independence through honest, disciplined guidance.
              </p>

              {/* CTAs */}
              <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Button href="/contact">Schedule an Introduction Call</Button>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3 text-[15px] font-bold text-ink shadow-xs transition hover:border-brand/40 hover:bg-mint"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Right Column: Credibility Matrix Deck */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[28px] border border-line/80 bg-white p-5 shadow-lift sm:rounded-[32px] sm:p-8">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-mint text-brand shadow-xs">
                      <Award className="size-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-ink">Institutional Credibility</h3>
                      <p className="text-[11px] text-body">Verified Distribution Credentials</p>
                    </div>
                  </div>
                  <span className="shrink-0 whitespace-nowrap rounded-full bg-mint px-2.5 py-0.5 text-[11px] font-extrabold text-brand">
                    Active &amp; Licensed
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3.5">
                  <div className="min-w-0 rounded-2xl border border-line/60 bg-soft/70 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-body">AMFI Registration</span>
                    <p className="mt-1 text-[14px] xs:text-[16px] sm:text-xl lg:text-lg xl:text-xl font-extrabold text-brand tnum [overflow-wrap:anywhere]">ARN-341412</p>
                    <p className="mt-0.5 text-[10.5px] sm:text-[11px] text-body">Registered MFD</p>
                  </div>

                  <div className="min-w-0 rounded-2xl border border-line/60 bg-soft/70 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-body">Client Ownership</span>
                    <p className="mt-1 text-[14px] xs:text-[16px] sm:text-xl lg:text-lg xl:text-xl font-extrabold text-ink [overflow-wrap:anywhere]">100% Direct</p>
                    <p className="mt-0.5 text-[10.5px] sm:text-[11px] text-body">Units in your name</p>
                  </div>

                  <div className="min-w-0 rounded-2xl border border-line/60 bg-soft/70 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-body">Digital KYC</span>
                    <p className="mt-1 text-[14px] xs:text-[16px] sm:text-xl lg:text-lg xl:text-xl font-extrabold text-ink [overflow-wrap:anywhere]">Paperless</p>
                    <p className="mt-0.5 text-[10.5px] sm:text-[11px] text-body">5-minute setup</p>
                  </div>

                  <div className="min-w-0 rounded-2xl border border-line/60 bg-soft/70 p-3 sm:p-4">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-body">Consultation</span>
                    <p className="mt-1 text-[14px] xs:text-[16px] sm:text-xl lg:text-lg xl:text-xl font-extrabold text-brand [overflow-wrap:anywhere]">₹0 Fee</p>
                    <p className="mt-0.5 text-[10.5px] sm:text-[11px] text-body">Commission by AMCs</p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-brand/20 bg-mint/50 p-3.5 text-xs text-body flex items-start gap-2.5">
                  <ShieldCheck className="size-4 shrink-0 text-brand mt-0.5" />
                  <span>
                    Investments are deposited directly with SEBI-regulated fund houses. HM Wealth never handles or holds client funds.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          2. The Brand Story (Why HM Wealth Was Founded)
          ====================================================================== */}
      <Section className="relative overflow-hidden py-1.5 sm:py-2">
        <Container>
          <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-8">
            {/* Visual Column */}
            <div className="relative lg:col-span-5">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-[40px] bg-gradient-to-br from-mint via-soft to-gold-soft opacity-70"
              />
              <div className="relative aspect-[4/3.8] overflow-hidden rounded-[32px] border border-line shadow-card">
                <Image
                  src={photos.home.src}
                  alt={photos.home.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Motto Card */}
              <div className="absolute -bottom-5 right-2 max-w-[280px] rounded-2xl border border-line bg-white/95 p-3.5 shadow-lift backdrop-blur-md sm:-bottom-7 sm:-right-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-3.5 text-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-body">Our Motto</span>
                </div>
                <p className="mt-0.5 text-xs font-bold leading-snug text-ink">
                  Invest with Clarity. Protect with Confidence. Grow with Peace of Mind.
                </p>
              </div>
            </div>

            {/* Story Text Column */}
            <div className="flex flex-col gap-2.5 sm:gap-3 lg:col-span-7">
              <SectionTitle
                badge="OUR STORY"
                title="Why HM Wealth Was Founded"
                intro="Personal finance should bring security to your home, not stress, confusion, or aggressive sales pitches."
              />

              <div className="flex flex-col gap-3 text-[15.5px] leading-relaxed text-body">
                <div className="rounded-2xl border border-line bg-soft/60 p-3.5">
                  <h4 className="font-extrabold text-ink flex items-center gap-2 text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-xs">✕</span>
                    The Problem in the Market
                  </h4>
                  <p className="mt-1 text-sm text-body">
                    Most people struggle with investing because the financial world is full of complicated jargon, pushy product sales, and confusing market noise. Investors are frequently sold mismatched products that serve the distributor’s commission rather than the family’s real-life goals.
                  </p>
                </div>

                <div className="rounded-2xl border border-brand/20 bg-mint/40 p-3.5">
                  <h4 className="font-extrabold text-brand flex items-center gap-2 text-sm">
                    <span className="flex size-5 items-center justify-center rounded-full bg-brand text-white text-xs">✓</span>
                    The HM Wealth Solution
                  </h4>
                  <p className="mt-1 text-sm text-body">
                    HM Wealth was founded to bring simplicity, honesty, and structure to personal finance. We believe financial success isn’t about chasing risky overnight returns—it is about having a clear, goal-based plan that protects your family and steadily compounds over decades.
                  </p>
                </div>

                <p className="text-[14.5px] text-body">
                  Whether you are starting your first monthly SIP of ₹500, setting up a child higher education fund, or insuring your family against medical emergencies, we stand beside you with clear explanations and lifelong support.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          3. Mission & Vision Statements
          ====================================================================== */}
      <Section soft className="border-y border-line/60 py-1.5 sm:py-2">
        <Container>
          <SectionTitle
            badge="PURPOSE & HORIZON"
            title="Our Mission &amp; Vision"
            intro="The bedrock principles that govern every client interaction, scheme recommendation, and service touchpoint."
            center
          />

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-4 md:grid-cols-2">
            {/* Mission Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-white p-5 sm:p-6 shadow-card transition-transform hover:-translate-y-1">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-mint text-brand shadow-xs">
                  <Target className="size-6" />
                </div>
                <span className="mt-3 inline-flex rounded-full bg-mint px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-brand">
                  Our Mission
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
                  Empowering Financial Destiny
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">
                  To empower individuals and families to take control of their financial destiny by providing simple, goal-oriented investment solutions and robust insurance safety nets.
                </p>
              </div>

              <div className="mt-4 border-t border-line/60 pt-3 flex items-center gap-2 text-xs font-bold text-brand">
                <CheckCircle2 className="size-4" />
                Goal-oriented · Transparent · Jargon-free
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-line bg-white p-5 sm:p-6 shadow-card transition-transform hover:-translate-y-1">
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-sky text-sky-ink shadow-xs">
                  <Globe2 className="size-6" />
                </div>
                <span className="mt-3 inline-flex rounded-full bg-sky px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-sky-ink">
                  Our Vision
                </span>
                <h3 className="mt-2 text-xl font-extrabold text-ink sm:text-2xl">
                  India’s Most Dependable Financial Companion
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-body">
                  To be the most trusted, dependable financial companion for families across India and Non-Resident Indians (NRIs) worldwide, recognized for unwavering integrity and client-first ethics.
                </p>
              </div>

              <div className="mt-4 border-t border-line/60 pt-3 flex items-center gap-2 text-xs font-bold text-sky-ink">
                <CheckCircle2 className="size-4" />
                Across India · Worldwide NRIs · Lifelong Ethics
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          4. What We Do (Our Core Pillars)
          ====================================================================== */}
      <Section className="py-1.5 sm:py-2">
        <Container>
          <SectionTitle
            badge="WHAT WE DO"
            title="Our Core Wealth &amp; Protection Pillars"
            intro="We combine strategic long-term wealth accumulation with comprehensive risk protection under one unified umbrella."
            center
          />

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.05}>
                <Card className="flex h-full flex-col justify-between p-4 sm:p-5">
                  <div>
                    <span className="inline-flex rounded-md bg-mint px-2 py-0.5 text-[11px] font-extrabold text-brand">
                      {p.tag}
                    </span>
                    <IconBox className="mt-2.5 bg-brand text-white">
                      <p.icon className="size-6" />
                    </IconBox>
                    <h3 className="mt-2.5 text-base sm:text-[17px] font-extrabold text-ink leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] sm:text-[14px] leading-relaxed text-body">
                      {p.desc}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          5. Our Core Values (Why Clients Trust Us)
          ====================================================================== */}
      <Section soft className="border-y border-line/60 py-1.5 sm:py-2">
        <Container>
          <SectionTitle
            badge="WHY CLIENTS TRUST US"
            title="Our Four Uncompromising Core Values"
            intro="In an industry driven by product targets, we hold ourselves to strict ethical standards that place your security first."
            center
          />

          <div className="m-rail mt-2 sm:mt-2.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card transition-all hover:border-brand/40 hover:shadow-lift">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                        <v.icon className="size-5" />
                      </div>
                      <span className="rounded-md bg-soft px-2 py-0.5 text-[10px] font-bold text-body">
                        {v.badge}
                      </span>
                    </div>

                    <h3 className="mt-2.5 text-[16px] font-extrabold text-ink">
                      {v.title}
                    </h3>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">
                      {v.desc}
                    </p>
                  </div>

                  <div className="mt-3.5 border-t border-line/60 pt-2.5 text-[11px] font-bold text-brand flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    Core Standard
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          6. Founder / Leadership Note (Human Connection)
          ====================================================================== */}
      <Section className="relative overflow-hidden py-1.5 sm:py-2">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-line bg-gradient-to-br from-white via-soft/50 to-mint/40 p-4 sm:p-6 lg:p-7 shadow-card">
            <div className="grid items-center gap-5 lg:grid-cols-12 lg:gap-8">
              {/* Founder Portrait */}
              <div className="relative mx-auto w-full max-w-[320px] lg:col-span-5">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-brand to-brand-bright opacity-30 blur-lg"
                />
                {/* No founder photo (founder's request): brand monogram card instead */}
                <div className="relative isolate flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[28px] border-2 border-white bg-[#04261c] shadow-lift sm:aspect-[4/4.8]">
                  <div aria-hidden className="absolute -right-16 -top-16 -z-10 size-56 rounded-full bg-[#19c38a]/30 blur-[60px]" />
                  <div aria-hidden className="absolute -bottom-20 -left-12 -z-10 size-52 rounded-full bg-gold/15 blur-[60px]" />
                  <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px]" />
                  <span aria-hidden className="mb-10 bg-gradient-to-b from-white to-[#7ff0c4]/70 bg-clip-text text-[88px] font-extrabold leading-none tracking-[-0.06em] text-transparent sm:text-[110px]">HS</span>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-lg font-extrabold">{site.founder}</p>
                    <p className="text-xs text-white/80">Founder &amp; Principal MFD · ARN-341412</p>
                  </div>
                </div>
              </div>

              {/* Founder Note & Commitment */}
              <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-7">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/20 bg-white px-3 py-0.5 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs">
                  <Award className="size-3.5" />
                  Leadership Commitment
                </span>

                <h2 className="text-[24px] font-extrabold leading-tight text-ink sm:text-[32px]">
                  “We treat your hard-earned money with the exact same discipline as our own.”
                </h2>

                <blockquote className="rounded-2xl border-l-4 border-brand bg-white/80 p-3.5 sm:p-4 text-[14.5px] sm:text-[15px] italic leading-relaxed text-body shadow-xs">
                  “My personal commitment to every client is simple: we never suggest an investment scheme or insurance plan that I would not comfortably recommend to my own family. Finance is about trust, patience, and lifelong partnership.”
                </blockquote>

                <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-body">
                  People don’t trust faceless corporate algorithms with their life savings—they trust real, dedicated specialists who answer their calls when market volatility spikes or when a family member is hospitalized. At HM Wealth, you have a direct relationship with a licensed professional who knows your story, your children’s dreams, and your retirement goals.
                </p>

                {/* Direct Contact Channels */}
                <div className="mt-1 flex flex-wrap items-center gap-2.5 pt-1">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-dark"
                  >
                    <Phone className="size-3.5" />
                    Speak with {site.founder}
                  </a>
                  <a
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-white px-4 py-2 sm:py-2.5 text-xs font-bold text-brand shadow-2xs transition hover:bg-mint"
                  >
                    <MessageCircle className="size-3.5 text-emerald-600" />
                    Direct WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          7. Regulatory & Compliance Disclosures (Mandatory)
          ====================================================================== */}
      <section className="bg-soft py-1.5 sm:py-2 border-t border-line/60">
        <Container>
          <div className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 shadow-xs sm:p-5">
            <div className="flex flex-col gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 sm:size-8 items-center justify-center rounded-lg bg-mint text-brand shadow-xs">
                  <ShieldCheck className="size-4" />
                </span>
                <h3 className="text-sm sm:text-base font-extrabold text-ink">
                  Regulatory Registration &amp; Mandatory Statutory Disclosure
                </h3>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-line/60 bg-soft/60 p-3">
                  <span className="font-bold text-body">Registration Type:</span>
                  <p className="mt-0.5 font-extrabold text-ink">AMFI-Registered Mutual Fund Distributor</p>
                </div>
                <div className="rounded-xl border border-line/60 bg-soft/60 p-3">
                  <span className="font-bold text-body">AMFI Registration Number:</span>
                  <p className="mt-0.5 font-extrabold text-brand tnum">{site.arn}</p>
                </div>
              </div>

              <div className="rounded-xl border border-line/60 bg-soft/40 p-3 sm:p-3.5 text-[12.5px] sm:text-[13px] leading-relaxed text-body">
                <p>
                  <strong>Regulatory Clarification:</strong> HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412) engaged in the distribution of mutual fund schemes. We earn commission from Asset Management Companies (AMCs) on regular plans. We are not a SEBI-registered Investment Adviser and do not provide fee-based investment advice. Mutual Fund investments are subject to market risks, read all scheme related documents carefully.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          8. Call to Action (Next Step)
          ====================================================================== */}
      <section className="py-2 sm:py-2.5 bg-white">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px] border border-brand/20 bg-gradient-to-br from-mint/70 via-white to-soft px-5 py-5 sm:px-8 sm:py-7 shadow-card">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-brand-bright/15 blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-12 -z-10 size-72 rounded-full bg-gold/15 blur-[80px]"
            />

            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white px-3.5 py-1 text-xs font-bold text-brand shadow-2xs">
                <Sparkles className="size-3.5 text-gold" />
                Start Your Financial Journey
              </span>

              <h2 className="mt-2.5 text-[26px] font-extrabold leading-tight tracking-tight text-ink sm:text-[36px]">
                Ready to start your financial journey with{" "}
                <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">
                  HM Wealth
                </span>?
              </h2>

              <p className="mt-1.5 max-w-xl text-[14.5px] sm:text-[15.5px] leading-relaxed text-body">
                Book a free, 20-minute introductory call. No sales pressure, just an honest conversation about your goals and how to achieve them.
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button href="/contact" variant="primary">
                  <span>Schedule an Introduction Call</span>
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  href={site.whatsappHref}
                  external
                  variant="outline"
                  className="border-brand/30 hover:bg-mint hover:border-brand"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                  <span>WhatsApp Us Directly</span>
                </Button>
              </div>

              <p className="mt-3.5 text-xs font-medium text-body/80">
                AMFI ARN-341412 · Zero consultation fee · Transparent scheme review
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
