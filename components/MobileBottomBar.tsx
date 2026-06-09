"use client";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileBottomBar() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 md:hidden pb-safe">
      <div className="flex h-16">
        <a 
          href="tel:+18285705669" 
          className="flex-1 flex flex-col items-center justify-center text-navy hover:bg-gray-50 transition-colors border-r border-gray-200"
        >
          <Phone size={20} className="mb-1" />
          <span className="text-[11px] font-medium uppercase tracking-wide">Call Now</span>
        </a>
        <Link 
          href="/contact" 
          className="flex-1 flex flex-col items-center justify-center bg-orange text-white hover:bg-orange-hover transition-colors"
        >
          <Mail size={20} className="mb-1" />
          <span className="text-[11px] font-medium uppercase tracking-wide">Get Quote</span>
        </Link>
      </div>
    </div>
  );
}
