import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Our Global Logistics Experts | Best Internation Resources",
  description: "Get in touch with Best Internation Resources for enterprise logistics, freight brokerage, and global supply chain consulting.",
  keywords: "Contact Logistics Company, B2B Freight Forwarder Contact, Supply Chain Services, Contact Enterprise Logistics",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
