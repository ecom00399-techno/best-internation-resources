"use client";

import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Clock, CheckCircle2, TrendingUp, Anchor, Plane, Truck, Package, PackageSearch, Users } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);

  const DEFAULT_REVIEWS = [
    {
      id: "1",
      author: "Loveleen Kaur",
      role: "Supply Chain Director",
      company: "Arora Exports Pvt. Ltd.",
      content: "Best Internation Resources transformed how we handle cross-border shipments. Their team is incredibly responsive, and our transit times dropped by 30% within the first quarter. Highly recommend for any serious exporter.",
      rating: 5
    },
    {
      id: "2",
      author: "Aman Sethi",
      role: "Operations Manager",
      company: "Sethi Global Trade LLC",
      content: "We've worked with several freight brokers over the years, but BIR stands out for their transparency and professionalism. No hidden fees, real-time updates, and they handled our customs clearance without a single delay.",
      rating: 5
    },
    {
      id: "3",
      author: "Visha Gupta",
      role: "Procurement Head",
      company: "Gupta Manufacturing Co.",
      content: "Partnering with Best Internation Resources was one of the best decisions for our procurement team. They managed our raw material imports seamlessly, even during peak season. Truly a reliable logistics partner.",
      rating: 5
    },
    {
      id: "4",
      author: "Michael T. Harrington",
      role: "VP of Logistics",
      company: "Harrington Distribution Inc.",
      content: "Outstanding freight coordination from start to finish. BIR's network and industry knowledge helped us navigate a complex multi-leg shipment across three continents. Delivered on time, every time.",
      rating: 5
    },
    {
      id: "5",
      author: "Sarah Al-Mansouri",
      role: "Regional Trade Manager",
      company: "Gulf Bridge Trading",
      content: "The level of professionalism at Best Internation Resources is remarkable. From documentation to final delivery, every step was handled with precision. Our Middle East distribution has never been smoother.",
      rating: 5
    },
    {
      id: "6",
      author: "Chen Wei",
      role: "Founder & CEO",
      company: "SinoLink Cargo Solutions",
      content: "BIR helped us establish a reliable shipping lane between Asia and North America. Their local expertise combined with a global network made all the difference. We renewed our contract without hesitation.",
      rating: 5
    },
    {
      id: "7",
      author: "Priya Nambiar",
      role: "Logistics Coordinator",
      company: "Nambiar Retail Group",
      content: "What sets BIR apart is their personal touch. They treated our business like it was their own, proactively resolving issues before they became problems. Exceptional service and great value.",
      rating: 5
    }
  ];

  const [reviews, setReviews] = useState<any[]>(DEFAULT_REVIEWS);

  useEffect(() => {
    fetch("/api/reviews")
      .then(res => res.json())
      .then(data => {
        if (data.reviews && data.reviews.length > 0) setReviews(data.reviews);
      })
      .catch(() => {}); // Keep default reviews on error
  }, []);

  const slides = [
    {
      title: "Global Logistics Solutions Built For",
      highlight: "Modern Supply Chains",
      desc: "Connecting businesses with reliable logistics coordination, freight solutions, supply chain support, and operational excellence across global markets.",
      image: "/hero_logistics.png"
    },
    {
      title: "End-to-End International",
      highlight: "Freight Broker",
      desc: "Seamless ocean, air, and ground freight forwarding networks ensuring your cargo reaches its destination safely and on time.",
      image: "/hero_coordination.png"
    },
    {
      title: "Enterprise-Grade",
      highlight: "Digital Growth",
      desc: "Scaling your B2B operations with advanced logistics strategies and highly optimized distribution networks.",
      image: "/digital_growth.png"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* SECTION 1: Dynamic Hero Carousel */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 relative h-full">
                <Image 
                  src={slide.image} 
                  alt={slide.highlight} 
                  fill 
                  className="object-cover opacity-40"
                  priority={index === 0}
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
                
                {/* Slide Content */}
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full pt-20">
                    <div className="max-w-3xl">
                      <span className="inline-block py-1 px-3 rounded-full bg-orange/20 text-orange font-semibold text-sm tracking-wider uppercase mb-6 border border-orange/30">
                        Best Internation Resources
                      </span>
                      <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6 transition-all">
                        {slide.title} <span className="text-orange">{slide.highlight}</span>
                      </h1>
                      <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                        {slide.desc}
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
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, i) => (
            <button 
              key={i} 
              onClick={() => emblaApi?.scrollTo(i)}
              className="w-3 h-3 rounded-full bg-white/50 hover:bg-orange transition-colors"
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
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
              { title: "Freight Broker", icon: <Globe size={32}/>, desc: "End-to-end global freight forwarding via ocean, air, and ground networks." },
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

      {/* SECTION 7: Testimonials - Auto-Scrolling Marquee */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <span className="text-orange font-semibold text-sm uppercase tracking-widest">Client Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mt-3">Trusted By Leaders Worldwide</h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">Real feedback from businesses who rely on Best Internation Resources every day.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full">
          {/* Left fade */}
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          {/* Right fade */}
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          <div
            className="flex gap-6 w-max"
            style={{
              animation: "scrollReviews 40s linear infinite",
            }}
          >
            {/* Double the reviews for seamless loop */}
            {[...reviews, ...reviews].map((r: any, idx: number) => (
              <div
                key={idx}
                className="bg-navy rounded-2xl p-7 text-white shadow-xl text-left flex-shrink-0 w-[340px] md:w-[380px] border border-white/5 hover:border-orange/30 transition-all"
              >
                {/* Stars */}
                <div className="flex text-orange mb-4">
                  {[...Array(r.rating || 5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-0.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                {/* Content */}
                <p className="text-gray-200 mb-6 text-sm leading-relaxed italic">"{r.content}"</p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange/20 flex items-center justify-center text-orange font-bold text-sm flex-shrink-0">
                    {r.author?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-orange">{r.author}</h4>
                    <p className="text-xs text-gray-400">{r.role}, {r.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes scrollReviews {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
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
