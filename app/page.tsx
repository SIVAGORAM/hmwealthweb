import { Hero } from "@/components/home/Hero";
import { TrustStrip, Products, SipSection, Goals, HowItWorks, WhyUs, InsuranceBand, FounderNote } from "@/components/home/HomeSections";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Phone, MessageCircle, MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Products />
      <SipSection />
      <Goals />
      <HowItWorks />
      <WhyUs />
      <InsuranceBand />
      <FounderNote />
      <section className="relative isolate overflow-hidden bg-soft py-1.5 sm:py-2">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 size-[460px] rounded-full bg-mint-2/60 blur-[130px]" />
        <Container className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          {/* left */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <MessageCircleQuestion className="size-3.5" />FAQ
            </span>
            <h2 className="text-[34px] font-extrabold leading-[1.04] tracking-[-0.04em] text-ink sm:text-[46px]">
              Questions,<br /><span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">answered simply.</span>
            </h2>
            <p className="max-w-md text-[16.5px] leading-relaxed text-body">The things families ask us most, in plain words.</p>

            {/* still have a question */}
            <div className="relative isolate mt-2 max-w-md overflow-hidden rounded-[26px] bg-[#04261c] p-6 text-white shadow-[0_30px_60px_-34px_rgba(4,38,28,0.8)]">
              <div aria-hidden className="absolute -right-12 -top-16 -z-10 size-44 rounded-full bg-[#19c38a]/30 blur-[60px]" />
              <p className="text-[18px] font-extrabold tracking-[-0.02em]">Still have a question?</p>
              <p className="mt-1 text-[14px] text-white/65">Talk to a real person · {site.hours}</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <a href={site.phoneHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white text-[14px] font-bold text-[#04261c] transition hover:-translate-y-0.5">
                  <Phone className="size-4" />Call us
                </a>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 text-[14px] font-bold backdrop-blur transition hover:bg-white/15">
                  <MessageCircle className="size-4" />WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="lg:col-span-7">
            <Faq items={[
            { q: "How much do I need to start investing?", a: "You can start a SIP from ₹500 a month in most mutual fund schemes. There is no fixed minimum for insurance, it depends on the plan." },
            { q: "Are mutual fund returns guaranteed?", a: "No. Mutual fund values go up and down with the market. Our calculators show illustrations only, not promises." },
            { q: "Do you charge any fee?", a: "No separate fee. We are paid commission by fund houses and insurers, and we tell you the amount for any product whenever you ask." },
            { q: "Who holds my money?", a: "Your investments are held in your own name with the fund house, and policies are issued directly by the insurer to you. We never hold your money." },
            { q: "Can you review my existing investments?", a: "Yes. Share your consolidated account statement and existing policies, and we will go through them with you in a free call." },
          ]} />
          </div>
        </Container>
      </section>
      <CtaBand title="Ready to start your investment journey?" intro="Book a free call with no obligation. We’ll understand your goals before we suggest anything." />
    </>
  );
}
