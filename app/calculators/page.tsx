import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import { WealthStudio } from "@/components/calculators/WealthStudio";
import { Container } from "@/components/ui/kit";
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

          {/* Contextual links strip */}
          <div className="mt-8 rounded-2xl border border-line bg-mint/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          {/* Statutory Disclaimer & Disclosures (AMFI / SEBI Mandatory) */}
          <div className="mt-5 rounded-2xl border border-line bg-white p-5 text-xs text-body leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-ink mb-1">
              <Info className="size-3.5 text-gold" />
              <h3>Statutory Assumptions &amp; Disclosures</h3>
            </div>
            <p>
              Calculator illustrations assume a constant rate of return and do not account for market fluctuations, scheme Total Expense Ratios (TER), exit loads, or prevailing income tax rates. Projections are purely illustrative and do not represent a guarantee of future returns. Mutual Fund investments are subject to market risks; read all scheme related documents carefully. HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412) and does not provide investment advisory services.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
