import type { Metadata } from "next";
import Link from "next/link";
import {
  LifeBuoy,
  ChevronRight,
  ShieldCheck,
  Headphones,
  UserCheck,
  Globe2,
  ExternalLink,
  Clock,
  PhoneCall,
  Mail,
  AlertCircle,
  CheckCircle2,
  FileText,
  Building2,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.investorGrievance);

export default function InvestorGrievancePage() {
  const redressalLevels = [
    {
      level: "LEVEL 01",
      badge: "First Touchpoint",
      title: "HM Wealth Investor Support Desk",
      desc: "For general queries, transaction discrepancies, statement requests, non-receipt of redemption proceeds, or SIP execution issues.",
      turnaround: "Acknowledgement within 4 hours; resolution within 24–48 business hours.",
      channel: [
        { label: "Dedicated Email", value: site.email, href: `mailto:${site.email}` },
        { label: "Direct Phone", value: site.phone, href: site.phoneHref },
        { label: "Support Days", value: "Monday – Saturday (Prompt Desk Assistance)" },
      ],
      escalateNote: "If your grievance is not resolved to your satisfaction within 3 business days, you may escalate to Level 2.",
      icon: Headphones,
      tint: "bg-mint text-brand",
    },
    {
      level: "LEVEL 02",
      badge: "Executive Escalation",
      title: "Principal / Compliance Officer Escalation",
      desc: "If your complaint remains unresolved at Level 1 or the response is unsatisfactory, you can directly escalate the matter to our Principal Officer.",
      turnaround: "Formal written response and resolution within 5 business days.",
      officer: {
        name: site.founder,
        role: "Founder & Principal MFD",
        email: site.email,
        phone: site.phone,
        instructions: "Please mention 'Escalation - Grievance - [Your Name / Folio Number]' in the subject line along with your Level 1 reference.",
      },
      icon: UserCheck,
      tint: "bg-sky text-sky-ink",
    },
    {
      level: "LEVEL 03",
      badge: "Regulatory Recourse",
      title: "SEBI SCORES & SMART ODR Portals",
      desc: "If your grievance is not resolved within 30 days of filing with HM Wealth, or if you are not satisfied with the resolution, you may approach the capital markets regulator or online dispute resolution mechanism.",
      portals: [
        {
          name: "SEBI SCORES (Complaints Redress System)",
          desc: "Official centralized grievance portal operated by the Securities and Exchange Board of India (SEBI).",
          href: "https://scores.sebi.gov.in/",
          helpline: "Toll-Free Helpline: 1800 266 7575 / 1800 22 7575",
        },
        {
          name: "SMART ODR (Online Dispute Resolution)",
          desc: "Independent institutional mechanism for conciliation and online arbitration under SEBI guidelines.",
          href: "https://smartodr.in/",
          helpline: "Facilitates swift digital mediation between investors and intermediaries.",
        },
      ],
      icon: Globe2,
      tint: "bg-peach text-peach-ink",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Investor Grievance", item: "/investor-grievance" },
        ])}
      />
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
              <span className="text-ink">Support</span>
              <ChevronRight className="size-3.5 text-body/40" aria-hidden />
              <span className="text-brand font-bold">Investor Grievance</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
                <LifeBuoy className="size-3.5 text-brand" />
                INVESTOR CHARTER &amp; REDRESSAL
              </span>
              <h1 className="mt-2 text-[28px] font-extrabold tracking-tight text-ink sm:text-[38px] lg:text-[44px]">
                Investor Grievance{" "}
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  Redressal Mechanism
                </span>
              </h1>
              <p className="mt-1 text-[14.5px] leading-relaxed text-body sm:text-[16px]">
                At HM Wealth, every investor query and grievance is treated with utmost urgency and transparency. We follow a strict 3-tier resolution procedure.
              </p>
            </div>
          </div>
        </Container>
      </header>

      {/* ======================================================================
          Multi-Tier Redressal Flow
          ====================================================================== */}
      <section className="py-5 sm:py-8">
        <Container>
          <div className="flex flex-col gap-4">
            {redressalLevels.map((lvl) => {
              const Icon = lvl.icon;
              return (
                <div
                  key={lvl.level}
                  className="rounded-2xl sm:rounded-3xl border border-line bg-white p-5 sm:p-6 shadow-card transition-all hover:border-brand/40"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <span className={`flex size-10 items-center justify-center rounded-xl shadow-2xs ${lvl.tint}`}>
                        <Icon className="size-5" />
                      </span>
                      <div>
                        <span className="text-[11px] font-extrabold text-brand tracking-wider">{lvl.level}</span>
                        <h2 className="text-base sm:text-lg font-extrabold text-ink">{lvl.title}</h2>
                      </div>
                    </div>
                    <span className="rounded-full bg-soft px-3 py-1 text-xs font-bold text-body">
                      {lvl.badge}
                    </span>
                  </div>

                  <p className="mt-3 text-xs sm:text-[13.5px] leading-relaxed text-body">
                    {lvl.desc}
                  </p>

                  {/* Level 1 Specific Info */}
                  {lvl.channel && (
                    <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3 text-xs">
                      {lvl.channel.map((ch) => (
                        <div key={ch.label} className="min-w-0 rounded-xl border border-line/60 bg-soft/60 p-3">
                          <span className="font-bold text-body uppercase tracking-wider text-[10px]">{ch.label}</span>
                          <p className="mt-0.5 font-bold text-ink [overflow-wrap:anywhere]">
                            {ch.href ? (
                              <a href={ch.href} className="text-brand hover:underline">
                                {ch.value}
                              </a>
                            ) : (
                              ch.value
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Level 2 Specific Info */}
                  {lvl.officer && (
                    <div className="mt-3 rounded-xl border border-brand/20 bg-mint/40 p-4 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand/15 pb-2.5">
                        <div>
                          <p className="font-extrabold text-ink text-[14px]">{lvl.officer.name}</p>
                          <p className="text-body text-[11.5px]">{lvl.officer.role}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <a href={`mailto:${lvl.officer.email}`} className="font-bold text-brand hover:underline">
                            {lvl.officer.email}
                          </a>
                          <span>·</span>
                          <a href={`tel:${lvl.officer.phone}`} className="font-bold text-brand hover:underline">
                            {lvl.officer.phone}
                          </a>
                        </div>
                      </div>
                      <p className="mt-2 text-body leading-relaxed text-[12px]">
                        <strong>Filing Instructions:</strong> {lvl.officer.instructions}
                      </p>
                    </div>
                  )}

                  {/* Level 3 Specific Info */}
                  {lvl.portals && (
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 text-xs">
                      {lvl.portals.map((p) => (
                        <div key={p.name} className="rounded-xl border border-line bg-soft/50 p-3.5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <p className="font-extrabold text-ink text-[13px]">{p.name}</p>
                              <ExternalLink className="size-3.5 text-brand" />
                            </div>
                            <p className="mt-1 text-body text-[11.5px] leading-relaxed">{p.desc}</p>
                            <p className="mt-1.5 text-brand font-semibold text-[11px]">{p.helpline}</p>
                          </div>
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-dark transition-colors"
                          >
                            Visit Official Portal
                            <ExternalLink className="size-3" />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                    <Clock className="size-3.5 text-brand" />
                    <span>Resolution TAT: {lvl.turnaround}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Direct AMC / RTA Grievance Notice */}
          <div className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand">
              <Building2 className="size-4" />
              Direct AMC &amp; RTA Grievance Desks
            </div>
            <h3 className="mt-2 text-base font-extrabold text-ink sm:text-lg">
              Registrar &amp; Transfer Agent (RTA) Direct Escalation
            </h3>
            <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-body">
              For operational issues concerning specific mutual fund folios (such as change of bank mandate, unclaimed dividend / redemption, address change, or death claim transmissions), investors can also directly approach the respective RTA:
            </p>

            <div className="mt-3 grid gap-3 sm:grid-cols-3 text-xs">
              <div className="rounded-xl border border-line bg-soft/60 p-3">
                <p className="font-bold text-ink">CAMS Grievance Desk</p>
                <p className="mt-0.5 text-body text-[11.5px]">Servicing HDFC, ICICI Pru, SBI, Aditya Birla, Kotak, etc.</p>
                <a
                  href="https://mycams.camsonline.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-bold text-brand hover:underline"
                >
                  mycams.camsonline.com <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="rounded-xl border border-line bg-soft/60 p-3">
                <p className="font-bold text-ink">KFintech Grievance Desk</p>
                <p className="mt-0.5 text-body text-[11.5px]">Servicing Nippon, Axis, UTI, Mirae Asset, Motilal, etc.</p>
                <a
                  href="https://mfs.kfintech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-bold text-brand hover:underline"
                >
                  mfs.kfintech.com <ExternalLink className="size-3" />
                </a>
              </div>

              <div className="rounded-xl border border-line bg-soft/60 p-3">
                <p className="font-bold text-ink">MFCentral Unified Portal</p>
                <p className="mt-0.5 text-body text-[11.5px]">Unified digital servicing portal created jointly by CAMS &amp; KFintech.</p>
                <a
                  href="https://www.mfcentral.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 font-bold text-brand hover:underline"
                >
                  mfcentral.com <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

