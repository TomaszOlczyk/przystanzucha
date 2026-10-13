"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import type { SiteSettings } from "@/sanity/types";
import { nav } from "@/content/home";
import Logo from "./Logo";

export default function Navbar({ siteData }: { siteData: SiteSettings }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const tel = siteData.phone.replace(/\s/g, "");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || isOpen ? "bg-[var(--color-sand)]/95 backdrop-blur shadow-[0_1px_0_var(--color-line)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Główna nawigacja" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <Link href="/" aria-label={`${siteData.name} — strona główna`} onClick={() => setIsOpen(false)}>
          <Logo name={siteData.name} />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 rounded-full text-[0.95rem] font-semibold text-[var(--color-ink-soft)] hover:text-[var(--color-sea-dark)] hover:bg-[var(--color-foam)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a href={`tel:${tel}`} data-loc="naglowek" className="ml-3 font-bold text-[var(--color-sea-dark)] hover:underline underline-offset-4">
            {siteData.phone}
          </a>
          <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="naglowek" className="btn btn-primary ml-4 !py-2.5 !px-5 text-sm">
            Umów wizytę
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${tel}`}
            data-loc="naglowek"
            aria-label={`Zadzwoń: ${siteData.phone}`}
            className="w-11 h-11 rounded-full bg-[var(--color-foam)] text-[var(--color-sea-dark)] flex items-center justify-center"
          >
            <PhoneIcon />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-[var(--color-foam)]"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            <span className="w-6 h-4 flex flex-col justify-between" aria-hidden="true">
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-opacity ${isOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div id="menu-mobile" hidden={!isOpen} className="lg:hidden border-t border-[var(--color-line)] bg-[var(--color-sand)]">
        <div className="px-4 py-4 space-y-1 max-w-6xl mx-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-lg font-semibold hover:bg-[var(--color-foam)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#kontakt"
            onClick={() => setIsOpen(false)}
            data-cta="umow_wizyte"
            data-loc="menu"
            className="btn btn-primary w-full mt-3"
          >
            Umów bezpłatną wizytę
          </Link>
        </div>
      </div>
    </header>
  );
}

export function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
