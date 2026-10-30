import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Sparkles,
  Calculator,
  Info,
  Award,
} from "lucide-react";
import { WealthStudio } from "@/components/calculators/WealthStudio";
import { Card, Container, IconBox, Section, SectionTitle } from "@/components/ui/kit";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.calculators);

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Calculators", item: "/calculators" },
        ])}
      />
      {/* ======================================================================
          Compact, Luxury Studio Header (No empty voids, tool starts on screen)
          ====================================================================== */}
      <header className="relative isolate overflow-hidden border-b border-line/70 pb-2 pt-2 sm:pb-2.5 sm:pt-2.5">
        {/* Ambient atmospheric lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 size-96 rounded-full bg-gold/10 blur-[110px]"
        />

        <Container>
          <div className="flex flex-col gap-2">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-body">
              <Link href="/" className="hover:text-brand transition-colors">Home</Link>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-ink">Calculators</span>
            </nav>
            <h1 className="text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">Calculators</h1>
            <p className="max-w-2xl text-[14px] leading-relaxed text-body sm:text-[15.5px]">
              Plan for your goals with simple calculators. Move the sliders to see an illustration instantly.
            </p>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Wealth Studio Terminal (Immediately in view, zero wasted scroll)
          ====================================================================== */}
      <section className="py-5 sm:py-8">
        <Container>
          <Suspense fallback={<div className="h-[720px] rounded-[28px] bg-white border border-line shadow-card animate-pulse" />}>
            <WealthStudio />
          </Suspense>
        </Container>
      </section>

      {/* ======================================================================
          Semantic Guide & Compounding Methodology (SEO & Investor Literacy)
          ====================================================================== */}
      <section className="border-t border-line bg-soft/40 py-10 sm:py-14">
        <Container>
          <div className="mx-auto max-w-4xl flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-mint px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand mb-3">
                <Sparkles className="size-3.5" />
                Compounding &amp; Methodologies
              </div>
              <h2 className="text-[26px] font-extrabold tracking-tight text-ink sm:text-[34px]">
                Understanding Financial Calculators &amp; Compounding Mathematics
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-body">
                Our calculators help Indian investors plan disciplined wealth creation journeys. By simulating systematic monthly contributions, inflation-adjusted goals, and periodic cash flows, you can make informed decisions before selecting mutual fund schemes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-2.5 text-brand font-bold text-sm mb-2">
                  <TrendingUp className="size-4" />
                  <h3>1. SIP Compounding Formula</h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-body">
                  A Systematic Investment Plan (SIP) leverages Rupee Cost Averaging. The mathematical maturity value \(M\) is calculated as:
                </p>
                <div className="my-3 rounded-xl bg-soft p-3 font-mono text-xs text-ink font-semibold text-center border border-line/60">
                  M = P × [((1 + i)^n - 1) / i] × (1 + i)
                </div>
                <p className="text-[12.5px] text-body/90">
                  Where <strong>P</strong> is your monthly installment, <strong>i</strong> is the monthly periodic rate (Annual Expected Return ÷ 12 ÷ 100), and <strong>n</strong> is the total tenure in months.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-2.5 text-brand font-bold text-sm mb-2">
                  <Zap className="size-4" />
                  <h3>2. Step-Up (Top-Up) SIP Power</h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-body">
                  As your annual income grows, increasing your SIP contribution by 5% to 10% each year accelerates wealth accumulation significantly compared to a flat monthly investment.
                </p>
                <p className="mt-2 text-[12.5px] text-body/90">
                  Step-up SIP counters inflation naturally, allowing you to reach targets like children&apos;s higher education or early retirement in fewer years.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-2.5 text-brand font-bold text-sm mb-2">
                  <Calculator className="size-4" />
                  <h3>3. Lump Sum vs. SIP Strategy</h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-body">
                  <strong>SIP:</strong> Best suited for salaried individuals and families investing monthly savings, minimizing the risk of market entry timing.
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-body">
                  <strong>Lump Sum:</strong> Suitable for deploying windfalls, bonuses, or property sale proceeds when paired with Systematic Transfer Plans (STP) into equity schemes.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-2.5 text-brand font-bold text-sm mb-2">
                  <ShieldCheck className="size-4" />
                  <h3>4. Systematic Withdrawal Plan (SWP)</h3>
                </div>
                <p className="text-[13.5px] leading-relaxed text-body">
                  Designed for retirees seeking predictable monthly cash flow without liquidating their entire portfolio. Capital gains are taxed only on the redeemed units, preserving overall capital efficiency.
                </p>
              </div>
            </div>

            {/* Contextual links strip */}
            <div className="rounded-2xl border border-line bg-mint/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-ink">Ready to align your calculation with actual mutual fund schemes?</p>
                <p className="text-xs text-body">Explore our scheme catalog or consult our mutual fund distribution desk.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href="/products/mutual-funds"
                  className="rounded-xl border border-brand/30 bg-white px-3.5 py-2 text-xs font-bold text-brand transition hover:bg-mint"
                >
                  View Mutual Funds
                </Link>
                <Link
                  href="/contact"
                  className="rounded-xl bg-brand px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-dark"
                >
                  Book Free Consultation
                </Link>
              </div>
            </div>

            {/* Statutory Disclaimer */}
            <div className="rounded-2xl border border-line bg-white p-5 text-xs text-body leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-ink mb-1">
                <Info className="size-3.5 text-gold" />
                <h3>Statutory Assumptions &amp; Disclosures</h3>
              </div>
              <p>
                Calculator illustrations assume a constant rate of return and do not account for market fluctuations, scheme Total Expense Ratios (TER), exit loads, or prevailing income tax rates. Projections are purely illustrative and do not represent a guarantee of future returns. Mutual Fund investments are subject to market risks; read all scheme related documents carefully. HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412) and does not provide investment advisory services.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
