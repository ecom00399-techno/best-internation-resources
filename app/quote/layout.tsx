import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Custom Supply Chain Proposal | Best Internation Resources",
  description: "Request a free, tailored enterprise logistics quote from Best Internation Resources. Competitive pricing for global freight brokerage and distribution.",
  keywords: "Logistics Quote, B2B Freight Pricing, Enterprise Supply Chain Cost, Request Global Logistics Proposal",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
