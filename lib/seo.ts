import type { Metadata } from "next";

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface RouteSeoConfig {
  title: string;
  description: string;
  path: string;
  priority?: number;
  changeFrequency?: ChangeFrequency;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

// 1. Central site configuration dynamically resolving active domain
// Testing URL: https://hmwealthweb-seven.vercel.app
// Production URL: https://hmwealth.in
export const PRODUCTION_URL = "https://hmwealth.in";
export const TESTING_URL = "https://hmwealthweb-seven.vercel.app";

export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  return TESTING_URL;
}

export const SITE_CONFIG = {
  url: getBaseUrl(),
  domain: getBaseUrl(),
  name: "HM Wealth",
  tagline: "AMFI-registered Mutual Fund Distributor",
  arn: "ARN-341412",
  locale: "en_IN",
  type: "website" as const,
  twitterCard: "summary" as const,
  defaultOgImage: {
    url: "/og-image.png",
    width: 600,
    height: 600,
    type: "image/png",
    alt: "HM Wealth Brand Icon",
  },
};

// 4. Strict trailing-slash normalization helpers for canonical and OpenGraph URLs
export function normalizeTrailingSlash(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === "/" || pathOrUrl === "") {
    return "/";
  }
  const [cleanPath] = pathOrUrl.split(/[?#]/);
  const leading = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  // Preserve static asset extensions (.png, .jpg, .svg, .xml, .txt, .ico, etc.)
  if (/\.[a-zA-Z0-9]+$/.test(leading)) {
    return leading;
  }
  return leading.endsWith("/") ? leading : `${leading}/`;
}

export function toAbsoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === "/") {
    return `${SITE_CONFIG.url}/`;
  }
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    try {
      const urlObj = new URL(pathOrUrl);
      urlObj.pathname = normalizeTrailingSlash(urlObj.pathname);
      return urlObj.toString();
    } catch {
      return pathOrUrl;
    }
  }
  return `${SITE_CONFIG.url}${normalizeTrailingSlash(pathOrUrl)}`;
}

// 2. Central registry mapping route paths to target titles, descriptions, priorities, and change frequencies
export const CORE_ROUTES_SEO = {
  home: {
    title: "HM Wealth | AMFI-Registered Mutual Fund Distributor",
    description:
      "Explore mutual funds, SIP investments and insurance with HM Wealth. Discover investment options and explore tools to help you understand your financial goals.",
    path: "/",
    priority: 1.0,
    changeFrequency: "daily" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "HM Wealth — Mutual Funds, SIP Investments and Insurance",
  },
  about: {
    title: "About HM Wealth | AMFI Mutual Fund Distributor ARN-341412",
    description:
      "Learn about HM Wealth, an AMFI-registered Mutual Fund Distributor based in Hyderabad, committed to ethical mutual fund distribution and insurance support.",
    path: "/about",
    priority: 0.8,
    changeFrequency: "monthly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "About HM Wealth — Mutual Funds, SIP Investments and Insurance",
  },
  calculators: {
    title: "Financial SIP & Wealth Calculators Online | HM Wealth",
    description:
      "Explore free SIP, step-up SIP, lump sum, retirement, child education, and SWP calculators. Accurate illustrations for informed mutual fund investment decisions.",
    path: "/calculators",
    priority: 0.9,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Financial SIP & Wealth Calculators Online — HM Wealth",
  },
  contact: {
    title: "Contact HM Wealth | Connect with Our Mutual Fund Desk",
    description:
      "Get in touch with HM Wealth for mutual fund distribution, SIP assistance, and insurance support. Reach us via direct phone, WhatsApp chat, or email inquiry.",
    path: "/contact",
    priority: 0.8,
    changeFrequency: "monthly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Contact HM Wealth Support Desk",
  },
  investments: {
    title: "Mutual Fund Schemes & Disciplined SIPs | HM Wealth",
    description:
      "Invest in equity, hybrid, and debt mutual funds through disciplined monthly SIPs or lump sum with transparent distributor support from HM Wealth ARN-341412.",
    path: "/investments",
    priority: 0.9,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Mutual Fund Investment Schemes and SIP Plans — HM Wealth",
  },
  insurance: {
    title: "Family & Business Insurance Protection | HM Wealth",
    description:
      "Facilitating term life, family health, motor, and commercial insurance coverage through licensed insurance partners with dedicated claims support assistance.",
    path: "/insurance",
    priority: 0.9,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Family and Business Insurance Protection — HM Wealth",
  },
  products: {
    title: "Investment & Insurance Products Catalog | HM Wealth",
    description:
      "Explore mutual funds, life insurance, health cover, motor insurance, and gold funds distributed by HM Wealth, an AMFI-registered distributor (ARN-341412).",
    path: "/products",
    priority: 0.8,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Investment and Insurance Products Catalog — HM Wealth",
  },
  productMutualFunds: {
    title: "Mutual Funds & SIP Distribution Services | HM Wealth",
    description:
      "Distributing equity, debt, and hybrid mutual fund schemes from leading AMCs. Start a monthly SIP or lump sum investment with transparent distributor guidance.",
    path: "/products/mutual-funds",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/mf-coin-jar.jpg",
    ogImageAlt: "A small plant growing from a jar of coins",
  },
  productLifeInsurance: {
    title: "Life Insurance & Term Protection Plans | HM Wealth",
    description:
      "Protect family financial security with pure term life insurance and critical illness riders facilitated through leading IRDAI-registered insurance partners.",
    path: "/products/life-insurance",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/life-parents-baby.jpg",
    ogImageAlt: "Indian parents smiling with their baby",
  },
  productHealthInsurance: {
    title: "Health & Medical Insurance Coverage Plans | HM Wealth",
    description:
      "Comprehensive individual and family floater health insurance policies with cashless hospitalisation and dedicated claims support from licensed insurers.",
    path: "/products/health-insurance",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/illustrations/health-family.svg",
    ogImageAlt: "Illustration of a family protected by a health shield",
  },
  productGeneralInsurance: {
    title: "General Insurance for Motor & Business | HM Wealth",
    description:
      "Protect your vehicles, business assets, property, and professional liabilities with general insurance policies facilitated through licensed insurance partners.",
    path: "/products/general-insurance",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/illustrations/general-cover.svg",
    ogImageAlt: "Illustration of a car and scooter under a protective umbrella",
  },
  services: {
    title: "Mutual Fund Distribution & Services Desk | HM Wealth",
    description:
      "Explore our mutual fund distribution, portfolio review assistance, retirement goal planning, NRI investor desk, and financial education initiatives.",
    path: "/services",
    priority: 0.8,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Mutual Fund Distribution and Client Guidance Services — HM Wealth",
  },
  serviceFinancialEducation: {
    title: "Financial Education & Investor Literacy | HM Wealth",
    description:
      "Empowering investors with plain-language financial education, SIP compounding principles, asset allocation basics, and risk management awareness in India.",
    path: "/services/financial-education",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/edu-couple-learning.jpg",
    ogImageAlt: "Young Indian couple learning about money on a laptop",
  },
  serviceInsurancePlanning: {
    title: "Insurance Planning & Policy Facilitation | HM Wealth",
    description:
      "Identify your family and business protection gaps. Evaluate adequate term life and health cover requirements facilitated through licensed insurance providers.",
    path: "/services/insurance-planning",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/ins-family-garden.jpg",
    ogImageAlt: "Three generations of an Indian family relaxing in their garden with their dog",
  },
  serviceWealthManagement: {
    title: "Wealth Distribution & Portfolio Tracking | HM Wealth",
    description:
      "Consolidate and track your family mutual fund investments with regular portfolio reviews, goal tracking, and transparent distribution support from HM Wealth.",
    path: "/services/wealth-management",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/inv-portfolio-laptop.jpg",
    ogImageAlt: "Laptop showing an investment portfolio dashboard on a sunlit desk",
  },
  serviceChildEducation: {
    title: "Child Education Planning & SIP Strategies | HM Wealth",
    description:
      "Calculate future higher education costs and build a disciplined mutual fund investment portfolio for your children through systematic monthly SIP investments.",
    path: "/services/child-education",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/child-family-study.jpg",
    ogImageAlt: "Indian parents helping their daughter study at home",
  },
  serviceRetirement: {
    title: "Retirement Planning & Corpus Distribution | HM Wealth",
    description:
      "Plan for a financially secure retirement. Distribute long-term mutual fund schemes and systematic withdrawal plans (SWP) to build a sustainable post-work life.",
    path: "/services/retirement",
    priority: 0.85,
    changeFrequency: "weekly" as ChangeFrequency,
    ogImage: "/images/pages/ret-fund-desk.jpg",
    ogImageAlt: "Retirement fund jar with coins, a planning notebook and a calculator on a desk",
  },
  importantLinks: {
    title: "Important Investor Links & Official Portals | HM Wealth",
    description:
      "Essential directory of official regulatory portals, RTAs, depositories, AMFI, SEBI, and investor services for Indian mutual fund and insurance investors.",
    path: "/important-links",
    priority: 0.6,
    changeFrequency: "monthly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Important Investor Links Directory — HM Wealth",
  },
  investorGrievance: {
    title: "Investor Grievance Redressal Mechanism | HM Wealth",
    description:
      "Structured three-tier grievance redressal procedure for HM Wealth clients: direct support desk, Compliance Officer escalation, and SEBI SCORES / SMART ODR.",
    path: "/investor-grievance",
    priority: 0.6,
    changeFrequency: "monthly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Investor Grievance Redressal Mechanism — HM Wealth",
  },
  riskFactors: {
    title: "Mandatory Statutory Investment Risk Factors | HM Wealth",
    description:
      "Comprehensive statutory risk disclosures covering mutual funds, market volatility, liquidity, credit risks, and regulatory guidelines for informed investors.",
    path: "/risk-factors",
    priority: 0.6,
    changeFrequency: "monthly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "Mandatory Statutory Investment Risk Factors — HM Wealth",
  },
  privacyPolicy: {
    title: "Privacy Policy & Investor Data Security | HM Wealth",
    description:
      "HM Wealth privacy policy outlining our stringent data protection standards, client confidentiality, zero-spam commitment, and secure financial records handling.",
    path: "/privacy-policy",
    priority: 0.4,
    changeFrequency: "yearly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "HM Wealth Privacy Policy and Data Security",
  },
  termsConditions: {
    title: "Terms & Conditions of Financial Services | HM Wealth",
    description:
      "Review HM Wealth terms of service, distribution scope, NAV transaction cutoff timings, distributor commission disclosures, and investor responsibilities.",
    path: "/terms-conditions",
    priority: 0.4,
    changeFrequency: "yearly" as ChangeFrequency,
    ogImage: "/og-image.png",
    ogImageAlt: "HM Wealth Terms and Conditions of Service",
  },
} as const satisfies Record<string, RouteSeoConfig>;

// Aliases for slug and path lookups
export const ROUTES_SEO = {
  ...CORE_ROUTES_SEO,
  // Slugs
  "mutual-funds": CORE_ROUTES_SEO.productMutualFunds,
  "life-insurance": CORE_ROUTES_SEO.productLifeInsurance,
  "health-insurance": CORE_ROUTES_SEO.productHealthInsurance,
  "general-insurance": CORE_ROUTES_SEO.productGeneralInsurance,
  "financial-education": CORE_ROUTES_SEO.serviceFinancialEducation,
  "insurance-planning": CORE_ROUTES_SEO.serviceInsurancePlanning,
  "wealth-management": CORE_ROUTES_SEO.serviceWealthManagement,
  "child-education": CORE_ROUTES_SEO.serviceChildEducation,
  retirement: CORE_ROUTES_SEO.serviceRetirement,
  // Path lookup aliases
  "/": CORE_ROUTES_SEO.home,
  "/about": CORE_ROUTES_SEO.about,
  "/calculators": CORE_ROUTES_SEO.calculators,
  "/contact": CORE_ROUTES_SEO.contact,
  "/investments": CORE_ROUTES_SEO.investments,
  "/insurance": CORE_ROUTES_SEO.insurance,
  "/products": CORE_ROUTES_SEO.products,
  "/products/mutual-funds": CORE_ROUTES_SEO.productMutualFunds,
  "/products/life-insurance": CORE_ROUTES_SEO.productLifeInsurance,
  "/products/health-insurance": CORE_ROUTES_SEO.productHealthInsurance,
  "/products/general-insurance": CORE_ROUTES_SEO.productGeneralInsurance,
  "/services": CORE_ROUTES_SEO.services,
  "/services/financial-education": CORE_ROUTES_SEO.serviceFinancialEducation,
  "/services/insurance-planning": CORE_ROUTES_SEO.serviceInsurancePlanning,
  "/services/wealth-management": CORE_ROUTES_SEO.serviceWealthManagement,
  "/services/child-education": CORE_ROUTES_SEO.serviceChildEducation,
  "/services/retirement": CORE_ROUTES_SEO.serviceRetirement,
  "/important-links": CORE_ROUTES_SEO.importantLinks,
  "/investor-grievance": CORE_ROUTES_SEO.investorGrievance,
  "/risk-factors": CORE_ROUTES_SEO.riskFactors,
  "/privacy-policy": CORE_ROUTES_SEO.privacyPolicy,
  "/terms-conditions": CORE_ROUTES_SEO.termsConditions,
};

export type RouteKey = keyof typeof ROUTES_SEO;

export function getRouteSeo(keyOrPath: string): RouteSeoConfig | undefined {
  if (keyOrPath in ROUTES_SEO) {
    return ROUTES_SEO[keyOrPath as RouteKey];
  }
  const normalized = keyOrPath.startsWith("/") ? keyOrPath : `/${keyOrPath}`;
  const trimmed = normalized.replace(/\/+$/, "") || "/";
  if (trimmed in ROUTES_SEO) {
    return ROUTES_SEO[trimmed as RouteKey];
  }
  return undefined;
}

// 3. Centralized metadata constructor returning Next.js Metadata type
export function constructMetadata(config: RouteSeoConfig): Metadata {
  const baseUrl = getBaseUrl();
  const canonicalUrl = toAbsoluteUrl(config.path);
  const ogImageRel = config.ogImage ?? SITE_CONFIG.defaultOgImage.url;
  const ogImageUrl = toAbsoluteUrl(ogImageRel);
  const ogImageAlt = config.ogImageAlt ?? SITE_CONFIG.defaultOgImage.alt;
  const isNoIndex = Boolean(config.noIndex);
  const isPng = ogImageUrl.endsWith(".png");

  return {
    metadataBase: new URL(baseUrl),
    title: { absolute: config.title },
    description: config.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: config.ogType ?? SITE_CONFIG.type,
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: 600,
          height: 600,
          type: isPng ? "image/png" : "image/jpeg",
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: SITE_CONFIG.twitterCard,
      site: "@HM_Wealth",
      creator: "@HM_Wealth",
      title: config.title,
      description:
        config.path === "/"
          ? "Explore mutual funds, SIP investments and insurance with HM Wealth."
          : config.description,
      images: [ogImageUrl],
    },
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
      googleBot: {
        index: !isNoIndex,
        follow: !isNoIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
