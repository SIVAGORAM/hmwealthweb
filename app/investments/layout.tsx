import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart & Simple Investment Plans | HM Wealth",
  description:
    "Grow your money with disciplined, goal-based mutual fund plans. Easy monthly SIPs, tax-saving schemes, and transparent guidance from HM Wealth.",
};

export default function InvestmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

