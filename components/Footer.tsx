"use client";
import Link from "next/link";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy text-white pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange via-orange-hover to-orange"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-white/[0.02] rounded-full"></div>
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/[0.02] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <NextImage 
                src="/logo.png" 
                alt="Best Internation Resources Logo" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner for global logistics coordination and powerful digital marketing growth solutions since 2019.
            </p>
            <div className="flex gap-3">
              <a href="tel:+18285705669" className="w-10 h-10 bg-white/5 hover:bg-orange/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange transition-all">
                <Phone size={18} />
              </a>
              <a href="mailto:Support@bestinternationresources.com" className="w-10 h-10 bg-white/5 hover:bg-orange/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange transition-all">
                <Mail size={18} />
              </a>
              <a href="https://maps.google.com/?q=30+N+Gould+St+Ste+R+Sheridan+WY+82801" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-orange/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-orange transition-all">
                <MapPin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Quick Links
              <span className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: "Industries", path: "/industries" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
                { name: "Request Quote", path: "/quote" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-orange transition-colors flex items-center gap-1 group text-sm">
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Services
              <span className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Freight Coordination", path: "/services#freight" },
                { name: "Supply Chain Management", path: "/services#supply-chain" },
                { name: "Import & Export Support", path: "/services#import-export" },
                { name: "Warehousing Solutions", path: "/services#warehousing" },
                { name: "Distribution Support", path: "/services#distribution" },
                { name: "Logistics Consulting", path: "/services#consulting" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.path} className="text-gray-400 hover:text-orange transition-colors flex items-center gap-1 group text-sm">
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              Contact Us
              <span className="flex-1 h-px bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                  <MapPin className="text-orange" size={14} />
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">30 N Gould St Ste R<br />Sheridan, WY 82801</span>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone className="text-orange" size={14} />
                </div>
                <a href="tel:+18285705669" className="text-gray-400 hover:text-white transition-colors text-sm">+1 828-570-5669</a>
              </li>
              <li className="flex items-center">
                <div className="w-8 h-8 bg-orange/10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail className="text-orange" size={14} />
                </div>
                <a href="mailto:Support@bestinternationresources.com" className="text-gray-400 hover:text-white transition-colors text-sm">Support@bestinternationresources.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Best Internation Resources LLC. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
