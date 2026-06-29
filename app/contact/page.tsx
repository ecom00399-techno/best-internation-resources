"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("https://formspree.io/f/mnjwdvyw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: "General Contact" }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Header */}
      <section className="bg-navy py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Contact Our Global Logistics Experts</h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          Our global logistics experts are ready to assist you. Reach out today.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-light flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-navy mb-6">Partner With Our Support Team</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Whether you have a question about our freight services or need immediate supply chain support, our team is here for you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-orange mr-4 flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy mb-1">Headquarters</h4>
                    <p className="text-gray-600 text-sm">Best Internation Resources LLC<br/>30 N Gould St Ste R<br/>Sheridan, WY 82801</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-orange mr-4 flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy mb-1">Phone</h4>
                    <a href="tel:+18285705669" className="text-gray-600 text-sm hover:text-orange transition-colors">+1 828-570-5669</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-orange mr-4 flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-navy mb-1">Email</h4>
                    <a href="mailto:Support@bestinternationresources.com" className="text-gray-600 text-sm hover:text-orange transition-colors">Support@bestinternationresources.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-8">
                <h4 className="font-heading font-bold text-navy mb-3">Global Operations Desk</h4>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span>Monday - Friday:</span> <span className="font-medium text-navy">24 Hours</span></li>
                  <li className="flex justify-between border-b border-gray-50 pb-2"><span>Saturday:</span> <span className="font-medium text-navy">On Call</span></li>
                  <li className="flex justify-between pb-1"><span>Sunday:</span> <span className="font-medium text-navy">On Call</span></li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {status === "success" ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center min-h-[500px]">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-navy mb-2">Message Received!</h3>
                  <p className="text-gray-600 mb-8 max-w-sm">Thank you for reaching out. One of our logistics specialists will get back to you shortly.</p>
                  <button 
                    onClick={() => setStatus("idle")}
                    className="bg-navy text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-light transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-navy mb-6">Send a Message</h3>
                  
                  {status === "error" && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
                      There was an error submitting your request. Please try again or email us directly.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input 
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                        placeholder="Company LLC"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" name="subject" value={formData.subject} onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea 
                      name="message" required value={formData.message} onChange={handleChange} rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all resize-none"
                      placeholder="Tell us about your inquiry..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" disabled={status === "loading"}
                    className="w-full bg-orange hover:bg-orange-hover text-white py-4 rounded-lg font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 text-lg"
                  >
                    {status === "loading" ? "Sending..." : (
                      <>Send Message <Send size={20} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </section>

      <section className="h-[380px] w-full bg-navy relative overflow-hidden">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=-106.9630%2C44.7910%2C-106.9480%2C44.8050&layer=mapnik&marker=44.7980%2C-106.9555"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "grayscale(20%) contrast(1.1)" }}
          loading="lazy"
          title="Office Location - Sheridan, Wyoming"
        ></iframe>
        <div className="absolute bottom-4 left-4 bg-navy/90 backdrop-blur text-white px-4 py-3 rounded-xl shadow-lg border border-white/10 text-sm">
          <p className="font-bold text-orange">Best Internation Resources LLC</p>
          <p className="text-gray-300">30 N Gould St Ste R, Sheridan, WY 82801</p>
          <a
            href="https://maps.google.com/?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange hover:text-orange/80 text-xs mt-1 inline-block"
          >
            Open in Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}
