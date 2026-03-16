"use client";

import Link from "next/link";
import { useState } from "react";
import siteData from "@/content/site.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🏠</span>
            <span className="text-xl md:text-2xl font-bold gradient-text">
              {siteData.name}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {siteData.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-accent-yellow)]/30 hover:text-[var(--color-primary)] transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#rekrutacja"
              className="ml-2 px-5 py-2.5 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-light)] transition-colors shadow-md hover:shadow-lg"
            >
              Zapisz dziecko
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-[var(--color-text)] transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white border-t border-gray-100">
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-accent-yellow)]/20 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#rekrutacja"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold mt-2"
          >
            Zapisz dziecko
          </Link>
        </div>
      </div>
    </nav>
  );
}
