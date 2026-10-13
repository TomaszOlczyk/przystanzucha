"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

/** Link w stopce — ponownie otwiera baner zgód. */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      Ustawienia cookies
    </button>
  );
}
