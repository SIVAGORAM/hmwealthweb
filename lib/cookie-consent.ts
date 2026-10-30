/**
 * HM Wealth Cookie Consent System — Core Types, Constants & Persistence Engine.
 * Provides user privacy controls and persistence.
 */

export type CookieCategoryKey = "necessary" | "analytics" | "functional" | "marketing";

export interface CookieConsentPreferences {
  necessary: true; // Strictly necessary cookies are mandatory and always enabled
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

export interface CookieCategoryDetail {
  key: CookieCategoryKey;
  title: string;
  badge?: string;
  required: boolean;
  description: string;
  purpose: string;
  cookies: Array<{
    name: string;
    provider: string;
    purpose: string;
    expiry: string;
  }>;
}

export interface CookieConsentState {
  hasConsented: boolean;
  timestamp: string;
  version: string;
  preferences: CookieConsentPreferences;
}

export const COOKIE_CONSENT_KEY = "hm_wealth_cookie_consent_v1";
export const COOKIE_CONSENT_NAME = "hm_cookie_consent";
export const COOKIE_CONSENT_VERSION = "1.0.0";
export const COOKIE_CONSENT_MAX_AGE_DAYS = 365;

export const DEFAULT_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export const ACCEPT_ALL_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: true,
  functional: true,
  marketing: true,
};

export const REJECT_OPTIONAL_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  functional: false,
  marketing: false,
};

export const COOKIE_CATEGORIES: CookieCategoryDetail[] = [
  {
    key: "necessary",
    title: "Strictly Necessary Cookies",
    badge: "Always Active",
    required: true,
    description:
      "Essential for the platform to function securely. They facilitate page navigation, CSRF protection, secure sessions, and store your cookie consent preferences. They cannot be turned off.",
    purpose: "Security, session management, and regulatory compliance.",
    cookies: [
      {
        name: "hm_cookie_consent",
        provider: "HM Wealth (1st party)",
        purpose: "Stores your verified cookie consent choices and timestamp.",
        expiry: "1 year",
      },
      {
        name: "__Secure-session",
        provider: "HM Wealth (1st party)",
        purpose: "Maintains secure encrypted session state across navigation.",
        expiry: "Session",
      },
      {
        name: "csrf_token",
        provider: "HM Wealth (1st party)",
        purpose: "Protects contact and inquiry forms against Cross-Site Request Forgery.",
        expiry: "Session",
      },
    ],
  },
  {
    key: "analytics",
    title: "Analytics & Performance Cookies",
    required: false,
    description:
      "Allow us to measure visitor counts and traffic sources to evaluate and improve the speed, usability, and performance of our pages. All data is aggregated and anonymized.",
    purpose: "Usage statistics, Core Web Vitals telemetry, and anonymized user behavior.",
    cookies: [
      {
        name: "_ga",
        provider: "Google Analytics (Google LLC)",
        purpose: "Distinguishes unique anonymous sessions for aggregated metrics.",
        expiry: "2 years",
      },
      {
        name: "_ga_*",
        provider: "Google Analytics (Google LLC)",
        purpose: "Persists anonymous session telemetry and pageview sequences.",
        expiry: "2 years",
      },
    ],
  },
  {
    key: "functional",
    title: "Functional & Preference Cookies",
    required: false,
    description:
      "Enable enhanced features and personalization, such as remembering your custom SIP and lumpsum calculator parameters, drawer states, and display preferences.",
    purpose: "Persistent calculator states, interactive UI controls, and user preferences.",
    cookies: [
      {
        name: "hm_calc_preferences",
        provider: "HM Wealth (1st party)",
        purpose: "Remembers recently evaluated financial calculator inputs.",
        expiry: "6 months",
      },
      {
        name: "hm_chat_state",
        provider: "HM Wealth (1st party)",
        purpose: "Preserves the open/closed status of the client support desk widget.",
        expiry: "30 days",
      },
    ],
  },
  {
    key: "marketing",
    title: "Marketing & Attribution Cookies",
    required: false,
    description:
      "Used to measure the reach of our financial literacy outreach campaigns and partner referral channels. We never sell your personal information or engage in predatory advertising.",
    purpose: "Referral attribution, educational campaign outreach tracking.",
    cookies: [
      {
        name: "_gcl_au",
        provider: "Google Tag Manager",
        purpose: "Used by Google to experiment with advertising efficiency across campaigns.",
        expiry: "90 days",
      },
      {
        name: "utm_attribution",
        provider: "HM Wealth (1st party)",
        purpose: "Tracks initial incoming campaign referral source for inquiry attribution.",
        expiry: "30 days",
      },
    ],
  },
];

/**
 * Safely reads the persisted consent state from localStorage or HTTP cookie.
 */
export function getStoredConsent(): CookieConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CookieConsentState;
      if (parsed && typeof parsed.preferences === "object") {
        return {
          ...parsed,
          preferences: {
            ...parsed.preferences,
            necessary: true, // Always enforce necessary
          },
        };
      }
    }

    // Fallback: Check document.cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`));
    if (match) {
      const decoded = decodeURIComponent(match[1]);
      const parsed = JSON.parse(decoded) as CookieConsentState;
      if (parsed && typeof parsed.preferences === "object") {
        return {
          ...parsed,
          preferences: {
            ...parsed.preferences,
            necessary: true,
          },
        };
      }
    }
  } catch {
    // If storage is corrupted or blocked by strict browser settings, fail gracefully
  }

  return null;
}

/**
 * Real-time cleanup: Erases non-essential cookies immediately when their category is rejected.
 */
export function cleanupRejectedCookies(preferences: CookieConsentPreferences) {
  if (typeof document === "undefined") return;

  const domains = [
    window.location.hostname,
    `.${window.location.hostname}`,
    window.location.hostname.replace(/^www\./, "."),
    "",
  ];
  const paths = ["/", ""];

  const clearCookie = (name: string) => {
    for (const domain of domains) {
      for (const path of paths) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}${domain ? `; domain=${domain}` : ""}; SameSite=Lax`;
      }
    }
  };

  if (!preferences.analytics) {
    const allCookies = document.cookie.split(";");
    for (const c of allCookies) {
      const trimmed = c.trim();
      const cookieName = trimmed.split("=")[0];
      if (cookieName.startsWith("_ga") || cookieName === "_gid" || cookieName === "_gat") {
        clearCookie(cookieName);
      }
    }
  }

  if (!preferences.marketing) {
    clearCookie("_gcl_au");
    clearCookie("utm_attribution");
  }

  if (!preferences.functional) {
    clearCookie("hm_calc_preferences");
  }
}

/**
 * Saves consent state to localStorage and document.cookie, and broadcasts a window event.
 */
export function setStoredConsent(preferences: CookieConsentPreferences): CookieConsentState {
  const verifiedPreferences: CookieConsentPreferences = {
    ...preferences,
    necessary: true,
  };

  const state: CookieConsentState = {
    hasConsented: true,
    timestamp: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION,
    preferences: verifiedPreferences,
  };

  if (typeof window !== "undefined") {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(COOKIE_CONSENT_KEY, serialized);

      // Write cookie with Secure and SameSite flags for edge/SSR awareness
      const expires = new Date();
      expires.setDate(expires.getDate() + COOKIE_CONSENT_MAX_AGE_DAYS);
      const isSecure = window.location.protocol === "https:";
      document.cookie = `${COOKIE_CONSENT_NAME}=${encodeURIComponent(serialized)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${isSecure ? "; Secure" : ""}`;

      // Clean up rejected cookies in real time
      cleanupRejectedCookies(verifiedPreferences);

      // Dispatch custom DOM event for immediate real-time listener updates
      window.dispatchEvent(
        new CustomEvent("cookieConsentUpdated", {
          detail: state,
        })
      );
    } catch {
      // Gracefully continue
    }
  }

  return state;
}

/**
 * Checks whether a specific cookie category is consented.
 */
export function hasCategoryConsent(category: CookieCategoryKey): boolean {
  if (category === "necessary") return true;
  const state = getStoredConsent();
  if (!state || !state.hasConsented) return false;
  return Boolean(state.preferences[category]);
}

