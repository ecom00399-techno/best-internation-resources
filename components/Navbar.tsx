"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Menu, X, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  const links = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <NextImage 
                src="/logo.png" 
                alt="Best Internation Resources Logo" 
                width={200} 
                height={60} 
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`relative px-4 py-2 rounded-lg text-sm uppercase tracking-wider font-medium transition-all duration-200 ${
                  pathname === link.path 
                    ? "text-orange bg-orange/5" 
                    : "text-navy hover:text-orange hover:bg-orange/5"
                }`}
              >
                {link.name}
                {pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-orange rounded-full"></span>
                )}
              </Link>
            ))}
            <div className="w-px h-8 bg-gray-200 mx-2"></div>
            <a href="tel:+18285705669" className="flex items-center gap-2 text-navy hover:text-orange text-sm font-medium transition-colors px-3 py-2">
              <Phone size={16} /> +1 828-570-5669
            </a>
            <Link
              href="/quote"
              className="bg-orange hover:bg-orange-hover text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 ml-2 whitespace-nowrap"
            >
              Get a Quote
            </Link>
          </div>
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navy hover:text-orange focus:outline-none p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border-t px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                pathname === link.path
                  ? "text-orange bg-orange/5"
                  : "text-navy hover:text-orange hover:bg-gray-50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="block w-full text-center mt-4 bg-orange text-white px-3 py-3 rounded-lg font-medium shadow-md"
            onClick={() => setIsOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
