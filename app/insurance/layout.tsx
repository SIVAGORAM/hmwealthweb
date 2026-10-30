import type { Metadata } from "next";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.insurance);

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Insurance", item: "/insurance" },
        ])}
      />
      {children}
    </>
  );
}
