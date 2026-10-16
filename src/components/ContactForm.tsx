"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { getAttribution } from "@/lib/attribution";
import { trackFormStart, trackLead } from "@/lib/analytics";
import { POLICY_PATH } from "@/lib/site";

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
    trackFormStart("rekrutacja");
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
      trackLead("rekrutacja", { child_age: formData.childAge });
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
        <h3 className="t-title !text-[2.2rem] mb-4">Dziękujemy, mamy Twoje zgłoszenie</h3>
        <p className="text-[var(--color-muted)]">
          Oddzwonimy w ciągu 24 godzin (w dni robocze). Jeśli wolisz porozmawiać od razu, zadzwoń:{" "}
          <a href={`tel:${tel}`} data-loc="formularz_sukces" className="font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
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
          <label htmlFor="cf-name" className="t-label !flex">Twoje imię</label>
          <input id="cf-name" type="text" required autoComplete="given-name" value={formData.parentName} onChange={set("parentName")} className="field" placeholder="np. Anna" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="t-label !flex">Telefon</label>
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
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="cf-age" className="t-label !flex">Wiek dziecka</label>
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
            <label htmlFor="cf-group" className="t-label !flex">Grupa</label>
            <select id="cf-group" value={formData.group} onChange={set("group")} className="field">
              <option value="">Doradźcie mi</option>
              <option value="grupa_1">Grupa 1</option>
              <option value="grupa_2">Grupa 2 (więcej uwagi)</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="cf-email" className="t-label !flex">
            E-mail <span className="normal-case tracking-normal font-normal text-[var(--color-muted)]">(opcjonalnie)</span>
          </label>
          <input id="cf-email" type="email" autoComplete="email" value={formData.email} onChange={set("email")} className="field" placeholder="jeśli wolisz odpowiedź mailem" />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[var(--color-coral-dark)]" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn btn-primary w-full mt-9 disabled:opacity-60">
        {sending ? "Wysyłanie…" : <>Umów bezpłatną wizytę <span className="arr">→</span></>}
      </button>
      <p className="text-center text-xs text-[var(--color-muted)] mt-3 leading-relaxed">
        Administratorem danych jest Przystań Zucha sp. z o.o. Dane przetwarzamy w celu odpowiedzi na zgłoszenie.{" "}
        <Link href={POLICY_PATH} className="underline underline-offset-4">
          Polityka prywatności
        </Link>
        .
        <br />
        Wolisz napisać? <a href={`mailto:${email}`} data-loc="formularz" className="underline underline-offset-4">{email}</a>
      </p>
    </form>
  );
}
