import { MessageCircle, PhoneCall, ArrowRight } from "lucide-react";
import { Button, Container } from "@/components/ui/kit";
import { site } from "@/lib/site";

export function CtaBand({ title, intro }: { title: React.ReactNode; intro: string }) {
  return (
    <section className="py-2 sm:py-2.5 bg-white">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px] border border-brand/20 bg-gradient-to-br from-mint/70 via-white to-soft px-5 py-5 sm:px-10 sm:py-6 shadow-card">
          <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-brand-bright/15 blur-[80px]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 left-1/3 -z-10 size-72 rounded-full bg-gold/15 blur-[80px]" />

          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="flex max-w-2xl flex-col gap-2">
              <h2 className="text-[26px] font-extrabold leading-[1.12] text-ink sm:text-[36px]">{title}</h2>
              <p className="text-[15px] sm:text-[16px] leading-relaxed text-body">{intro}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/contact" variant="primary">
                <PhoneCall className="size-4" />
                <span>Book a free call</span>
                <ArrowRight className="size-4" />
              </Button>
              <Button href={site.whatsappHref} external variant="outline" className="border-brand/30 hover:bg-mint hover:border-brand">
                <MessageCircle className="size-4 text-emerald-600" />
                <span>WhatsApp us</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
