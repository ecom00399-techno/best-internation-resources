import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Quote | Best Internation Resources LLC",
  description: "Request a free logistics quote from Best Internation Resources. Get pricing for freight brokerage, warehousing, distribution, and supply chain management.",
  keywords: "Logistics Quote, Freight Pricing, Supply Chain Cost, Request Logistics Quote",
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
