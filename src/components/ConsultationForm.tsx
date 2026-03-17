"use client";

import { useState } from "react";

interface ConsultationFormProps {
  email: string;
  phone: string;
}

export default function ConsultationForm({ email, phone }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, type: "consultation" }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Błąd wysyłania");
      setSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Nieznany błąd";
      setError(msg + " — Spróbuj ponownie lub napisz na " + email);
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-strong rounded-3xl p-8 md:p-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center mx-auto mb-5 text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold mb-2">Dziękujemy!</h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Skontaktujemy się z Tobą w ciągu 24 godzin, aby ustalić termin konsultacji.
          Możesz też zadzwonić bezpośrednio:{" "}
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="gradient-text font-semibold"
          >
            {phone}
          </a>
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", preferredTime: "", message: "" });
          }}
          className="px-6 py-2.5 rounded-full glass text-sm font-medium hover:bg-white/80 transition-colors"
        >
          Wyślij kolejne zapytanie
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-strong rounded-3xl p-6 md:p-8 max-w-lg mx-auto"
    >
      <div className="space-y-4">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Imię i nazwisko"
        />
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Adres email"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Numer telefonu"
        />
        <select
          value={formData.preferredTime}
          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all text-sm text-gray-600"
        >
          <option value="">Preferowany termin (opcjonalnie)</option>
          <option value="rano">Rano (8:00–12:00)</option>
          <option value="popołudnie">Popołudnie (12:00–16:00)</option>
          <option value="dowolny">Dowolny</option>
        </select>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm resize-none"
          placeholder="Dodatkowe pytania lub uwagi (opcjonalnie)"
        />
      </div>
      {error && (
        <p className="mt-3 text-sm text-red-500 text-center">{error}</p>
      )}
      <button
        type="submit"
        disabled={sending}
        className="mt-5 w-full py-4 rounded-xl btn-gradient font-bold text-base tracking-wide disabled:opacity-60"
      >
        {sending ? "Wysyłanie..." : "Umów konsultację"}
      </button>
      <p className="text-center text-xs text-[var(--color-text-secondary)] mt-3">
        Odezwiemy się w ciągu 24h. Możesz też zadzwonić:{" "}
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className="gradient-text font-semibold"
        >
          {phone}
        </a>
      </p>
    </form>
  );
}
