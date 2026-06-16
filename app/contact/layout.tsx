import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Best Internation Resources LLC",
  description: "Get in touch with Best Internation Resources. We are ready to assist you with all your global logistics, supply chain, and freight brokerage needs.",
  keywords: "Contact Logistics Company, Freight Forwarder Contact, Supply Chain Services",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
