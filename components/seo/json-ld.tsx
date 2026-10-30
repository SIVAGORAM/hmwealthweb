import type { ReactElement } from "react";
import { brandContent } from "@/lib/content";
import { SITE_CONFIG, toAbsoluteUrl } from "@/lib/seo";

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * JsonLd Component for React 19 & Next.js 16 App Router:
 * 1. Safely escapes '<' as '\\u003c' to prevent script injection / XSS.
 * 2. Emits standards-compliant <script type="application/ld+json"> for Googlebot and search crawlers.
 */
export function JsonLd({ data }: JsonLdProps): ReactElement {
  const jsonString = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
}

/**
 * Generates Schema.org Organization structured data.
 * Validated against Google Rich Results standards.
 */
export function getOrganizationSchema() {
  const orgUrl = toAbsoluteUrl("/");
  const logoUrl = brandContent.logo;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${orgUrl}#organization`,
    name: brandContent.name,
    legalName: brandContent.legalName,
    slogan: brandContent.slogan,
    url: orgUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
      width: 980,
      height: 191,
    },
    image: logoUrl,
    description: SITE_CONFIG.tagline,
    sameAs: brandContent.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: brandContent.phone,
        contactType: "customer service",
        email: brandContent.email,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Telugu"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: brandContent.address.streetAddress,
      addressLocality: brandContent.address.addressLocality,
      addressRegion: brandContent.address.addressRegion,
      postalCode: brandContent.address.postalCode,
      addressCountry: brandContent.address.addressCountry,
    },
  };
}

/**
 * Generates Schema.org LocalBusiness / FinancialService structured data for Local SEO in India.
 */
export function getFinancialServiceSchema() {
  const orgUrl = toAbsoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness"],
    "@id": `${orgUrl}#financial-service`,
    name: brandContent.name,
    legalName: brandContent.legalName,
    url: orgUrl,
    telephone: brandContent.phone,
    email: brandContent.email,
    image: brandContent.logo,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Direct AMC Bank Transfer, NetBanking, UPI (No cash accepted)",
    address: {
      "@type": "PostalAddress",
      streetAddress: brandContent.address.streetAddress,
      addressLocality: brandContent.address.addressLocality,
      addressRegion: brandContent.address.addressRegion,
      postalCode: brandContent.address.postalCode,
      addressCountry: brandContent.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.4156,
      longitude: 78.3478,
    },
    areaServed: [
      { "@type": "City", name: "Hyderabad" },
      { "@type": "AdministrativeArea", name: "Telangana" },
      { "@type": "Country", name: "India" },
    ],
  };
}

/**
 * Generates Schema.org WebSite structured data with Sitelinks SearchBox.
 */
export function getWebSiteSchema() {
  const siteUrl = toAbsoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: brandContent.name,
    description: SITE_CONFIG.tagline,
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: brandContent.name,
    },
    inLanguage: "en-IN",
  };
}

/**
 * Generates Schema.org SoftwareApplication structured data for HM Wealth tools.
 * Validated against Google Rich Results standards.
 */
export function getHcmSoftwareSchema() {
  const orgUrl = toAbsoluteUrl("/");
  const appUrl = toAbsoluteUrl("/calculators");

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${appUrl}#software`,
    name: brandContent.software.name,
    applicationCategory: brandContent.software.applicationCategory,
    operatingSystem: brandContent.software.operatingSystem,
    url: appUrl,
    description:
      "Interactive financial suite featuring SIP, Step-Up SIP, Lump Sum, Retirement, Child Education, and SWP calculators.",
    offers: {
      "@type": "Offer",
      price: brandContent.software.offers.price,
      priceCurrency: brandContent.software.offers.priceCurrency,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${orgUrl}#organization`,
      name: brandContent.name,
      url: orgUrl,
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Generates Schema.org BreadcrumbList structured data for rich snippet navigation paths.
 * Validated against Google Rich Results standards.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: toAbsoluteUrl(crumb.item),
    })),
  };
}

/**
 * Generates Schema.org FAQPage structured data matching visible FAQ content on the page.
 */
export function getFaqSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
