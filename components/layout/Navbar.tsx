"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Menu,
  X,
  Phone,
  CalendarDays,
  Mail,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { nav, site, registrations } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { IconBox } from "@/components/ui/kit";
import { offeringHref, products, services, type Offering } from "@/lib/offerings";

const menus = { products, services } as const;
const menuIntro = {
  products: "Mutual funds and insurance from SEBI-registered fund houses and licensed insurers.",
  services: "Simple, no-pressure help with your family’s money goals.",
};

function MenuItem({
  o,
  onPick,
  compact,
}: {
  o: Offering;
  onPick?: () => void;
  compact?: boolean;
}) {
  return (
    <Link
      href={offeringHref(o)}
      onClick={onPick}
      className={cn(
        "group flex min-w-0 items-center gap-3 rounded-2xl transition hover:bg-soft",
        compact ? "px-3 py-2.5" : "p-3"
      )}
    >
      <IconBox tint={o.tint} className={cn("rounded-xl shrink-0", compact ? "size-9" : "size-11")}>
        <o.icon className={compact ? "size-[18px]" : "size-5"} />
      </IconBox>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block font-extrabold text-ink group-hover:text-brand transition-colors",
            compact ? "text-[15px]" : "text-[14.5px]"
          )}
        >
          {o.title}
        </span>
        <span className="block text-[12.5px] leading-snug text-body">{o.menu}</span>
      </span>
    </Link>
  );
}

/* Desktop dropdown: opens on hover, click or keyboard focus */
function NavMenu({
  label,
  which,
  active,
}: {
  label: string;
  which: keyof typeof menus;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  const show = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 120);
  };
  const items = menus[which];

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-[13.5px] font-bold transition-all xl:px-4 xl:text-[14.5px]",
          active || open ? "text-brand" : "text-body hover:text-ink"
        )}
      >
        {active && (
          <motion.span
            layoutId="nav-bg"
            className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_10px_-2px_rgba(11,122,85,0.14)]"
            transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
          />
        )}
        <span className="relative">{label}</span>
        <ChevronDown
          className={cn("relative size-3.5 transition-transform duration-200", open && "rotate-180 text-brand")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 w-[580px] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-3xl border border-line/80 bg-white/98 p-3 shadow-[0_24px_60px_-15px_rgba(15,31,26,0.18)] backdrop-blur-2xl ring-1 ring-black/5">
              <div className="grid grid-cols-2 gap-1.5">
                {items.map((o) => (
                  <MenuItem key={o.slug} o={o} onPick={() => setOpen(false)} />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl border border-line/60 bg-soft/80 px-4 py-3">
                <p className="text-[12.5px] leading-snug text-body">{menuIntro[which]}</p>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-[12.5px] font-bold text-brand shadow-xs transition hover:bg-mint hover:text-brand-dark"
                >
                  Free call
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Desktop AMFI Registration Block: Displayed beside logo on large screens */
function DesktopRegBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-0.5 border-l-2 border-brand/20 pl-5 uppercase leading-snug transition-all",
        className
      )}
    >
      <p className="text-[12px] font-semibold tracking-[0.03em] text-body">
        {registrations.lines[0]}
      </p>
      <p className="flex flex-wrap items-center gap-1.5 text-[12px] font-bold tracking-[0.02em] text-ink sm:gap-2">
        <span>{registrations.lines[1]}</span>
        <span className="text-line font-normal select-none" aria-hidden>
          |
        </span>
        <span className="font-extrabold text-brand-dark">{site.arn.replace("-", " – ")}</span>
      </p>
      <p className="mt-0.5 flex items-center gap-2 text-[13px] font-black tracking-[0.08em] text-brand-deep">
        <span>{registrations.products[0]}</span>
        <span className="text-[#e0a92e] font-black select-none" aria-hidden>
          |
        </span>
        <span>{registrations.products[1]}</span>
      </p>
    </div>
  );
}

/* Mobile & Tablet AMFI Registration Banner: Exactly matches client reference image */
function MobileRegBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-line/60 bg-[#fbfcfb]/95 px-3 py-2 text-center backdrop-blur-md transition-colors",
        className
      )}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-0.5 uppercase leading-tight">
        <p className="text-[12px] font-bold tracking-[0.03em] text-body sm:text-[12.5px]">
          {registrations.lines[0]}
        </p>
        <p className="flex flex-wrap items-center justify-center gap-1 text-[12px] font-bold tracking-[0.02em] text-ink sm:gap-1.5 sm:text-[12.5px]">
          <span>{registrations.lines[1]}</span>
          <span className="text-line font-normal select-none" aria-hidden>
            |
          </span>
          <span className="font-extrabold text-ink">{site.arn.replace("-", " – ")}</span>
        </p>
        <p className="mt-0.5 flex items-center justify-center gap-2 text-[13px] font-black tracking-[0.08em] text-brand-deep sm:text-[14px]">
          <span>{registrations.products[0]}</span>
          <span className="text-[#e0a92e] font-black select-none" aria-hidden>
            |
          </span>
          <span>{registrations.products[1]}</span>
        </p>
      </div>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<"products" | "services" | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSub(null);
  }, [pathname]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-line/80 bg-white/95 shadow-[0_12px_36px_-16px_rgba(15,31,26,0.14)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/90 backdrop-blur-md"
      )}
    >
      {/* Top subtle luxury brand gradient hairline */}
      <div
        aria-hidden
        className="h-[2px] w-full bg-gradient-to-r from-brand-deep via-brand-bright to-[#e0a92e]"
      />

      {/* Main navigation row */}
      <div className="mx-auto flex h-[68px] max-w-[1520px] items-center justify-between gap-4 px-4 sm:h-[74px] sm:px-6 lg:h-[80px] lg:px-8">
        {/* Brand logo + Desktop AMFI registration */}
        <div className="flex min-w-0 shrink-0 items-center gap-5">
          <Logo priority />
          <DesktopRegBlock className="hidden min-[1280px]:flex" />
        </div>

        {/* Center desktop navigation links */}
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-2xl border border-line/60 bg-soft/80 p-1 backdrop-blur-md lg:flex"
        >
          {nav.map((item) =>
            item.menu ? (
              <NavMenu
                key={item.href}
                label={item.label}
                which={item.menu}
                active={active(item.href)}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className={cn(
                  "relative whitespace-nowrap rounded-xl px-3 py-2 text-[13.5px] font-bold transition-all xl:px-4 xl:text-[14.5px]",
                  active(item.href) ? "text-brand" : "text-body hover:text-ink"
                )}
              >
                {active(item.href) && (
                  <motion.span
                    layoutId="nav-bg"
                    className="absolute inset-0 rounded-xl bg-white shadow-[0_2px_10px_-2px_rgba(11,122,85,0.14)]"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.45 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </Link>
            )
          )}
        </nav>

        {/* Right side CTA actions */}
        <div className="flex shrink-0 items-center gap-2.5">
          {/* Direct phone shortcut */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            title={`Direct Phone Desk: ${site.phone}`}
            className="hidden size-11 items-center justify-center rounded-full border border-brand/25 bg-white/80 text-brand shadow-xs transition-all hover:scale-105 hover:border-brand hover:bg-mint active:scale-95 2xl:flex"
          >
            <Phone className="size-[18px]" />
          </a>

          {/* Primary CTA Button */}
          <Link
            href="/contact"
            className="group relative hidden min-h-11 items-center gap-2 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-brand-deep via-brand to-brand-dark px-4 text-[13.5px] font-bold text-white shadow-[0_10px_25px_-8px_rgba(11,122,85,0.55)] transition-all hover:shadow-[0_14px_30px_-6px_rgba(11,122,85,0.65)] hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex xl:px-5 xl:text-[14.5px]"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
            />
            <CalendarDays className="relative size-4" />
            <span className="relative">Book a free call</span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-11 items-center justify-center rounded-2xl border border-line/80 bg-white text-ink transition hover:border-brand/40 hover:bg-soft active:scale-95 lg:hidden"
          >
            {open ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
          </button>
        </div>
      </div>

      {/* Responsive AMFI Registration Banner (Mobile & Tablet: Directly under navbar, matching screenshot) */}
      <MobileRegBanner className="min-[1280px]:hidden" />

      {/* Mobile Drawer Menu (Sliding dropdown) */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile Navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[calc(100svh-120px)] overflow-y-auto overflow-x-hidden border-t border-line bg-white/98 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1.5 px-4 py-4 sm:px-6">
              {nav.map((item) =>
                item.menu ? (
                  <div key={item.href} className="overflow-hidden rounded-2xl border border-line/60">
                    <button
                      type="button"
                      aria-expanded={sub === item.menu}
                      onClick={() => setSub(sub === item.menu ? null : item.menu!)}
                      className={cn(
                        "flex w-full items-center justify-between px-4 py-3 text-left text-[16px] font-bold transition-colors sm:text-[17px]",
                        active(item.href) ? "bg-mint text-brand" : "text-ink hover:bg-soft"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          sub === item.menu && "rotate-180 text-brand"
                        )}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {sub === item.menu && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-line/60 bg-soft/60"
                        >
                          <div className="flex flex-col p-2 space-y-1">
                            {menus[item.menu].map((o) => (
                              <MenuItem key={o.slug} o={o} compact />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-2xl px-4 py-3 text-[16px] font-bold transition-colors sm:text-[17px]",
                      active(item.href) ? "bg-mint text-brand" : "text-ink hover:bg-soft"
                    )}
                  >
                    {item.label}
                  </Link>
                )
              )}

              {/* Mobile Quick Action Buttons */}
              <div className="mt-3 grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-deep to-brand text-[15px] font-bold text-white shadow-sm transition hover:bg-brand-dark"
                >
                  <CalendarDays className="size-4" />
                  Book a free call
                </Link>
                <a
                  href={site.phoneHref}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-line bg-white text-[15px] font-bold text-ink shadow-xs transition hover:border-brand/40 hover:bg-soft"
                >
                  <Phone className="size-4 text-brand" />
                  Call us
                </a>
              </div>

              {/* Contact information footer */}
              <div className="mt-2 flex items-center justify-between border-t border-line/70 pt-3 text-[13px] font-semibold text-body">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 transition hover:text-brand"
                >
                  <Mail className="size-4 text-brand" />
                  {site.email}
                </a>
                <span className="inline-flex items-center gap-1 text-xs text-body/80">
                  <ShieldCheck className="size-3.5 text-brand" />
                  AMFI Registered
                </span>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
