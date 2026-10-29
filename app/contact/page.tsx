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
import { Faq } from "@/components/sections/Faq";
import { Card, Container, IconBox, Section, SectionTitle } from "@/components/ui/kit";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact HM Wealth | Book a Free Financial Consultation",
  description:
    "Have questions about mutual funds, SIPs, or insurance? Contact HM Wealth. Call, WhatsApp, email, or visit our office for honest, personalized financial guidance.",
};

const quickChannels = [
  {
    num: "01",
    icon: Phone,
    title: "Direct Phone",
    content: "Call our distribution desk directly for quick assistance.",
    actionLabel: "+91 96181 01040",
    href: site.phoneHref,
    tint: "mint",
    subtext: "Mon – Sat during business hours",
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
    subtext: "Typically replies in under 15 mins",
  },
  {
    num: "03",
    icon: Mail,
    title: "Email Support",
    content: "Send us your queries, portfolio statements, or questions.",
    actionLabel: site.email,
    href: `mailto:${site.email}`,
    tint: "sky",
    subtext: "Replies within 2 business hours",
  },
  {
    num: "04",
    icon: MapPin,
    title: "Office Address",
    content: "Visit our office for an in-person consultation.",
    actionLabel: "View on Google Maps",
    href: "#office-map",
    tint: "peach",
    subtext: "Financial District, Hyderabad",
  },
];

const faqs = [
  {
    q: "Is the first consultation really free?",
    a: "Yes, 100% complimentary. We understand your goals, answer your questions, and explain your options with zero fees and no pressure.",
  },
  {
    q: "How quickly will someone contact me?",
    a: "If you reach out during business hours (9:30 AM – 6:30 PM), our team responds within 2 hours. Outside of hours, we connect the next morning.",
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
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
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
          </div>
        </Container>
      </section>

      {/* ======================================================================
          2. 4 Quick Contact Channels (Top Cards Grid)
          ====================================================================== */}
      <section className="relative z-10 -mt-3 sm:-mt-4">
        <Container>
          <div className="m-rail grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Working Hours Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/80 bg-white/90 px-5 py-3 shadow-2xs backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-body">
              <Clock className="size-4 text-brand" />
              <span>
                <strong className="text-ink">Working Hours:</strong> Monday – Friday: 9:30 AM to 6:30 PM | Saturday: 10:00 AM to 2:00 PM (IST)
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Desk Active Now
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          3 & 4. Main Section: Form (Left) + Why Connect With Us (Right)
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12 items-start">
            {/* Left Side (7 cols): Interactive Contact & Lead Capture Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Right Side (5 cols): Why Connect With Us? */}
            <div className="flex flex-col gap-4 lg:col-span-5">
              {/* Expectations Card */}
              <div className="rounded-[28px] border border-line bg-white p-5 shadow-card sm:p-6">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-bold text-brand">
                  <ShieldCheck className="size-3.5" />
                  What to Expect
                </span>
                <h3 className="mt-2.5 text-xl font-extrabold text-ink sm:text-2xl">
                  Why Connect With Us?
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-body">
                  When you reach out to HM Wealth, here is the transparent experience you can count on:
                </p>

                <div className="mt-4 flex flex-col gap-3">
                  {/* Point 1 */}
                  <div className="flex items-start gap-3 rounded-2xl border border-line/60 bg-soft/40 p-3.5 transition-colors hover:bg-soft">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-2xs">
                      <Headphones className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-ink">
                        No Robotic Call Centers
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-body">
                        You speak directly to an experienced AMFI-registered mutual fund distributor who takes time to understand your life goals.
                      </p>
                    </div>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-start gap-3 rounded-2xl border border-line/60 bg-soft/40 p-3.5 transition-colors hover:bg-soft">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sky text-sky-ink shadow-2xs">
                      <Video className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-ink">
                        Online or In-Person
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-body">
                        We can meet in person at our office or over a convenient 20-minute Zoom, Google Meet, or WhatsApp video call.
                      </p>
                    </div>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-start gap-3 rounded-2xl border border-line/60 bg-soft/40 p-3.5 transition-colors hover:bg-soft">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-peach text-peach-ink shadow-2xs">
                      <FileSearch className="size-4" />
                    </span>
                    <div>
                      <h4 className="text-[13.5px] font-bold text-ink">
                        Portfolio Second Opinion
                      </h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-body">
                        Bring your existing insurance policies or mutual funds—we’ll give you an honest review with zero obligation to switch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Founder & AMFI Trust Card */}
              <div className="relative isolate overflow-hidden rounded-[28px] border border-white/20 bg-gradient-to-br from-[#021f15] via-[#053b2a] to-[#04261c] p-5 text-white shadow-card sm:p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 -z-10 size-48 rounded-full bg-[#19c38a]/20 blur-[60px]"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                    Regulated &amp; Verified
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-bold text-[#7ff0c4] ring-1 ring-white/15">
                    <ShieldCheck className="size-3 text-gold" />
                    AMFI Registered
                  </span>
                </div>

                <div className="mt-3">
                  <p className="text-xs text-white/70">AMFI MFD Registration</p>
                  <p className="mt-0.5 text-2xl font-extrabold tracking-tight text-white tnum">
                    {site.arn}
                  </p>
                </div>

                <div className="mt-4 flex flex-col gap-2 border-t border-white/15 pt-3 text-xs text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/60">Distribution Desk Lead:</span>
                    <span className="font-bold text-white">{site.founder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Direct Mobile:</span>
                    <a href={site.phoneHref} className="font-bold text-emerald-300 hover:underline">
                      {site.phone}
                    </a>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Official Email:</span>
                    <a href={`mailto:${site.email}`} className="font-bold text-emerald-300 hover:underline">
                      {site.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          5. Office Location & Interactive Map
          ====================================================================== */}
      <section id="office-map" className="py-1.5 border-t border-line/60 bg-white sm:py-2">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-3 py-1 text-xs font-bold text-brand">
              <Building2 className="size-3.5" />
              IN-PERSON CONSULTATIONS
            </span>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink sm:text-[30px]">
              Visit Our Office
            </h2>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-body">
              Prefer an in-person discussion? We welcome you to visit our office for a personalized face-to-face portfolio session.
            </p>
          </div>

          <div className="mt-2 sm:mt-2.5 grid gap-4 lg:grid-cols-12 items-stretch">
            {/* Map Frame (7 cols) */}
            <div className="relative overflow-hidden rounded-[28px] border border-line shadow-card min-h-[340px] lg:col-span-7">
              <iframe
                title="HM Wealth Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.6644485542287!2d78.33789497516584!3d17.427863583466175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb93f54d6e901b%3A0xb35a703d2745a909!2sFinancial%20District%2C%20Nanakramguda%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="h-full w-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Clear Directions Card (5 cols) */}
            <div className="flex flex-col justify-between rounded-[28px] border border-line bg-soft/50 p-6 shadow-card sm:p-8 lg:col-span-5">
              <div>
                <span className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-extrabold text-brand shadow-xs">
                  <MapPin className="size-3.5" />
                  Headquarters
                </span>
                <h3 className="mt-3 text-xl font-extrabold text-ink">
                  HM Wealth
                </h3>
                <p className="mt-1 text-xs font-semibold text-brand">
                  AMFI Registered Mutual Fund Distributor (ARN-341412)
                </p>

                <div className="mt-4 flex flex-col gap-1 text-[13.5px] leading-relaxed text-body">
                  <p className="font-bold text-ink">Office Suite, Financial District</p>
                  <p>Gachibowli / Nanakramguda</p>
                  <p>Hyderabad, Telangana – 500032</p>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-line/70 pt-4">
                  <div className="flex items-start gap-3 text-xs text-body">
                    <Train className="size-4 shrink-0 text-brand mt-0.5" />
                    <div>
                      <strong className="text-ink">Metro Connectivity:</strong> Accessible via Raidurg Metro Station (Blue Line) with convenient cab and shuttle connectivity.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-body">
                    <Car className="size-4 shrink-0 text-brand mt-0.5" />
                    <div>
                      <strong className="text-ink">Visitor Parking:</strong> Dedicated visitor parking space available inside the office complex.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-line/70">
                <a
                  href="https://maps.google.com/?q=Financial+District+Gachibowli+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white border border-line py-2.5 text-xs font-bold text-ink shadow-2xs transition hover:border-brand hover:text-brand"
                >
                  <ExternalLink className="size-3.5" />
                  Open in Google Maps App
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ======================================================================
          6. Quick Contact FAQs (Eliminating Hesitation)
          ====================================================================== */}
      <Section soft>
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr]">
          <SectionTitle
            badge="FAQ"
            title="Before You Reach Out"
            intro="Common questions regarding consultations, turnaround times, and NRI onboarding."
          />
          <Faq items={faqs} />
        </Container>
      </Section>

      {/* ======================================================================
          7. Statutory Regulatory Footer Note
          ====================================================================== */}
      <section className="py-1.5 sm:py-2">
        <Container>
          <div className="rounded-2xl border border-line/80 bg-white p-5 shadow-xs sm:p-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="size-5 shrink-0 text-brand mt-0.5" />
              <div className="flex flex-col gap-1 text-xs leading-relaxed text-body">
                <span className="font-bold uppercase tracking-wider text-ink">
                  Statutory Regulatory Compliance Notice
                </span>
                <p>
                  HM Wealth is an AMFI-registered Mutual Fund Distributor (ARN-341412). Mutual Fund investments are subject to market risks, read all scheme related documents carefully. Past performance is not indicative of future returns. We distribute mutual fund schemes and earn trail commissions from Asset Management Companies as per AMFI/SEBI norms.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
