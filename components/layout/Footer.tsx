import Link from "next/link";
import { offeringHref, products, services } from "@/lib/offerings";
import { Mail, Phone, MessageCircle, ArrowUp, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/kit";
import { disclosures, registrations, site } from "@/lib/site";
import { CookiePreferencesButton } from "@/components/consent/CookiePreferencesButton";
import { cn } from "@/lib/utils";

const columns: { title: string; links: [string, string][] }[] = [
  { title: "Products", links: products.map((o) => [o.title, offeringHref(o)] as [string, string]) },
  { title: "Services", links: services.map((o) => [o.title, offeringHref(o)] as [string, string]) },
  { title: "Calculators", links: [["SIP", "/calculators?c=sip"], ["Lumpsum", "/calculators?c=lumpsum"], ["Step-up SIP", "/calculators?c=stepup"], ["Retirement", "/calculators?c=retirement"], ["Child education", "/calculators?c=education"], ["Loan EMI", "/calculators?c=emi"]] },
  { title: "Company", links: [["About us", "/about"], ["Contact us", "/contact"], ["Investor grievance", "/investor-grievance"], ["Important links", "/important-links"]] },
];

const legalLinks: { label: string; href: string }[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Risk Factors", href: "/risk-factors" },
];

const regulatoryLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Investor Grievance", href: "/investor-grievance" },
  { label: "Important Links", href: "/important-links" },
  { label: "SID / SAI / KIM", href: "https://www.sebi.gov.in/filings/mutual-funds.html", external: true },
  { label: "Code of Conduct", href: "https://www.amfiindia.com/intermediary/code-of-conduct", external: true },
  { label: "SEBI Circulars", href: "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&search=Mutual+Funds", external: true },
];

export function Footer() {
  const contacts = [
    { icon: Phone, label: "Call us", value: site.phone, href: site.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: site.whatsappHref, external: true },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <footer className="px-3 pb-3 pt-2 sm:px-4 sm:pb-4 sm:pt-2.5">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[36px] bg-[#f4f5f2] text-ink ring-1 ring-line sm:rounded-[44px]">
        {/* mood */}
        <div aria-hidden className="absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-[#19c38a]/10 blur-[130px]" />
        <div aria-hidden className="absolute -right-40 top-1/3 -z-10 size-[460px] rounded-full bg-gold/10 blur-[130px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.05] [background-image:radial-gradient(#15191e_1px,transparent_1px)] [background-size:22px_22px]" />

        <Container className="pb-8 pt-4 sm:pb-10 sm:pt-6">
          {/* ---------- brand + links ---------- */}
          <div className="grid gap-14 lg:grid-cols-[1.15fr_2fr]">
            <div className="flex max-w-sm flex-col gap-6">
              <Logo />
              <p className="text-[15px] leading-relaxed text-body">
                Mutual funds and insurance for families and business owners, explained in plain words and reviewed every year.
              </p>
              <div className="rounded-2xl border border-line bg-white p-4 backdrop-blur">
                <p className="text-[13px] font-semibold uppercase leading-relaxed tracking-[0.03em] text-body">
                  {registrations.lines[0]}
                </p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                  <p className="flex items-center gap-2 whitespace-nowrap text-[13.5px] font-extrabold uppercase tracking-[0.08em] text-brand">
                    {registrations.products[0]}<span className="h-3.5 w-[2px] rounded-full bg-brand/60" />{registrations.products[1]}
                  </p>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-mint px-2.5 py-1 text-[13px] font-bold text-brand-dark ring-1 ring-brand/20">
                    <ShieldCheck className="size-3.5 text-brand" />Verified MFD
                  </span>
                </div>
              </div>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:gap-10">
              {columns.map((c) => (
                <div key={c.title} className="flex flex-col gap-3.5">
                  <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand">{c.title}</p>
                  {c.links.map(([l, h]) => (
                    <Link key={l} href={h} className="group relative w-fit text-[15px] text-body transition-colors hover:text-ink">
                      {l}
                      <span aria-hidden className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* ---------- contact strip + premium back to top ---------- */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[repeat(3,1fr)_auto]">
            {contacts.map(({ icon: I, label, value, href, external }) => {
              const inner = (
                <>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#19c38a] to-[#0b7a55] sm:size-11 shadow-[0_10px_24px_-10px_rgba(25,195,138,0.9)]">
                    <I className="size-5 text-white" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[12px] font-semibold text-body">{label}</span>
                    <span className="mt-1 block text-[13.5px] font-bold [overflow-wrap:anywhere] sm:text-[14.5px] text-ink group-hover:text-brand transition-colors">
                      {value}
                    </span>
                  </span>
                </>
              );
              const cls = "group flex items-center gap-3 rounded-2xl border border-line/80 bg-white p-3.5 shadow-2xs backdrop-blur transition-all hover:border-brand/40 hover:bg-white hover:shadow-xs active:scale-[0.99] sm:gap-3.5";
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {inner}
                </div>
              );
            })}

            {/* Premium Modern Back To Top Button */}
            <a
              href="#main"
              aria-label="Back to top of page"
              className="group flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl border border-line/80 bg-white/95 px-5 py-3 text-ink shadow-2xs transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-mint/40 active:translate-y-0 active:scale-95 sm:col-span-2 lg:col-span-1"
            >
              <span className="flex size-8 items-center justify-center rounded-xl bg-mint text-brand ring-1 ring-brand/20 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_4px_12px_rgba(11,122,85,0.35)]">
                <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              </span>
              <span className="text-[13.5px] font-bold tracking-tight text-ink group-hover:text-brand transition-colors">
                Back to top
              </span>
            </a>
          </div>

          {/* ---------- disclosures ---------- */}
          <div className="mt-5 rounded-3xl border border-line bg-white p-5 sm:mt-6 sm:p-6">
            <p className="flex items-start gap-3 text-[14.5px] font-bold leading-snug text-ink sm:text-[15.5px]">
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-gold shadow-[0_0_12px_rgba(242,179,61,0.9)]" />
              Statutory Regulatory Notice &amp; Compliance Disclosures
            </p>
            <p className="mt-3 text-[12.5px] leading-relaxed text-body sm:text-[13px]">
              Mutual Fund investments are subject to market risks, read all scheme related documents carefully. HM Wealth is an AMFI-registered Mutual Fund Distributor ({site.arn}). We distribute mutual fund schemes and earn commission from Asset Management Companies. We are not a SEBI-registered Investment Adviser and do not provide investment advice. Insurance products are offered through licensed insurance partners. Insurance is the subject matter of solicitation. Please read the sales brochure and policy wording carefully before concluding a sale. IRDAI does not sell insurance policies, announce bonuses or invest premiums; report spurious calls to the police. Calculator results are for illustration only and assume a constant rate of return. Past performance may or may not be sustained in the future and is not a guarantee of future returns. Tax benefits are subject to prevailing tax laws.
            </p>
          </div>

          {/* ---------- structured compliance & legal bar ---------- */}
          <div className="mt-6 rounded-3xl border border-line/80 bg-white/80 p-4 sm:p-6 backdrop-blur-sm shadow-2xs">
            {/* Header row */}
            <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between border-b border-line/60 pb-3 sm:pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand shrink-0" />
                <h4 className="text-[13px] font-extrabold uppercase tracking-wider text-ink sm:text-[13.5px]">
                  Legal, Regulatory &amp; Compliance Links
                </h4>
              </div>
              <span className="text-[11.5px] font-semibold text-body sm:text-[12px]">
                AMFI MFD Status: <strong className="font-bold text-brand-dark">Active &amp; Verified</strong>
              </span>
            </div>

            {/* Mobile-first touch-friendly link grid */}
            <div className="mt-3.5 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap lg:items-center lg:gap-2">
              {legalLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group flex min-h-[40px] items-center justify-between rounded-xl border border-line/80 bg-white px-3 py-2 text-[12px] font-semibold text-body transition-all hover:border-brand/40 hover:bg-mint/40 hover:text-brand active:scale-[0.98] sm:text-[12.5px] lg:min-h-0 lg:rounded-full lg:px-3.5 lg:py-1.5"
                >
                  <span>{item.label}</span>
                </Link>
              ))}

              <CookiePreferencesButton
                className="group flex min-h-[40px] items-center justify-between gap-1.5 rounded-xl border border-line/80 bg-white px-3 py-2 text-[12px] font-semibold text-body transition-all hover:border-brand/40 hover:bg-mint/40 hover:text-brand active:scale-[0.98] sm:text-[12.5px] lg:min-h-0 lg:rounded-full lg:px-3.5 lg:py-1.5 cursor-pointer"
                showIcon={true}
              />

              {regulatoryLinks.map((item, idx) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex min-h-[40px] items-center justify-between gap-1 rounded-xl border border-line/80 bg-white px-3 py-2 text-[12px] font-semibold text-body transition-all hover:border-brand/40 hover:bg-mint/40 hover:text-brand active:scale-[0.98] sm:text-[12.5px] lg:min-h-0 lg:rounded-full lg:px-3.5 lg:py-1.5",
                      idx === regulatoryLinks.length - 1 && "col-span-2 justify-center sm:col-span-1 sm:justify-between"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="size-3 text-body/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand" />
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex min-h-[40px] items-center justify-between rounded-xl border border-line/80 bg-white px-3 py-2 text-[12px] font-semibold text-body transition-all hover:border-brand/40 hover:bg-mint/40 hover:text-brand active:scale-[0.98] sm:text-[12.5px] lg:min-h-0 lg:rounded-full lg:px-3.5 lg:py-1.5"
                  >
                    <span>{item.label}</span>
                  </Link>
                )
              )}
            </div>

            {/* Bottom copyright & statutory acknowledgement */}
            <div className="mt-4 flex flex-col gap-2 border-t border-line/60 pt-3.5 text-center text-[12px] text-body sm:flex-row sm:items-center sm:justify-between sm:text-left sm:text-[12.5px]">
              <p>
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </p>
              <p className="text-body/80">
                Mutual Fund Distribution &amp; Insurance Facilitation for Indian Families.
              </p>
            </div>
          </div>
        </Container>

      </div>
    </footer>
  );
}
