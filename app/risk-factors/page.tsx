import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ShieldAlert,
  ChevronRight,
  TrendingDown,
  Droplets,
  CreditCard,
  Percent,
  Briefcase,
  Layers,
  Globe2,
  FileText,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Statutory Risk Factors & Disclosures | HM Wealth (ARN-341412)",
  description:
    "Comprehensive risk disclosures covering mutual funds, market risks, liquidity, credit, interest rates, and regulatory statutory notices for HM Wealth.",
};

export default function RiskFactorsPage() {
  const riskCategories = [
    {
      icon: TrendingDown,
      title: "Market & Equity Risk",
      badge: "Price Volatility",
      desc: "Mutual funds invest in securities whose values fluctuate with market forces. Economic conditions, government policies, inflation, global geopolitical developments, and individual company earnings directly impact equity valuations.",
      points: [
        "Stock prices can decline sharply during broad market downturns.",
        "Mid-cap and small-cap stocks generally carry higher volatility than large-caps.",
        "Equities do not offer assured returns and capital erosion is possible in the short to medium term.",
      ],
    },
    {
      icon: Droplets,
      title: "Liquidity Risk",
      badge: "Trading Volume",
      desc: "Certain securities, particularly lower-rated corporate bonds, micro-cap stocks, or unlisted debt, may experience low trading volumes. In stressed market environments, selling these securities without significant price discount may be difficult.",
      points: [
        "Redemptions in closed-end schemes are restricted until the maturity period.",
        "Suspension of trading in specific securities may delay portfolio liquidation.",
        "Fund houses may adjust Exit Loads or payout horizons under extreme liquidity stress in line with SEBI rules.",
      ],
    },
    {
      icon: CreditCard,
      title: "Credit & Default Risk",
      badge: "Debt Securities",
      desc: "Debt and fixed-income mutual funds invest in corporate debentures, government bonds, and commercial papers. There is an inherent risk that the borrower/issuer may default on interest payments or principal repayment.",
      points: [
        "A downgrade in an issuer’s credit rating causes an immediate drop in bond prices and scheme NAV.",
        "Lower-rated instruments (below AAA) carry higher yields to compensate for elevated default probability.",
        "Segregated portfolios (side-pocketing) may be created by AMCs for distressed debt assets.",
      ],
    },
    {
      icon: Percent,
      title: "Interest Rate Risk",
      badge: "Duration Sensitivity",
      desc: "Bond prices move inversely to market interest rates. When the Reserve Bank of India (RBI) raises interest rates, existing fixed-rate bond prices decline, reducing the NAV of debt funds holding longer-duration instruments.",
      points: [
        "Long-duration and gilt funds have higher sensitivity to interest rate cycles.",
        "Liquid and overnight funds have the lowest duration and minimal interest rate risk.",
        "Floating-rate instruments partially mitigate rising interest rate impacts.",
      ],
    },
    {
      icon: Briefcase,
      title: "Managerial & Strategy Risk",
      badge: "Active Management",
      desc: "Active mutual fund performance depends on the investment decisions, security selection, and cash allocation of the fund management team. A chosen investment thesis may fail to deliver the expected alpha.",
      points: [
        "Active funds may underperform their benchmark indices over specific market phases.",
        "Key personnel changes in the fund management team can alter strategy or execution.",
        "Sector and thematic funds are vulnerable to cyclical industry downturns.",
      ],
    },
    {
      icon: Layers,
      title: "Concentration & Sector Risk",
      badge: "Portfolio Focus",
      desc: "Thematic, sectoral, or focused funds deliberately limit their holdings to specific industries (e.g., Banking, Healthcare, IT) or a limited basket of companies (up to 30 stocks).",
      points: [
        "Adverse regulatory, taxation, or technological disruptions in that sector affect the entire scheme.",
        "Lack of cross-sector diversification magnifies drawdown magnitude.",
        "Recommended primarily as tactical satellite allocations for seasoned investors.",
      ],
    },
    {
      icon: Globe2,
      title: "Currency & International Risk",
      badge: "Global Funds",
      desc: "Schemes investing in overseas equities or feeder funds are exposed to foreign exchange fluctuations between the Indian Rupee (INR) and the target currency (e.g., USD, EUR).",
      points: [
        "A strengthening Indian Rupee can diminish foreign fund gains when converted.",
        "Subject to sovereign policies, cross-border remittance caps, and overseas taxation.",
        "RBI limits on industry-wide overseas investment can pause fresh subscriptions.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Derivatives & Arbitrage Risk",
      badge: "Complex Instruments",
      desc: "Hybrid, arbitrage, and equity savings funds frequently utilize exchange-traded derivatives (futures and options) for hedging or portfolio rebalancing.",
      points: [
        "Imperfect correlation between derivative contracts and underlying cash assets (basis risk).",
        "Rollover cost variations across monthly settlement expiries.",
        "Counterparty clearing corporation rules and margin liquidity calls.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
      {/* ======================================================================
          Header & Breadcrumb
          ====================================================================== */}
      <header className="relative isolate overflow-hidden border-b border-line/70 pb-2 pt-2 sm:pb-2.5 sm:pt-2.5">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 size-96 rounded-full bg-gold/15 blur-[110px]"
        />

        <Container>
          <div className="flex flex-col gap-3">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-body">
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-ink">Compliance</span>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-brand font-bold">Risk Factors</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <ShieldAlert className="size-3.5 text-amber-600" />
                MANDATORY STATUTORY DISCLOSURES
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Standard Risk Factors &amp;{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Investment Warnings
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                Mutual funds and financial market instruments carry inherent risk. Please read all scheme-related documents (SID, SAI, KIM) carefully before investing.
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Mandatory AMFI Statutory Notice Card
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="rounded-[24px] sm:rounded-[30px] border-2 border-brand/30 bg-gradient-to-br from-mint/70 via-white to-soft p-5 sm:p-7 shadow-lift">
            <div className="flex flex-col gap-3.5 sm:gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                    <ShieldCheck className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-ink">
                      AMFI Registered Mutual Fund Distributor Disclosure
                    </h2>
                    <p className="text-xs text-body">Statutory regulatory classification under SEBI &amp; AMFI norms</p>
                  </div>
                </div>
                <span className="rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-white">
                  ARN-341412
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-line bg-white/90 p-3.5">
                  <span className="font-bold text-body uppercase tracking-wider text-[10.5px]">Distributor Scope</span>
                  <p className="mt-0.5 font-bold text-ink text-[13px]">
                    Intermediary for Mutual Fund Distribution
                  </p>
                  <p className="mt-1 text-body/90 leading-relaxed text-[12px]">
                    HM Wealth is registered with the Association of Mutual Funds in India (AMFI) as a Mutual Fund Distributor (ARN-341412). We distribute mutual fund schemes of SEBI-registered Asset Management Companies (AMCs) on regular plans and earn trail commissions.
                  </p>
                </div>

                <div className="rounded-xl border border-line bg-white/90 p-3.5">
                  <span className="font-bold text-body uppercase tracking-wider text-[10.5px]">Non-Advisory Clarification</span>
                  <p className="mt-0.5 font-bold text-rose-700 text-[13px]">
                    Not a SEBI-Registered Investment Adviser
                  </p>
                  <p className="mt-1 text-body/90 leading-relaxed text-[12px]">
                    HM Wealth is NOT a SEBI-registered Investment Adviser (RIA) and does not offer fee-based portfolio management or investment advisory services. Content, calculators, and scheme illustrations on this platform are for investor education and distribution facilitation only.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-amber-300/60 bg-amber-50/70 p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
                <AlertTriangle className="size-4 shrink-0 text-amber-700 mt-0.5" />
                <span className="leading-relaxed">
                  <strong>Key Notice:</strong> Past performance is not indicative of future returns. Mutual fund units are not bank deposits and are not guaranteed, insured, or backed by the Government of India or the Reserve Bank of India.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          Comprehensive Risk Categories
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="mb-4">
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">
              Key Risk Classifications Every Investor Must Understand
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-body">
              Different mutual fund asset classes and scheme types bear distinct structural risks:
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {riskCategories.map((rc) => {
              const Icon = rc.icon;
              return (
                <div
                  key={rc.title}
                  className="flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lift"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                        <Icon className="size-5" />
                      </span>
                      <span className="rounded-md bg-soft px-2 py-0.5 text-[10px] font-bold text-body">
                        {rc.badge}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-extrabold text-ink">{rc.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-body">{rc.desc}</p>

                    <ul className="mt-3 flex flex-col gap-1.5 border-t border-line/60 pt-3 text-[12px] text-body">
                      {rc.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-brand font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ======================================================================
          SID / SAI / KIM Study Notice & Action Steps
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="grid gap-4 lg:grid-cols-12 items-stretch">
            <div className="rounded-2xl sm:rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6 lg:col-span-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
                  <FileText className="size-4" />
                  Statutory Scheme Documents
                </div>
                <h3 className="mt-2 text-lg font-extrabold text-ink sm:text-xl">
                  Always Review Scheme Information Document (SID) &amp; KIM
                </h3>
                <p className="mt-1 text-[13.5px] leading-relaxed text-body">
                  Before applying for units in any mutual fund scheme, investors are legally advised to read the:
                </p>

                <div className="mt-3 grid gap-2.5 sm:grid-cols-3 text-xs">
                  <div className="rounded-xl border border-line bg-soft/60 p-3">
                    <p className="font-extrabold text-ink">SID</p>
                    <p className="text-[11px] text-body mt-0.5">Scheme Information Document outlining investment objective, asset allocation, and risk profile.</p>
                  </div>
                  <div className="rounded-xl border border-line bg-soft/60 p-3">
                    <p className="font-extrabold text-ink">SAI</p>
                    <p className="text-[11px] text-body mt-0.5">Statement of Additional Information describing the AMC sponsor, trustees, and operational policies.</p>
                  </div>
                  <div className="rounded-xl border border-line bg-soft/60 p-3">
                    <p className="font-extrabold text-ink">KIM</p>
                    <p className="text-[11px] text-body mt-0.5">Key Information Memorandum summarizing the essential features of the scheme application form.</p>
                  </div>
                </div>

                <p className="mt-3 text-xs text-body leading-relaxed">
                  These documents are available free of charge on the respective AMC websites, at our distribution desk, or directly through the official SEBI Scheme Filings database.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.sebi.gov.in/filings/mutual-funds.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand hover:underline"
                >
                  Access SEBI Official Scheme Filings
                  <ArrowRight className="size-3.5" />
                </a>
                <span className="text-body/30">|</span>
                <Link href="/important-links" className="text-xs font-bold text-body hover:text-ink">
                  View Important Portals Directory
                </Link>
              </div>
            </div>

            <div className="rounded-2xl sm:rounded-3xl border border-line bg-gradient-to-br from-[#04261c] to-[#021f16] p-5 text-white shadow-card sm:p-6 lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                  <HelpCircle className="size-3 text-gold" />
                  Need Clarity on Scheme Risks?
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-white">
                  Speak with Our Guidance Desk
                </h3>
                <p className="mt-1 text-xs text-white/75 leading-relaxed">
                  We walk you through scheme riskometers, historical downside capture ratios, and asset allocation suitability before initiating your investments.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl bg-white text-xs font-bold text-[#04261c] shadow-xs transition hover:bg-mint"
                >
                  Request Risk Review Call
                </Link>
                <Link
                  href="/investor-grievance"
                  className="text-center text-[11px] font-medium text-white/60 hover:text-white"
                >
                  View Investor Grievance Mechanism →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

