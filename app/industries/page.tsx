import type { Metadata } from "next";
import { Factory, Store, Truck, Package, Anchor, ShoppingCart, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Specialized Logistics Solutions by Industry | Best Internation Resources",
  description: "B2B supply chain solutions tailored for Manufacturing, Retail, E-commerce, Importers, Exporters, and Distribution sectors. Scale your operations with us.",
  keywords: "Logistics for Manufacturing, B2B Retail Supply Chain, Enterprise E-commerce Logistics, Importers Exporters Freight",
};

import Link from "next/link";
import Image from "next/image";

const industries = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    icon: <Factory size={40} />,
    description: "End-to-end supply chain support for manufacturers, ensuring raw materials arrive just-in-time and finished goods reach global markets without delay.",
    image: "/images/manufacturing.png"
  },
  {
    id: "retail",
    title: "Retail",
    icon: <Store size={40} />,
    description: "Responsive logistics solutions for retail operations, managing seasonal volume spikes and ensuring shelf availability across national store networks.",
    image: "/images/distribution.png"
  },
  {
    id: "distribution",
    title: "Distribution",
    icon: <Truck size={40} />,
    description: "Strategic partnerships with regional distributors to optimize middle-mile and last-mile delivery networks for maximum efficiency.",
    image: "/images/freight.png"
  },
  {
    id: "warehousing",
    title: "Warehousing",
    icon: <Package size={40} />,
    description: "B2B support for high-volume warehousing operations requiring specialized freight handling and cross-docking capabilities.",
    image: "/images/warehousing.png"
  },
  {
    id: "import-export",
    title: "Import & Export",
    icon: <Anchor size={40} />,
    description: "Dedicated support for trading companies needing reliable ocean and air Freight Broker across complex international borders.",
    image: "/images/import-export.png"
  },
  {
    id: "ecommerce",
    title: "E-commerce",
    icon: <ShoppingCart size={40} />,
    description: "High-velocity fulfillment logistics designed for the demanding pace of modern e-commerce and direct-to-consumer operations.",
    image: "/images/ecommerce.png"
  }
];

export default function IndustriesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-navy py-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-orange/20 text-orange font-semibold text-sm tracking-wider uppercase mb-6">
            Sectors We Serve
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">Specialized Logistics Solutions by <span className="text-orange">Industry</span></h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Every industry has unique supply chain challenges. We provide specialized logistics strategies tailored to your specific market demands.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-24 bg-gray-light flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div key={industry.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image 
                    src={industry.image} 
                    alt={industry.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-navy/40"></div>
                  <div className="absolute top-4 left-4 w-12 h-12 bg-orange text-white rounded-xl flex items-center justify-center shadow-lg">
                    {industry.icon}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-heading font-bold text-navy mb-4">{industry.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed flex-grow">{industry.description}</p>
                  <Link href={`/quote?industry=${industry.id}`} className="inline-flex items-center text-orange font-bold hover:text-orange-hover transition-colors group/link mt-auto">
                    Get Industry Solution <ArrowRight size={18} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-navy mb-6">Don't See Your Industry?</h2>
          <p className="text-gray-600 mb-8 text-lg">Our logistics framework is highly adaptable. Contact us to discuss how we can build a custom solution for your specific niche.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-navy hover:bg-navy-light text-white px-8 py-4 rounded-lg font-bold transition-all shadow-md">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
