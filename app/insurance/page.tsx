import type { Metadata } from "next";
import { constructMetadata, ROUTES_SEO } from "@/lib/seo";
import { JsonLd, getBreadcrumbSchema } from "@/components/seo/json-ld";
import { InsuranceView } from "@/components/insurance/InsuranceView";

export const metadata: Metadata = constructMetadata(ROUTES_SEO.insurance);

export default function InsurancePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Insurance", item: "/insurance" },
        ])}
      />
      <InsuranceView />
    </>
  );
}
