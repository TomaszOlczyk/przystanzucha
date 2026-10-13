"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  OPEN_CONSENT_EVENT,
  parseConsent,
  readConsentRaw,
  saveConsent,
  subscribeConsent,
  type ConsentChoice,
} from "@/lib/analytics";

// Na serwerze nie wiemy, czy jest zapisany wybór — baner pojawia się dopiero po hydracji.
const SSR_SNAPSHOT = "__ssr__";

/** Baner zgód (Consent Mode v2). Brak wyboru = wszystko poza niezbędnymi odrzucone. */
export default function CookieConsent() {
  const raw = useSyncExternalStore(subscribeConsent, readConsentRaw, () => SSR_SNAPSHOT);
  const saved = raw === SSR_SNAPSHOT ? null : parseConsent(raw);
  const [reopened, setReopened] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<ConsentChoice>({ analytics: false, marketing: false });

  useEffect(() => {
    const open = () => {
      const current = parseConsent(readConsentRaw());
      setDraft(current ?? { analytics: false, marketing: false });
      setShowSettings(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  const visible = raw !== SSR_SNAPSHOT && (reopened || !saved);
  if (!visible) return null;

  const decide = (choice: ConsentChoice) => {
    saveConsent(choice);
    setReopened(false);
    setShowSettings(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-5 pointer-events-none"
    >
      <div className="glass-strong pointer-events-auto rounded-3xl shadow-2xl shadow-purple-500/10 p-5 md:p-6 max-w-2xl mx-auto max-h-[calc(100dvh-1.5rem)] overflow-y-auto">
        <h2 id="cookie-consent-title" className="text-lg font-bold mb-1.5">
          🍪 Pliki cookies
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          Używamy plików cookies niezbędnych do działania strony. Za Twoją zgodą użyjemy też
          cookies analitycznych (statystyki odwiedzin) i marketingowych (pomiar skuteczności
          reklam, np. Google Ads). Zgodę możesz w każdej chwili zmienić w stopce strony —
          „Ustawienia cookies”.
        </p>

        {showSettings && (
          <div className="mt-4 space-y-2.5">
            <ConsentRow
              title="Niezbędne"
              description="Zapewniają działanie strony i zapamiętują Twój wybór. Zawsze włączone."
              checked
              disabled
            />
            <ConsentRow
              title="Analityczne"
              description="Pomagają nam zrozumieć, jak korzystasz ze strony (Google Analytics)."
              checked={draft.analytics}
              onChange={(v) => setDraft({ ...draft, analytics: v })}
            />
            <ConsentRow
              title="Marketingowe"
              description="Pozwalają mierzyć skuteczność reklam i dopasować je do zainteresowań (np. Google Ads)."
              checked={draft.marketing}
              onChange={(v) => setDraft({ ...draft, marketing: v })}
            />
          </div>
        )}

        <div className="mt-5 flex flex-col-reverse sm:flex-row gap-2.5 sm:justify-end">
          {showSettings ? (
            <button
              type="button"
              onClick={() => decide(draft)}
              className="px-5 py-3 rounded-xl glass text-sm font-semibold hover:bg-white/80 transition-colors"
            >
              Zapisz wybór
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="px-5 py-3 rounded-xl glass text-sm font-semibold hover:bg-white/80 transition-colors"
            >
              Ustawienia
            </button>
          )}
          <button
            type="button"
            onClick={() => decide({ analytics: false, marketing: false })}
            className="px-5 py-3 rounded-xl glass text-sm font-semibold hover:bg-white/80 transition-colors"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: true, marketing: true })}
            className="px-5 py-3 rounded-xl btn-gradient text-sm font-bold"
          >
            Akceptuję wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}

function ConsentRow({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-2xl bg-white/50 border border-white/80 px-4 py-3 ${
        disabled ? "" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={disabled ? "sr-only" : "mt-1 h-4 w-4 shrink-0 accent-purple-500"}
      />
      <span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          {title}
          {disabled && (
            <span className="rounded-full btn-gradient px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              zawsze aktywne
            </span>
          )}
        </span>
        <span className="block text-xs text-[var(--color-text-secondary)]">{description}</span>
      </span>
    </label>
  );
}
