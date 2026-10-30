// Products & Services: content for the navbar dropdowns and the /products/* and /services/* pages.
// Based on the client's content, rewritten for an AMFI-registered Mutual Fund Distributor:
// educational and distribution language only, no advice, no return promises, no "best" or "guaranteed" claims.
// Photos: Unsplash (https://unsplash.com/license) and Pexels (https://www.pexels.com/license/), both free for commercial use. Illustrations: drawn for HM Wealth.
import type { LucideIcon } from "lucide-react";
import { PiggyBank, ShieldCheck, HeartPulse, Car, BookOpen, Umbrella, Briefcase, GraduationCap, Sunset } from "lucide-react";
import type { Tint } from "@/components/ui/kit";

export type Visual = { src: string; alt: string; art?: boolean; pos?: string };
export type Block = { title: string; paras?: string[]; bullets?: string[]; visual?: Visual };
export type Card = { title: string; text: string; bullets?: string[]; visual: Visual };

export type Offering = {
  group: "products" | "services";
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  menu: string; // one line under the title in the dropdown
  icon: LucideIcon;
  tint: Tint;
  hero: Visual;
  headline: string;
  intro: string;
  blocks: Block[];
  cards?: { title: string; items: Card[] };
  note: "mf" | "insurance" | "education";
  cta: string;
};

const p = (name: string, alt: string, pos?: string): Visual => ({ src: `/images/pages/${name}.jpg`, alt, pos });
const art = (name: string, alt: string): Visual => ({ src: `/images/illustrations/${name}.svg`, alt, art: true });

export const products: Offering[] = [
  {
    group: "products",
    slug: "mutual-funds",
    title: "Mutual Funds",
    seoTitle: "Mutual Funds & SIP Distribution Services | HM Wealth",
    seoDescription:
      "Distributing equity, debt, and hybrid mutual fund schemes from leading AMCs. Start a monthly SIP or lump sum investment with transparent distributor guidance.",
    menu: "SIP and lump sum investing",
    icon: PiggyBank,
    tint: "green",
    hero: p("mf-coin-jar", "A small plant growing from a jar of coins", "50% 60%"),
    headline: "Mutual Funds",
    intro: "A simple, regulated way to invest in a diversified portfolio, through SIP or lump sum.",
    blocks: [
      {
        title: "What is a mutual fund?",
        paras: [
          "A mutual fund collects money from many investors and invests it in a diversified portfolio of securities such as equities, bonds, government securities and money-market instruments, as per the scheme’s investment objective.",
          "The fund is managed by an Asset Management Company (AMC). Investors receive units that represent their share of the fund, and the value of each unit is called the Net Asset Value (NAV).",
          "In India, mutual funds are regulated by SEBI, while AMFI promotes industry standards and investor awareness.",
        ],
        visual: p("mf-hands-coins", "Hands holding coins with a young plant", "50% 50%"),
      },
      {
        title: "Why investors choose mutual funds",
        bullets: ["Diversification across many securities", "Professional management by the AMC", "Liquidity in open-ended schemes", "Transparency with daily NAV and regular disclosures", "Regulated by SEBI"],
      },
    ],
    note: "mf",
    cta: "Want to start your SIP?",
  },
  {
    group: "products",
    slug: "life-insurance",
    title: "Life Insurance",
    seoTitle: "Life Insurance & Term Protection Plans | HM Wealth",
    seoDescription:
      "Protect family financial security with pure term life insurance and critical illness riders facilitated through leading IRDAI-registered insurance partners.",
    menu: "Term and family protection plans",
    icon: ShieldCheck,
    tint: "sky",
    hero: p("life-parents-baby", "Indian parents smiling with their baby", "50% 35%"),
    headline: "Life Insurance",
    intro: "Financial security for your family if something unexpected happens to you.",
    blocks: [
      {
        title: "What is life insurance?",
        paras: [
          "Life insurance protects your family from financial loss caused by the unexpected or early death of the insured person.",
          "You pay a premium to the insurance company. In return, the insurer promises to pay an agreed sum to your nominee or legal heir if the insured person passes away during the policy term. The amount depends on the plan, the cover chosen and the policy terms.",
          "Talk to us to understand life insurance options for you and your family.",
        ],
        visual: p("life-father-daughter", "Father lifting his happy young daughter", "50% 35%"),
      },
    ],
    note: "insurance",
    cta: "Want to secure your family’s future?",
  },
  {
    group: "products",
    slug: "health-insurance",
    title: "Health Insurance",
    seoTitle: "Health & Medical Insurance Coverage Plans | HM Wealth",
    seoDescription:
      "Comprehensive individual and family floater health insurance policies with cashless hospitalisation and dedicated claims support from licensed insurers.",
    menu: "Mediclaim and critical illness cover",
    icon: HeartPulse,
    tint: "peach",
    hero: art("health-family", "Illustration of a family protected by a health shield"),
    headline: "Health Insurance",
    intro: "Protection from medical emergencies and hospitalisation expenses, so your savings stay safe.",
    blocks: [
      {
        title: "What is health insurance?",
        paras: [
          "Health insurance, also called a mediclaim policy, protects you from medical emergencies and the hospitalisation expenses that come with them. In today’s busy life, every family should have one.",
          "Plans offer cashless treatment at network hospitals or reimbursement, and some plans include international treatment, a doctor’s second opinion and a yearly health check-up at panel centres, as per policy terms.",
          "Critical illness cover works differently: it pays a fixed lump sum if you are diagnosed with a covered serious illness, much like you insure your car or home.",
        ],
        visual: art("health-claim", "Illustration of a health insurance policy with a stethoscope"),
      },
      {
        title: "Why is a mediclaim policy needed?",
        bullets: [
          "Everyone faces illness or injury at some point in life",
          "Medical emergencies can come anytime, without warning",
          "Quality private hospital treatment can be expensive",
          "Doctor’s fees, diagnostic tests and medicines keep getting costlier",
          "Without cover, medical bills come out of savings meant for your other goals",
        ],
      },
      {
        title: "When should you take it?",
        paras: [
          "Preferably at a young age, but better late than never. Premiums tend to increase with age, and many insurers give a no-claim bonus for every year without a claim. Premiums may also qualify for tax benefit under Section 80D, as per prevailing tax laws.",
        ],
      },
    ],
    note: "insurance",
    cta: "Need help choosing health cover?",
  },
  {
    group: "products",
    slug: "general-insurance",
    title: "General Insurance",
    seoTitle: "General Insurance for Motor & Business | HM Wealth",
    seoDescription:
      "Protect your vehicles, business assets, property, and professional liabilities with general insurance policies facilitated through licensed insurance partners.",
    menu: "Motor, travel, fire and shop cover",
    icon: Car,
    tint: "gold",
    hero: art("general-cover", "Illustration of a car and scooter under a protective umbrella"),
    headline: "General Insurance",
    intro: "Cover for your vehicle, travel, health emergencies, property and business.",
    blocks: [],
    cards: {
      title: "Types of general insurance",
      items: [
        {
          title: "Motor Insurance",
          text: "For cars and two-wheelers.",
          bullets: [
            "Protection from financial loss due to loss of or damage to your vehicle",
            "Cover for your liability to third parties for injury, death or property damage",
            "Cashless and hassle-free claims at network garages",
          ],
          visual: art("motor", "Illustration of a car with a protection shield"),
        },
        {
          title: "Travel Insurance",
          text: "International travel is exciting, but it is also expensive. An unexpected event on your trip, like a medical emergency, lost baggage or a delay, can strain your budget. Travel insurance helps cover these costs, as per policy terms.",
          visual: art("travel", "Illustration of a suitcase, aeroplane and location pin"),
        },
        {
          title: "Critical Illness Insurance",
          text: "Critical illnesses are severe conditions that need long medical care, in hospital or at home, so treatment usually costs much more. This cover pays a lump sum on diagnosis of a covered illness.",
          visual: art("critical-illness", "Illustration of a heart with a pulse line and medical kit"),
        },
        {
          title: "Fire Insurance",
          text: "For property owners and anyone with a financial interest in a property. It can cover buildings, plant and machinery, furniture, fixtures, stock and other contents, including goods held in trust and machinery temporarily away for repairs.",
          visual: art("fire", "Illustration of a house with a protection shield"),
        },
        {
          title: "Shop Insurance",
          text: "A package cover for shop owners against risks like fire, theft, employee dishonesty, breakage of glass and signboards, and money in transit, at the counter or in the safe.",
          visual: art("shop", "Illustration of a shop with a protection shield"),
        },
      ],
    },
    note: "insurance",
    cta: "Need cover for your vehicle, home or shop?",
  },
];

export const services: Offering[] = [
  {
    group: "services",
    slug: "financial-education",
    title: "Financial Education",
    seoTitle: "Financial Education & Investor Literacy | HM Wealth",
    seoDescription:
      "Empowering investors with plain-language financial education, SIP compounding principles, asset allocation basics, and risk management awareness in India.",
    menu: "Learn to manage money with confidence",
    icon: BookOpen,
    tint: "lilac",
    hero: p("edu-couple-learning", "Young Indian couple learning about money on a laptop", "50% 35%"),
    headline: "Financial Education",
    intro: "The knowledge and skills to manage money wisely, explained in plain language.",
    blocks: [
      {
        title: "What is financial education?",
        paras: [
          "Financial education is the knowledge and skills needed to manage money wisely. It helps people understand how to earn, save, spend, invest, borrow and protect money effectively.",
          "With financial education, you can make informed decisions, avoid unnecessary debt, plan for future goals, handle emergencies and build long-term financial security. It plays a key role in reducing financial stress and improving overall quality of life.",
        ],
        visual: p("edu-coins-plants", "Stacks of coins with small plants growing", "50% 55%"),
      },
      {
        title: "What we talk about",
        bullets: ["Budgeting, saving and emergency funds", "How mutual funds, SIPs and NAV work", "Basics of life, health and general insurance", "Using loans and credit cards wisely"],
      },
    ],
    note: "education",
    cta: "Want a session for your family or team?",
  },
  {
    group: "services",
    slug: "insurance-planning",
    title: "Insurance Planning",
    seoTitle: "Insurance Planning & Policy Facilitation | HM Wealth",
    seoDescription:
      "Identify your family and business protection gaps. Evaluate adequate term life and health cover requirements facilitated through licensed insurance providers.",
    menu: "Review and organise your family’s cover",
    icon: Umbrella,
    tint: "sky",
    hero: p("ins-family-garden", "Three generations of an Indian family relaxing in their garden with their dog", "50% 40%"),
    headline: "Insurance Planning",
    intro: "Protect yourself, your family, your home, your assets and your business against unexpected events.",
    blocks: [
      {
        title: "Why insurance planning matters",
        paras: [
          "Insurance is a contract where the insurer agrees to pay the insured a certain sum when a covered event happens. It is a protective step that gives peace of mind.",
          "The idea is simple: many people contribute to a common fund that helps individuals recover from an unexpected loss. In this way, insurance eases the financial burden when something goes wrong.",
          "We work with you to understand your risks and explain cost-effective cover options that suit your circumstances.",
        ],
        visual: p("ins-advisor-family", "Indian family going through an insurance plan with an advisor at home", "42% 50%"),
      },
      {
        title: "Insurance we help you with",
        bullets: ["Life", "Health", "Personal accident", "Child cover"],
      },
      {
        title: "Already have policies?",
        paras: [
          "Both over-insuring and under-insuring can be costly. We review your existing policies with you, so you understand whether your cover is adequate for risks like loss of income, critical illness or disability.",
          "Remember, insurance is mainly for protection, not an investment. Keeping the two separate helps you plan both better.",
        ],
      },
    ],
    note: "insurance",
    cta: "Want a free review of your policies?",
  },
  {
    group: "services",
    slug: "wealth-management",
    title: "Wealth Management",
    seoTitle: "Wealth Distribution & Portfolio Tracking | HM Wealth",
    seoDescription:
      "Consolidate and track your family mutual fund investments with regular portfolio reviews, goal tracking, and transparent distribution support from HM Wealth.",
    menu: "Your investments organised and reviewed",
    icon: Briefcase,
    tint: "green",
    hero: p("inv-portfolio-laptop", "Laptop showing an investment portfolio dashboard on a sunlit desk", "50% 55%"),
    headline: "Wealth Management",
    intro: "Grow, protect and keep track of your family’s wealth in one place, with simple yearly reviews.",
    blocks: [
      {
        title: "What is wealth management at HM Wealth?",
        paras: [
          "Wealth management means looking after your money as a whole: investing for your goals, protecting your family with the right insurance, and reviewing everything regularly so you stay on track.",
          "As an AMFI-registered Mutual Fund Distributor, we help you invest in mutual fund schemes, arrange insurance through licensed insurers, and keep all of it organised in one place. We explain options with their risks and costs, and the final decision is always yours.",
          "Your units are held in your own name with the fund house, and HM Wealth never holds your money. We are not a SEBI-registered Investment Adviser or Portfolio Manager and do not provide investment advice.",
        ],
        visual: p("inv-statement-review", "Hands reviewing an investment statement with charts at a desk", "50% 50%"),
      },
      {
        title: "What we help you with",
        bullets: ["Investing for each goal through SIP or lump sum", "Life and health cover to protect your family", "Paperless KYC and nominee updates", "Starting, pausing or stepping up SIPs", "Consolidated statements and capital gains reports", "A yearly review of progress towards your goals"],
      },
    ],
    note: "mf",
    cta: "Want your family’s wealth organised in one place?",
  },
  {
    group: "services",
    slug: "child-education",
    title: "Child Education Goals",
    seoTitle: "Child Education Planning & SIP Strategies | HM Wealth",
    seoDescription:
      "Calculate future higher education costs and build a disciplined mutual fund investment portfolio for your children through systematic monthly SIP investments.",
    menu: "Prepare for school and college costs",
    icon: GraduationCap,
    tint: "gold",
    hero: p("child-family-study", "Indian parents helping their daughter study at home", "52% 40%"),
    headline: "Child Education Goals",
    intro: "Understand the real cost of your child’s education, and prepare for it step by step.",
    blocks: [
      {
        title: "Your child’s biggest milestone",
        paras: [
          "For most parents, a good education is the most valuable thing they can give their child. But education costs keep rising every year, so preparing early has become a necessity.",
          "The ways previous generations saved may not work for today’s costs. We help you understand how to calculate the inflation-adjusted cost of courses in India and abroad, and how early, regular saving can meet this goal without straining your household budget.",
        ],
        visual: p("child-dream-steps", "Young girl dreaming of her future, with book steps leading to graduation", "50% 50%"),
      },
      {
        title: "What we work through together",
        bullets: ["Today’s cost of the course you have in mind", "Years left until admission", "Estimated future cost, adjusted for inflation", "A monthly saving amount you are comfortable with"],
      },
    ],
    note: "mf",
    cta: "Want to prepare for your child’s education?",
  },
  {
    group: "services",
    slug: "retirement",
    title: "Retirement Goals",
    seoTitle: "Retirement Planning & Corpus Distribution | HM Wealth",
    seoDescription:
      "Plan for a financially secure retirement. Distribute long-term mutual fund schemes and systematic withdrawal plans (SWP) to build a sustainable post-work life.",
    menu: "Build savings for a calm retirement",
    icon: Sunset,
    tint: "peach",
    hero: p("ret-fund-desk", "Retirement fund jar with coins, a planning notebook and a calculator on a desk", "62% 50%"),
    headline: "Retirement Goals",
    intro: "Work out what you may need after you stop working, and start preparing in simple steps.",
    blocks: [
      {
        title: "Why retirement needs preparation",
        paras: [
          "After retirement the salary stops, but expenses continue and keep rising with inflation. With people living longer, savings may need to last 20 to 30 years.",
          "We help you estimate the retirement corpus you may need using simple calculations, explain mutual fund and insurance options with their risks, and set up regular investing. Closer to retirement, we can explain options like a Systematic Withdrawal Plan (SWP) for a regular income.",
        ],
        visual: p("ret-sunset-couple", "Senior couple sitting together watching the sunset over a lake", "28% 50%"),
      },
      {
        title: "What we look at",
        bullets: ["Your current monthly expenses", "Years left until retirement", "Health cover for later years", "Ways to draw a regular income after retirement"],
      },
    ],
    note: "mf",
    cta: "Want to prepare for retirement?",
  },
];

export const offerings = [...products, ...services];
export const findOffering = (group: Offering["group"], slug: string) =>
  offerings.find((o) => o.group === group && o.slug === slug);
export const offeringHref = (o: Pick<Offering, "group" | "slug">) => `/${o.group}/${o.slug}`;
