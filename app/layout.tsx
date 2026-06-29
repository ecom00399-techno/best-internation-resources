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
  metadataBase: new URL("https://bestinternationresources.com"),
  title: "Best Internation Resources LLC | Enterprise Global Logistics Solutions",
  description: "Enterprise-grade global logistics solutions. We connect B2B businesses with reliable freight brokerage, supply chain consulting, and global warehousing.",
  keywords: "Global Logistics, B2B Supply Chain, Freight Forwarding, Enterprise Warehousing, Distribution, Import, Export, 3PL",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Best Internation Resources LLC | Global Logistics Experts",
    description: "Enterprise-grade global logistics solutions, freight forwarding, and supply chain management for modern B2B businesses.",
    url: "https://bestinternationresources.com",
    siteName: "Best Internation Resources",
    images: [
      {
        url: "/logo.png", // We will use the logo or hero image here.
        width: 1200,
        height: 630,
        alt: "Best Internation Resources Logistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Internation Resources LLC | Global Logistics Experts",
    description: "Enterprise-grade global logistics solutions, freight forwarding, and supply chain management for modern B2B businesses.",
    images: ["/logo.png"],
  },
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
    "image": "https://bestinternationresources.com/logo.png",
    "description": "Enterprise-grade global logistics solutions, freight forwarding, and B2B supply chain management.",
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
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+18285705669",
      "contactType": "customer service",
      "email": "Support@bestinternationresources.com",
      "availableLanguage": "English"
    },
    "founder": {
      "@type": "Person",
      "name": "Best Internation Resources Team"
    },
    "foundingDate": "2019",
    "areaServed": "Worldwide",
    "priceRange": "$$"
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
