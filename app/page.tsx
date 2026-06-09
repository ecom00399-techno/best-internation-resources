import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Clock, CheckCircle2, TrendingUp, Anchor, Plane, Truck, Package, PackageSearch, Users } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1: Premium Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50a40?q=80&w=2070&auto=format&fit=crop" 
            alt="Global Logistics and Cargo" 
            fill 
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="max-w-3xl">
            <span className="inline-block py-1 px-3 rounded-full bg-orange/20 text-orange font-semibold text-sm tracking-wider uppercase mb-6 border border-orange/30">
              Enterprise Logistics
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white leading-tight mb-6">
              Global Logistics Solutions Built For <span className="text-orange">Modern Supply Chains</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              Connecting businesses with reliable logistics coordination, freight solutions, supply chain support, and operational excellence across global markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote" className="bg-orange hover:bg-orange-hover text-white px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:shadow-orange/30 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Get a Quote <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 px-8 py-4 rounded-lg font-bold transition-all flex items-center justify-center">
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Trust Indicators */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-navy mb-1">Founded 2019</h4>
              <p className="text-gray-500 text-sm">Years of Excellence</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-4">
                <Globe size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-navy mb-1">Global Network</h4>
              <p className="text-gray-500 text-sm">Worldwide Coverage</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-navy mb-1">Professional Provider</h4>
              <p className="text-gray-500 text-sm">Certified & Secure</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-heading font-bold text-navy mb-1">Customer-Focused</h4>
              <p className="text-gray-500 text-sm">Dedicated Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Core Services */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">Our Expertise</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mt-3 mb-4">Core Logistics Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Comprehensive supply chain solutions tailored for enterprise reliability and scale.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Cards */}
            {[
              { title: "Freight Coordination", icon: <Globe size={32}/>, desc: "End-to-end global freight forwarding via ocean, air, and ground networks." },
              { title: "Supply Chain Management", icon: <TrendingUp size={32}/>, desc: "Strategic optimization of your entire supply chain for maximum efficiency." },
              { title: "Import & Export Support", icon: <Anchor size={32}/>, desc: "Navigating complex customs, tariffs, and international trade regulations." },
              { title: "Warehousing Solutions", icon: <Package size={32}/>, desc: "Secure, strategically located warehousing facilities for your inventory." },
              { title: "Distribution Support", icon: <Truck size={32}/>, desc: "Reliable last-mile delivery and distribution network management." },
              { title: "Logistics Consulting", icon: <PackageSearch size={32}/>, desc: "Expert advisory to restructure and improve your logistics operations." }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-16 h-16 bg-navy/5 text-navy rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-navy mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.desc}</p>
                <Link href="/services" className="text-orange font-semibold flex items-center hover:text-orange-hover transition-colors">
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
              <span className="text-orange font-semibold text-sm uppercase tracking-widest">Sectors</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mt-3">Industries We Serve</h2>
            </div>
            <Link href="/industries" className="hidden md:flex text-navy font-semibold items-center hover:text-orange transition-colors">
              View All Industries <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Manufacturing", "Importers", "Exporters", "Distribution", "Warehousing", "Retail", "E-commerce", "Supply Chain Operators"].map((industry, i) => (
              <div key={i} className="bg-gray-light rounded-lg p-6 text-center hover:bg-navy hover:text-white transition-colors group cursor-pointer border border-gray-100">
                <h4 className="font-heading font-bold text-lg group-hover:text-white text-navy">{industry}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Process */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">Our Methodology</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold mt-3 mb-4">How We Operate</h2>
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
                <div className="w-16 h-16 bg-navy border-2 border-orange text-orange rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4 shadow-[0_0_15px_rgba(255,106,0,0.3)]">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg">{item.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Why Choose Us */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange font-semibold text-sm uppercase tracking-widest">The Advantage</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy mt-3">Why Choose Best Internation</h2>
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
                <div className="mt-1 flex-shrink-0 text-orange">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-navy text-lg mb-2">{reason.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-12">Trusted By Enterprise Leaders</h2>
          <div className="bg-navy rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 text-[150px] leading-none text-white/5 font-serif opacity-50">&quot;</div>
            <div className="relative z-10">
              <div className="flex justify-center text-orange mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mx-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-gray-200">
                "Best Internation Resources completely transformed our supply chain. Their coordination is flawless, and their team acts as a true extension of our own operations. We've seen a 30% reduction in transit delays since partnering with them."
              </p>
              <h4 className="font-heading font-bold text-lg">Director of Logistics</h4>
              <p className="text-gray-400">Global Manufacturing Corp</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: Final CTA */}
      <section className="bg-gradient-to-br from-orange to-orange-hover py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready To Optimize Your Logistics Operations?</h2>
          <p className="text-white/90 text-lg mb-10">Partner with Best Internation Resources for seamless, reliable global trade.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-white text-navy hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all shadow-lg hover:-translate-y-0.5">
              Get a Quote
            </Link>
            <a href="tel:+18285705669" className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold transition-all">
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
