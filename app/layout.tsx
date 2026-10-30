import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans/wght.css";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { site } from "@/lib/site";
import { getBaseUrl, SITE_CONFIG, toAbsoluteUrl } from "@/lib/seo";
import {
  JsonLd,
  getOrganizationSchema,
  getFinancialServiceSchema,
  getWebSiteSchema,
  getHcmSoftwareSchema,
} from "@/components/seo/json-ld";
import { GoogleAnalytics } from "@/components/seo/google-analytics";
import { CookieConsentProvider } from "@/components/consent/CookieConsentContext";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { CookiePreferencesModal } from "@/components/consent/CookiePreferencesModal";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "HM Wealth | AMFI-Registered Mutual Fund Distributor",
    template: `%s | ${site.name}`,
  },
  description:
    "Explore mutual funds, SIP investments and insurance with HM Wealth. Discover investment options and explore tools to help you understand your financial goals.",
  alternates: {
    canonical: toAbsoluteUrl("/"),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    siteName: "HM Wealth",
    title: "HM Wealth | AMFI-Registered Mutual Fund Distributor",
    description:
      "Explore mutual funds, SIP investments and insurance with HM Wealth. Discover investment options and explore tools to help you understand your financial goals.",
    url: toAbsoluteUrl("/"),
    locale: "en_IN",
    images: [
      {
        url: toAbsoluteUrl("/og-image.png"),
        secureUrl: toAbsoluteUrl("/og-image.png"),
        width: 600,
        height: 600,
        type: "image/png",
        alt: "HM Wealth Brand Icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "HM Wealth | AMFI-Registered Mutual Fund Distributor",
    description:
      "Explore mutual funds, SIP investments and insurance with HM Wealth.",
    images: [toAbsoluteUrl("/og-image.png")],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b7a55",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const globalSchemas = [
    getOrganizationSchema(),
    getFinancialServiceSchema(),
    getWebSiteSchema(),
    getHcmSoftwareSchema(),
  ];

  return (
    <html lang="en-IN" data-scroll-behavior="smooth">
      <head>
        <JsonLd data={globalSchemas} />
      </head>
      <body className="min-h-screen overflow-x-clip">
        <CookieConsentProvider>
          <GoogleAnalytics />
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
          <Navbar />
          <main id="main" className="overflow-x-clip">{children}</main>
          <Footer />
          <ChatWidget />
          <CookieConsentBanner />
          <CookiePreferencesModal />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
