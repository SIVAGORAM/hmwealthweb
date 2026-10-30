import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Info, MessageCircle, PhoneCall } from "lucide-react";
import { Container, IconBox } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";
import { disclosures, site } from "@/lib/site";
import type { Block, Offering, Visual } from "@/lib/offerings";
import { cn } from "@/lib/utils";

const h2 = "text-[24px] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[32px]";
const para = "text-[15.5px] leading-[1.75] text-body sm:text-[16.5px]";

function Picture({ v, className, priority, sizes }: { v: Visual; className?: string; priority?: boolean; sizes: string }) {
  return (
    <div className={cn("relative overflow-hidden", v.art ? "bg-white" : "bg-soft", className)}>
      <ProtectedImage src={v.src} alt={v.alt} fill priority={priority} sizes={sizes}
        unoptimized={Boolean(v.art || v.src.endsWith(".svg"))}
        className={v.art ? "object-contain p-3 sm:p-5" : "object-cover"} style={v.art ? undefined : { objectPosition: v.pos ?? "50% 40%" }} />
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-line sm:p-4">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand text-white"><Check className="size-3.5" strokeWidth={3} /></span>
          <span className="text-[15px] font-semibold leading-snug text-ink">{b}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockView({ b, i }: { b: Block; i: number }) {
  if (b.visual) {
    return (
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-14">
        <Reveal className={cn("flex min-w-0 flex-col gap-3.5", i % 2 === 1 && "lg:order-2")}>
          <h2 className={h2}>{b.title}</h2>
          {b.paras?.map((t) => <p key={t.slice(0, 30)} className={para}>{t}</p>)}
          {b.bullets && <Bullets items={b.bullets} />}
        </Reveal>
        <Reveal delay={0.06}>
          <Picture v={b.visual} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/3] rounded-[26px] ring-1 ring-line" />
        </Reveal>
      </div>
    );
  }
  return (
    <Reveal className="rounded-[26px] bg-soft p-5 ring-1 ring-line sm:p-8">
      <h2 className={cn(h2, "mb-4")}>{b.title}</h2>
      <div className="flex flex-col gap-3.5">
        {b.paras?.map((t) => <p key={t.slice(0, 30)} className={cn(para, "max-w-[75ch]")}>{t}</p>)}
        {b.bullets && <Bullets items={b.bullets} />}
      </div>
    </Reveal>
  );
}

export function OfferingPage({ o }: { o: Offering }) {
  const groupLabel = o.group === "products" ? "Products" : "Services";
  const note = o.note === "insurance" ? disclosures.insurance : o.note === "mf" ? disclosures.mfRisk
    : "General education only, not investment advice. HM Wealth is an AMFI-registered Mutual Fund Distributor and not a SEBI-registered Investment Adviser.";

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: groupLabel, item: `/${o.group}` },
    { name: o.title, item: `/${o.group}/${o.slug}` },
  ];

  return (
    <>
      <JsonLd data={getBreadcrumbSchema(breadcrumbs)} />
      {/* ---------- hero ---------- */}
      <section className="pb-4 pt-4 sm:pb-8 sm:pt-6">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#f5f6f3] ring-1 ring-line sm:rounded-[36px]">
            <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 -z-10 size-80 rounded-full bg-brand-bright/12 blur-[90px]" />
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
              {/* Content sits at top on mobile and left column on desktop */}
              <div className="flex min-w-0 flex-col justify-center gap-4 p-5 sm:p-10 lg:py-14 lg:pl-12">
                <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-body">
                  <Link href="/" className="transition-colors hover:text-brand">Home</Link>
                  <ChevronRight className="size-3.5 text-body/50" />
                  <Link href={`/${o.group}`} className="transition-colors hover:text-brand">{groupLabel}</Link>
                  <ChevronRight className="size-3.5 text-body/50" />
                  <span className="font-bold text-ink">{o.title}</span>
                </nav>
                <div className="flex items-center gap-3">
                  <IconBox tint={o.tint} className="size-11 rounded-xl"><o.icon className="size-5" /></IconBox>
                  <span className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand">{groupLabel.slice(0, -1)}</span>
                </div>
                <h1 className="text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink xs:text-[36px] sm:text-[52px]">{o.headline}</h1>
                <p className="max-w-[46ch] text-[15.5px] leading-relaxed text-body sm:text-[18px]">{o.intro}</p>
                <div className="grid gap-2.5 pt-1 sm:flex sm:flex-wrap">
                  <Link href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(11,122,85,0.6)] transition hover:bg-brand-dark">
                    <PhoneCall className="size-4" />Book a free call<ArrowRight className="size-4" />
                  </Link>
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 text-[15px] font-bold text-ink transition hover:border-brand hover:text-brand">
                    <MessageCircle className="size-4 text-emerald-600" />WhatsApp us
                  </a>
                </div>
              </div>
              {/* Media sits beneath content on mobile and right column on desktop */}
              <div className="relative">
                {o.hero.art ? (
                  <Picture v={o.hero} priority sizes="(min-width:1024px) 50vw, 100vw" className="mx-4 mb-5 h-[220px] rounded-[22px] xs:h-[260px] sm:mx-8 sm:mb-8 sm:h-[340px] lg:m-4 lg:h-[calc(100%-2rem)] lg:min-h-[400px] lg:rounded-[28px]" />
                ) : (
                  <>
                    <Picture v={o.hero} priority sizes="(min-width:1024px) 50vw, 100vw" className="mx-4 mb-5 h-[240px] rounded-[22px] ring-1 ring-line/70 xs:h-[280px] sm:mx-8 sm:mb-8 sm:h-[360px] lg:m-0 lg:h-full lg:min-h-[460px] lg:rounded-none lg:ring-0" />
                    <div aria-hidden className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#f5f6f3] via-transparent to-transparent" />
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- content ---------- */}
      {o.blocks.length > 0 && (
        <section className="py-6 sm:py-10">
          <Container className="flex flex-col gap-8 sm:gap-12">
            {o.blocks.map((b, i) => <BlockView key={b.title} b={b} i={i} />)}
          </Container>
        </section>
      )}

      {/* ---------- cards (general insurance) ---------- */}
      {o.cards && (
        <section className="py-6 sm:py-10">
          <Container>
            <h2 className={cn(h2, "mb-5 sm:mb-8")}>{o.cards.title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {o.cards.items.map((c, i) => (
                <Reveal key={c.title} delay={(i % 3) * 0.05} className={cn("flex min-w-0 flex-col overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-card", i === 0 && "lg:col-span-2 lg:flex-row")}>
                  <Picture v={c.visual} sizes="(min-width:1024px) 33vw, 100vw" className={cn("aspect-[4/3] border-b border-line", i === 0 && "lg:aspect-auto lg:w-1/2 lg:border-b-0 lg:border-r")} />
                  <div className={cn("flex flex-col gap-2.5 p-5 sm:p-6", i === 0 && "lg:w-1/2 lg:justify-center")}>
                    <h3 className="text-[19px] font-extrabold tracking-[-0.02em] text-ink">{c.title}</h3>
                    <p className="text-[14.5px] leading-relaxed text-body">{c.text}</p>
                    {c.bullets && (
                      <ul className="mt-1 flex flex-col gap-2">
                        {c.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink">
                            <Check className="mt-0.5 size-4 shrink-0 text-brand" strokeWidth={3} />{b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- disclosure ---------- */}
      <section className="pb-2">
        <Container>
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-[12.5px] leading-relaxed text-body sm:text-[13px]">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" />
            <p>{note}</p>
          </div>
        </Container>
      </section>

      <CtaBand title={o.cta} intro="Book a free call. No obligation, and the first conversation is always free." />
    </>
  );
}
