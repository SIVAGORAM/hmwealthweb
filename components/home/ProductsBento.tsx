import Link from "next/link";
import { ArrowUpRight, TrendingUp, CalendarClock, Receipt, Coins, ShieldCheck, HeartPulse, Car, Home as HomeIcon, Store, Globe2, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { cn } from "@/lib/utils";
import { photos } from "@/lib/photos";

/* round arrow that spins on hover, shared by every tile */
function Go({ light }: { light?: boolean }) {
  return (
    <span className={cn(
      "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all sm:size-11 duration-500 group-hover:rotate-45",
      light ? "border-white/25 bg-white/10 text-white group-hover:bg-white group-hover:text-brand-deep" : "border-line bg-white text-ink group-hover:border-brand group-hover:bg-brand group-hover:text-white",
    )}>
      <ArrowUpRight className="size-4 sm:size-5" />
    </span>
  );
}

function Eyebrow({ icon: I, children, light }: { icon: typeof TrendingUp; children: React.ReactNode; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]", light ? "text-[#7ff0c4]" : "text-brand")}>
      <I className="size-4" />{children}
    </span>
  );
}

const tile = "group relative flex h-full flex-col overflow-hidden rounded-[22px] p-4 transition-all sm:rounded-[28px] sm:p-7 duration-500 hover:-translate-y-1";

export function ProductsBento() {
  return (
    <section className="relative overflow-hidden py-6 sm:py-9 lg:py-11">
      {/* faint backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,#e7f6ef_0%,transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [background-image:linear-gradient(#e3ebe7_1px,transparent_1px),linear-gradient(90deg,#e3ebe7_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <Container>
        {/* editorial header */}
        <Reveal className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <Sparkles className="size-3.5" />What we offer
            </span>
            <h2 className="mt-1.5 text-[28px] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[40px]">
              Everything to <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">grow</span> and{" "}
              <span className="bg-gradient-to-r from-[#c98a12] to-gold bg-clip-text text-transparent">protect</span> your money.
            </h2>
          </div>
          <p className="max-w-sm text-[14.5px] sm:text-[15.5px] leading-relaxed text-body lg:pb-1">
            One trusted partner for investments, insurance and gold, so every part of your money works together.
          </p>
        </Reveal>

        {/* bento grid */}
        <div className="mt-2 sm:mt-2.5 grid grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[minmax(240px,auto)] lg:grid-cols-4">
          {/* 1 · Mutual funds (feature) */}
          <Reveal className="col-span-2 lg:row-span-2">
            <Link href="/products/mutual-funds" className={cn(tile, "bg-[linear-gradient(150deg,#e7f5ee_0%,#f7fbf9_55%,#ffffff_100%)] p-5 text-ink ring-1 ring-line shadow-card hover:shadow-lift sm:p-10")}>
              <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-[#19c38a]/12 blur-[90px] transition-opacity duration-700 group-hover:opacity-80" />
              <div aria-hidden className="absolute -bottom-32 -left-20 size-72 rounded-full bg-gold/15 blur-[90px]" />
              <div className="relative flex items-start justify-between">
                <Eyebrow icon={TrendingUp}>Mutual funds</Eyebrow>
                <Go />
              </div>
              <h3 className="relative mt-4 max-w-md text-[24px] font-extrabold leading-[1.1] tracking-[-0.03em] sm:mt-6 sm:text-[38px]">
                Funds chosen for your goal, not for the headlines.
              </h3>
              <p className="relative mt-2.5 max-w-md text-[14px] leading-relaxed text-body sm:mt-4 sm:text-[16px]">
                Equity, debt, hybrid and index funds across leading fund houses, matched to your goal and time horizon.
              </p>

              {/* growth line visual */}
              <div className="relative mt-auto pt-5 sm:pt-10">
                <div className="flex flex-wrap gap-2">
                  {["Equity", "Debt", "Hybrid", "Index", "NRI investing"].map((c) => (
                    <span key={c} className="rounded-full border border-line bg-white px-3 py-1 text-[12px] font-semibold sm:px-3.5 sm:py-1.5 sm:text-[13px] text-body backdrop-blur">{c}</span>
                  ))}
                </div>
                <svg viewBox="0 0 400 110" className="mt-4 h-20 w-full sm:mt-6 sm:h-28" aria-hidden>
                  <defs>
                    <linearGradient id="mfLine" x1="0" x2="1"><stop offset="0" stopColor="#19c38a" /><stop offset="1" stopColor="#f2d27a" /></linearGradient>
                    <linearGradient id="mfFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#19c38a" stopOpacity="0.35" /><stop offset="1" stopColor="#19c38a" stopOpacity="0" /></linearGradient>
                  </defs>
                  <path d="M0 95 C40 90 60 80 90 82 S150 60 180 64 S240 40 270 44 S330 18 360 16 L400 8 L400 110 L0 110Z" fill="url(#mfFill)" />
                  <path d="M0 95 C40 90 60 80 90 82 S150 60 180 64 S240 40 270 44 S330 18 360 16 L400 8" fill="none" stroke="url(#mfLine)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="400" cy="8" r="5" fill="#f2d27a" className="animate-ping-slow" />
                  <circle cx="400" cy="8" r="4" fill="#f2d27a" />
                </svg>
                <p className="text-[11.5px] font-medium text-slate-700">Illustrative only. Mutual fund investments are subject to market risks.</p>
              </div>
            </Link>
          </Reveal>

          {/* 2 · SIP */}
          <Reveal className="col-span-2" delay={0.05}>
            <Link href="/products/mutual-funds" className={cn(tile, "border border-line bg-white shadow-card hover:shadow-lift")}>
              <div className="flex items-start justify-between">
                <Eyebrow icon={CalendarClock}>SIP</Eyebrow>
                <Go />
              </div>
              <div className="mt-3 grid flex-1 grid-cols-[1fr_auto] items-end gap-4 sm:mt-5 sm:gap-6">
                <div>
                  <h3 className="text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[26px]">Start from <span className="text-brand">₹500</span> a month.</h3>
                  <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-body sm:mt-2 sm:text-[15px]">Invest a fixed amount every month. Pause or raise it any time.</p>
                </div>
                {/* rising bars */}
                <div className="flex h-20 items-end gap-1 sm:h-28 sm:gap-2" aria-hidden>
                  {[28, 38, 46, 58, 70, 84, 100].map((h, i) => (
                    <span key={i} className="w-2.5 origin-bottom rounded-t-md sm:w-5 sm:rounded-t-lg bg-gradient-to-t from-mint-2 to-brand-bright transition-transform duration-500 group-hover:scale-y-110"
                      style={{ height: `${h}%`, transitionDelay: `${i * 40}ms`, opacity: 0.45 + i * 0.09 }} />
                  ))}
                </div>
              </div>
            </Link>
          </Reveal>

          {/* 3 · Gold */}
          <Reveal className="col-span-2" delay={0.1}>
            <Link href="/products/mutual-funds" className={cn(tile, "bg-[linear-gradient(145deg,#fff4d6_0%,#f7d77c_55%,#e3a92c_100%)] shadow-[0_20px_40px_-24px_rgba(201,138,18,0.8)]")}>
              <div aria-hidden className="absolute -right-8 -top-8 size-40 rounded-full border-[14px] border-white/30" />
              <div aria-hidden className="absolute -right-2 -top-2 size-24 rounded-full border-[10px] border-white/25" />
              <div className="relative flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white/60 text-[#8f6312] backdrop-blur sm:size-12 sm:rounded-2xl"><Coins className="size-5 sm:size-6" /></span>
                <Go />
              </div>
              <div className="relative mt-auto pt-6 sm:pt-8">
                <h3 className="text-[18px] font-extrabold leading-tight tracking-[-0.02em] text-[#4a3108] sm:text-[26px]">Gold, minus the locker.</h3>
                <p className="mt-1 text-[12px] leading-snug text-[#5c400c] sm:mt-1.5 sm:text-[14px] sm:leading-relaxed">Gold ETFs and gold funds. No purity checks or making charges.</p>
              </div>
            </Link>
          </Reveal>

          {/* 5 · Life insurance (photo) */}
          <Reveal className="col-span-2" delay={0.05}>
            <Link href="/products/life-insurance" className={cn(tile, "isolate min-h-[230px] bg-[#f5f6f3] p-0 ring-1 ring-line sm:min-h-[280px] text-ink shadow-[0_30px_60px_-30px_rgba(245,246,243,0.7)]")}>
              <div className="absolute inset-y-0 right-0 -z-10 w-[62%] overflow-hidden sm:w-[58%]">
                <ProtectedImage src="/images/pages/ins-family-studio.jpg" alt="Indian family of four smiling together" fill sizes="(min-width:1024px) 30vw, 100vw"
                  className="object-cover object-[62%_30%] transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#f5f6f3_0%,#f5f6f3_38%,rgba(245,246,243,0.6)_58%,rgba(245,246,243,0.05)_85%)] sm:bg-[linear-gradient(90deg,#f5f6f3_0%,#f5f6f3_42%,rgba(245,246,243,0.55)_58%,transparent_80%)]" />
              <div className="flex h-full flex-col p-5 sm:p-8">
                <div className="flex items-start justify-between">
                  <Eyebrow icon={ShieldCheck}>Life insurance</Eyebrow>
                  <Go />
                </div>
                <div className="mt-auto max-w-[12.5rem] pt-8 sm:max-w-[19rem] sm:pt-10">
                  <h3 className="text-[22px] font-extrabold leading-tight tracking-[-0.02em] sm:text-[28px]">If you&apos;re not there, your plans still are.</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-body sm:mt-2 sm:text-[15px]">Term cover compared across insurers, with help when your family needs to claim.</p>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* 6 · Health insurance */}
          <Reveal delay={0.1} className="col-span-2 xs:col-span-1">
            <Link href="/products/health-insurance" className={cn(tile, "border border-line bg-gradient-to-br from-[#fff1ec] to-white shadow-card hover:shadow-lift")}>
              <div className="flex items-start justify-between">
                <span className="flex size-10 items-center justify-center rounded-xl bg-white sm:size-12 sm:rounded-2xl text-[#d6662f] shadow-sm"><HeartPulse className="size-5 sm:size-6" /></span>
                <Go />
              </div>
              <svg viewBox="0 0 200 40" className="mt-4 h-8 w-full sm:mt-6 sm:h-10 text-[#d6662f]" aria-hidden>
                <path d="M0 22 H60 L72 6 L86 36 L98 14 L106 22 H200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="260" className="animate-[dash_3s_ease-in-out_infinite]" />
              </svg>
              <div className="mt-auto pt-3 sm:pt-4">
                <h3 className="text-[15px] font-bold text-ink sm:text-lg">Health insurance</h3>
                <p className="mt-1 text-[12px] leading-snug text-body sm:text-[14px] sm:leading-relaxed">Family floater and top-up plans, with cashless claim help.</p>
              </div>
            </Link>
          </Reveal>

          {/* 7 · General insurance */}
          <Reveal delay={0.15} className="col-span-2 xs:col-span-1">
            <Link href="/products/general-insurance" className={cn(tile, "border border-line bg-gradient-to-br from-[#eaf2ff] to-white shadow-card hover:shadow-lift")}>
              <div className="flex items-start justify-between">
                <div className="flex -space-x-2">
                  {[Car, HomeIcon, Store].map((I, i) => (
                    <span key={i} className="flex size-8 items-center justify-center rounded-full bg-white text-[#2f6fd6] sm:size-11 shadow-sm ring-2 ring-[#eaf2ff] transition-transform duration-300 group-hover:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }}>
                      <I className="size-4 sm:size-5" />
                    </span>
                  ))}
                </div>
                <Go />
              </div>
              <div className="mt-auto pt-6 sm:pt-8">
                <h3 className="text-[15px] font-bold text-ink sm:text-lg">General insurance</h3>
                <p className="mt-1 text-[12px] leading-snug text-body sm:text-[14px] sm:leading-relaxed">Motor, home and business cover, renewed on time every year.</p>
              </div>
            </Link>
          </Reveal>
        </div>

        <p className="mt-1.5 sm:mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[12.5px] text-body sm:text-[13px]">
          <Globe2 className="size-4 text-brand" />NRIs can invest through their NRE or NRO account.
          <Link href="/products/mutual-funds" className="font-bold text-brand hover:underline">Learn how</Link>
        </p>
      </Container>
    </section>
  );
}
