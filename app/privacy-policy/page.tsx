import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Lock,
  EyeOff,
  Server,
  FileCheck2,
  Mail,
  Phone,
  CheckCircle2,
  ExternalLink,
  Database,
  KeyRound,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.privacyPolicy);

export default function PrivacyPolicyPage() {
  const principles = [
    {
      icon: EyeOff,
      title: "Confidentiality & Zero Spam",
      desc: "In accordance with the AMFI Code of Conduct, we never sell, rent, trade, or lease your personal information, mobile number, or financial profile to third-party telemarketers, credit agencies, or commercial brokers.",
    },
    {
      icon: Lock,
      title: "Bank-Grade Encryption",
      desc: "All platform communications and form transmissions are protected by 256-bit SSL/TLS encryption. Sensitive credentials utilize one-way cryptographic hashing, supported by continuous automated backups.",
    },
    {
      icon: FileCheck2,
      title: "SEBI & AMFI Regulatory Compliance",
      desc: "Client information is processed strictly for Know-Your-Customer (KYC) compliance, statutory PMLA mandates, and executing authorized mutual fund orders through SEBI-regulated infrastructure (AMCs, RTAs, Stock Exchanges).",
    },
  ];

  const sections = [
    {
      id: "scope-and-consent",
      title: "1. Scope, Purpose & User Consent",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            This Privacy Policy outlines how <strong>{site.name}</strong> (referred to as &quot;we&quot;, &quot;our&quot;, or &quot;the Firm&quot;), an AMFI-registered Mutual Fund Distributor holding <strong>{site.arn}</strong>, handles, processes, and safeguards any personal and financial information shared by users and investors across this website and our related distribution services.
          </p>
          <p>
            We are committed to ensuring that your privacy remains protected at all times. Should we request any personally identifiable information, it will only be used in strict accordance with this Privacy Policy, the AMFI Code of Conduct for Mutual Fund Distributors, regulations framed by the Securities and Exchange Board of India (SEBI), and the Digital Personal Data Protection Act, 2023 (DPDP Act).
          </p>
          <div className="rounded-xl border border-line bg-soft/50 p-3">
            <p className="font-semibold text-ink">
              User Consent Notice:
            </p>
            <p className="mt-1 text-body/90">
              By accessing, browsing, or using this website, you explicitly consent to the collection, storage, and use of your information as outlined in this Privacy Policy. If you do not agree with any part of this policy, please discontinue the use of this website.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "confidentiality",
      title: "2. Confidentiality & Data Protection Standards",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            We recognize that our relationship with investors is built upon absolute trust, professional integrity, and strict confidentiality.
          </p>
          <p>
            Reasonable technical, administrative, and physical security measures have been implemented to safeguard the security, confidentiality, and integrity of your information, including industry-standard encryption, firewalls, and stringent access controls in accordance with the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
          </p>
          <p className="text-slate-700 italic">
            <strong>Limitation:</strong> While we employ industry-standard safeguards to protect your personal data, we shall not be held liable for any security breach or unauthorized disclosure resulting from circumstances beyond our reasonable control (force majeure, malicious third-party attacks, hardware failure) or where disclosure is mandatory under applicable Indian laws, statutory regulations, or competent judicial orders.
          </p>
        </div>
      ),
    },
    {
      id: "information-collected",
      title: "3. Information We Collect",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            To fulfill statutory distributor obligations, conduct Know-Your-Customer (KYC) onboarding, and service your mutual fund and insurance requirements, we may collect the following categories of information:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Name &amp; Contact Details:</strong> Full legal name, residential address, telephone/mobile number, and active email address.
            </li>
            <li>
              <strong>Personal Identifiers &amp; Statutory KYC Data:</strong> Date of birth, Permanent Account Number (PAN), and masked Aadhaar (processed strictly through SEBI-registered KYC Registration Agencies or UIDAI-compliant offline verification in accordance with PMLA and SEBI KYC Master Circulars).
            </li>
            <li>
              <strong>Demographic &amp; Financial Information:</strong> Gender, occupation, gross annual income bracket, tax residency status (FATCA / CRS declarations), bank account details (account number, IFSC, cancelled cheque for dividend and redemption payouts), and nominee particulars.
            </li>
            <li>
              <strong>Technical &amp; Operational Information:</strong> IP address, device telemetry, browser type, and non-sensitive inputs entered into our financial calculators for your convenience.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "how-we-use-information",
      title: "4. How We Use Your Information",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>Your information is processed strictly for legitimate investment facilitation, operational servicing, and statutory compliance purposes:</p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>KYC Registration &amp; Verification:</strong> To fulfill Know-Your-Customer (KYC) registration and identity verification as mandated by SEBI, AMFI, and SEBI-registered KRAs (CAMS KRA, KFin KRA, CVL, NDML, DOTEX).
            </li>
            <li>
              <strong>Transaction Processing:</strong> To facilitate client-authorized purchase, SIP registration, redemption, switch, or transfer orders with SEBI-registered Asset Management Companies (AMCs) and recognized stock exchange platforms (BSE StAR MF, NSE NMF II).
            </li>
            <li>
              <strong>Statutory Compliance &amp; Record Maintenance:</strong> To maintain internal audit records, transaction logs, and perform regulatory checks as required under SEBI regulations and the Prevention of Money Laundering Act, 2002 (PMLA).
            </li>
            <li>
              <strong>Service Enhancement:</strong> To enhance our digital calculators, improve platform responsiveness, and tailor client support.
            </li>
            <li>
              <strong>Operational &amp; Investment Updates:</strong> To periodically send important transactional confirmations, Consolidated Account Statements (CAS), portfolio health-check summaries, and regulatory circulars.
            </li>
            <li>
              <strong>Market Research &amp; Direct Communication:</strong> To communicate regarding user-initiated inquiries via phone, email, or WhatsApp.
            </li>
          </ul>
          <div className="mt-1 rounded-xl border border-line bg-mint/40 p-2.5">
            <p className="text-[12px] font-semibold text-brand">
              ✓ Unsubscribe Rights: Users hold the unequivocal right to unsubscribe from non-essential educational or marketing communications at any time by contacting our desk.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "data-security-certifications",
      title: "5. Data Security & Technical Certifications",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            We are deeply committed to ensuring that your data remains secure at all times. Our multi-layered security architecture includes:
          </p>
          <div className="grid gap-2 sm:grid-cols-2 mt-1">
            <div className="flex items-start gap-2 rounded-xl border border-line bg-white p-2.5 shadow-2xs">
              <KeyRound className="size-4 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="font-bold text-ink text-[12px]">One-Way Password Encryption</p>
                <p className="text-[11px] text-body">Cryptographic hashing of authentication credentials and passwords.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-line bg-white p-2.5 shadow-2xs">
              <Lock className="size-4 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="font-bold text-ink text-[12px]">256-Bit SSL/TLS Encryption</p>
                <p className="text-[11px] text-body">End-to-end cryptographic encryption for all web communications and form data.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-line bg-white p-2.5 shadow-2xs">
              <Server className="size-4 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="font-bold text-ink text-[12px]">Top-Tier Secure Hosting</p>
                <p className="text-[11px] text-body">Infrastructure hosted on enterprise cloud servers with DDoS mitigation and firewalls.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-line bg-white p-2.5 shadow-2xs">
              <Database className="size-4 shrink-0 text-brand mt-0.5" />
              <div>
                <p className="font-bold text-ink text-[12px]">Continuous Data Backups</p>
                <p className="text-[11px] text-body">Automated continuous backup snapshots ensuring business continuity and recovery.</p>
              </div>
            </div>
          </div>
          <p className="mt-1">
            <strong>Restricted Access:</strong> Access to personal information is strictly restricted to authorized personnel who require the data to perform statutory servicing and are bound by formal non-disclosure agreements.
          </p>
        </div>
      ),
    },
    {
      id: "controlling-personal-info",
      title: "6. Controlling Your Personal Information & Non-Disclosure",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            <strong>Strict Non-Disclosure Guarantee:</strong> We do not sell, distribute, trade, or lease personal information to third parties under any circumstances.
          </p>
          <p>
            Personal and financial data is shared exclusively when required by law or necessary for processing user-authorized transactions, limited strictly to:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>Mutual Fund AMCs &amp; RTAs:</strong> CAMS, KFintech, and respective Asset Management Companies for folio creation, unit allotment, and statement generation.
            </li>
            <li>
              <strong>Exchange Platforms:</strong> BSE StAR MF, NSE NMF II, and verified payment aggregators solely for executing financial transactions initiated by you.
            </li>
            <li>
              <strong>Insurance Partners:</strong> Licensed insurance companies for underwriting and issuing solicited insurance policies.
            </li>
            <li>
              <strong>Statutory &amp; Law Enforcement Bodies:</strong> SEBI, AMFI, the Income Tax Department, FIU-IND, or judicial courts where mandatory under applicable Indian statutes.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "third-party-links",
      title: "7. Third-Party Links & External Sites",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Our website may contain links to external portals for investor convenience, informational reference, or transaction routing (e.g., AMC websites, CAMS, KFintech, MF Central, SEBI, and AMFI).
          </p>
          <p>
            However, once you use these links to leave our website, you should note that <strong>we do not have any control over that other website</strong>. Therefore, we cannot be responsible for the protection and privacy of any information you provide while visiting such external sites.
          </p>
          <p>
            Such external sites are not governed by this Privacy Policy. You should exercise caution and inspect the privacy policy applicable to the website in question.
          </p>
        </div>
      ),
    },
    {
      id: "cookies-policy",
      title: "8. Cookies & Real-Time Consent Management",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            In compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), our website implements a transparent, consent-first cookie framework:
          </p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              <strong>Strictly Necessary Cookies:</strong> Essential for secure session navigation, form validation (CSRF defense), and recording your cookie consent preferences. These cannot be disabled.
            </li>
            <li>
              <strong>Analytics &amp; Performance Cookies:</strong> Measure aggregate website metrics and page performance via Google Analytics 4 (with IP anonymization). These scripts are strictly blocked until you grant affirmative consent.
            </li>
            <li>
              <strong>Functional Cookies:</strong> Enable personalized features such as remembering your custom SIP and lumpsum financial calculator inputs across sessions.
            </li>
            <li>
              <strong>Marketing &amp; Attribution Cookies:</strong> Assess the reach of educational outreach campaigns. We never use cookies for invasive ad profiling.
            </li>
          </ul>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-mint/40 p-3">
            <p className="text-[12.5px] text-body">
              You can review, modify, or withdraw your cookie consent choices at any time:
            </p>
            <CookiePreferencesButton className="shrink-0 rounded-xl bg-brand px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-brand-dark" />
          </div>
        </div>
      ),
    },
    {
      id: "investor-rights",
      title: "9. Your Rights as an Investor & Data Principal",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            Under the Digital Personal Data Protection Act, 2023 and SEBI regulations, you are endowed with defined rights regarding your personal information:
          </p>
          <ul className="list-disc pl-4 space-y-1">
            <li>
              <strong>Right to Access:</strong> You may request a summary of personal information we process and details of third parties with whom data has been shared.
            </li>
            <li>
              <strong>Right to Rectification:</strong> You may request the update, completion, or correction of inaccurate personal or banking records.
            </li>
            <li>
              <strong>Right to Erasure:</strong> You may request deletion of non-statutory personal data, subject to mandatory retention periods prescribed under SEBI/PMLA laws.
            </li>
            <li>
              <strong>Right to Grievance Redressal:</strong> You have the right to register concerns with our designated Grievance Officer, with escalation access to SEBI SCORES.
            </li>
            <li>
              <strong>Right to Nominate:</strong> You may designate an individual who shall, in the event of death or incapacity, exercise your data rights.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "data-retention",
      title: "10. Statutory Data Retention (SEBI / PMLA Mandates)",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            As an AMFI-registered Mutual Fund Distributor, {site.name} is bound by statutory record retention rules enacted by SEBI and the Prevention of Money Laundering (Maintenance of Records) Rules, 2005.
          </p>
          <p>
            Client transaction records, folio statements, KYC identity proofs, and mandate registrations must be securely preserved for a <strong>mandatory minimum duration of 5 (five) years</strong> following the cessation or termination of the distributor-client relationship.
          </p>
          <p>
            Upon expiry of the statutory retention period, physical records are securely destroyed and digital records are purged or anonymized using cryptographic data wiping standards.
          </p>
        </div>
      ),
    },
    {
      id: "grievance-contact",
      title: "11. Grievance Redressal & Compliance Officer",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            If you have any questions regarding this Privacy Policy, wish to exercise your data principal rights, or have a grievance concerning data handling, please contact our designated officer:
          </p>
          <div className="rounded-xl border border-line bg-soft/60 p-3.5 mt-1">
            <p className="font-extrabold text-ink text-sm sm:text-base">{site.founder}</p>
            <p className="text-[12px] font-semibold text-brand">Principal Officer &amp; Compliance Head</p>
            <p className="text-[11.5px] text-body mt-0.5">{site.name} · {site.arn}</p>
            <p className="text-[11.5px] text-body">{site.address}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-brand">
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 hover:underline">
                <Mail className="size-3.5" />
                {site.email}
              </a>
              <span>·</span>
              <a href={site.phoneHref} className="inline-flex items-center gap-1 hover:underline">
                <Phone className="size-3.5" />
                {site.phone}
              </a>
            </div>
          </div>
          <p className="text-[12px] font-medium text-slate-700 mt-1">
            If your grievance is not resolved satisfactorily within 30 days, you may escalate the matter via the SEBI SCORES portal (<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand font-semibold underline">scores.sebi.gov.in</a>) or the AMFI Grievance Cell.
          </p>
        </div>
      ),
    },
    {
      id: "policy-updates",
      title: "12. Policy Updates & Periodic Review",
      body: (
        <div className="flex flex-col gap-2.5 text-xs sm:text-[13px] leading-relaxed text-body">
          <p>
            This Privacy Policy may be updated periodically to reflect changes in our operational procedures, technological infrastructure, or statutory regulations issued by SEBI, AMFI, or the Government of India.
          </p>
          <p>
            Users are encouraged to review this page periodically to stay informed of any changes. Any modifications to this Privacy Policy will be posted directly on this page with an updated revision date.
          </p>
          <p className="font-medium text-ink">
            Continued use of this website following the posting of updates constitutes your unconditional acknowledgment and acceptance of the revised terms.
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
          { name: "Privacy Policy", item: "/privacy-policy" },
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
              <span className="text-brand font-bold">Privacy Policy</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <Lock className="size-3.5 text-brand" />
                CONFIDENTIALITY &amp; DATA PROTECTION · {site.arn}
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Privacy Policy &amp;{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Data Security
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                How {site.name} safeguards, encrypts, and handles your personal and financial information in strict compliance with the AMFI Code of Conduct, SEBI regulatory guidelines, and Indian privacy laws.
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
          Policy Sections (12 Comprehensive Clauses)
          ====================================================================== */}
      <section className="py-2.5 sm:py-3.5">
        <Container>
          <div className="grid gap-3.5 sm:gap-4 lg:grid-cols-2">
            {sections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="rounded-2xl sm:rounded-3xl border border-line bg-white p-4 sm:p-5 shadow-card"
              >
                <h3 className="border-b border-line/60 pb-2.5 text-sm sm:text-base font-extrabold text-ink">
                  {sec.title}
                </h3>
                <div className="mt-3">{sec.body}</div>
              </div>
            ))}
          </div>

          {/* Statutory Regulatory Notice Bar */}
          <div className="mt-5 rounded-2xl border border-line bg-gradient-to-r from-soft via-mint/40 to-soft p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-xs">
                  <ShieldCheck className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-ink">AMFI Registered Mutual Fund Distributor ({site.arn})</p>
                  <p className="text-xs text-body">
                    Committed to statutory data ethics, client confidentiality, and investor protection
                  </p>
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
