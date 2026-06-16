import type { Metadata } from "next";
import { Target, Eye, Shield, Users, Zap, Globe, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Best Internation Resources LLC",
  description: "Learn about Best Internation Resources, a trusted global logistics provider since 2019. We specialize in supply chain management, freight brokerage, and cross-border distribution.",
  keywords: "About Best Internation Resources, Logistics Company, Freight Broker, Global Supply Chain",
};

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-navy py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image 
            src="/images/about.png" 
            alt="About Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/80"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-orange/20 text-orange font-semibold text-sm tracking-wider uppercase mb-6">
            Founded 2019
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">Our <span className="text-orange">Story</span></h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Building the most reliable and transparent global logistics network for modern enterprise operations.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-6">Operational Excellence Since 2019</h2>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Best Internation Resources LLC was founded on a simple premise: global supply chains were too fragmented, too opaque, and too slow to adapt to modern business needs.
                </p>
                <p>
                  We set out to build a logistics partner that operates differently. By combining deep industry expertise with agile coordination, we eliminate the friction in international trade. From our headquarters in Sheridan, Wyoming, we manage complex freight movements across every major global corridor.
                </p>
                <p>
                  Today, we are trusted by manufacturers, retailers, and distributors to act as the backbone of their operations—ensuring goods move efficiently, securely, and transparently.
                </p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/images/about.png" 
                alt="Logistics Operations" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-orange/10 mix-blend-multiply"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-navy/5 text-navy rounded-full flex items-center justify-center mb-8">
                <Target size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To simplify global trade by providing reliable, transparent, and scalable logistics coordination that empowers businesses to grow without operational constraints.
              </p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-orange/10 text-orange rounded-full flex items-center justify-center mb-8">
                <Eye size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the most trusted enterprise logistics partner in North America, recognized for our operational precision and commitment to customer success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">The principles that guide every shipment, every strategy, and every partnership.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Shield size={32}/>, title: "Reliability", desc: "We do what we say we will do, when we say we will do it." },
              { icon: <Globe size={32}/>, title: "Transparency", desc: "No hidden fees, no opaque tracking. Full visibility always." },
              { icon: <Zap size={32}/>, title: "Agility", desc: "Swift adaptation to supply chain disruptions and market shifts." },
              { icon: <Users size={32}/>, title: "Partnership", desc: "We act as an extension of your internal operations team." }
            ].map((value, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-xl text-center hover:bg-white/10 transition-colors">
                <div className="text-orange flex justify-center mb-6">{value.icon}</div>
                <h4 className="font-heading font-bold text-xl mb-3">{value.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange to-orange-hover py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">Partner With A Leader</h2>
          <p className="text-white/90 text-lg mb-10">Experience logistics coordination that actually drives business growth.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-white text-navy hover:bg-gray-100 px-8 py-4 rounded-lg font-bold transition-all shadow-lg">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
