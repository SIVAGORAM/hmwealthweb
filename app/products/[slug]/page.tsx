import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OfferingPage } from "@/components/offerings/OfferingPage";
import { findOffering, products } from "@/lib/offerings";
import { constructMetadata, getRouteSeo } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const o = findOffering("products", slug);
  if (!o) return {};

  const config = getRouteSeo(slug) ?? {
    title: o.seoTitle,
    description: o.seoDescription,
    path: `/products/${o.slug}`,
    ogImage: o.hero.src,
    ogImageAlt: o.hero.alt,
  };

  return constructMetadata(config);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = findOffering("products", slug);
  if (!o) notFound();
  return <OfferingPage o={o} />;
}
