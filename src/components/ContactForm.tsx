"use client";

import { useRef, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { track, trackLead } from "@/lib/track";

interface ContactFormProps {
  email: string;
  phone: string;
  recruitmentYear: string;
}

const EMPTY = { parentName: "", phone: "", childAge: "", group: "", email: "" };

export default function ContactForm({ email, phone, recruitmentYear }: ContactFormProps) {
  const [formData, setFormData] = useState(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const started = useRef(false);
  const tel = phone.replace(/\s/g, "");

  const set = (key: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [key]: e.target.value });

  const onFocus = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form: "rekrutacja" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recruitmentYear, ...getAttribution() }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Błąd wysyłania");
      trackLead("rekrutacja", { group: formData.group || "nie_wiem" });
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
      <div className="card p-8 md:p-10 text-center" role="status">
        <div className="w-14 h-14 rounded-full bg-[var(--color-sea-light)] text-[var(--color-sea-dark)] flex items-center justify-center mx-auto mb-5 text-2xl font-bold" aria-hidden="true">
          ✓
        </div>
        <h3 className="text-2xl font-semibold mb-2">Dziękujemy, mamy Twoje zgłoszenie</h3>
        <p className="text-[var(--color-muted)]">
          Oddzwonimy w ciągu 24 godzin (w dni robocze). Jeśli wolisz od razu porozmawiać — zadzwoń:{" "}
          <a href={`tel:${tel}`} data-loc="formularz_sukces" className="font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} onFocus={onFocus} className="card p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(20,50,74,0.35)]">
      <div className="space-y-4">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-bold mb-1.5">Twoje imię</label>
          <input id="cf-name" type="text" required autoComplete="given-name" value={formData.parentName} onChange={set("parentName")} className="field" placeholder="np. Anna" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-sm font-bold mb-1.5">Telefon</label>
          <input
            id="cf-phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            pattern="[\d\s+\(\)\-]{9,}"
            title="Podaj numer telefonu (min. 9 cyfr)"
            value={formData.phone}
            onChange={set("phone")}
            className="field"
            placeholder="np. 600 100 200"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="cf-age" className="block text-sm font-bold mb-1.5">Wiek dziecka</label>
            <select id="cf-age" required value={formData.childAge} onChange={set("childAge")} className="field">
              <option value="">Wybierz</option>
              <option value="2">2 lata</option>
              <option value="3">3 lata</option>
              <option value="4">4 lata</option>
              <option value="5">5 lat</option>
              <option value="6">6 lat</option>
            </select>
          </div>
          <div>
            <label htmlFor="cf-group" className="block text-sm font-bold mb-1.5">Grupa</label>
            <select id="cf-group" value={formData.group} onChange={set("group")} className="field">
              <option value="">Doradźcie mi</option>
              <option value="grupa_1">Grupa 1</option>
              <option value="grupa_2">Grupa 2 (więcej uwagi)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-bold mb-1.5">
            E-mail <span className="font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <input id="cf-email" type="email" autoComplete="email" value={formData.email} onChange={set("email")} className="field" placeholder="jeśli wolisz odpowiedź mailem" />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[var(--color-coral-dark)]" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn btn-primary w-full mt-6 text-lg disabled:opacity-60">
        {sending ? "Wysyłanie…" : "Umów bezpłatną wizytę"}
      </button>
      <p className="text-center text-xs text-[var(--color-muted)] mt-3 leading-relaxed">
        Oddzwonimy w ciągu 24 godzin. Dane wykorzystamy tylko do kontaktu w sprawie rekrutacji.
        <br />
        Wolisz napisać? <a href={`mailto:${email}`} data-loc="formularz" className="underline underline-offset-4">{email}</a>
      </p>
    </form>
  );
}
