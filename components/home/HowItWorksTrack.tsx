"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { PhoneCall, ClipboardList, FileSignature, CalendarCheck, ArrowRight, Route } from "lucide-react";
import { Container } from "@/components/ui/kit";

const STEPS = [
  { icon: PhoneCall, t: "Free discovery call", d: "Tell us about your family, income and goals. We listen first.", time: "Free" },
  { icon: ClipboardList, t: "Options, explained", d: "Funds and covers with costs and risks written down clearly.", time: "In writing" },
  { icon: FileSignature, t: "Paperless set-up", d: "KYC, forms and your first SIP or policy, all done online.", time: "Online" },
  { icon: CalendarCheck, t: "Yearly reviews", d: "We check in every year and stand with you at claim time.", time: "Every year" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function HowItWorksTrack() {
  const reduce = useReducedMotion();
  return (
    <section className="px-3 py-1.5 sm:py-2">
      <div className="relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[28px] bg-[#04261c] py-6 sm:rounded-[44px] sm:py-7 text-white">
        {/* mood */}
        <div aria-hidden className="absolute -left-32 -top-32 -z-10 size-[460px] rounded-full bg-[#19c38a]/20 blur-[120px]" />
        <div aria-hidden className="absolute -bottom-40 right-0 -z-10 size-[420px] rounded-full bg-gold/10 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]" />

        <Container>
          {/* header */}
          <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 0.7, ease }}
            className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#7ff0c4] backdrop-blur">
                <Route className="size-3.5" />How it works
              </span>
              <h2 className="mt-1.5 sm:mt-2 max-w-2xl text-[28px] font-extrabold leading-[1.06] tracking-[-0.035em] sm:text-[42px]">
                From first call to first SIP, <span className="bg-gradient-to-r from-[#7ff0c4] to-[#f2d27a] bg-clip-text text-transparent">in 4 simple steps.</span>
              </h2>
            </div>
            <Link href="/contact" className="group inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[14.5px] font-bold text-[#04261c] transition hover:-translate-y-0.5">
              Book your free call
              <span className="flex size-8 items-center justify-center rounded-full bg-[#04261c] text-white transition-transform group-hover:translate-x-0.5"><ArrowRight className="size-4" /></span>
            </Link>
          </motion.div>

          {/* track */}
          <div className="relative mt-3.5 sm:mt-4">
            {/* line (desktop) */}
            <div aria-hidden className="absolute left-[6px] right-[6px] top-[27px] hidden h-px bg-white/15 lg:block" />
            <motion.div aria-hidden className="absolute left-[6px] top-[26px] hidden h-[3px] origin-left rounded-full bg-gradient-to-r from-[#19c38a] via-[#7ff0c4] to-[#f2d27a] shadow-[0_0_18px_rgba(25,195,138,0.7)] lg:block"
              style={{ right: 6 }} initial={reduce ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "0px" }} transition={{ duration: 1.2, ease }} />

            {/* line (mobile, vertical) */}
            <div aria-hidden className="absolute bottom-8 left-[23px] top-6 w-px bg-gradient-to-b from-[#19c38a] via-[#7ff0c4]/60 to-[#f2d27a]/40 sm:hidden" />
            <ol className="grid gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((s, i) => (
                <motion.li key={s.t} initial={reduce ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "0px" }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.2, ease }}
                  className="group relative grid grid-cols-[auto_1fr] items-start gap-x-4 sm:block sm:rounded-3xl sm:border sm:border-white/10 sm:bg-white/[0.04] sm:p-5 sm:backdrop-blur-sm transition-colors duration-300 hover:bg-white/[0.08] lg:border-0 lg:bg-transparent lg:p-0 lg:hover:bg-transparent">
                  {/* node */}
                  <div className="row-span-2 flex items-center gap-3">
                    <span className="relative flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#19c38a] to-[#0b7a55] shadow-[0_12px_30px_-10px_rgba(25,195,138,0.9)] ring-[6px] ring-[#04261c] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                      <s.icon className="size-5 text-white sm:size-6" />
                      <span className="absolute -right-1.5 -top-1.5 flex size-6 items-center justify-center rounded-full bg-[#f2d27a] text-[11px] font-extrabold text-[#04261c] ring-[3px] ring-[#04261c]">{i + 1}</span>
                    </span>
                    <span className="hidden rounded-full border border-white/15 bg-[#04261c] px-3 py-1 text-[12px] font-bold text-white/70 sm:inline">{s.time}</span>
                  </div>
                  <h3 className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[17px] font-extrabold tracking-[-0.02em] sm:mt-5 sm:block sm:text-[19px]">{s.t}<span className="rounded-full border border-white/15 px-2 py-0.5 text-[10.5px] font-bold text-white/60 sm:hidden">{s.time}</span></h3>
                  <p className="mt-1 max-w-[17rem] text-[13.5px] leading-relaxed text-white/65 sm:mt-1.5 sm:text-[14.5px]">{s.d}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
