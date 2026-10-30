import { site } from "@/lib/site";
import { SITE_CONFIG, toAbsoluteUrl } from "@/lib/seo";

export const brandContent = {
  name: site.name,
  legalName: "HM Wealth Financial Services",
  slogan: "Helps You Manage & Multiply",
  tagline: site.tagline,
  arn: site.arn,
  url: SITE_CONFIG.url,
  logo: toAbsoluteUrl("/images/brand/hm-wealth-logo.png"),
  email: site.email,
  phone: site.phone,
  hours: site.hours,
  address: {
    streetAddress: "Financial District, Gachibowli",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    postalCode: "500032",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/hm-wealth",
    "https://twitter.com/hmwealth",
    "https://www.facebook.com/hmwealthindia",
    "https://www.instagram.com/hmwealth",
  ],
  software: {
    name: "HM Wealth Studio & Financial Calculators",
    operatingSystem: "All (Web Browser, iOS, Android, Windows, macOS)",
    applicationCategory: "FinanceApplication",
    offers: {
      price: "0",
      priceCurrency: "INR",
    },
  },
};

export { site };

