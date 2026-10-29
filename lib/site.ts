// Central site config.
export const site = {
  name: "HM Wealth",
  tagline: "AMFI-registered Mutual Fund Distributor",
  description:
    "HM Wealth is an AMFI-registered Mutual Fund Distributor offering mutual fund investments, SIPs, insurance and gold investments for families and business owners.",
  url: "https://hmwealth.in",
  arn: "ARN-341412",
  phone: "+91 96181 01040",
  phoneHref: "tel:+919618101040",
  whatsappHref: "https://wa.me/919618101040",
  email: "info@hmwealth.in",
  hours: "Mon – Fri: 9:30 AM – 6:30 PM | Sat: 10:00 AM – 2:00 PM (IST)",
  address: "Financial District, Gachibowli, Hyderabad, Telangana – 500032",
  founder: "Hari Sarvotham A",
};

// Shown in the navbar, adhering to SEBI/AMFI MFD nomenclature.
export const registrations = {
  lines: ["AMFI REGISTERED MUTUAL FUND DISTRIBUTOR", "AMFI REGISTERED SIF DISTRIBUTOR"],
  products: ["MUTUAL FUND", "INSURANCE"],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Investments", href: "/investments" },
  { label: "Insurance", href: "/insurance" },
  { label: "Calculators", href: "/calculators" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// Mandatory disclosures (AMFI / SEBI / IRDAI). Keep wording intact.
export const disclosures = {
  mfRisk: "Mutual Fund investments are subject to market risks, read all scheme related documents carefully.",
  distributor: `${site.name} is an AMFI-registered Mutual Fund Distributor (${site.arn}). We distribute mutual fund schemes and earn commission from Asset Management Companies. We are not a SEBI-registered Investment Adviser and do not provide investment advice.`,
  insurance: "Insurance products are offered through licensed insurance partners. Insurance is the subject matter of solicitation. Please read the sales brochure and policy wording carefully before concluding a sale. IRDAI does not sell insurance policies, announce bonuses or invest premiums; report spurious calls to the police.",
  illustration:
    "Calculator results are for illustration only and assume a constant rate of return. Past performance may or may not be sustained in the future and is not a guarantee of future returns. Tax benefits are subject to prevailing tax laws.",
};
