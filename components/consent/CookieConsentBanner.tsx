"use client";

import Link from "next/link";
import { Cookie, SlidersHorizontal, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";

export function CookieConsentBanner() {
  const { isBannerVisible, acceptAll, rejectOptional, openPreferencesModal } =
    useCookieConsent();

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.aside
          role="region"
          aria-label="Cookie Preferences"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[4.5rem] left-3 right-3 z-50 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-[360px]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line/80 bg-white/98 p-3 shadow-[0_16px_36px_-12px_rgba(15,31,26,0.18)] backdrop-blur-xl sm:p-3.5 ring-1 ring-black/5">
            {/* Top brand hairline */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand via-brand-bright to-[#e0a92e]"
            />

            {/* Header: Compact Icon & Title & Close */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="flex size-5.5 shrink-0 items-center justify-center rounded-md bg-mint text-brand">
                  <Cookie className="size-3.5 text-brand" />
                </span>
                <h3 className="text-[13px] font-bold text-ink">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={rejectOptional}
                aria-label="Close and reject optional cookies"
                className="rounded-md p-1 text-body/60 hover:bg-soft hover:text-ink transition-colors"
              >
                <X className="size-3.5" />
              </button>
            </div>

            {/* Concise 1-sentence copy */}
            <p className="mt-1 text-[11.5px] leading-snug text-body">
              We use cookies for essential site functions and traffic analytics. Learn more in our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-brand underline decoration-brand/30 underline-offset-2 hover:text-brand-dark"
              >
                Privacy Policy
              </Link>
              .
            </p>

            {/* Action Buttons: Clean compact row */}
            <div className="mt-2.5 flex items-center justify-between gap-1.5 border-t border-line/50 pt-2">
              <button
                type="button"
                onClick={openPreferencesModal}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-body hover:text-brand transition-colors"
              >
                <SlidersHorizontal className="size-3 text-brand" />
                Customize
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={rejectOptional}
                  className="rounded-lg border border-line bg-soft px-2.5 py-1 text-[11.5px] font-bold text-ink hover:border-body/30 hover:bg-white active:scale-95 transition-all"
                >
                  Reject
                </button>

                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-brand-deep to-brand px-3 py-1 text-[11.5px] font-bold text-white shadow-xs hover:bg-brand-dark active:scale-95 transition-all"
                >
                  <Check className="size-3" />
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

export default CookieConsentBanner;
