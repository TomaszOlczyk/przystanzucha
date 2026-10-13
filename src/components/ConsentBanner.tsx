"use client";

import { useEffect, useState } from "react";
import { applyConsent, readConsent } from "./Analytics";

export const OPEN_CONSENT_EVENT = "pz:zgody";

/** Baner zgód (RODO + Google Consent Mode v2). Domyślnie wszystko poza niezbędnymi jest wyłączone. */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    // Baner pokazujemy chwilę po załadowaniu, żeby nie był elementem LCP i nie zasłaniał hero od pierwszej klatki.
    const timer = window.setTimeout(() => {
      const stored = readConsent();
      if (!stored) setOpen(true);
      else {
        setAnalytics(stored.analytics);
        setMarketing(stored.marketing);
      }
    }, 800);
    const reopen = () => {
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
    };
  }, []);

  if (!open) return null;

  const save = (a: boolean, m: boolean) => {
    applyConsent({ analytics: a, marketing: m });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Ustawienia plików cookies"
      className="fixed inset-x-3 bottom-[5.25rem] lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-md z-[70] card shadow-2xl p-4 md:p-5 text-sm"
    >
      <p className="font-display text-base md:text-lg font-semibold mb-1">Szanujemy Twoją prywatność</p>
      <p className="text-[var(--color-muted)] leading-relaxed">
        Cookies statystyczne i reklamowe włączymy tylko za Twoją zgodą. Zmienisz ją w każdej chwili w stopce.
      </p>

      {details && (
        <div className="mt-4 space-y-3">
          <label className="flex items-start gap-3">
            <input type="checkbox" checked disabled className="mt-1 accent-[var(--color-sea)]" />
            <span><strong>Niezbędne</strong> — działanie strony i formularza. Zawsze włączone.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-1 accent-[var(--color-sea)]" />
            <span><strong>Statystyczne</strong> — Google Analytics: jak rodzice korzystają ze strony.</span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="mt-1 accent-[var(--color-sea)]" />
            <span><strong>Marketingowe</strong> — Google Ads i Meta: skuteczność reklam.</span>
          </label>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button onClick={() => save(true, true)} className="btn btn-primary !py-2.5 !px-5 text-sm">
          Akceptuję wszystkie
        </button>
        {details ? (
          <button onClick={() => save(analytics, marketing)} className="btn btn-secondary !py-2.5 !px-5 text-sm">
            Zapisz wybór
          </button>
        ) : (
          <button onClick={() => setDetails(true)} className="btn btn-secondary !py-2.5 !px-5 text-sm">
            Ustawienia
          </button>
        )}
        <button onClick={() => save(false, false)} className="px-3 py-2.5 text-sm font-semibold text-[var(--color-muted)] underline underline-offset-4">
          Tylko niezbędne
        </button>
      </div>
    </div>
  );
}
