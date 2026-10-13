"use client";

import { useState } from "react";

/**
 * Mapa Google ładowana dopiero po kliknięciu (iframe Google ustawia własne cookies — bez kliknięcia nic nie wysyłamy).
 * Do tego czasu rysunek kreską z pinezką.
 */
export default function MapEmbed({ query, label }: { query: string; label: string }) {
  const [show, setShow] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

  return (
    <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-[10px] border border-[var(--color-line)] bg-[#e7eee9]">
      {show ? (
        <iframe title={`Mapa: ${label}`} src={src} className="absolute inset-0 w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <button
          type="button"
          onClick={() => setShow(true)}
          data-cta="pokaz_mape"
          data-loc="dojazd"
          className="group absolute inset-0 w-full h-full text-left"
          aria-label="Pokaż mapę Google"
        >
          <svg viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
            <g fill="none" stroke="#c9d6cd" strokeWidth="14" strokeLinecap="round">
              <path d="M-20 230 C 80 210, 160 250, 260 220 S 380 200, 430 210" />
              <path d="M120 -20 C 130 80, 110 170, 150 340" />
              <path d="M300 -20 C 290 90, 320 180, 290 340" />
            </g>
            <g fill="none" stroke="#dbe3dc" strokeWidth="6" strokeLinecap="round">
              <path d="M-20 90 L 430 120" />
              <path d="M210 -20 L 230 340" />
            </g>
            <g fill="#f6f0e6" stroke="#16252e" strokeWidth="1.5">
              <rect x="176" y="96" width="44" height="78" rx="3" />
              <path d="M184 108h8M200 108h8M184 122h8M200 122h8M184 136h8M200 136h8M184 150h8M200 150h8" />
              <rect x="192" y="160" width="12" height="14" fill="#c24a2b" stroke="none" />
            </g>
            <g transform="translate(198 64)">
              <path d="M0 26 C -14 10, -14 -6, 0 -10 C 14 -6, 14 10, 0 26Z" fill="#c24a2b" />
              <circle cx="0" cy="2" r="4.5" fill="#fff" />
            </g>
          </svg>
          <span className="absolute left-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.92rem] font-semibold shadow-md transition-transform group-hover:-translate-y-0.5">
            Pokaż mapę Google
          </span>
        </button>
      )}
    </div>
  );
}
