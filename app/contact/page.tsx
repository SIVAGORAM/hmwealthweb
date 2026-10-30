import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Headphones,
  Video,
  FileSearch,
  Building2,
  Car,
  Train,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Faq } from "@/components/sections/Faq";
import { Card, Container, IconBox, Section, SectionTitle } from "@/components/ui/kit";
import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { site } from "@/lib/site";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.contact);

const quickChannels = [
  {
    num: "01",
    icon: Phone,
    title: "Direct Phone",
    content: "Call our distribution desk directly for quick assistance.",
    actionLabel: "+91 96181 01040",
    href: site.phoneHref,
    tint: "mint",
    subtext: "Mon – Sat direct desk support",
  },
  {
    num: "02",
    icon: MessageCircle,
    title: "WhatsApp Chat",
    content: "Chat with us instantly on WhatsApp for quick queries.",
    actionLabel: "Chat on WhatsApp",
    href: site.whatsappHref,
    tint: "brand",
    isButton: true,
    subtext: "Fast response on WhatsApp",
  },
  {
    num: "03",
    icon: Mail,
    title: "Email Support",
    content: "Send us your queries, portfolio statements, or questions.",
    actionLabel: site.email,
    href: `mailto:${site.email}`,
    tint: "sky",
    subtext: "Prompt reply on all inquiries",
  },

];

const faqs = [
  {
    q: "Is the first consultation really free?",
    a: "Yes, 100% complimentary. We understand your goals, answer your questions, and explain your options with zero fees and no pressure.",
  },
  {
    q: "How quickly will someone contact me?",
    a: "Our team typically responds within 2 hours. Inquiries sent late evening are addressed first thing the next morning.",
  },
  {
    q: "I live in another city or abroad (NRI). Can we meet virtually?",
    a: "Absolutely. A large percentage of our clients connect via Google Meet, Zoom, or WhatsApp video call. Our entire onboarding and account setup is 100% digital and paperless.",
  },
  {
    q: "Can you audit my existing portfolio during the call?",
    a: "Yes, absolutely. Bring your Consolidated Account Statement (CAS) or insurance policy copies. We analyze overlapping funds, hidden costs, and underperforming assets with zero obligation to switch.",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mint/50 via-soft/60 to-white">
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Contact Us", item: "/contact" },
        ])}
      />
      {/* ======================================================================
          1. Hero Section (Top Banner)
          ====================================================================== */}
      <section className="relative isolate overflow-hidden border-b border-line/70 pb-2 pt-2 sm:pb-2.5 sm:pt-2.5">
        {/* Ambient atmospheric lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/15 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 -z-10 size-96 rounded-full bg-gold/15 blur-[110px]"
        />

        <Container>
          <div className="grid grid-cols-1 items-center gap-6 py-2 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="flex min-w-0 flex-col items-start text-left">
            {/* Small Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-white/90 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-brand shadow-xs backdrop-blur-md">
              <Sparkles className="size-3 text-brand" />
              GET IN TOUCH
            </span>

            {/* Main Heading */}
            <h1 className="mt-2 text-[30px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[40px] lg:text-[46px]">
              Let’s Plan Your Financial{" "}
              <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                Future Together.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-1.5 text-[15px] leading-relaxed text-body sm:text-[16.5px]">
              Have a question about starting an SIP, planning for retirement, or finding the right insurance cover? Our team is here to help with honest, friendly guidance.
            </p>

            {/* Confidence Callout */}
            <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 rounded-2xl border border-brand/20 bg-mint/60 px-4 py-2 text-xs font-bold text-ink shadow-2xs backdrop-blur-xs sm:text-[13px]">
              <span className="text-base">💡</span>
              <span>First consultations are always 100% free with zero sales pressure.</span>
            </div>

            {/* Social media */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand">Follow us</span>
              <SocialLinks />
            </div>
          </div>
          <div className="relative aspect-[1672/941] overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
            <ProtectedImage
              src="/images/pages/contact-get-in-touch.jpg"
              alt="Get in touch: a sunlit desk with a laptop, phone and notebook"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          2. 4 Quick Contact Channels (Top Cards Grid)
          ====================================================================== */}
      <section className="relative z-10 -mt-3 sm:-mt-4">
        <Container>
          <h2 className="sr-only">Direct Communication Channels</h2>
          <div className="m-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quickChannels.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.num}
                  className="group relative flex flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-hover"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-xl bg-mint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                        <Icon className="size-5" />
                      </span>
                      <span className="text-xs font-extrabold text-body/40">
                        {c.num}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-extrabold text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-body">
                      {c.content}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-line/60 pt-3">
                    {c.isButton ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-bold text-white shadow-2xs transition hover:bg-brand-dark"
                      >
                        <MessageCircle className="size-3.5" />
                        {c.actionLabel}
                      </a>
                    ) : (
                      <a
                        href={c.href}
                        className="inline-flex max-w-full items-center gap-1.5 text-xs font-extrabold text-brand transition hover:underline"
                      >
                        <span className="truncate">{c.actionLabel}</span>
                        <ArrowRight className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    )}
                    <span className="mt-1.5 block text-[10.5px] font-medium text-body/70">
                      {c.subtext}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Support Availability Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/80 bg-white/90 px-5 py-3 shadow-2xs backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-body">
              <Headphones className="size-4 text-brand" />
              <span>
                <strong className="text-ink">Support Availability:</strong> Dedicated client desk active Monday through Saturday.
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Desk Active
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          3 & 4. Main Section: Form (Left) + Why Connect With Us (Right)
          ====================================================================== */}
      <section className="py-5 sm:py-8">
        <Container>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
            {/* Interactive Contact & Lead Capture Form */}
            <div className="min-w-0">
              <ContactForm />
            </div>
            <div className="hidden flex-col gap-5 lg:flex">
              <div className="relative aspect-[740/575] overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
                <ProtectedImage
                  src="/images/pages/contact-laptop.jpg"
                  alt="Laptop showing a Contact Us page on a wooden desk"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* What happens next */}
              <div className="rounded-[28px] border border-line bg-[linear-gradient(150deg,#eef7f2_0%,#ffffff_60%,#fbf6ea_100%)] p-6 shadow-card">
                <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-brand">What happens next</p>
                <ol className="mt-4 flex flex-col gap-4">
                  {[
                    { t: "We call you back", d: "Our team reaches out on a working day, by call or WhatsApp." },
                    { t: "We understand your goal", d: "A short, friendly chat about what you want to achieve." },
                    { t: "We explain your options", d: "Clear choices with risks and costs. The decision is always yours." },
                  ].map((step, i) => (
                    <li key={step.t} className="flex gap-3.5">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-[13px] font-extrabold text-white tnum">{i + 1}</span>
                      <div>
                        <p className="text-[15px] font-extrabold text-ink">{step.t}</p>
                        <p className="mt-0.5 text-[13.5px] leading-relaxed text-body">{step.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[13px] font-semibold text-ink">
                  <ShieldCheck className="size-4 text-brand" />
                  First call is free. No obligation, no pressure.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          6. Quick Contact FAQs (Eliminating Hesitation)
          ====================================================================== */}
      <Section soft className="py-8 sm:py-12">
        <Container className="flex flex-col items-center gap-6 sm:gap-8">
          <SectionTitle
            badge="FAQ"
            title="Before You Reach Out"
            intro="Common questions about consultations, response times and NRI investing."
            center
          />
          <div className="w-full max-w-3xl">
            <Faq items={faqs} />
          </div>
        </Container>
      </Section>

      {/* ======================================================================
          7. Statutory Regulatory Footer Note
          ====================================================================== */}
      <section className="py-4 sm:py-6">
        <Container>
          <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-5 shrink-0 text-brand mt-0.5" />
              <div className="flex flex-col gap-1 text-xs leading-relaxed text-body">
                <span className="font-bold uppercase tracking-wider text-ink">
                  Disclosure
                </span>
                <p>
                  HM Wealth is an AMFI-registered Mutual Fund Distributor. Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future returns. We distribute mutual fund schemes and earn trail commissions from Asset Management Companies as per AMFI/SEBI norms.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
