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
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Gavel,
  Landmark,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.termsConditions);

export default function TermsConditionsPage() {
  const complianceHighlights = [
    {
      icon: ShieldCheck,
      title: "AMFI-Registered Distributor",
      desc: `HM Wealth is an AMFI-registered Mutual Fund Distributor (${site.arn}) acting strictly as an intermediary. We do not charge advisory fees and distribute regular mutual fund plans.`,
    },
    {
      icon: Lock,
      title: "100% Non-Custodial Operations",
      desc: "We never accept, touch, or handle client money. All funds move directly from your verified bank account to SEBI-registered AMC escrow accounts via certified clearing houses.",
    },
    {
      icon: Scale,
      title: "SEBI & AMFI Code of Conduct",
      desc: "Every interaction, transaction instruction, and disclosure strictly complies with SEBI (Mutual Funds) Regulations, 1996, and the mandatory AMFI Code of Conduct for MFDs.",
    },
  ];

  const sections = [
    {
      id: "scope-of-services",
      icon: Scale,
      title: "1. Scope of Distribution Services & Non-Advisory Status",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            HM Wealth (referred to as &quot;we&quot;, &quot;us&quot;, or &quot;the Firm&quot;) is registered with the Association of Mutual Funds in India (AMFI) as an AMFI-registered Mutual Fund Distributor holding <strong>{site.arn}</strong>.
          </p>
          <p>
            Our service is strictly that of an intermediary and distributor. We facilitate the purchase, systematic investment (SIP), redemption, and switching of regular mutual fund units issued by Asset Management Companies (AMCs) registered with the Securities and Exchange Board of India (SEBI).
          </p>
          <div className="rounded-xl border border-brand/20 bg-mint/50 p-3 text-ink">
            <p className="font-extrabold text-brand text-[12.5px]">
              Statutory Non-Advisory Status (SEBI Regulations):
            </p>
            <p className="mt-1 text-[12px] text-body">
              HM Wealth is <strong>not</strong> a SEBI-registered Investment Adviser (RIA) and does not provide fee-based investment advice or discretionary portfolio management services. We distribute regular plans of mutual fund schemes and earn trail commissions directly from AMCs. All investment selections and decisions are made solely at the investor&apos;s own discretion and risk based on their personal financial objectives and scheme risk-o-meter assessments.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "non-custodial",
      icon: Lock,
      title: "2. Strictly Non-Custodial Architecture & Fund Routing",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            HM Wealth operates on a 100% non-custodial framework. <strong>We do not, under any circumstances, accept cash, receive cheques in our name, or hold client funds or securities.</strong>
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Direct Fund Debits:</strong> All purchase and SIP amounts are debited directly from your verified, KYC-compliant bank account and credited straight into the respective SEBI-registered AMC scheme accounts through recognized clearing corporations (ICCL / NSE Clearing) or official RTA payment aggregators.
            </li>
            <li>
              <strong>Strict Prohibition of Third-Party Accounts:</strong> Under SEBI Anti-Money Laundering mandates, investments originating from bank accounts belonging to any third party other than the primary or joint folio holders are strictly prohibited and will be rejected.
            </li>
            <li>
              <strong>Direct Redemption Payouts:</strong> Redemption proceeds, systematic withdrawal payouts (SWP), and dividend payouts are credited directly by the AMC/RTA into your verified primary bank account. HM Wealth has no access to or role in redemption transfers.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "sebi-nav-cutoffs",
      icon: Clock,
      title: "3. SEBI NAV Realization Rules & Cut-Off Timings",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In accordance with SEBI circulars (including circular SEBI/HO/IMD/DF2/CIR/P/2020/175 on fund realization), the allotment of Net Asset Value (NAV) for all purchases, redemptions, and switches is strictly contingent upon the <strong>credit of funds into the AMC’s scheme account</strong> before statutory cut-off times:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 mt-1">
            <div className="rounded-xl border border-line bg-soft/60 p-2.5">
              <span className="font-bold text-ink text-[12px]">Liquid &amp; Overnight Funds:</span>
              <p className="mt-0.5 text-[11px] text-body">
                Cut-off time is <strong>1:30 PM (IST)</strong>. Allotment NAV is determined based on fund realization before cut-off as per SEBI regulations.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-soft/60 p-2.5">
              <span className="font-bold text-ink text-[12px]">Equity, Debt &amp; Hybrid Funds:</span>
              <p className="mt-0.5 text-[11px] text-body">
                Cut-off time is <strong>3:00 PM (IST)</strong>. Units are allotted at the NAV of the business day on which funds are received in the scheme account before cut-off.
              </p>
            </div>
          </div>
          <p className="text-[11.5px] text-body/80 mt-1">
            HM Wealth accepts no liability for NAV variances or allotment delays caused by banking network clearing cycles (NEFT/RTGS/NACH), payment gateway downtimes, or RTA server outages.
          </p>
        </div>
      ),
    },
    {
      id: "commissions-disclosures",
      icon: Coins,
      title: "4. AMC Commission & Brokerage Disclosures",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In accordance with SEBI Circular No. SEBI/IMD/CIR No. 4/168230/09 and the AMFI Code of Conduct, HM Wealth makes complete disclosure regarding its commission structure:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Trail Model Only:</strong> HM Wealth earns ongoing trail commissions from Asset Management Companies for regular plan distribution and investor servicing. No upfront commissions are received as per SEBI mandates.
            </li>
            <li>
              <strong>Total Expense Ratio (TER):</strong> These trail commissions are paid directly by the AMC out of the scheme&apos;s Total Expense Ratio (TER), within the statutory regulatory caps established by SEBI.
            </li>
            <li>
              <strong>Zero Direct Invoicing:</strong> HM Wealth never bills or collects any direct advisory or distribution fees from clients for mutual fund transactions.
            </li>
            <li>
              <strong>Right to Commission Transparency:</strong> Clients have the statutory right to request and inspect the complete commission rates received by HM Wealth across any schemes distributed.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "loads-and-taxes",
      icon: FileCheck,
      title: "5. Entry Load, Exit Loads & Statutory Levies",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            <strong>Zero Entry Load:</strong> In compliance with SEBI regulations, no entry load is charged on any mutual fund investment in India.
          </p>
          <p>
            <strong>Exit Loads:</strong> Certain mutual fund schemes may levy an Exit Load if units are redeemed or switched prior to the minimum prescribed holding duration (as specified in the Scheme Information Document - SID). The exit load is deducted by the AMC directly from the redemption proceeds and credited back to the scheme.
          </p>
          <p>
            <strong>Stamp Duty &amp; STT:</strong> Stamp duty of 0.005% is levied by the Government of India on mutual fund purchases and SIP installments. Securities Transaction Tax (STT) and capital gains taxes (LTCG / STCG) apply in accordance with prevailing Indian Income Tax laws.
          </p>
        </div>
      ),
    },
    {
      id: "client-kyc-obligations",
      icon: UserCheck,
      title: "6. Client KYC, PMLA & Statutory Warranties",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Under the Prevention of Money Laundering Act, 2002 (PMLA) and SEBI Master Circular on KYC norms, completion of verified KYC is mandatory prior to transacting:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Authenticity of Documents:</strong> You warrant that all identity proofs (PAN, Aadhaar OVD, passport), bank account details, and contact credentials submitted are authentic, valid, and belong to you.
            </li>
            <li>
              <strong>Lawful Source of Funds:</strong> You declare and certify that all funds deployed in mutual fund investments are derived through legitimate, lawful sources and do not constitute proceeds of crime under PMLA provisions.
            </li>
            <li>
              <strong>Ongoing Information Updates:</strong> You agree to promptly update your contact details, residential address, bank accounts, and FATCA/CRS tax residency declarations via SEBI-registered KRAs.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimer-guarantees",
      icon: AlertCircle,
      title: "7. Disclaimer of Guarantees & Market Risk Notice",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3 text-rose-950 font-semibold text-[12px]">
            ⚠️ Mandatory SEBI Statutory Disclaimer: Mutual fund investments are subject to market risks, read all scheme related documents carefully.
          </div>
          <p>
            HM Wealth makes no representations, warranties, or assurances—express or implied—regarding capital preservation, guaranteed returns, dividend declarations, or future appreciation of any scheme.
          </p>
          <p>
            Past performance of any fund house, fund manager, or scheme is purely historical and is <strong>not</strong> indicative of future results. NAVs may fluctuate upward or downward based on prevailing market, macroeconomic, interest rate, and geopolitical conditions.
          </p>
          <p>
            All financial calculators, return simulations, and compound interest models on this website are illustrative tools assuming uniform hypothetical growth rates for educational purposes only.
          </p>
        </div>
      ),
    },
    {
      id: "suitability-appropriateness",
      icon: ShieldCheck,
      title: "8. Appropriateness & Investor Self-Assessment",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In alignment with the AMFI Code of Conduct on suitability:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Scheme Risk-o-Meter:</strong> Investors must independently review each scheme’s official Risk-o-Meter label (ranging from Low to Very High risk) as published in the Key Information Memorandum (KIM) and Scheme Information Document (SID).
            </li>
            <li>
              <strong>Independent Evaluation:</strong> You acknowledge that you have assessed the liquidity terms, exit loads, underlying portfolio composition, and tax ramifications before committing capital.
            </li>
            <li>
              <strong>Insurance Solicitation:</strong> Insurance policies displayed or facilitated on this website are issued by licensed insurance partners. Insurance is the subject matter of solicitation. Policy issuance, underwriting, and claim approvals remain the sole prerogative of the underwriting insurer.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "electronic-communications",
      icon: MessageSquare,
      title: "9. Electronic Communications & Digital Service Terms",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            By sharing your contact information and utilizing our digital portals or website assistant:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Consent for Electronic Dispatches:</strong> You consent to receive service notifications, transaction confirmations, Consolidated Account Statements (CAS), and operational updates via Email, SMS, or WhatsApp.
            </li>
            <li>
              <strong>Marketing Opt-Out:</strong> You may opt out of receiving educational newsletters or marketing broadcasts at any time by notifying our compliance desk or clicking unsubscribe.
            </li>
            <li>
              <strong>Security of Credentials:</strong> You are responsible for safeguarding your registered email, mobile OTPs, and transaction passwords. HM Wealth representatives will never solicit your OTP, net-banking passwords, or UPI PINs.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "limitation-of-liability",
      icon: Landmark,
      title: "10. Limitation of Liability & Force Majeure",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            To the maximum extent permissible under applicable law, HM Wealth, its proprietor, and employees shall not be held liable for any direct, indirect, incidental, punitive, or consequential damages resulting from:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>Market losses or capital depreciation incurred in mutual fund or insurance holdings.</li>
            <li>Technical failure, server downtime, or transactional errors on stock exchange infrastructure (BSE StAR MF / NSE NMF II), payment gateways, or RTA servers (CAMS / KFintech).</li>
            <li>Rejection of orders resulting from incomplete KYC, incorrect bank details, or banking network failures.</li>
            <li>Events of Force Majeure including cyberattacks, natural disasters, telecommunications blackouts, or government regulatory moratoriums.</li>
          </ul>
        </div>
      ),
    },
    {
      id: "grievance-odr",
      icon: Gavel,
      title: "11. Grievance Redressal, SEBI SCORES & SMART ODR Mechanism",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In compliance with SEBI Master Circulars on investor grievance management, HM Wealth maintains a defined multi-tier redressal mechanism:
          </p>
          <div className="rounded-xl border border-line bg-soft/60 p-3 mt-1">
            <p className="font-bold text-ink text-[12.5px]">Level 1: Internal Grievance Desk</p>
            <p className="text-[12px] text-body mt-0.5">
              Contact our Compliance Officer: <strong>{site.founder}</strong> (Principal Officer)
            </p>
            <p className="text-[11.5px] text-body">
              Email: <a href={`mailto:${site.email}`} className="text-brand font-semibold underline">{site.email}</a> · Phone: {site.phone}
            </p>
            <p className="text-[11.5px] text-body/80 mt-0.5">Address: {site.address}</p>
          </div>
          <div className="rounded-xl border border-line bg-white p-3 shadow-2xs mt-1">
            <p className="font-bold text-ink text-[12.5px]">Level 2: SEBI SCORES &amp; SMART ODR Portal</p>
            <p className="text-[11.5px] text-body mt-0.5">
              If your grievance is not redressed satisfactorily within 30 days, you may lodge a complaint on SEBI SCORES (<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold underline">scores.sebi.gov.in</a>) or access the online conciliation and arbitration mechanism via the <strong>SMART ODR Portal</strong> (<a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold underline">smartodr.in</a>).
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "governing-law",
      icon: Building,
      title: "12. Governing Law, Jurisdiction & Periodic Amendments",
      content: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            These Terms &amp; Conditions are governed by, interpreted, and construed strictly in accordance with the laws of the Republic of India and applicable regulatory directives of SEBI, AMFI, and IRDAI.
          </p>
          <p>
            Any legal dispute, difference, or claim arising out of or in connection with the distribution services of HM Wealth shall be subject to the exclusive jurisdiction of the competent courts in <strong>Hyderabad, Telangana, India</strong>.
          </p>
          <p className="font-medium text-ink">
            HM Wealth reserves the right to amend, update, or revise these terms at any time to reflect legislative or regulatory amendments. Continued engagement with our services constitutes acceptance of the modified terms.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Terms & Conditions", item: "/terms-conditions" },
        ])}
      />

      {/* ======================================================================
          Header & Breadcrumb
          ====================================================================== */}
      <header className="relative isolate overflow-hidden border-b border-line/70 pb-3 pt-3 sm:pb-4 sm:pt-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 size-96 rounded-full bg-gold/15 blur-[110px]"
        />

        <Container>
          <div className="flex flex-col gap-2.5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-body">
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-ink">Legal &amp; Compliance</span>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-brand font-bold">Terms &amp; Conditions</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <FileText className="size-3.5 text-brand" />
                DISTRIBUTOR TERMS OF SERVICE · {site.arn}
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Terms &amp; Conditions of{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                Comprehensive distribution terms, non-custodial framework, statutory commission disclosures, and investor safeguards governing your relationship with {site.name} ({site.arn}).
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          3 Core Principles
          ====================================================================== */}
      <section className="py-5 sm:py-7">
        <Container>
          <div className="grid gap-3.5 sm:grid-cols-3">
            {complianceHighlights.map((pr) => {
              const Icon = pr.icon;
              return (
                <div
                  key={pr.title}
                  className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-3 text-base font-extrabold text-ink">{pr.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-body">{pr.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ======================================================================
          Terms Sections (12 Comprehensive Clauses)
          ====================================================================== */}
      <section className="py-2.5 sm:py-3.5">
        <Container>
          <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-2">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  id={sec.id}
                  className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card transition-all hover:border-brand/40"
                >
                  <div className="flex items-center gap-2.5 border-b border-line/60 pb-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                      <Icon className="size-4" />
                    </span>
                    <h2 className="text-sm sm:text-base font-extrabold text-ink">{sec.title}</h2>
                  </div>
                  <div className="mt-3">{sec.content}</div>
                </div>
              );
            })}
          </div>

          {/* Statutory Regulatory Notice Bar */}
          <div className="mt-5 rounded-2xl border border-line bg-gradient-to-r from-soft via-mint/40 to-soft p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">AMFI-Registered Mutual Fund Distributor ({site.arn})</p>
                  <p className="text-xs text-body">
                    Committed to statutory transparency, non-custodial integrity, and investor protection
                  </p>
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
                <span className="text-body/30">|</span>
                <Link
                  href="/investor-grievance"
                  className="text-xs font-bold text-body hover:text-ink"
                >
                  Investor Grievance →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
