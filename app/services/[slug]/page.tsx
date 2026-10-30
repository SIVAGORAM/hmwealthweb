import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/offerings/OfferingPage";
import { findOffering, services } from "@/lib/offerings";
import { constructMetadata, getRouteSeo } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = findOffering("services", slug);
  if (!o) return {};

  const config = getRouteSeo(slug) ?? {
    title: o.seoTitle,
    description: o.seoDescription,
    path: `/services/${o.slug}`,
    ogImage: o.hero.src,
    ogImageAlt: o.hero.alt,
  };

  return constructMetadata(config);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = findOffering("services", slug);
  if (!o) notFound();
  return <OfferingPage o={o} />;
}
