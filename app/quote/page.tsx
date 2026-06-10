"use client";
import { useState, Suspense } from "react";
import { Send, CheckCircle, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";

function QuoteForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get("service") || "freight";
  const defaultIndustry = searchParams.get("industry") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: defaultIndustry,
    service: defaultService,
    details: "",
    timeline: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      // Using Formspree endpoint as requested
      const res = await fetch("https://formspree.io/f/mnjwdvyw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "Quote Request" }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      // Also try to save to local DB if backend is running (optional/fallback)
      try {
        await fetch("/api/quotes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
      } catch (e) {
        // Ignore DB error if just static hosting
      }
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", industry: "", service: "freight", details: "", timeline: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center shadow-lg max-w-3xl mx-auto mt-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-green-600" size={40} />
        </div>
        <h3 className="text-3xl font-heading font-bold text-navy mb-4">Quote Request Received!</h3>
        <p className="text-gray-600 mb-8 text-lg">Thank you for considering Best Internation Resources. Our logistics experts will review your details and contact you shortly with a comprehensive proposal.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-light transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12 mt-12">
      <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
        <div className="w-16 h-16 bg-orange/10 text-orange rounded-2xl flex items-center justify-center flex-shrink-0">
          <Package size={32} />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy">Logistics Quote Request</h2>
          <p className="text-gray-500 mt-1">Fill out the details below for a customized proposal.</p>
        </div>
      </div>

      {status === "error" && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-100 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0"></div>
          There was an error submitting your request. Please try again or contact us directly at +1 828-570-5669.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-heading font-bold text-navy mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input 
                type="text" name="name" required value={formData.name} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input 
                type="email" name="email" required value={formData.email} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input 
                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
              <input 
                type="text" name="company" value={formData.company} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                placeholder="Global Trade LLC"
              />
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div>
          <h4 className="text-lg font-heading font-bold text-navy mb-4">Logistics Requirements</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Service Needed *</label>
              <select 
                name="service" value={formData.service} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white"
              >
                <option value="freight">Freight Broker</option>
                <option value="supply-chain">Supply Chain Management</option>
                <option value="import-export">Import & Export Support</option>
                <option value="warehousing">Warehousing Solutions</option>
                <option value="distribution">Distribution Support</option>
                <option value="consulting">Logistics Consulting</option>
                <option value="other">Other / Multiple</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
              <select 
                name="industry" value={formData.industry} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white"
              >
                <option value="">Select an industry...</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="retail">Retail</option>
                <option value="distribution">Distribution</option>
                <option value="warehousing">Warehousing</option>
                <option value="import-export">Import & Export</option>
                <option value="ecommerce">E-commerce</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
            <select 
              name="timeline" value={formData.timeline} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white"
            >
              <option value="">Select timeline...</option>
              <option value="immediate">Immediate (ASAP)</option>
              <option value="1-month">Within 1 Month</option>
              <option value="3-months">1-3 Months</option>
              <option value="planning">Just Planning / Pricing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Details / Cargo Specs *</label>
            <textarea 
              name="details" required value={formData.details} onChange={handleChange} rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all resize-none"
              placeholder="Please provide details about your freight volume, preferred routes, warehousing needs, or specific supply chain challenges..."
            ></textarea>
          </div>
        </div>

        <button 
          type="submit" disabled={status === "loading"}
          className="w-full bg-orange hover:bg-orange-hover text-white py-4 rounded-lg font-bold text-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
        >
          {status === "loading" ? "Submitting Request..." : (
            <>Request Custom Quote <Send size={20} /></>
          )}
        </button>
      </form>
    </div>
  );
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gray-light pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto pt-10">
          <span className="inline-block py-1 px-3 rounded-full bg-navy/10 text-navy font-semibold text-sm tracking-wider uppercase mb-4">
            Partner With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-navy mb-4">Request a Proposal</h1>
          <p className="text-gray-600 text-lg">
            Let's discuss how Best Internation Resources can optimize your supply chain. Provide your details below for a comprehensive logistics quote.
          </p>
        </div>
        
        <Suspense fallback={<div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-12 mt-12 text-center text-gray-500">Loading form...</div>}>
          <QuoteForm />
        </Suspense>
      </div>
    </div>
  );
}
