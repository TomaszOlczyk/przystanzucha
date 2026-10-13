"use client";

import { useRef, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { track, trackLead } from "@/lib/track";

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
    track("form_start", { form: "konsultacja" });
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
      <div className="card p-8 md:p-10 text-center" role="status">
        <div className="w-14 h-14 rounded-full bg-[var(--color-sea-light)] text-[var(--color-sea-dark)] flex items-center justify-center mx-auto mb-5 text-2xl font-bold" aria-hidden="true">
          ✓
        </div>
        <h2 className="text-2xl font-semibold mb-2">Dziękujemy!</h2>
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
    <form onSubmit={handleSubmit} onFocus={onFocus} className="card p-6 md:p-8 shadow-[0_20px_60px_-30px_rgba(20,50,74,0.35)]">
      <div className="space-y-4">
        <div>
          <label htmlFor="kf-name" className="block text-sm font-bold mb-1.5">Imię i nazwisko</label>
          <input id="kf-name" type="text" required autoComplete="name" value={formData.name} onChange={set("name")} className="field" />
        </div>
        <div>
          <label htmlFor="kf-phone" className="block text-sm font-bold mb-1.5">Telefon</label>
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
          <label htmlFor="kf-email" className="block text-sm font-bold mb-1.5">
            E-mail <span className="font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <input id="kf-email" type="email" autoComplete="email" value={formData.email} onChange={set("email")} className="field" />
        </div>
        <div>
          <label htmlFor="kf-time" className="block text-sm font-bold mb-1.5">Kiedy Ci pasuje?</label>
          <select id="kf-time" value={formData.preferredTime} onChange={set("preferredTime")} className="field">
            <option value="">Obojętnie</option>
            <option value="rano">Rano (8:00–12:00)</option>
            <option value="popołudnie">Popołudnie (12:00–16:00)</option>
          </select>
        </div>
        <div>
          <label htmlFor="kf-msg" className="block text-sm font-bold mb-1.5">
            O czym chcesz porozmawiać? <span className="font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <textarea id="kf-msg" rows={3} value={formData.message} onChange={set("message")} className="field resize-none" placeholder="np. adaptacja, Grupa 2, potrzeby dziecka" />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[var(--color-coral-dark)]" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn btn-primary w-full mt-6 text-lg disabled:opacity-60">
        {sending ? "Wysyłanie…" : "Umów spotkanie"}
      </button>
      <p className="text-center text-xs text-[var(--color-muted)] mt-3">
        Wolisz napisać? <a href={`mailto:${email}`} data-loc="konsultacja" className="underline underline-offset-4">{email}</a>
      </p>
    </form>
  );
}
