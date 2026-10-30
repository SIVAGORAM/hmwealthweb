"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/consent/CookieConsentContext";

interface GoogleAnalyticsProps {
  gaId?: string;
}

/**
 * Optimized Google Analytics 4 (GA4) Tracking Component with Privacy Consent Gate.
 *
 * Requirements:
 * 1. CONSENT GATING: Strictly blocks script injection and network telemetry
 *    until the user gives explicit consent for "analytics" cookies under DPDP Act 2023.
 * 2. SCRIPT STRATEGY: Loads via `next/script` with `strategy="afterInteractive"`
 *    to preserve FCP and LCP without blocking hydration.
 * 3. FAIL-SAFE: Reads `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID`. If undefined
 *    or blank, gracefully returns null without throwing errors.
 * 4. REAL-TIME ACTIVATION: Instantly initializes tracking upon user consent
 *    without requiring a manual browser reload.
 */
export function GoogleAnalytics({
  gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
}: GoogleAnalyticsProps) {
  const { hasCategory } = useCookieConsent();
  const isAnalyticsConsented = hasCategory("analytics");

  // Fail-safe check: Return null if measurement ID is absent, blank, or improperly formed
  if (!gaId || typeof gaId !== "string" || !gaId.trim()) {
    return null;
  }

  // Privacy Protection: Do NOT load or execute tracking scripts until user consents to Analytics
  if (!isAnalyticsConsented) {
    return null;
  }

  const measurementId = gaId.trim();

  return (
    <>
      {/* Google tag (gtag.js) CDN script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />

      {/* Analytics initialization script */}
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true
            });
          `.replace(/\s+/g, " ").trim(),
        }}
      />
    </>
  );
}

export default GoogleAnalytics;
