import type { Metadata } from "next";
import Link from "next/link";
import {
  FileCheck,
  ChevronRight,
  ShieldCheck,
  Scale,
  Clock,
  Coins,
  AlertCircle,
  FileText,
  UserCheck,
  Lock,
  Building,
  HelpCircle,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions of Service | HM Wealth (ARN-341412)",
  description:
    "Terms of service, distribution scope, NAV applicability, commission disclosures, loads, and client obligations for HM Wealth.",
};

export default function TermsConditionsPage() {
  const sections = [
    {
      id: "scope",
      icon: Scale,
      title: "1. Scope of Distribution Services",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            HM Wealth is registered with the Association of Mutual Funds in India (AMFI) as a licensed Mutual Fund Distributor holding registration number <strong>ARN-341412</strong>.
          </p>
          <p>
            Our service is strictly that of an intermediary and distributor. We facilitate the purchase, redemption, systematic investment, and switching of mutual fund units issued by Asset Management Companies (AMCs) registered with the Securities and Exchange Board of India (SEBI).
          </p>
          <div className="rounded-xl border border-brand/20 bg-mint/50 p-3 text-ink">
            <strong>Non-Advisory Status:</strong> HM Wealth is not a SEBI-registered Investment Adviser (RIA). We do not provide fee-based investment advice or contractually binding portfolio management. Clients make the final decision regarding their investment schemes based on their individual risk appetite and financial objectives.
          </div>
        </div>
      ),
    },
    {
      id: "non-custodial",
      icon: Lock,
      title: "2. Non-Custodial Nature of Operations",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            HM Wealth operates on a strictly non-custodial framework. <strong>We do not, under any circumstances, accept, handle, or hold client money or mutual fund securities.</strong>
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>All investment funds are debited directly from your verified bank account and credited directly to the respective SEBI-registered Mutual Fund / AMC escrow account.</li>
            <li>Transactions are executed through certified institutional infrastructure including BSE StAR MF, NSE NMF II, or official RTA payment gateways (CAMS / KFintech / MFCentral).</li>
            <li>Folios, mutual fund units, and insurance policies are issued exclusively in your own name.</li>
            <li>Redemption payouts and dividend distributions are credited directly by the AMC/fund house into your verified bank account.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "nav-cutoffs",
      icon: Clock,
      title: "3. Net Asset Value (NAV) & Cut-Off Timings",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Applicability of Net Asset Value (NAV) for purchases, redemptions, and switches is strictly governed by SEBI regulations and circulars, based on the realization of funds in the AMC’s account before cut-off timings:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 mt-1">
            <div className="rounded-xl border border-line bg-soft/60 p-2.5">
              <span className="font-bold text-ink">Liquid &amp; Overnight Funds:</span>
              <p className="mt-0.5 text-[11.5px]">Cut-off time is 1:30 PM (IST). Allotment NAV is historical day’s or same-day NAV subject to fund realization before cut-off.</p>
            </div>
            <div className="rounded-xl border border-line bg-soft/60 p-2.5">
              <span className="font-bold text-ink">Equity &amp; Other Debt Funds:</span>
              <p className="mt-0.5 text-[11.5px]">Cut-off time is 3:00 PM (IST). Units are allotted at the NAV of the business day on which funds are credited to the scheme account before cut-off.</p>
            </div>
          </div>
          <p className="text-[11.5px] text-body/80 mt-1">
            HM Wealth is not responsible for any delay in unit allotment resulting from banking clearing delays, RTGS/NEFT/UPI gateway downtimes, or RTA processing queues.
          </p>
        </div>
      ),
    },
    {
      id: "commissions",
      icon: Coins,
      title: "4. AMC Commission & Brokerage Disclosures",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In accordance with SEBI circulars and AMFI regulations, HM Wealth earns trail commissions from Asset Management Companies for the distribution and ongoing servicing of regular mutual fund plans.
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>These commissions are paid directly by the AMC out of the scheme’s Total Expense Ratio (TER), as permitted by SEBI.</li>
            <li>No separate direct invoice or advisory fee is charged to the client by HM Wealth.</li>
            <li>The commission rates vary across AMCs, asset classes (equity, debt, hybrid), and geographical investor tiers (B-30 / T-30).</li>
            <li>Clients have the statutory right to request and receive the full commission structure for any scheme recommended or distributed by HM Wealth.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "loads",
      icon: FileCheck,
      title: "5. Entry & Exit Loads",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            <strong>Zero Entry Load:</strong> As mandated by SEBI, no entry load is charged for investing in any mutual fund scheme in India.
          </p>
          <p>
            <strong>Exit Loads:</strong> Mutual fund schemes may levy an Exit Load if units are redeemed or switched within a predefined horizon (e.g., 1% exit load if redeemed within 365 days in equity funds; 0% thereafter). The exit load is deducted by the AMC from the redemption proceeds and credited back to the scheme. Investors must check the specific scheme KIM/SID for applicable exit load rules.
          </p>
        </div>
      ),
    },
    {
      id: "kyc",
      icon: UserCheck,
      title: "6. Client KYC & Statutory Obligations",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Under Prevention of Money Laundering Act (PMLA) regulations and SEBI mandates, completion of Know Your Customer (KYC) verification is mandatory for all investors.
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Investors agree to submit genuine, verifiable PAN, Aadhaar, bank details, and address documentation.</li>
            <li>Third-party bank accounts are strictly prohibited. The bank account used for investment must stand in the name of the primary/joint folio holder.</li>
            <li>Investors are responsible for ensuring nominee details, contact information, and FATCA/CRS self-certifications remain updated.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "liability",
      icon: AlertCircle,
      title: "7. Disclaimer of Guarantees & Limitation of Liability",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Mutual fund investments are subject to market risks. HM Wealth makes no representations, warranties, or guarantees regarding future returns, capital preservation, or outperformance of any scheme.
          </p>
          <p>
            All tools, compound interest calculators, and visual simulations on this website are illustrative models assuming steady growth rates and do not represent contractual promises.
          </p>
          <p>
            HM Wealth and its representatives shall not be held liable for any loss, damage, or expense arising from market fluctuations, operational delays of exchanges or banks, or decisions executed by investors.
          </p>
        </div>
      ),
    },
    {
      id: "governing-law",
      icon: Building,
      title: "8. Governing Law & Jurisdiction",
      content: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of the Republic of India and applicable regulations of SEBI, AMFI, and IRDAI.
          </p>
          <p>
            Any disputes arising in connection with the distribution services of HM Wealth shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
          </p>
        </div>
      ),
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
              <span className="text-ink">Legal</span>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-brand font-bold">Terms &amp; Conditions</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <FileText className="size-3.5 text-brand" />
                SERVICE AGREEMENT &amp; DISCLOSURES
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Terms &amp; Conditions of{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                These terms govern your relationship with HM Wealth (ARN-341412) regarding mutual fund distribution, account servicing, and website usage.
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Terms Sections
          ====================================================================== */}
      <main className="py-1.5 sm:py-2">
        <Container>
          <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-2">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  id={s.id}
                  className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card transition-all hover:border-brand/40"
                >
                  <div className="flex items-center gap-2.5 border-b border-line/60 pb-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                      <Icon className="size-4" />
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-ink">{s.title}</h2>
                  </div>
                  <div className="mt-3">{s.content}</div>
                </div>
              );
            })}
          </div>

          {/* Bottom Regulatory Strip */}
          <div className="mt-4 rounded-2xl border border-line bg-gradient-to-r from-soft via-mint/40 to-soft p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">AMFI-Registered Mutual Fund Distributor</p>
                  <p className="text-xs text-body">Registration ARN-341412 · Committed to statutory transparency</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/risk-factors"
                  className="text-xs font-bold text-brand hover:underline"
                >
                  Statutory Risk Factors →
                </Link>
                <span className="text-body/30">|</span>
                <Link
                  href="/privacy-policy"
                  className="text-xs font-bold text-body hover:text-ink"
                >
                  Privacy Policy →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

