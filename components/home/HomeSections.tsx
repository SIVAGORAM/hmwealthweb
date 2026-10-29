import Link from "next/link";
import Image from "next/image";
import { photos } from "@/lib/photos";
import {
  TrendingUp, CalendarClock, Receipt, ShieldCheck, Coins, Globe2, ArrowRight, Home as HomeIcon, GraduationCap, Sunset, LifeBuoy, Landmark,
  BadgeCheck, FileCheck2, Wallet, HeartPulse, Car, Store, Users, Eye, Lock, Headphones, RefreshCcw, PhoneCall, ClipboardList, FileSignature, CalendarCheck,
} from "lucide-react";
import { Badge, Card, Container, IconBox, Section, SectionTitle, type Tint } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { Steps } from "@/components/sections/Steps";
import { SipCalculatorCard } from "./SipCalculatorCard";
import { ProductsBento } from "./ProductsBento";
import { GoalsExplorer } from "./GoalsExplorer";
import { HowItWorksTrack } from "./HowItWorksTrack";
import { site } from "@/lib/site";

export function TrustStrip() {
  const items = [
    { icon: BadgeCheck, t: "AMFI‑registered", d: site.arn },
    { icon: FileCheck2, t: "Paperless KYC", d: "Online in 10 minutes" },
    { icon: Wallet, t: "Your money, your name", d: "Held with the fund house" },
    { icon: Headphones, t: "Real people to call", d: "Review & claim support" },
  ];
  return (
    <Container className="relative z-10 mt-2 sm:mt-2.5">
      {/* gradient hairline border */}
      <div className="rounded-[22px] bg-[linear-gradient(120deg,rgba(25,195,138,0.45),rgba(227,235,231,0.9)_30%,rgba(227,235,231,0.9)_70%,rgba(242,179,61,0.45))] p-px shadow-[0_18px_40px_-28px_rgba(5,59,42,0.45)]">
        <div className="grid grid-cols-2 gap-1.5 rounded-[21px] bg-white/95 p-1.5 sm:gap-1 sm:p-2 backdrop-blur lg:grid-cols-4">
          {items.map(({ icon: I, t, d }, i) => (
            <div key={t} className="group relative flex flex-col items-start gap-2 rounded-2xl bg-soft/70 px-3 py-3 transition-colors hover:bg-soft sm:flex-row sm:items-center sm:gap-3 sm:bg-transparent sm:px-4 sm:py-2.5">
              {i > 0 && <span aria-hidden className="absolute left-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-line to-transparent lg:block" />}
              <span className="relative flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-bright to-brand-dark text-white shadow-[0_6px_14px_-6px_rgba(11,122,85,0.8)] ring-2 sm:ring-4 ring-mint transition-transform duration-300 group-hover:scale-110">
                <I className="size-4 sm:size-[17px]" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[13.5px] sm:text-[14px] font-bold text-ink">{t}</span>
                <span className="mt-0.5 block text-[11.5px] sm:text-[12.5px] font-medium text-body">{d}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

const products: { icon: typeof TrendingUp; tint: Tint; t: string; d: string; href: string }[] = [
  { icon: TrendingUp, tint: "green", t: "Mutual funds", d: "Equity, debt, hybrid and index funds chosen for your goal and time horizon.", href: "/investments" },
  { icon: CalendarClock, tint: "sky", t: "SIP", d: "Invest a fixed amount every month, from ₹500. Pause or raise it any time.", href: "/investments#ways" },
  { icon: Receipt, tint: "lilac", t: "Tax saving (ELSS)", d: "Equity funds with a 3-year lock-in that can reduce your tax, as per law.", href: "/investments#categories" },
  { icon: ShieldCheck, tint: "peach", t: "Insurance", d: "Term life, health, motor and business cover compared across insurers.", href: "/insurance" },
  { icon: Coins, tint: "gold", t: "Gold", d: "Gold ETFs and gold funds, with no lockers, purity checks or making charges.", href: "/investments#categories" },
  { icon: Globe2, tint: "green", t: "NRI investing", d: "Invest in Indian mutual funds through your NRE or NRO account.", href: "/investments#nri" },
];

export function Products() {
  return <ProductsBento />;
}

export function SipSection() {
  const facts = [
    { k: "₹500", v: "Lowest monthly SIP" },
    { k: "Step-up", v: "Raise it as you earn" },
    { k: "Flexible", v: "Pause or stop any time" },
  ];
  return (
    <section className="relative isolate overflow-hidden bg-soft py-1.5 sm:py-2">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 -z-10 size-[520px] rounded-full bg-[#19c38a]/15 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[460px] rounded-full bg-gold/10 blur-[120px]" />
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-14">
          <Reveal className="flex flex-col gap-4 sm:gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <CalendarClock className="size-3.5" />SIP calculator
            </span>
            <h2 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[46px]">
              Small amounts.{" "}
              <span className="bg-gradient-to-r from-brand via-brand-bright to-[#c98a12] bg-clip-text text-transparent">Big futures.</span>
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-body">
              Move the sliders to see what a monthly SIP could become. Starting early and staying invested makes the biggest difference.
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              {facts.map((f) => (
                <div key={f.k} className="rounded-2xl border border-white bg-white/70 p-3 sm:p-4 shadow-[0_10px_30px_-20px_rgba(4,38,28,0.4)] backdrop-blur">
                  <p className="text-[17px] sm:text-[19px] font-extrabold tracking-tight text-brand-deep">{f.k}</p>
                  <p className="mt-0.5 text-[12px] sm:text-[12.5px] leading-snug text-body">{f.v}</p>
                </div>
              ))}
            </div>
            <Link href="/calculators" className="group inline-flex w-fit items-center gap-2 rounded-full border border-line bg-white py-2 pl-5 pr-2 text-[14px] sm:text-[14.5px] font-bold text-ink shadow-sm transition hover:border-brand/40">
              Explore full Wealth Studio (10 Models)
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-0.5"><ArrowRight className="size-4" /></span>
            </Link>
          </Reveal>
          <Reveal delay={0.1}><SipCalculatorCard /></Reveal>
        </div>
      </Container>
    </section>
  );
}

const goals: { icon: typeof HomeIcon; tint: Tint; t: string; time: string; d: string; calc: string }[] = [
  { icon: HomeIcon, tint: "sky", t: "Dream home", time: "3 to 7 years", d: "Build your down-payment with hybrid and short-term debt funds.", calc: "goal" },
  { icon: GraduationCap, tint: "lilac", t: "Child’s education", time: "5 to 15 years", d: "Start early with equity funds and move to safer funds near the date.", calc: "goal" },
  { icon: Sunset, tint: "peach", t: "Retirement", time: "15+ years", d: "Grow a corpus with SIPs now, then draw a monthly income with SWP.", calc: "stepup" },
  { icon: LifeBuoy, tint: "green", t: "Emergency fund", time: "Any time", d: "Keep 6 months of expenses in liquid funds you can access quickly.", calc: "lumpsum" },
  { icon: Receipt, tint: "gold", t: "Save tax", time: "3-year lock-in", d: "ELSS funds that can lower your tax under the rules that apply to you.", calc: "sip" },
  { icon: Landmark, tint: "sky", t: "Long-term wealth", time: "7+ years", d: "Index and flexi-cap funds for steady growth over many years.", calc: "sip" },
];

export function Goals() {
  return <GoalsExplorer />;
}

export function HowItWorks() {
  return <HowItWorksTrack />;
}

export function WhyUs() {
  const reasons = [
    { icon: Eye, t: "Fully transparent", d: "Ask the commission on any product, any time." },
    { icon: Users, t: "Your goals first", d: "Options matched to your goal. Nothing pushed." },
    { icon: Lock, t: "Your money stays yours", d: "Units and policies are always in your name." },
    { icon: RefreshCcw, t: "With you for years", d: "Yearly reviews and help at claim time." },
  ];
  return (
    <section className="relative overflow-hidden py-1.5 sm:py-2">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ---------- photo with floating UI ---------- */}
          <Reveal className="relative order-2 lg:order-1">
            <div aria-hidden className="absolute -inset-6 -z-10 rounded-[48px] bg-[radial-gradient(60%_60%_at_30%_30%,#cfeedf_0%,transparent_70%)]" />
            <div className="relative aspect-[4/3.9] overflow-hidden rounded-[28px] sm:rounded-[36px] shadow-[0_40px_80px_-40px_rgba(4,38,28,0.6)] sm:aspect-[5/5]">
              <Image src={photos.professional.src} alt={photos.professional.alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover object-[50%_30%]" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#03241a]/55 via-transparent to-transparent" />
            </div>

            {/* floating card: commission */}
            <div className="absolute right-3 top-3 w-[180px] animate-float sm:-right-1 sm:top-6 sm:w-[205px] rounded-2xl border border-white/70 bg-white/90 p-3.5 sm:p-4 shadow-[0_24px_50px_-24px_rgba(4,38,28,0.55)] backdrop-blur-xl sm:-right-8 sm:top-8 sm:w-[230px]">
              <div className="flex items-center gap-2.5">
                <span className="flex size-8 sm:size-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-bright to-brand-dark text-white"><Eye className="size-4 sm:size-[18px]" /></span>
                <div className="leading-tight">
                  <p className="text-[13px] sm:text-[13.5px] font-bold text-ink">Commission disclosed</p>
                  <p className="text-[11px] sm:text-[11.5px] text-body">On every product</p>
                </div>
              </div>
            </div>

            {/* floating card: yearly review */}
            <div className="absolute bottom-16 left-3 w-[196px] animate-float-slow sm:-left-1 sm:bottom-20 sm:w-[220px] rounded-2xl border border-white/70 bg-white/90 p-3.5 sm:p-4 shadow-[0_24px_50px_-24px_rgba(4,38,28,0.55)] backdrop-blur-xl sm:-left-8 sm:bottom-24 sm:w-[250px]">
              <div className="flex items-center justify-between">
                <p className="text-[13px] sm:text-[13.5px] font-bold text-ink">Yearly review</p>
                <span className="rounded-full bg-mint px-2 py-0.5 text-[10.5px] sm:text-[11px] font-bold text-brand">Scheduled</span>
              </div>
              <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-soft">
                <span className="w-[60%] bg-brand" /><span className="w-[25%] bg-sky-ink" /><span className="w-[15%] bg-gold" />
              </div>
              <div className="mt-2 flex justify-between text-[11px] font-semibold text-body"><span>Equity</span><span>Debt</span><span>Gold</span></div>
            </div>

            {/* floating chip: in your name */}
            <div className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full bg-[#04261c]/85 px-3.5 py-2 text-[12px] sm:bottom-6 sm:right-6 sm:px-4 sm:py-2.5 sm:text-[13px] font-bold text-white shadow-lg backdrop-blur-md">
              <Lock className="size-4 text-[#7ff0c4]" />Held in your name
            </div>
          </Reveal>

          {/* ---------- copy ---------- */}
          <Reveal delay={0.1} className="order-1 flex flex-col gap-4 sm:gap-5 lg:order-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <BadgeCheck className="size-3.5" />Why HM Wealth
            </span>
            <h2 className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[46px]">
              A partner you can trust, <span className="text-brand">for the long run.</span>
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-body">Honest, patient guidance in plain words, from the first call to every review after.</p>

            <ul className="grid gap-x-6 gap-y-4 pt-1 sm:grid-cols-2">
              {reasons.map(({ icon: I, t, d }) => (
                <li key={t} className="flex gap-3.5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-bright to-brand-dark text-white shadow-[0_10px_20px_-10px_rgba(11,122,85,0.9)]">
                    <I className="size-5" />
                  </span>
                  <span>
                    <span className="block text-[15.5px] font-bold text-ink">{t}</span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-body">{d}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 border-t border-line pt-4 sm:pt-5">
              <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-deep py-2 pl-6 pr-2 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(5,59,42,0.8)] transition hover:-translate-y-0.5">
                Book a free call
                <span className="flex size-9 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:translate-x-0.5"><ArrowRight className="size-4" /></span>
              </Link>
              <span className="text-[13px] text-body">No obligation · {site.arn}</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function InsuranceBand() {
  const covers = [
    { icon: HeartPulse, t: "Health", d: "Cashless hospital cover for your family" },
    { icon: ShieldCheck, t: "Term life", d: "Big cover, low premium for your family" },
    { icon: Car, t: "Motor", d: "Car and bike cover with quick renewals" },
    { icon: Store, t: "Business", d: "Shop, office and stock protection" },
  ];
  return (
    <section className="py-1.5 sm:py-2">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[32px] bg-brand-deep px-5 py-7 sm:px-10 sm:py-7">
          <div aria-hidden className="absolute -right-20 -top-20 size-96 rounded-full bg-brand-bright/20 blur-3xl" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="flex flex-col gap-4 sm:gap-5">
              <SectionTitle light badge="Insurance" title="Protect your family first, then invest" intro="Compare plans from multiple insurers. We explain the fine print and help you at claim time." />
              <Link href="/insurance" className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl bg-white px-5 text-[14.5px] font-bold text-brand-deep transition hover:bg-mint">Explore insurance <ArrowRight className="size-4" /></Link>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {covers.map(({ icon: I, t, d }) => (
                <Link key={t} href="/insurance#types" className="group flex flex-col items-start gap-2.5 rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10 transition hover:bg-white/[0.12] sm:flex-row sm:items-center sm:gap-3.5 sm:p-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-bright/20 text-brand-bright transition-transform group-hover:scale-110 sm:size-11 sm:rounded-2xl"><I className="size-5" /></span>
                  <div><p className="text-[14.5px] font-bold text-white sm:text-[15px]">{t}</p><p className="mt-0.5 text-[12px] leading-snug text-white/70 sm:text-[13px]">{d}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function FounderNote() {
  return (
    <section className="py-1.5 sm:py-2">
      <Container>
        <Reveal>
          {/* gradient hairline border */}
          <div className="rounded-[30px] bg-[linear-gradient(120deg,rgba(25,195,138,0.5),rgba(227,235,231,0.9)_35%,rgba(227,235,231,0.9)_65%,rgba(242,179,61,0.5))] p-px shadow-[0_30px_60px_-40px_rgba(4,38,28,0.5)]">
            <figure className="relative overflow-hidden rounded-[29px] bg-white px-6 py-6 sm:px-10 sm:py-8">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-mint blur-[80px]" />
              <span aria-hidden className="pointer-events-none absolute -top-6 right-8 select-none bg-gradient-to-b from-brand/15 to-transparent bg-clip-text text-[220px] font-extrabold leading-none text-transparent">&rdquo;</span>

              <div className="relative grid items-center gap-6 lg:grid-cols-[auto_1fr] lg:gap-10">
                {/* quote mark badge */}
                <span aria-hidden className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-bright to-brand-deep text-[38px] font-extrabold leading-none text-white shadow-[0_16px_30px_-12px_rgba(11,122,85,0.8)] sm:size-18 sm:text-[48px]">
                  <span className="translate-y-2">&ldquo;</span>
                </span>

                <div>
                  <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand">From our founder</p>
                  <blockquote className="mt-2 max-w-3xl text-[20px] font-bold leading-[1.35] tracking-[-0.02em] text-ink sm:text-[26px]">
                    We started HM Wealth with one simple promise: explain every rupee in plain words, and{" "}
                    <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">stay with your family long after the first SIP.</span>
                  </blockquote>

                  <figcaption className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-[#04261c] text-[13px] font-extrabold tracking-tight text-white ring-4 ring-mint">HS</span>
                      <span className="leading-tight">
                        <span className="block text-[15px] font-extrabold text-ink">{site.founder}</span>
                        <span className="block text-[12.5px] text-body">Founder, {site.name}</span>
                      </span>
                    </span>
                    <span className="hidden h-7 w-px bg-line sm:block" />
                    <span className="flex flex-wrap gap-2">
                      {["AMFI-registered MFD", "Mutual Fund Distribution", site.arn].map((c) => (
                        <span key={c} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-soft px-3 py-1 text-[12px] font-semibold text-ink">
                          <BadgeCheck className="size-3.5 text-brand" />{c}
                        </span>
                      ))}
                    </span>
                  </figcaption>
                </div>
              </div>
            </figure>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
