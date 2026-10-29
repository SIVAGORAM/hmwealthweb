import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simple & Affordable Insurance Plans | HM Wealth",
  description:
    "Protect your family and business with health, term life, motor, and team insurance facilitation. Dedicated claims assistance and transparent service with HM Wealth.",
};

export default function InsuranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

