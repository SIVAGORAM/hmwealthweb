"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, CalendarDays, Mail } from "lucide-react";
import { nav, site, registrations } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

/* AMFI registration block, as on the client's reference header */
function RegBlock({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col justify-center gap-[2px] border-l border-line pl-5 uppercase leading-tight", className)}>
      <p className="text-[11px] sm:text-[11.5px] font-semibold tracking-[0.02em] text-body">{registrations.lines[0]}</p>
      <p className="text-[11px] sm:text-[11.5px] font-bold tracking-[0.02em] text-ink flex flex-wrap items-center gap-1.5 sm:gap-2">
        <span>{registrations.lines[1]}</span>
        <span className="text-line font-normal" aria-hidden>|</span>
        <span className="font-extrabold text-ink">{site.arn.replace("-", " – ")}</span>
      </p>
      <p className="mt-0.5 flex items-center gap-2 text-[12.5px] font-extrabold tracking-[0.06em] text-brand-deep">
        {registrations.products[0]}
        <span className="h-3 w-[2px] rounded-full bg-brand-bright" aria-hidden />
        {registrations.products[1]}
      </p>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-white transition-shadow duration-300", scrolled || open ? "border-line shadow-[0_10px_30px_-20px_rgba(15,31,26,0.35)]" : "border-transparent")}>
      <div className="mx-auto flex h-[72px] max-w-[1480px] items-center justify-between gap-5 px-4 sm:px-6 lg:h-[80px] lg:px-8">
        {/* brand + registrations */}
        <div className="flex min-w-0 shrink-0 items-center gap-5">
          <Logo taglineClassName="min-[1360px]:hidden" />
          <RegBlock className="hidden min-[1360px]:flex" />
        </div>

        {/* page links */}
        <nav aria-label="Main" className="hidden items-center gap-0.5 rounded-2xl bg-soft p-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={cn("relative whitespace-nowrap rounded-xl px-2.5 py-2 text-[13.5px] font-semibold transition-colors xl:px-3.5 xl:text-[14.5px]", active(item.href) ? "text-brand" : "text-body hover:text-ink")}
            >
              {active(item.href) && <motion.span layoutId="nav-bg" className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_8px_-2px_rgba(15,31,26,0.15)]" transition={{ type: "spring", bounce: 0.15, duration: 0.45 }} />}
              <span className="relative">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* actions */}
        <div className="flex shrink-0 items-center gap-2">
          <a href={site.phoneHref} aria-label={`Call ${site.phone}`} title={site.phone}
            className="hidden size-11 items-center justify-center rounded-full border border-brand/30 text-brand transition hover:bg-mint 2xl:flex">
            <Phone className="size-[18px]" />
          </a>
          <Link href="/contact" className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-brand-deep px-4 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-10px_rgba(5,59,42,0.7)] transition hover:bg-brand sm:inline-flex xl:px-5 xl:text-[14.5px]">
            <CalendarDays className="size-4" />Book a free call
          </Link>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-xl border border-line text-ink lg:hidden">
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* ---------- mobile menu ---------- */}
      <AnimatePresence>
        {open && (
          <motion.nav id="mobile-menu" aria-label="Mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="max-h-[calc(100svh-72px)] overflow-y-auto overflow-x-hidden border-t border-line bg-white lg:hidden">
            <div className="flex flex-col gap-1 px-4 py-4">
              <RegBlock className="mb-3 rounded-2xl border-l-0 bg-soft px-4 py-3.5" />
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className={cn("rounded-xl px-4 py-3 text-[16px] font-semibold sm:py-3.5 sm:text-[17px]", active(item.href) ? "bg-mint text-brand" : "text-ink")}>{item.label}</Link>
              ))}
              <div className="mt-2 grid grid-cols-1 gap-2 xs:grid-cols-2">
                <Link href="/contact" className="flex min-h-12 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">Book a free call</Link>
                <a href={site.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line text-sm font-bold text-ink"><Phone className="size-4" />Call us</a>
              </div>
              <a href={`mailto:${site.email}`} className="mt-2 flex items-center justify-center gap-2 py-2 text-sm font-semibold text-body"><Mail className="size-4 text-brand" />{site.email}</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
