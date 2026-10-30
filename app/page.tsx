import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { TrustStrip, Products, SipSection, Goals, HowItWorks, WhyUs, FounderNote } from "@/components/home/HomeSections";
import { CtaBand } from "@/components/sections/CtaBand";
import { SixStepProcess } from "@/components/home/SixStepProcess";
import { Faq } from "@/components/sections/Faq";
import { MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/kit";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getFaqSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.home);

const homepageFaqs = [
  {
    q: "How much do I need to start investing?",
    a: "You can start a SIP from ₹500 a month in most mutual fund schemes. There is no fixed minimum for insurance, it depends on the plan.",
  },
  {
    q: "Are mutual fund returns guaranteed?",
    a: "No. Mutual fund values go up and down with the market. Our calculators show illustrations only, not promises.",
  },
  {
    q: "Do you charge any fee?",
    a: "No separate fee. We are paid commission by fund houses and insurers, and we tell you the amount for any product whenever you ask.",
  },
  {
    q: "Who holds my money?",
    a: "Your investments are held in your own name with the fund house, and policies are issued directly by the insurer to you. We never hold your money.",
  },
  {
    q: "Can you review my existing investments?",
    a: "Yes. Share your consolidated account statement and existing policies, and we will go through them with you in a free call.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={getFaqSchema(homepageFaqs)} />
      <Hero />
      <TrustStrip />
      <Products />
      <SipSection />
      <Goals />
      <HowItWorks />
      <SixStepProcess />
      <WhyUs />
      <FounderNote />
      <section className="relative isolate overflow-hidden bg-soft py-5 sm:py-8">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 -z-10 size-[460px] rounded-full bg-mint-2/60 blur-[130px]" />
        <Container className="flex flex-col items-center gap-6 py-6 sm:gap-8 sm:py-10">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-white px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-brand shadow-sm">
              <MessageCircleQuestion className="size-3.5" />FAQ
            </span>
            <h2 className="text-[32px] font-extrabold leading-[1.06] tracking-[-0.04em] text-ink sm:text-[44px]">
              Questions, <span className="bg-gradient-to-r from-brand to-brand-bright bg-clip-text text-transparent">answered simply.</span>
            </h2>
            <p className="max-w-md text-[16px] leading-relaxed text-body">The things families ask us most, in plain words.</p>
          </div>

          <div className="w-full max-w-3xl">
            <Faq items={homepageFaqs} />
          </div>
        </Container>
      </section>
      <CtaBand title="Ready to start your investment journey?" intro="Book a free call with no obligation. We’ll understand your goals before we suggest anything." />
    </>
  );
}
