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

  User,
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

/* Official Apple logo */
function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.37 12.62c-.03-2.53 2.06-3.75 2.15-3.81-1.17-1.72-3-1.95-3.64-1.98-1.55-.16-3.03.91-3.81.91-.79 0-2.01-.89-3.29-.87-1.69.03-3.25.99-4.12 2.51-1.76 3.06-.45 7.6 1.26 10.08.84 1.21 1.83 2.58 3.14 2.53 1.27-.05 1.74-.82 3.27-.82 1.52 0 1.95.82 3.29.79 1.36-.02 2.22-1.24 3.05-2.46.96-1.4 1.35-2.76 1.38-2.83-.03-.01-2.65-1.02-2.68-4.05zM13.86 5.2c.69-.84 1.16-2.01 1.03-3.18-1 .04-2.21.67-2.93 1.5-.64.74-1.2 1.93-1.05 3.08 1.12.09 2.26-.57 2.95-1.4z" />
    </svg>
  );
}

/* Official 4-colour Google Play logo */
function PlayStoreGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#00D7FE" d="M3.61 1.81 13.79 12 3.61 22.19a1.2 1.2 0 0 1-.36-.87V2.68c0-.34.13-.65.36-.87z" />
      <path fill="#FFCE00" d="m17.18 15.39-3.39-3.39 3.39-3.39 4.09 2.33c1.17.66 1.17 1.74 0 2.4l-4.09 2.33z" />
      <path fill="#FF3A44" d="M17.18 15.39 13.79 12 3.61 22.19c.38.4 1 .45 1.71.05l11.86-6.85z" />
      <path fill="#00F076" d="M17.18 8.61 5.32 1.76c-.71-.4-1.33-.35-1.71.05L13.79 12l3.39-3.39z" />
    </svg>
  );
}

const storeBadge =
  "group flex h-9 items-center gap-2 rounded-[10px] bg-black pl-2.5 pr-3 text-white ring-1 ring-white/10 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.6)] transition hover:-translate-y-px hover:bg-[#111] active:translate-y-0";

/* App Store badge */
function AppleStoreBadge({ className }: { className?: string }) {
  return (
    <a href={site.appStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store" title="Download on the App Store" className={cn(storeBadge, className)}>
      <AppleGlyph className="size-[19px] shrink-0 -translate-y-px" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[7.5px] font-medium tracking-[0.04em] text-white/75">Download on the</span>
        <span className="mt-[2px] text-[13px] font-semibold tracking-[-0.01em]">App Store</span>
      </span>
    </a>
  );
}

/* Google Play badge */
function PlayStoreBadge({ className }: { className?: string }) {
  return (
    <a href={site.playStoreUrl} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play" title="Get it on Google Play" className={cn(storeBadge, className)}>
      <PlayStoreGlyph className="size-[18px] shrink-0" />
      <span className="flex flex-col text-left leading-none">
        <span className="text-[7.5px] font-medium uppercase tracking-[0.08em] text-white/75">Get it on</span>
        <span className="mt-[2px] text-[13px] font-semibold tracking-[-0.01em]">Google Play</span>
      </span>
    </a>
  );
}

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

/* Dropdown Menu for Products & Services on the Colored Bar */
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
    timer.current = setTimeout(() => setOpen(false), 140);
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
          "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-[13.5px] font-bold tracking-wide transition-all xl:px-5 xl:text-[14px]",
          active
            ? "bg-white/22 text-white font-extrabold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-xs border border-white/30"
            : "text-white/92 hover:bg-white/15 hover:text-white"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
            "text-white/80"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full z-50 mt-2 w-[560px] max-w-[92vw] origin-top-left rounded-2xl border border-line bg-white/98 p-4 shadow-[0_24px_60px_-16px_rgba(4,38,28,0.28)] ring-1 ring-black/5 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3">
              <div className="border-b border-line/70 pb-2.5">
                <p className="text-[12.5px] font-medium leading-relaxed text-body">
                  {menuIntro[which]}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {items.map((o) => (
                  <MenuItem key={o.slug} o={o} onPick={() => setOpen(false)} />
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-line/70 pt-2.5 text-xs">
                <Link
                  href={which === "products" ? "/products" : "/services"}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 font-bold text-brand transition hover:text-brand-dark"
                >
                  <span>Explore all {which}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="font-semibold text-body hover:text-ink transition-colors"
                >
                  Need guidance? Talk to desk
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Desktop AMFI Registration Block: Well-structured credentials block beside logo */
function DesktopRegBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center border-l-2 border-[#1fa882]/30 pl-4 uppercase leading-none transition-all",
        className
      )}
    >
      <p className="text-[10px] xl:text-[10.5px] font-bold tracking-[0.06em] text-slate-500">
        {registrations.lines[0]}
      </p>
      <p className="mt-1 text-[12px] xl:text-[12.5px] font-black tracking-wide text-slate-900">
        {site.arn.replace("-", " – ")}
      </p>
      <div className="mt-1 flex items-center gap-1.5 text-[11px] xl:text-[11.5px] font-black tracking-[0.08em] text-[#179672]">
        <span>{registrations.products[0]}</span>
        <span className="text-[#e0a92e] font-black select-none" aria-hidden>
          |
        </span>
        <span>{registrations.products[1]}</span>
      </div>
    </div>
  );
}

/* Mobile & Tablet AMFI Registration Banner */
function MobileRegBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-slate-100 bg-[#f8faf9] px-4 py-2 text-center transition-colors",
        className
      )}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-1 uppercase">
        <p className="text-[10.5px] font-bold tracking-[0.06em] text-slate-500 leading-none">
          {registrations.lines[0]}
        </p>
        <p className="text-[12px] font-black tracking-wide text-slate-900 leading-none">
          {site.arn.replace("-", " – ")}
        </p>
        <div className="flex items-center justify-center gap-2 text-[11px] font-black tracking-[0.08em] text-[#179672] leading-none">
          <span>{registrations.products[0]}</span>
          <span className="text-[#e0a92e] font-black select-none" aria-hidden>
            |
          </span>
          <span>{registrations.products[1]}</span>
        </div>
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
          ? "bg-white shadow-[0_10px_30px_-12px_rgba(15,31,26,0.18)]"
          : "bg-white"
      )}
    >
      {/* Top subtle brand hairline */}
      <div
        aria-hidden
        className="h-[2px] w-full bg-gradient-to-r from-brand-deep via-brand to-[#e0a92e]"
      />

      {/* ======================================================================
          1. TOP EXECUTIVE HEADER ROW: Logo, AMFI Credentials, Store Apps & Login
          ====================================================================== */}
      <div className="mx-auto flex h-[66px] max-w-[1520px] items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:h-[76px] lg:px-8">
        {/* Brand logo + AMFI credentials */}
        <div className="flex min-w-0 shrink-0 items-center gap-3 sm:gap-5">
          <Logo priority />
          <DesktopRegBlock className="hidden md:flex" />
        </div>

        {/* Right side CTA actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          {/* Apple App Store Badge */}
          <AppleStoreBadge className="hidden md:flex" />

          {/* Google Play Store Badge */}
          <PlayStoreBadge className="hidden md:flex" />

          {/* Direct phone desk shortcut */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            title={`Direct Phone Desk: ${site.phone}`}
            className="group hidden size-[38px] items-center justify-center rounded-xl border border-brand/20 bg-mint/50 text-[#179672] shadow-2xs transition hover:border-[#179672] hover:bg-[#179672] hover:text-white hover:scale-105 active:scale-95 sm:flex"
          >
            <Phone className="size-[15px] transition-transform group-hover:scale-110" />
          </a>

          {/* Book a call button */}
          <Link
            href="/contact"
            className="group relative hidden h-[38px] items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-xl bg-slate-900 px-3.5 text-[13px] font-bold text-white shadow-xs transition hover:bg-[#179672] active:scale-[0.99] min-[980px]:inline-flex xl:px-4 xl:text-[13.5px]"
          >
            <CalendarDays className="size-3.5 text-white/80 group-hover:text-white" />
            <span>Book a call</span>
          </Link>

          {/* Client Login Button */}
          <a
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[38px] items-center gap-1.5 whitespace-nowrap rounded-xl bg-gradient-to-r from-[#179672] to-[#2cb98f] px-4 text-[13px] font-extrabold text-white shadow-[0_4px_14px_-2px_rgba(23,150,114,0.4)] transition hover:from-[#147a5d] hover:to-[#179672] hover:shadow-md active:scale-[0.99] sm:px-4.5 sm:text-[13.5px]"
          >
            <User className="size-3.5 transition-transform group-hover:scale-110" />
            <span>Login</span>
          </a>

          {/* Mobile drawer toggle */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex size-[38px] items-center justify-center rounded-xl border border-line/80 bg-white text-ink transition hover:border-brand/40 hover:bg-soft active:scale-95 lg:hidden"
          >
            {open ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
          </button>
        </div>
      </div>

      {/* ======================================================================
          2. SECOND TIER: COLORED NAVIGATION BAR (Color of "WEALTH" in the logo)
          ====================================================================== */}
      <div className="hidden border-t border-white/20 border-b border-[#147a5d] bg-gradient-to-r from-[#179672] via-[#1fa880] to-[#2cb98f] shadow-[0_4px_16px_rgba(23,150,114,0.22)] lg:block">
        <div className="mx-auto flex h-[48px] max-w-[1520px] items-center justify-center px-4 sm:px-6 lg:px-8">
          {/* Centered Main Navigation Items */}
          <nav aria-label="Main" className="flex items-center gap-1.5 xl:gap-3">
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
                    "relative whitespace-nowrap rounded-lg px-4 py-2 text-[13.5px] font-bold tracking-wide transition-all xl:px-5 xl:text-[14px]",
                    active(item.href)
                      ? "bg-white/22 text-white font-extrabold shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-xs border border-white/30"
                      : "text-white/92 hover:bg-white/15 hover:text-white"
                  )}
                >
                  <span className="relative">{item.label}</span>
                </Link>
              )
            )}
          </nav>
        </div>
      </div>

      {/* Responsive AMFI Registration Banner (Mobile & Tablet) */}
      <MobileRegBanner className="md:hidden" />

      {/* ======================================================================
          3. MOBILE DRAWER NAVIGATION MENU
          ====================================================================== */}
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

              {/* Mobile App Downloads */}
              <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-line/70 bg-[#f7f9f8] p-3.5">
                <span className="text-xs font-bold text-ink">Download Our Mobile App</span>
                <div className="grid grid-cols-2 gap-2">
                  <AppleStoreBadge className="h-11 justify-center !flex" />
                  <PlayStoreBadge className="h-11 justify-center !flex" />
                </div>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="mt-2 grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                <a
                  href={site.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#179672] to-[#2cb98f] text-[15px] font-extrabold text-white shadow-sm transition hover:from-[#147a5d] hover:to-[#179672]"
                >
                  <User className="size-4" />
                  Client Login
                </a>
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink text-[15px] font-bold text-white shadow-sm transition hover:bg-[#179672]"
                >
                  <CalendarDays className="size-4" />
                  Book a free call
                </Link>
              </div>

              {/* Contact information footer */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4 text-sm text-body">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-1.5 font-bold text-ink hover:text-brand"
                >
                  <Phone className="size-4 text-brand" />
                  <span>{site.phone}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-1.5 text-xs text-body hover:text-brand"
                >
                  <Mail className="size-3.5 text-brand" />
                  <span>{site.email}</span>
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
