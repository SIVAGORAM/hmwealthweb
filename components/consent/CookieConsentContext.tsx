"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import {
  DEFAULT_PREFERENCES,
  ACCEPT_ALL_PREFERENCES,
  REJECT_OPTIONAL_PREFERENCES,
  getStoredConsent,
  setStoredConsent,
  type CookieCategoryKey,
  type CookieConsentPreferences,
  type CookieConsentState,
} from "@/lib/cookie-consent";

interface CookieConsentContextValue {
  preferences: CookieConsentPreferences;
  hasConsented: boolean;
  isBannerVisible: boolean;
  isModalOpen: boolean;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (updated: Partial<CookieConsentPreferences>) => void;
  openPreferencesModal: () => void;
  closePreferencesModal: () => void;
  hasCategory: (category: CookieCategoryKey) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(DEFAULT_PREFERENCES);
  const [hasConsented, setHasConsented] = useState<boolean>(false);
  const [isBannerVisible, setIsBannerVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Initialize consent state after mount to avoid SSR hydration mismatches
  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (stored && stored.hasConsented) {
      setPreferences(stored.preferences);
      setHasConsented(true);
      setIsBannerVisible(false);
    } else {
      // First-time visitor or consent not yet recorded: reveal banner
      setIsBannerVisible(true);
    }

    // Listen for custom events dispatched from other tabs or scripts
    const handleConsentEvent = (e: Event) => {
      const customEvent = e as CustomEvent<CookieConsentState>;
      if (customEvent.detail && customEvent.detail.preferences) {
        setPreferences(customEvent.detail.preferences);
        setHasConsented(true);
      }
    };

    window.addEventListener("cookieConsentUpdated", handleConsentEvent);
    return () => window.removeEventListener("cookieConsentUpdated", handleConsentEvent);
  }, []);

  const acceptAll = useCallback(() => {
    const newState = setStoredConsent(ACCEPT_ALL_PREFERENCES);
    setPreferences(newState.preferences);
    setHasConsented(true);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, []);

  const rejectOptional = useCallback(() => {
    const newState = setStoredConsent(REJECT_OPTIONAL_PREFERENCES);
    setPreferences(newState.preferences);
    setHasConsented(true);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  }, []);

  const savePreferences = useCallback(
    (updated: Partial<CookieConsentPreferences>) => {
      const finalPrefs: CookieConsentPreferences = {
        ...preferences,
        ...updated,
        necessary: true, // Always enforce necessary
      };
      const newState = setStoredConsent(finalPrefs);
      setPreferences(newState.preferences);
      setHasConsented(true);
      setIsBannerVisible(false);
      setIsModalOpen(false);
    },
    [preferences]
  );

  const openPreferencesModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closePreferencesModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const hasCategory = useCallback(
    (category: CookieCategoryKey) => {
      if (category === "necessary") return true;
      if (!hasConsented) return false;
      return Boolean(preferences[category]);
    },
    [hasConsented, preferences]
  );

  const value = useMemo(
    () => ({
      preferences,
      hasConsented,
      isBannerVisible: mounted ? isBannerVisible : false,
      isModalOpen,
      acceptAll,
      rejectOptional,
      savePreferences,
      openPreferencesModal,
      closePreferencesModal,
      hasCategory,
    }),
    [
      preferences,
      hasConsented,
      mounted,
      isBannerVisible,
      isModalOpen,
      acceptAll,
      rejectOptional,
      savePreferences,
      openPreferencesModal,
      closePreferencesModal,
      hasCategory,
    ]
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used within a CookieConsentProvider");
  }
  return context;
}

