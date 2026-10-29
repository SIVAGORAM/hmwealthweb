import Link from "next/link";
import { Mail, Phone, Clock, MessageCircle, ArrowUp, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { FooterWordmark } from "./FooterWordmark";
import { Container } from "@/components/ui/kit";
import { disclosures, registrations, site } from "@/lib/site";

const columns: { title: string; links: [string, string][] }[] = [
  { title: "Investments", links: [["Mutual funds", "/investments"], ["SIP", "/investments#ways"], ["Tax saving (ELSS)", "/investments#categories"], ["Gold funds", "/investments#categories"], ["NRI investing", "/investments#nri"]] },
  { title: "Insurance", links: [["Term life", "/insurance#types"], ["Health", "/insurance#types"], ["Motor", "/insurance#types"], ["Claims help", "/insurance#claims"], ["Download policy", "/insurance#download"]] },
  { title: "Calculators", links: [["SIP", "/calculators?c=sip"], ["Lumpsum", "/calculators?c=lumpsum"], ["Step-up SIP", "/calculators?c=stepup"], ["SWP", "/calculators?c=swp"], ["Loan EMI", "/calculators?c=emi"], ["Goal SIP", "/calculators?c=goal"]] },
  { title: "Company", links: [["About us", "/about"], ["Contact us", "/contact"], ["Investor grievance", "/investor-grievance"], ["Important links", "/important-links"]] },
];

const complianceLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Risk Factors", href: "/risk-factors" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "SID / SAI / KIM", href: "https://www.sebi.gov.in/filings/mutual-funds.html", external: true },
  { label: "Code of Conduct", href: "https://www.amfiindia.com/intermediary/code-of-conduct", external: true },
  { label: "Investor Grievance", href: "/investor-grievance" },
  { label: "Important Links", href: "/important-links" },
  { label: "SEBI Circulars", href: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Mutual+Funds", external: true },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

export function Footer() {
  const contacts = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: site.whatsappHref, external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Clock, label: "Hours", value: site.hours },
  ];

  return (
    <footer className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-2.5">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[36px] bg-[#04261c] text-white sm:rounded-[44px]">
        {/* mood */}
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-[#19c38a]/20 blur-[130px]" />
        <div aria-hidden className="absolute -right-40 top-1/3 -z-10 size-[460px] rounded-full bg-gold/10 blur-[130px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />

        <Container className="pt-4 sm:pt-6">
          {/* ---------- brand + links ---------- */}
          <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
            <div className="flex max-w-sm flex-col gap-6">
              <Logo light />
              <p className="text-[15px] leading-relaxed text-white/65">
                Mutual funds and insurance for families and business owners, explained in plain words and reviewed every year.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur">
                <p className="text-[11.5px] font-medium uppercase leading-relaxed tracking-[0.04em] text-white/60">
                  {registrations.lines[0]}<br />{registrations.lines[1]}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <p className="flex items-center gap-2 whitespace-nowrap text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-[#7ff0c4]">
                    {registrations.products[0]}<span className="h-3 w-[2px] rounded-full bg-[#7ff0c4]/60" />{registrations.products[1]}
                  </p>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#19c38a]/15 px-2.5 py-1 text-[12px] font-bold text-white ring-1 ring-[#19c38a]/30">
                    <ShieldCheck className="size-3.5 text-[#7ff0c4]" />{site.arn}
                  </span>
                </div>
              </div>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-10">
              {columns.map((c) => (
                <div key={c.title} className="flex flex-col gap-3.5">
                  <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#7ff0c4]">{c.title}</p>
                  {c.links.map(([l, h]) => (
                    <Link key={l} href={h} className="group relative w-fit text-[15px] text-white/70 transition-colors hover:text-white">
                      {l}
                      <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[#7ff0c4] transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* ---------- contact strip ---------- */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-[repeat(4,1fr)_auto]">
            {contacts.map(({ icon: I, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#19c38a] to-[#0b7a55] sm:size-11 shadow-[0_10px_24px_-10px_rgba(25,195,138,0.9)]">
                    <I className="size-5" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[12px] font-semibold text-white/50">{label}</span>
                    <span className="mt-1 block text-[13px] font-bold [overflow-wrap:anywhere] sm:text-[14.5px]">{value}</span>
                  </span>
                </>
              );
              const cls = `group flex flex-col items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.05] p-3 backdrop-blur transition-colors sm:flex-row sm:items-center sm:gap-3.5 sm:p-3.5 ${label === "Hours" ? "col-span-2 sm:col-span-1" : ""}`;
              return href ? (
                <a key={label} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} hover:border-[#19c38a]/40 hover:bg-white/[0.09]`}>{inner}</a>
              ) : (
                <div key={label} className={cls}>{inner}</div>
              );
            })}
            <a href="#main" aria-label="Back to top" className="group col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-2.5 text-[14px] font-bold text-[#04261c] transition hover:-translate-y-0.5 sm:py-3.5 lg:col-span-1">
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" />Top
            </a>
          </div>

          {/* ---------- disclosures ---------- */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-black/25 p-5 sm:mt-6 sm:p-6">
            <p className="flex items-start gap-3 text-[14.5px] font-bold leading-snug text-white sm:text-[15.5px]">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold shadow-[0_0_12px_rgba(242,179,61,0.9)]" />
              Statutory Regulatory Notice &amp; Compliance Disclosures
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-white/75 sm:text-[13px]">
              Mutual Fund investments are subject to market risks, read all scheme related documents carefully. HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412). We distribute mutual fund schemes and earn commission from Asset Management Companies. We are not a SEBI-registered Investment Adviser and do not provide investment advice. Insurance products are offered through licensed insurance partners. Insurance is the subject matter of solicitation. Please read the sales brochure and policy wording carefully before concluding a sale. IRDAI does not sell insurance policies, announce bonuses or invest premiums; report spurious calls to the police. Calculator results are for illustration only and assume a constant rate of return. Past performance may or may not be sustained in the future and is not a guarantee of future returns. Tax benefits are subject to prevailing tax laws.
            </p>
          </div>

          {/* ---------- horizontal compliance links bar ---------- */}
          <div className="mt-6 flex flex-col justify-between gap-5 border-t border-white/10 pt-6 lg:flex-row lg:items-center">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
              {complianceLinks.map((item) => (
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-medium text-white/70 transition-colors hover:text-[#7ff0c4]"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-60" />
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="inline-flex items-center text-[13px] font-medium text-white/70 transition-colors hover:text-[#7ff0c4]"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            <p className="shrink-0 whitespace-nowrap text-[13px] text-white/45">
              © {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
          </div>
        </Container>

        {/* ---------- giant animated wordmark ---------- */}
        <FooterWordmark />
      </div>
    </footer>
  );
}
