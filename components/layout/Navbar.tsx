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
  Apple,
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

function PlayStoreGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M3.6 2.3c-.2.2-.4.6-.4 1.1v17.2c0 .5.2.9.4 1.1l9.3-9.7L3.6 2.3z"
      />
      <path
        fill="#FBBC04"
        d="M16.6 15.7l-3.7-3.7 3.7-3.7 4.2 2.4c1.2.7 1.2 1.9 0 2.6l-4.2 2.4z"
      />
      <path
        fill="#EA4335"
        d="M3.6 2.3l9.3 9.7 3.7-3.7-10.8-6.2c-.8-.5-1.7-.3-2.2.2z"
      />
      <path
        fill="#34A853"
        d="M3.6 21.7c.5.5 1.4.7 2.2.2l10.8-6.2-3.7-3.7-9.3 9.7z"
      />
    </svg>
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
          "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13.5px] font-bold tracking-wide transition-all xl:px-4 xl:text-[14px]",
          active
            ? "bg-white text-brand shadow-xs"
            : "text-white/95 hover:bg-white/15 hover:text-white"
        )}
      >
        <span>{label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
            active ? "text-brand" : "text-white/80"
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

/* Desktop AMFI Registration Block: Displayed beside logo */
function DesktopRegBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center gap-0.5 border-l-2 border-brand/20 pl-4 uppercase leading-snug transition-all",
        className
      )}
    >
      <p className="text-[11px] font-bold tracking-[0.03em] text-body">
        {registrations.lines[0]}
      </p>
      <p className="text-[11.5px] font-black tracking-[0.03em] text-ink">
        {site.arn.replace("-", " – ")}
      </p>
      <p className="flex items-center gap-1.5 text-[11.5px] font-black tracking-[0.08em] text-brand-deep">
        <span>{registrations.products[0]}</span>
        <span className="text-[#e0a92e] font-black select-none" aria-hidden>
          |
        </span>
        <span>{registrations.products[1]}</span>
      </p>
    </div>
  );
}

/* Mobile & Tablet AMFI Registration Banner */
function MobileRegBanner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border-t border-line/60 bg-[#fbfcfb]/95 px-3 py-1.5 text-center backdrop-blur-md transition-colors",
        className
      )}
    >
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center gap-0.5 uppercase leading-tight">
        <p className="text-[11px] font-bold tracking-[0.03em] text-body sm:text-[11.5px]">
          {registrations.lines[0]}
        </p>
        <p className="text-[11px] font-black tracking-[0.02em] text-ink sm:text-[11.5px]">
          {site.arn.replace("-", " – ")}
        </p>
        <p className="flex items-center justify-center gap-2 text-[11.5px] font-black tracking-[0.08em] text-brand-deep sm:text-[12px]">
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
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* Apple App Store */}
          <a
            href={site.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download on Apple App Store"
            title="Download on Apple App Store"
            className="group hidden size-9 items-center justify-center rounded-full border border-line bg-white shadow-2xs transition hover:border-ink hover:bg-slate-50 hover:scale-105 active:scale-95 sm:flex sm:size-10"
          >
            <Apple className="size-[17px] text-ink transition-transform group-hover:scale-110" />
          </a>

          {/* Google Play Store */}
          <a
            href={site.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get it on Google Play"
            title="Get it on Google Play"
            className="group hidden size-9 items-center justify-center rounded-full border border-line bg-white shadow-2xs transition hover:border-[#01875f] hover:bg-slate-50 hover:scale-105 active:scale-95 sm:flex sm:size-10"
          >
            <PlayStoreGlyph className="size-[16px] transition-transform group-hover:scale-110" />
          </a>

          {/* Direct phone desk shortcut */}
          <a
            href={site.phoneHref}
            aria-label={`Call ${site.phone}`}
            title={`Direct Phone Desk: ${site.phone}`}
            className="group hidden size-9 items-center justify-center rounded-full border border-brand/30 bg-mint/60 text-brand shadow-2xs transition hover:border-brand hover:bg-brand hover:text-white hover:scale-105 active:scale-95 sm:flex sm:size-10"
          >
            <Phone className="size-[15px] transition-transform group-hover:scale-110" />
          </a>

          {/* Book a call button */}
          <Link
            href="/contact"
            className="group relative hidden min-h-[38px] items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-ink px-3.5 text-[13px] font-bold text-white shadow-xs transition hover:bg-brand active:scale-[0.99] min-[900px]:inline-flex xl:px-4 xl:text-[13.5px]"
          >
            <CalendarDays className="size-3.5 text-white/80 group-hover:text-white" />
            <span>Book a call</span>
          </Link>

          {/* Client Login Button */}
          <a
            href={site.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[38px] items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-brand to-brand-bright px-3.5 text-[12.5px] font-extrabold text-white shadow-[0_6px_16px_-4px_rgba(11,122,85,0.45)] transition hover:from-brand-dark hover:to-brand hover:shadow-md active:scale-[0.99] sm:px-4.5 sm:text-[13.5px]"
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
            className="flex size-9 items-center justify-center rounded-xl border border-line/80 bg-white text-ink transition hover:border-brand/40 hover:bg-soft active:scale-95 sm:size-10 lg:hidden"
          >
            {open ? <X className="size-5 text-ink" /> : <Menu className="size-5 text-ink" />}
          </button>
        </div>
      </div>

      {/* ======================================================================
          2. SECOND TIER: COLORED NAVIGATION BAR (Color of "WEALTH" in the logo)
          ====================================================================== */}
      <div className="hidden border-y border-[#0e7c5b] bg-[#108c69] shadow-[0_4px_16px_rgba(11,122,85,0.18)] lg:block">
        <div className="mx-auto flex h-[46px] max-w-[1520px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Main Navigation Items */}
          <nav aria-label="Main" className="flex items-center gap-1 xl:gap-2">
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
                    "relative whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13.5px] font-bold tracking-wide transition-all xl:px-4 xl:text-[14px]",
                    active(item.href)
                      ? "bg-white text-brand shadow-xs"
                      : "text-white/95 hover:bg-white/15 hover:text-white"
                  )}
                >
                  <span className="relative">{item.label}</span>
                </Link>
              )
            )}
          </nav>

          {/* Right: Quick Statutory Badge */}
          <div className="flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-wider text-white/90">
            <span className="size-1.5 rounded-full bg-[#f2b33d]" aria-hidden />
            <span>AMFI-Registered MFD · ARN-341412</span>
          </div>
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

              {/* Mobile App Downloads & Client Login Bar */}
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-line/70 bg-[#f7f9f8] p-3">
                <span className="text-xs font-bold text-ink">Download Mobile App</span>
                <div className="flex items-center gap-2">
                  <a
                    href={site.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-xl border border-line bg-white shadow-2xs hover:bg-soft"
                    aria-label="Apple App Store"
                  >
                    <Apple className="size-4 text-ink" />
                  </a>
                  <a
                    href={site.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-9 items-center justify-center rounded-xl border border-line bg-white shadow-2xs hover:bg-soft"
                    aria-label="Google Play Store"
                  >
                    <PlayStoreGlyph className="size-4" />
                  </a>
                </div>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="mt-2 grid grid-cols-1 gap-2.5 xs:grid-cols-2">
                <a
                  href={site.loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand to-brand-bright text-[15px] font-extrabold text-white shadow-sm transition hover:from-brand-dark hover:to-brand"
                >
                  <User className="size-4" />
                  Client Login
                </a>
                <Link
                  href="/contact"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-ink text-[15px] font-bold text-white shadow-sm transition hover:bg-brand"
                >
                  <CalendarDays className="size-4" />
                  Book a free call
                </Link>
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
                  ARN-341412
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
