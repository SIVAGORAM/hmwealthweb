import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Lock,
  EyeOff,
  Server,
  FileCheck2,
  UserCheck,
  Mail,
  Phone,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Security | HM Wealth",
  description:
    "Commitment to data confidentiality, encryption, zero-spam policy, and compliance with Indian data protection laws.",
};

export default function PrivacyPolicyPage() {
  const principles = [
    {
      icon: EyeOff,
      title: "Zero Spam Guarantee",
      desc: "We never sell, rent, trade, or monetize your mobile number, email, or financial profile to third-party telemarketers, credit card issuers, or loan brokers. Your data is strictly used for your mutual fund and insurance servicing.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Encryption",
      desc: "All web traffic, form submissions, and document exchanges through our platform are protected by industry-standard 256-bit SSL/TLS encryption. We apply stringent access controls across our internal systems.",
    },
    {
      icon: FileCheck2,
      title: "Regulatory Disclosures Only",
      desc: "Your data is shared strictly with SEBI-registered Asset Management Companies (AMCs), official Registrars (CAMS, KFintech), stock exchange transaction platforms (BSE / NSE), and licensed insurance partners solely to execute your requested investments.",
    },
  ];

  const sections = [
    {
      title: "1. Information We Collect",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            To provide mutual fund distribution, portfolio review, and insurance facilitation services, HM Wealth collects necessary personal and regulatory information including:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Contact Information:</strong> Full name, phone/mobile number, email address, residential address, and city.</li>
            <li><strong>Financial Profiles:</strong> Investment horizons, financial goals (retirement, child education, wealth creation), and risk preferences.</li>
            <li><strong>Statutory KYC Documents:</strong> Permanent Account Number (PAN), date of birth, proof of address (Aadhaar / Passport / Voter ID), bank account details (for verification and redemption credit), and nominee details as mandated by SEBI/AMFI and PMLA guidelines.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>We process your data strictly for legitimate business and regulatory purposes:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Initiating paperless KYC verification with SEBI-registered KYC Registration Agencies (KRAs).</li>
            <li>Processing mutual fund purchase, SIP registration, redemption, or switch orders with fund houses.</li>
            <li>Assisting with insurance quote comparison, proposal submission, and claim coordination.</li>
            <li>Sharing Consolidated Account Statements (CAS), annual portfolio health checks, and statutory regulatory updates.</li>
            <li>Connecting with you via Phone or WhatsApp only for scheduled meetings, requested inquiries, or urgent operational notices.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Data Sharing & Third-Party Partners",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            HM Wealth does not disclose client information to any unrelated commercial entities. Information is shared exclusively with:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Asset Management Companies (AMCs) &amp; RTAs:</strong> CAMS, KFintech, and fund houses for folio creation and unit allotment.</li>
            <li><strong>Transaction Infrastructure Platforms:</strong> BSE StAR MF, NSE NMF II, or verified payment gateways for monetary processing.</li>
            <li><strong>Government &amp; Regulatory Authorities:</strong> SEBI, AMFI, Income Tax Department, or statutory enforcement agencies when legally required by applicable Indian laws.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Data Storage, Retention & Security",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            We maintain technical and organizational safeguards in compliance with the Information Technology Act, 2000, and Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
          <p>
            Client transaction records and KYC proofs are retained for the duration mandated by SEBI and Prevention of Money Laundering Act (PMLA) regulations (typically a minimum of 5 years following the cessation of client relationship).
          </p>
        </div>
      ),
    },
    {
      title: "5. Your Rights as an Investor",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>You have full control over your personal data:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Right to Review:</strong> You may request a copy of the personal information we hold regarding your account.</li>
            <li><strong>Right to Rectify:</strong> You may update or correct inaccurate contact details or bank accounts at any time.</li>
            <li><strong>Right to Opt Out:</strong> You may unsubscribe from educational newsletters or non-transactional communications by notifying our desk.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "6. Data Protection & Privacy Contact",
      body: (
        <div className="flex flex-col gap-2 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            For questions, data access requests, or privacy concerns, please contact our Compliance &amp; Data Protection Officer:
          </p>
          <div className="rounded-xl border border-line bg-soft/60 p-3 mt-1">
            <p className="font-extrabold text-ink">{site.founder}</p>
            <p className="text-[11.5px] text-body">Principal Officer · HM Wealth (ARN-341412)</p>
            <div className="mt-2 flex flex-wrap gap-4 text-xs font-bold text-brand">
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
              <span>·</span>
              <a href={site.phoneHref} className="hover:underline">
                {site.phone}
              </a>
            </div>
          </div>
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
              <span className="text-brand font-bold">Privacy Policy</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <Lock className="size-3.5 text-brand" />
                DATA PRIVACY &amp; CONFIDENTIALITY
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Privacy Policy &amp;{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Data Security
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                We treat your private data and financial records with the exact same discipline and integrity as our own.
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          3 Core Principles
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="grid gap-3.5 sm:grid-cols-3">
            {principles.map((pr) => {
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
          Policy Sections
          ====================================================================== */}
      <main className="py-2.5 sm:py-3.5">
        <Container>
          <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-2">
            {sections.map((sec) => (
              <div
                key={sec.title}
                className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card"
              >
                <h3 className="border-b border-line/60 pb-2.5 text-sm sm:text-base font-extrabold text-ink">
                  {sec.title}
                </h3>
                <div className="mt-3">{sec.body}</div>
              </div>
            ))}
          </div>

          {/* Bottom Security Note */}
          <div className="mt-4 rounded-2xl border border-line bg-gradient-to-r from-soft via-mint/40 to-soft p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">AMFI Registered Mutual Fund Distributor</p>
                  <p className="text-xs text-body">ARN-341412 · Committed to statutory data ethics and confidentiality</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/terms-conditions"
                  className="text-xs font-bold text-brand hover:underline"
                >
                  Terms &amp; Conditions →
                </Link>
                <span className="text-body/30">|</span>
                <Link
                  href="/risk-factors"
                  className="text-xs font-bold text-body hover:text-ink"
                >
                  Risk Factors →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}

