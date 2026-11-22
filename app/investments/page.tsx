import type { Metadata } from "next";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";
import { InvestmentsView } from "@/components/investments/InvestmentsView";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.investments);

export default function InvestmentsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Investments", item: "/investments" },
        ])}
      />
      <InvestmentsView />
    </>
  );
}
