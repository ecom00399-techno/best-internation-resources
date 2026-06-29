import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MapPin, Truck, CheckCircle2, ShieldCheck, TrendingUp } from 'lucide-react';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const STATES = [
  "alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", 
  "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", 
  "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", 
  "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new-hampshire", 
  "new-jersey", "new-mexico", "new-york", "north-carolina", "north-dakota", "ohio", 
  "oklahoma", "oregon", "pennsylvania", "rhode-island", "south-carolina", "south-dakota", 
  "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west-virginia", 
  "wisconsin", "wyoming"
];

function capitalize(str: string) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateStaticParams() {
  return STATES.map((state) => ({
    state: state,
  }));
}

export async function generateMetadata({ params }: { params: { state: string } }): Promise<Metadata> {
  const stateName = capitalize(params.state);
  return {
    title: `Enterprise Freight Forwarder & Logistics in ${stateName} | Best Internation`,
    description: `Top-rated B2B logistics, freight forwarding, and supply chain management services in ${stateName}. Scale your enterprise operations with our global network.`,
    keywords: `Freight Forwarder ${stateName}, Logistics Company ${stateName}, B2B Supply Chain ${stateName}, Shipping ${stateName}, Enterprise Freight`,
    alternates: {
      canonical: `/locations/${params.state}`,
    }
  };
}

export default function LocationPage({ params }: { params: { state: string } }) {
  if (!STATES.includes(params.state)) {
    notFound();
  }

  const stateName = capitalize(params.state);

  return (
    <main className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-[#0D1B2A] py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/hero_logistics.png" 
            alt={`Logistics in ${stateName}`}
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-semibold text-sm tracking-wider uppercase mb-6">
            <MapPin size={16} /> Serving {stateName}
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-tight">
            Enterprise Freight Forwarding in <span className="text-[#FF6A00]">{stateName}</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
            Streamline your B2B supply chain with our specialized logistics infrastructure in {stateName}. We provide reliable, high-volume freight coordination for manufacturing, retail, and e-commerce leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-[#FF6A00] text-white hover:bg-orange-600 px-8 py-4 rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-2">
              Request a Custom Quote <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Contextualized for State */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0D1B2A] mb-4">
              Comprehensive Supply Chain Solutions for {stateName} Businesses
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Whether you are importing components or exporting finished goods from {stateName}, our dedicated teams ensure absolute precision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <Truck className="text-[#FF6A00] mb-6" size={40} />
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">Ground & Intermodal</h3>
              <p className="text-gray-600">Extensive domestic road and rail networks connecting {stateName} to every major North American market and port.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <ShieldCheck className="text-[#FF6A00] mb-6" size={40} />
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">Customs Compliance</h3>
              <p className="text-gray-600">Expert handling of complex trade regulations and tariffs for importers stationed in {stateName}.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <TrendingUp className="text-[#FF6A00] mb-6" size={40} />
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-3">Scalable Warehousing</h3>
              <p className="text-gray-600">Strategic storage and fulfillment hubs designed to handle peak-season B2B enterprise volume.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-[#0D1B2A] mb-6">Ready to scale your logistics operations in {stateName}?</h2>
          <p className="text-gray-600 text-lg mb-10">Don't let supply chain bottlenecks limit your growth. Partner with the industry experts.</p>
          <Link href="/contact" className="bg-[#0D1B2A] text-white hover:bg-navy-light px-8 py-4 rounded-lg font-bold transition-all shadow-lg inline-block">
            Speak With A Logistics Architect
          </Link>
        </div>
      </section>
    </main>
  );
}
