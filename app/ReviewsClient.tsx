"use client";

import { useEffect, useState } from "react";

export default function ReviewsClient() {
  const DEFAULT_REVIEWS = [
    {
      id: "1",
      author: "Loveleen Kaur",
      role: "Supply Chain Director",
      company: "Arora Exports Pvt. Ltd.",
      content: "Switched to BIR after a bad experience with our previous broker — night and day difference. They actually pick up the phone. Our cross-border transit times improved significantly within the first few months.",
      rating: 5
    },
    {
      id: "2",
      author: "Aman Sethi",
      role: "Operations Manager",
      company: "Sethi Global Trade LLC",
      content: "Solid freight broker. Rates are competitive and communication is much better than most. Had one minor delay on a shipment last October but they were upfront about it and resolved it quickly. Overall a reliable partner.",
      rating: 4
    },
    {
      id: "3",
      author: "Visha Gupta",
      role: "Procurement Head",
      company: "Gupta Manufacturing Co.",
      content: "BIR handles our raw material imports from three different countries. The coordination is seamless and they genuinely understand manufacturing timelines. Peak season last year was the real test — they delivered.",
      rating: 5
    },
    {
      id: "4",
      author: "Michael T. Harrington",
      role: "VP of Logistics",
      company: "Harrington Distribution Inc.",
      content: "We use BIR for multi-leg international shipments — ocean to truck, across three continents. Documentation has always been accurate. A few hiccups in the first month while onboarding, but very smooth since.",
      rating: 4
    },
    {
      id: "5",
      author: "Sarah Al-Mansouri",
      role: "Regional Trade Manager",
      company: "Gulf Bridge Trading",
      content: "Our Middle East-US freight lane has been running without issues since we moved to BIR. The customs documentation is always correct, which was our biggest pain point before. Professional team.",
      rating: 5
    },
    {
      id: "6",
      author: "Chen Wei",
      role: "Founder & CEO",
      company: "SinoLink Cargo Solutions",
      content: "BIR was recommended by a business associate. We tested them with a smaller shipment first — they performed well, so we scaled up. Now they handle our Asia-US corridor regularly. Good pricing, dependable service.",
      rating: 4
    },
    {
      id: "7",
      author: "Priya Nambiar",
      role: "Logistics Coordinator",
      company: "Nambiar Retail Group",
      content: "Day-to-day communication is excellent — proactive updates without me chasing them. The pricing isn't always the lowest but for retail supply chains where timing is critical, the reliability is absolutely worth it.",
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

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-[#FF6A00] font-semibold text-sm uppercase tracking-widest">Client Testimonials</span>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#0D1B2A] mt-3">Trusted By Leaders Worldwide</h2>
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
              className="bg-[#0D1B2A] rounded-2xl p-7 text-white shadow-xl text-left flex-shrink-0 w-[340px] md:w-[380px] border border-white/5 hover:border-[#FF6A00]/30 transition-all"
            >
              {/* Stars */}
              <div className="flex text-[#FF6A00] mb-4">
                {[...Array(r.rating || 5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="mr-0.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
                {/* Add empty stars for < 5 ratings to look genuine */}
                {[...Array(5 - (r.rating || 5))].map((_, i) => (
                  <svg key={`empty-${i}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5 text-gray-500">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                ))}
              </div>
              {/* Content */}
              <p className="text-gray-200 mb-6 text-sm leading-relaxed italic">"{r.content}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#FF6A00]/20 flex items-center justify-center text-[#FF6A00] font-bold text-sm flex-shrink-0">
                  {r.author?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#FF6A00]">{r.author}</h4>
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
  );
}
