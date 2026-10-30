"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  X,
  ShieldCheck,
  Check,
  ChevronDown,
  Cookie,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";
import {
  COOKIE_CATEGORIES,
  type CookieCategoryKey,
  type CookieConsentPreferences,
} from "@/lib/cookie-consent";

export function CookiePreferencesModal() {
  const {
    isModalOpen,
    preferences,
    closePreferencesModal,
    savePreferences,
    acceptAll,
    rejectOptional,
  } = useCookieConsent();

  // Local draft state for toggle editing inside the modal
  const [draftPreferences, setDraftPreferences] = useState<CookieConsentPreferences>(preferences);
  const [expandedCategory, setExpandedCategory] = useState<CookieCategoryKey | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync draft preferences whenever modal opens
  useEffect(() => {
    if (isModalOpen) {
      setDraftPreferences(preferences);
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [isModalOpen, preferences]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePreferencesModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closePreferencesModal]);

  const toggleCategory = (key: CookieCategoryKey) => {
    if (key === "necessary") return;
    setDraftPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    savePreferences(draftPreferences);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-preferences-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreferencesModal}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
          />

          {/* Compact Modern Modal Card */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[88vh] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-line/80 bg-white shadow-2xl"
          >
            {/* Top brand accent hairline */}
            <div
              aria-hidden
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-brand via-brand-bright to-[#e0a92e]"
            />

            {/* Compact Header */}
            <div className="border-b border-line/70 bg-soft/60 px-4 py-3.5 sm:px-5 sm:py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-mint text-brand ring-1 ring-brand/20">
                    <SlidersHorizontal className="size-3.5 text-brand" />
                  </span>
                  <div>
                    <h2
                      id="cookie-preferences-title"
                      className="text-[15px] font-bold tracking-tight text-ink sm:text-[16px]"
                    >
                      Cookie Preferences
                    </h2>
                    <p className="text-[11.5px] text-body">
                      Customize your browsing choices
                    </p>
                  </div>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closePreferencesModal}
                  aria-label="Close cookie preferences modal"
                  className="rounded-lg p-1.5 text-body/60 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Quick Action Pills */}
              <div className="mt-2.5 flex items-center justify-between gap-2 pt-2 border-t border-line/50">
                <p className="text-[11.5px] text-body/90 leading-tight">
                  Choose which cookies you allow:
                </p>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={rejectOptional}
                    className="rounded-lg border border-line bg-white px-2.5 py-1 text-[11px] font-bold text-ink hover:bg-soft active:scale-95 transition-all"
                  >
                    Reject Optional
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="rounded-lg bg-brand px-2.5 py-1 text-[11px] font-bold text-white hover:bg-brand-dark active:scale-95 transition-all shadow-2xs"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Category List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 sm:px-5 space-y-2.5">
              {COOKIE_CATEGORIES.map((cat) => {
                const isEnabled = cat.key === "necessary" ? true : draftPreferences[cat.key];
                const isExpanded = expandedCategory === cat.key;

                return (
                  <div
                    key={cat.key}
                    className="rounded-xl border border-line/80 bg-white p-3 transition-colors hover:border-brand/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h3 className="text-[13px] font-bold text-ink">{cat.title}</h3>
                          {cat.required ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-brand">
                              <ShieldCheck className="size-2.5" />
                              Always Active
                            </span>
                          ) : (
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                                isEnabled
                                  ? "bg-mint text-brand"
                                  : "bg-soft text-body"
                              }`}
                            >
                              {isEnabled ? "Enabled" : "Disabled"}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-[11.5px] leading-snug text-body">
                          {cat.description}
                        </p>
                      </div>

                      {/* Interactive Switch */}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={isEnabled}
                        disabled={cat.required}
                        onClick={() => toggleCategory(cat.key)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand ${
                          cat.required
                            ? "cursor-not-allowed bg-brand/50 opacity-80"
                            : isEnabled
                            ? "bg-brand"
                            : "bg-line hover:bg-line/80"
                        }`}
                      >
                        <span className="sr-only">Toggle {cat.title}</span>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block size-4 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? "translate-x-4" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Collapsible Cookie Details Toggle */}
                    <div className="mt-2 flex items-center justify-between border-t border-line/40 pt-1.5">
                      <button
                        type="button"
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.key)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand hover:text-brand-dark transition-colors"
                      >
                        <span>{isExpanded ? "Hide Details" : "View Cookies"}</span>
                        <ChevronDown
                          className={`size-3 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <span className="text-[10.5px] text-body/70">
                        {cat.cookies.length} {cat.cookies.length === 1 ? "cookie" : "cookies"}
                      </span>
                    </div>

                    {/* Detailed Cookie Table (Expanded) */}
                    {isExpanded && (
                      <div className="mt-2 rounded-lg border border-line/60 bg-soft/50 p-2 text-[11px]">
                        <div className="space-y-1.5">
                          {cat.cookies.map((c) => (
                            <div key={c.name} className="flex flex-col gap-0.5 border-b border-line/40 pb-1.5 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between">
                                <span className="font-mono font-bold text-brand">{c.name}</span>
                                <span className="text-body/80">{c.expiry}</span>
                              </div>
                              <p className="text-body leading-tight">{c.purpose}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Compact Footer Bar */}
            <div className="flex items-center justify-between gap-3 border-t border-line/70 bg-soft/40 px-4 py-2.5 sm:px-5 sm:py-3">
              <Link
                href="/privacy-policy"
                onClick={closePreferencesModal}
                className="text-[11.5px] font-semibold text-body hover:text-brand transition-colors"
              >
                Privacy Policy
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closePreferencesModal}
                  className="rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold text-body hover:bg-soft hover:text-ink transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-1 rounded-xl bg-gradient-to-r from-brand-deep to-brand px-3.5 py-1.5 text-[12px] font-bold text-white shadow-xs hover:bg-brand-dark active:scale-95 transition-all"
                >
                  <Check className="size-3.5" />
                  Save Choices
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default CookiePreferencesModal;
