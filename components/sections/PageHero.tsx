import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container, Badge } from "@/components/ui/kit";

/** Light inner-page hero with a mint glow and an optional visual on the right. */
export function PageHero({ crumb, badge, title, intro, visual, actions }: {
  crumb: string; badge?: string; title: React.ReactNode; intro: string; visual?: React.ReactNode; actions?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mint/70 via-mint/30 to-white">
      <div aria-hidden className="absolute -right-40 -top-40 size-[520px] rounded-full bg-mint-2/60 blur-3xl" />
      <div aria-hidden className="absolute -left-32 top-40 size-[320px] rounded-full bg-gold-soft blur-3xl" />
      <Container className="relative grid items-center gap-6 py-4 sm:py-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
        <div className="flex flex-col gap-3.5 sm:gap-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-body">
            <Link href="/" className="hover:text-brand">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span aria-current="page" className="text-ink">{crumb}</span>
          </nav>
          {badge && <Badge className="w-fit bg-white shadow-card">{badge}</Badge>}
          <h1 className="text-[34px] font-extrabold leading-[1.08] text-ink sm:text-[46px]">{title}</h1>
          <p className="max-w-[56ch] text-[16px] sm:text-[17.5px] leading-relaxed text-body">{intro}</p>
          {actions && <div className="flex flex-wrap gap-2.5 pt-1">{actions}</div>}
        </div>
        {visual && <div className="relative">{visual}</div>}
      </Container>
    </section>
  );
}
