import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Clock, CheckCircle2, TrendingUp, Anchor, Truck, Package, PackageSearch, Users } from "lucide-react";
import Image from "next/image";
import ReviewsClient from "./ReviewsClient";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* SECTION 1: Static SEO-Optimized Hero Section */}
      <section className="relative h-screen min-h-[640px] max-h-[900px] flex items-center bg-[#0D1B2A] overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_logistics.png" 
            alt="Global Logistics and Modern Supply Chains" 
            fill 
            className="object-cover opacity-35"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A] via-[#0D1B2A]/85 to-[#0D1B2A]/30"></div>
        </div>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative w-full">
            <div className="max-w-2xl lg:max-w-3xl">
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-semibold text-xs sm:text-sm tracking-wider uppercase mb-5 border border-[#FF6A00]/30">
                <span className="w-1.5 h-1.5 bg-[#FF6A00] rounded-full animate-pulse"></span>
                Best Internation Resources
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold text-white leading-[1.1] mb-5">
                Enterprise Global Logistics Solutions For <span className="text-[#FF6A00] block sm:inline">B2B Supply Chains</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
                Connecting businesses with reliable logistics coordination, freight solutions, supply chain support, and operational excellence across global markets.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/quote" className="bg-[#FF6A00] hover:bg-orange-600 text-white px-7 py-3.5 sm:py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-[#FF6A00]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base">
                  Get a Quote <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-7 py-3.5 sm:py-4 rounded-lg font-bold transition-all flex items-center justify-center text-sm sm:text-base">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0D1B2A]/5 text-[#0D1B2A] rounded-full flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#0D1B2A] mb-1">Founded 2019</h4>
              <p className="text-gray-500 text-sm">Years of Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0D1B2A]/5 text-[#0D1B2A] rounded-full flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#0D1B2A] mb-1">Global Network</h4>
              <p className="text-gray-500 text-sm">Worldwide Coverage</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0D1B2A]/5 text-[#0D1B2A] rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#0D1B2A] mb-1">Professional Provider</h4>
              <p className="text-gray-500 text-sm">Certified & Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-[#0D1B2A]/5 text-[#0D1B2A] rounded-full flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-[#0D1B2A] mb-1">Customer-Focused</h4>
              <p className="text-gray-500 text-sm">Dedicated Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D1B2A] mt-3 mb-4">Enterprise Freight & Logistics Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Comprehensive supply chain solutions tailored for enterprise reliability and scale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Freight Broker", icon: <Globe size={32}/>, desc: "End-to-end global freight forwarding via ocean, air, and ground networks." },
              { title: "Supply Chain Management", icon: <TrendingUp size={32}/>, desc: "Strategic optimization of your entire supply chain for maximum efficiency." },
              { title: "Import & Export Support", icon: <Anchor size={32}/>, desc: "Navigating complex customs, tariffs, and international trade regulations." },
              { title: "Warehousing Solutions", icon: <Package size={32}/>, desc: "Secure, strategically located warehousing facilities for your inventory." },
              { title: "Distribution Support", icon: <Truck size={32}/>, desc: "Reliable last-mile delivery and distribution network management." },
              { title: "Logistics Consulting", icon: <PackageSearch size={32}/>, desc: "Expert advisory to restructure and improve your logistics operations." }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 bg-[#0D1B2A]/5 text-[#0D1B2A] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FF6A00] group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-[#0D1B2A] mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="text-[#FF6A00] font-semibold flex items-center hover:text-orange-600 transition-colors">
                  Learn More <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Industries Served */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">Sectors</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D1B2A] mt-3">Specialized B2B Industry Solutions</h2>
            </div>
            <Link href="/industries" className="hidden md:flex text-[#0D1B2A] font-semibold items-center hover:text-[#FF6A00] transition-colors">
              View All Industries <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Manufacturing", "Importers", "Exporters", "Distribution", "Warehousing", "Retail", "E-commerce", "Supply Chain Operators"].map((industry, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 text-center hover:bg-[#0D1B2A] hover:text-white transition-colors group cursor-pointer border border-gray-100">
                <h4 className="font-heading font-bold text-lg group-hover:text-white text-[#0D1B2A]">{industry}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Process */}
      <section className="py-24 bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF6A00]/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">Our Methodology</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4">Our Strategic Logistics Methodology</h2>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0"></div>
            
            {[
              { step: "01", title: "Request Consultation" },
              { step: "02", title: "Needs Assessment" },
              { step: "03", title: "Logistics Planning" },
              { step: "04", title: "Execution" },
              { step: "05", title: "Ongoing Support" }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0D1B2A] border-2 border-[#FF6A00] text-[#FF6A00] rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4 shadow-[0_0_15px_rgba(255,106,0,0.3)]">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Why Choose Us */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">The Advantage</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#0D1B2A] mt-3">The Enterprise Logistics Advantage</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Reliable Partnerships", desc: "We build long-term relationships based on trust and consistent delivery." },
              { title: "Industry Expertise", desc: "Decades of combined experience navigating complex global supply chains." },
              { title: "Efficient Coordination", desc: "Streamlined processes that save time and reduce operational bottlenecks." },
              { title: "Scalable Operations", desc: "Logistics solutions that grow seamlessly alongside your business." },
              { title: "Professional Communication", desc: "Transparent, proactive updates at every stage of your shipment's journey." },
              { title: "Global Reach", desc: "An extensive network spanning key ports and hubs worldwide." }
            ].map((reason, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 text-[#FF6A00]">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-[#0D1B2A] text-lg mb-2">{reason.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Testimonials - Client Component */}
      <ReviewsClient />

      {/* SECTION 8: Final CTA */}
      <section className="bg-gradient-to-br from-[#FF6A00] to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Scale Your Supply Chain Operations Today</h2>
          <p className="text-white/90 text-lg mb-10">Partner with Best Internation Resources for seamless, reliable global trade.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-white text-[#0D1B2A] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:-translate-y-0.5">
              Get a Quote
            </Link>
            <a href="tel:+18285705669" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-all">
              Call Now
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
