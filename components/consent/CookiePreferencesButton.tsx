"use client";

import { SlidersHorizontal } from "lucide-react";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";

interface CookiePreferencesButtonProps {
  className?: string;
  showIcon?: boolean;
  label?: string;
}

export function CookiePreferencesButton({
  className,
  showIcon = true,
  label = "Cookie Preferences",
}: CookiePreferencesButtonProps) {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferencesModal}
      className={
        className ??
        "inline-flex items-center gap-1.5 text-[13px] font-medium text-body transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
      }
      aria-label="Manage cookie and privacy consent preferences"
    >
      {showIcon && <SlidersHorizontal className="size-3.5 text-brand" />}
      <span>{label}</span>
    </button>
  );
}

export default CookiePreferencesButton;

