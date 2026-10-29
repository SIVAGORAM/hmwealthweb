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
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = {
  title: "Financial Calculator Suite & Wealth Studio | HM Wealth",
  description:
    "100% mathematically verified SIP, Step-Up SIP, Lump Sum, Target Goal, Retirement Independence, SWP, and Loan EMI calculators with live compounding curves.",
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
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
          <div className="flex flex-col gap-4">
            {/* Top Breadcrumb & Live Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-body">
                <Link href="/" className="hover:text-brand transition-colors">
                  Home
                </Link>
                <ChevronRight className="size-3.5 text-body/40" aria-hidden />
                <span className="text-ink">Calculators</span>
                <ChevronRight className="size-3.5 text-body/40" aria-hidden />
                <span className="text-brand font-bold">Wealth Studio</span>
              </nav>

              {/* Status pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-white/90 px-3 py-1 text-[11px] font-extrabold text-brand shadow-xs backdrop-blur-md">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand" />
                </span>
                LIVE WEALTH STUDIO · 10 VERIFIED MODELS
              </div>
            </div>

            {/* Headline and Benchmarks Ribbon */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                  HM Wealth <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">Studio</span>
                </h1>
                <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-body sm:text-[15.5px]">
                  Interactive, mathematically verified financial modeling for SIPs, goals, retirement, and cashflows. Move any slider to watch compounding work in real time.
                </p>
              </div>

              {/* 3 Live Benchmark Chips */}
              <div className="grid grid-cols-3 gap-2 pt-1 sm:flex sm:flex-wrap sm:items-center lg:pt-0">
                <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-line bg-white/80 px-2.5 py-2 sm:gap-2 sm:px-3 shadow-xs backdrop-blur-xs">
                  <ShieldCheck className="size-4 text-brand" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-body">AMFI Registered</span>
                    <span className="text-xs font-extrabold text-ink">ARN-341412</span>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-line bg-white/80 px-2.5 py-2 sm:gap-2 sm:px-3 shadow-xs backdrop-blur-xs">
                  <Zap className="size-4 text-gold" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-body">Precision Math</span>
                    <span className="text-xs font-extrabold text-ink">64-Bit Actuarial</span>
                  </div>
                </div>

                <div className="flex min-w-0 items-center gap-1.5 rounded-xl border border-line bg-white/80 px-2.5 py-2 sm:gap-2 sm:px-3 shadow-xs backdrop-blur-xs">
                  <Sparkles className="size-4 text-emerald-500" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-body">Guidance</span>
                    <span className="text-xs font-extrabold text-ink">Zero Pushy Sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Wealth Studio Terminal (Immediately in view, zero wasted scroll)
          ====================================================================== */}
      <main className="py-1.5 sm:py-2">
        <Container>
          <Suspense fallback={<div className="h-[720px] rounded-[28px] bg-white border border-line shadow-card animate-pulse" />}>
            <WealthStudio />
          </Suspense>
        </Container>
      </main>

      {/* ======================================================================
          How It Works Educational Strip
          ====================================================================== */}
      <Section soft className="border-t border-line/60">
        <Container>
          <SectionTitle
            badge="TRANSPARENT MATH"
            title="How Our Mathematical Engine Works"
            intro="Built on rigorous actuarial principles, time value of money, and standard compound growth equations."
            center
          />
          <div className="m-rail mt-2 sm:mt-2.5 grid gap-3 md:grid-cols-3">
            {[
              {
                i: Calculator,
                t: "64-Bit Exact Mathematics",
                d: "SIP and Goal models calculate annuity due (beginning-of-month compounding). EMI computes exact reducing balance amortization. Values are only rounded at presentation.",
              },
              {
                i: Info,
                t: "Inflation & Purchasing Power",
                d: "Our models include a 6% annual inflation toggle so you can evaluate nominal future wealth against true purchasing power in today's rupees.",
              },
              {
                i: Sparkles,
                t: "Next Action Roadmap",
                d: "Calculations serve as a compass. Our licensed specialists help you pick suitable schemes, complete paperless KYC, and automate your investments.",
              },
            ].map(({ i: I, t, d }) => (
              <Card key={t} className="flex flex-col gap-2 p-4 sm:p-5">
                <IconBox className="size-11">
                  <I className="size-5" />
                </IconBox>
                <h3 className="text-base font-bold text-ink sm:text-[17px]">{t}</h3>
                <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-body">{d}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Ready to Put Your Wealth Plan into Action?"
        intro="Speak to an AMFI-registered specialist to align your asset allocation with your calculated goals. Zero setup fees."
      />
    </div>
  );
}
