"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import siteData from "@/content/site.json";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-lg shadow-purple-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl btn-gradient flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="text-xl font-extrabold gradient-text">
              {siteData.name}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {siteData.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text)] hover:bg-white/50 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#kontakt"
              className="ml-3 px-6 py-2.5 rounded-full btn-gradient text-sm font-semibold"
            >
              Zapisz dziecko
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/40 transition-colors"
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

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 glass-strong mx-2 rounded-2xl mt-1">
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-[var(--color-text)] hover:bg-white/50 font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={() => setIsOpen(false)}
            className="block text-center px-4 py-3 rounded-xl btn-gradient font-semibold mt-2"
          >
            Zapisz dziecko
          </Link>
        </div>
      </div>
    </nav>
  );
}
