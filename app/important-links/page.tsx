import type { Metadata } from "next";
import Link from "next/link";
import {
  Link2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building,
  Database,
  HeartHandshake,
  FileText,
  Search,
  ArrowRight,
  Scale,
} from "lucide-react";
import { Container } from "@/components/ui/kit";

export const metadata: Metadata = {
  title: "Important Investor Links & Official Portals | HM Wealth",
  description:
    "Essential directory of official regulatory, RTA, depository, and financial portals for Indian mutual fund and insurance investors.",
};

export default function ImportantLinksPage() {
  const linkCategories = [
    {
      category: "Regulators & Industry Bodies",
      icon: Scale,
      badge: "Statutory Regulators",
      desc: "Official statutory authorities and self-regulatory organizations overseeing financial markets in India.",
      links: [
        {
          name: "SEBI (Securities and Exchange Board of India)",
          url: "https://www.sebi.gov.in/",
          desc: "Principal statutory regulatory body for capital and securities markets in India.",
        },
        {
          name: "AMFI (Association of Mutual Funds in India)",
          url: "https://www.amfiindia.com/",
          desc: "Industry organization of all SEBI-registered mutual funds in India; manages distributor ARN registrations.",
        },
        {
          name: "RBI (Reserve Bank of India)",
          url: "https://www.rbi.org.in/",
          desc: "Central banking institution controlling monetary policy, banking systems, and foreign exchange regulations.",
        },
        {
          name: "IRDAI (Insurance Regulatory and Development Authority)",
          url: "https://irdai.gov.in/",
          desc: "Apex statutory authority regulating life, general, and health insurance sectors in India.",
        },
      ],
    },
    {
      category: "Registrars & Transfer Agents (RTAs)",
      icon: Database,
      badge: "Folio & Transaction Servicing",
      desc: "Official processing agencies maintaining investor records, statements, and transaction processing for AMCs.",
      links: [
        {
          name: "CAMS (Computer Age Management Services)",
          url: "https://mycams.camsonline.com/",
          desc: "India's premier technology-driven financial infrastructure provider and mutual fund registrar.",
        },
        {
          name: "KFin Technologies (KFintech)",
          url: "https://mfs.kfintech.com/",
          desc: "Leading registrar and transfer agency servicing mutual funds, alternative investments, and pensions.",
        },
        {
          name: "MFCentral Unified Servicing Portal",
          url: "https://www.mfcentral.com/",
          desc: "Joint digital initiative by CAMS and KFintech enabling single-window CAS download and non-financial service requests.",
        },
      ],
    },
    {
      category: "Depositories & Central KYC Registries",
      icon: Building,
      badge: "Custody & KYC",
      desc: "Centralized agencies holding securities in demat form and maintaining verified KYC identity records.",
      links: [
        {
          name: "CDSL (Central Depository Services India Limited)",
          url: "https://www.cdslindia.com/",
          desc: "Premier Indian securities depository providing secure electronic holding of shares, bonds, and mutual funds.",
        },
        {
          name: "NSDL (National Securities Depository Limited)",
          url: "https://nsdl.co.in/",
          desc: "First and largest electronic depository in India facilitating safe custody and settlement of demat assets.",
        },
        {
          name: "CKYC (Central KYC Registry / CERSAI)",
          url: "https://www.ckycindia.in/",
          desc: "Centralized repository of KYC records for investors across the financial sector in India.",
        },
        {
          name: "CVL KRA (KYC Registration Agency)",
          url: "https://www.cvlkra.com/",
          desc: "SEBI-registered KYC registration agency to check KYC status against PAN.",
        },
      ],
    },
    {
      category: "Investor Grievance & Dispute Resolution",
      icon: HeartHandshake,
      badge: "Investor Protection",
      desc: "Official statutory escalation mechanisms for redressing unresolved grievances and disputes.",
      links: [
        {
          name: "SEBI SCORES Portal",
          url: "https://scores.sebi.gov.in/",
          desc: "Direct web-based centralized grievance redressal system operated by SEBI.",
        },
        {
          name: "SMART ODR Portal",
          url: "https://smartodr.in/",
          desc: "Securities Market Approach for Resolution Through Online Dispute Resolution for conciliation and arbitration.",
        },
        {
          name: "Bima Bharosa (IRDAI Grievance Portal)",
          url: "https://bimabharosa.irdai.gov.in/",
          desc: "Official consumer grievance portal operated by IRDAI for insurance complaints.",
        },
        {
          name: "Council for Insurance Ombudsmen",
          url: "https://www.cioins.co.in/",
          desc: "Institutional ombudsman mechanism for out-of-court settlement of insurance claims disputes.",
        },
      ],
    },
    {
      category: "Scheme Filings, Circulars & Regulatory Guidance",
      icon: FileText,
      badge: "Statutory Filings",
      desc: "Direct repositories for regulatory circulars, scheme offer documents, and professional conduct standards.",
      links: [
        {
          name: "SEBI Mutual Fund Scheme Filings (SID / SAI / KIM)",
          url: "https://www.sebi.gov.in/filings/mutual-funds.html",
          desc: "Official repository of all draft and final Scheme Information Documents approved by SEBI.",
        },
        {
          name: "SEBI Mutual Fund Regulatory Circulars",
          url: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Mutual+Funds",
          desc: "Complete archive of regulatory guidelines, circulars, and notifications governing mutual funds.",
        },
        {
          name: "AMFI Code of Conduct for Intermediaries",
          url: "https://www.amfiindia.com/intermediary/code-of-conduct",
          desc: "Statutory code of conduct governing mutual fund distributors, ethical disclosures, and client-first standards.",
        },
        {
          name: "AMFI Historical NAV Database",
          url: "https://www.amfiindia.com/net-asset-value/nav-history",
          desc: "Official daily Net Asset Value history archive for all mutual fund schemes operating in India.",
        },
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
              <span className="text-ink">Resources</span>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-brand font-bold">Important Links</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <Link2 className="size-3.5 text-brand" />
                VERIFIED OFFICIAL DIRECTORY
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Important Links for{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Investors
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                Direct, secure access to official government regulators, registrars (RTAs), depositories, and statutory filing repositories.
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Categorized Links Directory
          ====================================================================== */}
      <main className="py-1.5 sm:py-2">
        <Container>
          <div className="flex flex-col gap-5">
            {linkCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="rounded-2xl sm:rounded-3xl border border-line bg-white p-5 sm:p-6 shadow-card"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-xl bg-mint text-brand shadow-2xs">
                        <Icon className="size-4" />
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-ink">{cat.category}</h2>
                    </div>
                    <span className="rounded-full bg-soft px-3 py-0.5 text-xs font-bold text-body">
                      {cat.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-body">{cat.desc}</p>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {cat.links.map((lnk) => (
                      <a
                        key={lnk.name}
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 flex-col justify-between rounded-xl border border-line/70 bg-soft/40 p-3.5 transition-all hover:border-brand/40 hover:bg-white hover:shadow-xs"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-[13.5px] font-bold text-ink group-hover:text-brand transition-colors">
                              {lnk.name}
                            </h3>
                            <ExternalLink className="size-3.5 shrink-0 text-body/50 group-hover:text-brand group-hover:translate-x-0.5 transition-transform" />
                          </div>
                          <p className="mt-1 text-xs text-body leading-relaxed">
                            {lnk.desc}
                          </p>
                        </div>
                        <span className="mt-2 block truncate text-[11px] font-semibold text-brand/80">
                          {lnk.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Security Note */}
          <div className="mt-4 rounded-2xl border border-line bg-gradient-to-r from-soft via-mint/30 to-soft p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">Always Verify Official URLs</p>
                  <p className="text-xs text-body">Never share your OTP, banking passwords, or UPI PIN on unverified portals.</p>
                </div>
              </div>
              <Link
                href="/investor-grievance"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:underline"
              >
                Investor Grievance Redressal
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

