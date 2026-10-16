"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { trackFormStart, trackLead } from "@/lib/analytics";
import { POLICY_PATH } from "@/lib/site";

interface ConsultationFormProps {
  email: string;
  phone: string;
}

const EMPTY = { name: "", phone: "", email: "", preferredTime: "", message: "" };

export default function ConsultationForm({ email, phone }: ConsultationFormProps) {
  const [formData, setFormData] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const tel = phone.replace(/\s/g, "");

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    trackFormStart("konsultacja");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "consultation", ...getAttribution() }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Błąd wysyłania");
      trackLead("konsultacja");
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Nieznany błąd";
      setError(`${msg}. Spróbuj ponownie albo zadzwoń: ${phone}.`);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#fffdf9] border border-[var(--color-line)] p-8 md:p-12" role="status">
        <p className="t-label !text-[var(--color-coral-dark)] mb-3">Zgłoszenie wysłane</p>
        <h2 className="t-title !text-[2.2rem] mb-4">Dziękujemy!</h2>
        <p className="text-[var(--color-muted)]">
          Oddzwonimy w ciągu 24 godzin, żeby ustalić termin spotkania. Możesz też zadzwonić od razu:{" "}
          <a href={`tel:${tel}`} data-loc="konsultacja_sukces" className="font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={onFocus} className="relative bg-[#fffdf9] border border-[var(--color-line)] p-6 md:p-10">
      <div className="space-y-7">
        <div>
          <label htmlFor="kf-name" className="t-label !flex">Imię i nazwisko</label>
          <input id="kf-name" type="text" required autoComplete="name" value={formData.name} onChange={set("name")} className="field" />
        </div>
        <div>
          <label htmlFor="kf-phone" className="t-label !flex">Telefon</label>
          <input
            id="kf-phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[\d\s+\(\)\-]{9,}"
            title="Podaj numer telefonu (min. 9 cyfr)"
            value={formData.phone}
            onChange={set("phone")}
            className="field"
          />
        </div>
        <div>
          <label htmlFor="kf-email" className="t-label !flex">
            E-mail <span className="normal-case tracking-normal font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <input id="kf-email" type="email" autoComplete="email" value={formData.email} onChange={set("email")} className="field" />
        </div>
        <div>
          <label htmlFor="kf-time" className="t-label !flex">Kiedy Ci pasuje?</label>
          <select id="kf-time" value={formData.preferredTime} onChange={set("preferredTime")} className="field">
            <option value="">Obojętnie</option>
            <option value="rano">Rano (8:00–12:00)</option>
            <option value="popołudnie">Popołudnie (12:00–16:00)</option>
          </select>
        </div>
        <div>
          <label htmlFor="kf-msg" className="t-label !flex">
            O czym chcesz porozmawiać? <span className="normal-case tracking-normal font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <textarea id="kf-msg" rows={3} value={formData.message} onChange={set("message")} className="field resize-none" placeholder="np. adaptacja, Grupa 2, potrzeby dziecka" />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[var(--color-coral-dark)]" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn btn-primary w-full mt-9 disabled:opacity-60">
        {sending ? "Wysyłanie…" : <>Umów spotkanie <span className="arr">→</span></>}
      </button>
      <p className="text-center text-xs text-[var(--color-muted)] mt-3 leading-relaxed">
        Administratorem danych jest Przystań Zucha sp. z o.o. Dane przetwarzamy w celu odpowiedzi na zgłoszenie.{" "}
        <Link href={POLICY_PATH} className="underline underline-offset-4">
          Polityka prywatności
        </Link>
        .
        <br />
        Wolisz napisać? <a href={`mailto:${email}`} data-loc="konsultacja" className="underline underline-offset-4">{email}</a>
      </p>
    </form>
  );
}
