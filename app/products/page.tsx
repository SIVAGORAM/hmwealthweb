import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";
import { Container, IconBox } from "@/components/ui/kit";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { offeringHref, products } from "@/lib/offerings";
import { site } from "@/lib/site";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.products);

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Products", item: "/products" },
        ])}
      />
      {/* ---------- Header / Hero ---------- */}
      <section className="pb-4 pt-4 sm:pb-8 sm:pt-6">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[28px] bg-[#f5f6f3] p-6 ring-1 ring-line sm:rounded-[36px] sm:p-10 lg:p-12">
            <div aria-hidden className="pointer-events-none absolute -left-20 -top-20 -z-10 size-80 rounded-full bg-brand-bright/12 blur-[90px]" />
            <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold text-body">
              <Link href="/" className="transition-colors hover:text-brand">Home</Link>
              <ChevronRight className="size-3.5 text-body/50" />
              <span className="font-bold text-ink">Products</span>
            </nav>
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-brand/20 bg-white/95 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-wider text-brand shadow-xs whitespace-nowrap sm:text-xs">
              <ShieldCheck className="size-3.5 shrink-0" />
              <span>AMFI-Registered MFD</span>
              <span className="hidden sm:inline text-brand/40">·</span>
              <span className="hidden sm:inline">ARN-341412</span>
            </div>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
              Investment &amp; Protection Products
            </h1>
            <p className="mt-2 max-w-[65ch] text-[15.5px] leading-relaxed text-body sm:text-[17px]">
              We distribute mutual fund schemes from SEBI-registered Asset Management Companies and facilitate insurance coverage through licensed insurance partners.
            </p>
          </div>
        </Container>
      </section>

      {/* ---------- Products Listing Grid ---------- */}
      <section className="py-6 sm:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05} className="group flex flex-col justify-between rounded-[24px] bg-white p-6 ring-1 ring-line shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lift">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <IconBox tint={p.tint} className="size-12 rounded-xl">
                      <p.icon className="size-6" />
                    </IconBox>
                    <span className="text-[11.5px] font-bold uppercase tracking-wider text-body/80">Product</span>
                  </div>
                  <h2 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em] text-ink group-hover:text-brand transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-body">
                    {p.intro}
                  </p>
                </div>
                <div className="mt-6 border-t border-line/60 pt-4">
                  <Link
                    href={offeringHref(p)}
                    className="inline-flex items-center gap-1.5 text-[14px] font-bold text-brand transition-colors group-hover:text-brand-dark"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Need guidance choosing the right schemes?" intro="Book a free consultation with HM Wealth. No sales pressure, honest assistance aligned with your goals." />
    </>
  );
}

