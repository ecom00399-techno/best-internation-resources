import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["400", "500", "600", "700", "800"], 
  subsets: ["latin"], 
  variable: "--font-poppins" 
});

export const metadata: Metadata = {
  title: "Best Internation Resources LLC | Global Logistics Solutions",
  description: "Enterprise-grade global logistics solutions. We connect businesses with reliable Freight Broker, supply chain support, and warehousing across global markets.",
  keywords: "Logistics, Supply Chain, Freight Forwarding, Warehousing, Distribution, Import, Export",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LogisticsService",
    "name": "Best Internation Resources LLC",
    "image": "https://bestinternationresources.com/logo.jpg",
    "description": "Enterprise-grade global logistics solutions, freight forwarding, and supply chain management.",
    "url": "https://bestinternationresources.com",
    "telephone": "+18285705669",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "30 N Gould St Ste R",
      "addressLocality": "Sheridan",
      "addressRegion": "WY",
      "postalCode": "82801",
      "addressCountry": "US"
    },
    "founder": {
      "@type": "Person",
      "name": "Best Internation Resources Team"
    },
    "foundingDate": "2019"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans flex flex-col min-h-screen bg-gray-light`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
