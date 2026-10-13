"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { POLICY_PATH } from "@/content/privacy";
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
      className="fixed inset-x-0 bottom-[4.5rem] lg:bottom-0 z-[70] p-3 sm:p-5 pointer-events-none"
    >
      <div className="card pointer-events-auto shadow-2xl p-4 md:p-6 max-w-2xl lg:ml-3 lg:mr-auto max-h-[calc(100dvh-6rem)] overflow-y-auto">
        <h2 id="cookie-consent-title" className="text-lg font-semibold mb-1.5">
          Pliki cookies
        </h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed">
          Niezbędne cookies zapewniają działanie strony. Analityczne i marketingowe (np. Google Ads)
          włączymy tylko za Twoją zgodą — zmienisz ją w stopce, w „Ustawieniach cookies”.{" "}
          <Link href={POLICY_PATH} className="font-semibold underline underline-offset-2">
            Polityka prywatności
          </Link>
          .
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

        <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
          {showSettings ? (
            <button
              type="button"
              onClick={() => decide(draft)}
              className="btn btn-secondary !py-2.5 !px-5 text-sm"
            >
              Zapisz wybór
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowSettings(true)}
              className="btn btn-secondary !py-2.5 !px-5 text-sm"
            >
              Ustawienia
            </button>
          )}
          <button
            type="button"
            onClick={() => decide({ analytics: false, marketing: false })}
            className="btn btn-secondary !py-2.5 !px-5 text-sm"
          >
            Tylko niezbędne
          </button>
          <button
            type="button"
            onClick={() => decide({ analytics: true, marketing: true })}
            className="btn btn-primary !py-2.5 !px-5 text-sm"
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
      className={`flex items-start gap-3 rounded-2xl bg-[var(--color-foam)] border border-[var(--color-line)] px-4 py-3 ${
        disabled ? "" : "cursor-pointer"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={disabled ? "sr-only" : "mt-1 h-4 w-4 shrink-0 accent-[var(--color-sea)]"}
      />
      <span>
        <span className="flex items-center gap-2 text-sm font-semibold">
          {title}
          {disabled && (
            <span className="rounded-full bg-[var(--color-sea)] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              zawsze aktywne
            </span>
          )}
        </span>
        <span className="block text-xs text-[var(--color-muted)]">{description}</span>
      </span>
    </label>
  );
}
