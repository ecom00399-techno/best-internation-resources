import type { Metadata } from "next";
import { Globe, TrendingUp, Anchor, Package, Truck, PackageSearch, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Logistics Services | Best Internation Resources LLC",
  description: "Comprehensive logistics services including Freight Brokerage, Supply Chain Management, Import/Export Support, Warehousing, and Distribution.",
  keywords: "Freight Broker, Supply Chain Management, Import Export Support, Warehousing Solutions, Logistics Consulting",
};

import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "freight",
    title: "Freight Broker",
    icon: <Globe size={40} />,
    overview: "End-to-end global freight forwarding via ocean, air, and ground networks.",
    benefits: ["Optimized routing for cost and speed", "Real-time shipment tracking", "Global carrier network access"],
    process: ["Route Analysis", "Carrier Selection", "Booking & Documentation", "Transit Monitoring"],
    image: "/images/freight.png"
  },
  {
    id: "supply-chain",
    title: "Supply Chain Management",
    icon: <TrendingUp size={40} />,
    overview: "Strategic optimization of your entire supply chain for maximum efficiency and resilience.",
    benefits: ["Reduced operational costs", "Improved inventory turnover", "Enhanced supply chain visibility"],
    process: ["Supply Chain Audit", "Strategy Development", "Technology Integration", "Continuous Optimization"],
    image: "/images/supply-chain.png"
  },
  {
    id: "import-export",
    title: "Import & Export Support",
    icon: <Anchor size={40} />,
    overview: "Expert navigation of complex customs, tariffs, and international trade regulations.",
    benefits: ["Customs clearance acceleration", "Tariff classification accuracy", "Trade compliance assurance"],
    process: ["Documentation Review", "Customs Filing", "Duty & Tax Calculation", "Final Clearance"],
    image: "/images/import-export.png"
  },
  {
    id: "warehousing",
    title: "Warehousing Solutions",
    icon: <Package size={40} />,
    overview: "Secure, strategically located warehousing facilities for your inventory.",
    benefits: ["Flexible storage capacity", "Advanced inventory management", "Cross-docking capabilities"],
    process: ["Receiving & Inspection", "Storage Allocation", "Pick & Pack", "Dispatch"],
    image: "/images/warehousing.png"
  },
  {
    id: "distribution",
    title: "Distribution Support",
    icon: <Truck size={40} />,
    overview: "Reliable last-mile delivery and distribution network management.",
    benefits: ["On-time delivery performance", "Route optimization", "Reverse logistics handling"],
    process: ["Order Processing", "Load Planning", "Dispatch & Routing", "Proof of Delivery"],
    image: "/images/distribution.png"
  },
  {
    id: "consulting",
    title: "Logistics Consulting",
    icon: <PackageSearch size={40} />,
    overview: "Expert advisory to restructure and improve your logistics operations.",
    benefits: ["Identify operational bottlenecks", "Cost reduction strategies", "Risk mitigation planning"],
    process: ["Discovery & Analysis", "Solution Design", "Implementation Planning", "Performance Review"],
    image: "/images/consulting.png"
  }
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-navy py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50a40?q=80&w=2070&auto=format&fit=crop" 
            alt="Services Background" 
            fill 
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">Our Enterprise <span className="text-orange">Services</span></h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            From global freight forwarding to end-to-end supply chain management, we provide the infrastructure and expertise to scale your logistics operations.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-gray-light flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {services.map((service, index) => (
            <div key={service.id} id={service.id} className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
              
              <div className="w-full lg:w-1/2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-navy/20"></div>
                  <div className="absolute bottom-6 left-6 w-16 h-16 bg-orange text-white rounded-xl flex items-center justify-center shadow-lg">
                    {service.icon}
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl font-heading font-bold text-navy mb-4">{service.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">{service.overview}</p>
                
                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-heading font-bold text-navy mb-4 text-lg border-b border-gray-200 pb-2">Key Benefits</h4>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm">
                          <CheckCircle2 size={18} className="text-orange mr-2 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy mb-4 text-lg border-b border-gray-200 pb-2">Our Process</h4>
                    <ul className="space-y-3">
                      {service.process.map((step, i) => (
                        <li key={i} className="flex items-start text-gray-600 text-sm">
                          <span className="text-orange font-bold mr-2">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href={`/quote?service=${service.id}`} className="inline-flex items-center text-orange font-bold hover:text-orange-hover transition-colors group">
                  Request a Quote for {service.title} <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Need a Custom Logistics Solution?</h2>
          <p className="text-gray-300 mb-8 text-lg">Our experts are ready to design a supply chain architecture tailored to your specific business requirements.</p>
          <Link href="/contact" className="inline-block bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:-translate-y-0.5">
            Contact Our Experts
          </Link>
        </div>
      </section>
    </div>
  );
}
