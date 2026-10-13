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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        scrolled || isOpen ? "bg-[var(--color-paper)]/92 backdrop-blur-md shadow-[0_1px_0_var(--color-line)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Główna nawigacja" className="max-w-[1200px] mx-auto px-5 lg:px-10 flex items-center justify-between h-16 md:h-[4.5rem]">
        <Link href="/" aria-label={`${siteData.name}, strona główna`} onClick={() => setIsOpen(false)}>
          <Logo name={siteData.name} />
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-[0.92rem] font-semibold">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="group relative py-1">
              {item.label}
              <span className="absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[var(--color-coral)] scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a href={`tel:${tel}`} data-loc="naglowek" className="hidden lg:inline font-bold text-[0.95rem]">
            {siteData.phone.replace("+48 ", "")}
          </a>
          <Link href="/#kontakt" data-cta="umow_wizyte" data-loc="naglowek" className="btn btn-dark hidden sm:inline-flex !py-3 !px-5 text-[0.92rem]">
            Umów wizytę <span className="arr">→</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden -mr-2 w-11 h-11 flex items-center justify-center"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
          >
            <span className="w-7 h-3 flex flex-col justify-between" aria-hidden="true">
              <span className={`block h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300 ${isOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] bg-[var(--color-ink)] transition-transform duration-300 ${isOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <div id="menu-mobile" hidden={!isOpen} className="lg:hidden h-[calc(100dvh-4rem)] bg-[var(--color-paper)] border-t border-[var(--color-line)]">
        <div className="px-5 pt-8 pb-28 flex flex-col h-full">
          <ol className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setIsOpen(false)} className="flex items-baseline gap-4 py-2">
                  <span className="t-label !text-[var(--color-coral)] w-7">0{i + 1}</span>
                  <span className="t-display !text-[2.5rem]">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-auto space-y-3 text-[var(--color-ink-soft)]">
            <p>{siteData.address.street}, {siteData.address.city}</p>
            <a href={`tel:${tel}`} data-loc="menu" className="link-u text-[var(--color-ink)] text-xl">
              {siteData.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}
