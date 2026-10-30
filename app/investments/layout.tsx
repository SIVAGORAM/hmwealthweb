import type { Metadata } from "next";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.investments);

export default function InvestmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Investments", item: "/investments" },
        ])}
      />
      {children}
    </>
  );
}
