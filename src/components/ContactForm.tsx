"use client";

import { useState } from "react";

interface ContactFormProps {
  email: string;
  phone: string;
  name: string;
  recruitmentYear: string;
}

export default function ContactForm({ email, phone, name, recruitmentYear }: ContactFormProps) {
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    email: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      `Rekrutacja ${recruitmentYear} - ${formData.childName}`
    )}&body=${encodeURIComponent(
      `Imię rodzica: ${formData.parentName}\nImię dziecka: ${formData.childName}\nWiek dziecka: ${formData.childAge}\nEmail: ${formData.email}\nTelefon: ${formData.phone}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="glass-strong rounded-3xl p-8 md:p-10 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full btn-gradient flex items-center justify-center mx-auto mb-5 text-2xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold mb-2">Dziękujemy!</h3>
        <p className="text-[var(--color-text-secondary)] mb-6">
          Wiadomość powinna otworzyć się w kliencie email. Możesz też napisać
          bezpośrednio na{" "}
          <a
            href={`mailto:${email}`}
            className="gradient-text font-semibold"
          >
            {email}
          </a>
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 rounded-full glass text-sm font-medium hover:bg-white/80 transition-colors"
        >
          Wyślij ponownie
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
        <div>
          <input
            type="text"
            required
            value={formData.parentName}
            onChange={(e) =>
              setFormData({ ...formData, parentName: e.target.value })
            }
            className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
            placeholder="Imię i nazwisko rodzica"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            required
            value={formData.childName}
            onChange={(e) =>
              setFormData({ ...formData, childName: e.target.value })
            }
            className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
            placeholder="Imię dziecka"
          />
          <select
            required
            value={formData.childAge}
            onChange={(e) =>
              setFormData({ ...formData, childAge: e.target.value })
            }
            className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all text-sm text-gray-600"
          >
            <option value="">Wiek dziecka</option>
            <option value="2">2 lata</option>
            <option value="3">3 lata</option>
            <option value="4">4 lata</option>
            <option value="5">5 lat</option>
            <option value="6">6 lat</option>
          </select>
        </div>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Adres email"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          className="w-full px-4 py-3.5 rounded-xl bg-white/60 border border-white/80 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all placeholder:text-gray-400 text-sm"
          placeholder="Numer telefonu (opcjonalnie)"
        />
      </div>
      <button
        type="submit"
        className="mt-5 w-full py-4 rounded-xl btn-gradient font-bold text-base tracking-wide"
      >
        Zapisz dziecko do {name}
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
