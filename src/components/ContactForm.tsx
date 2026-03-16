"use client";

import { useState } from "react";
import siteData from "@/content/site.json";

export default function ContactForm() {
  const [mode, setMode] = useState<"form" | "phone">("form");
  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to an API endpoint
    const mailtoLink = `mailto:${siteData.email}?subject=${encodeURIComponent(
      `Rekrutacja ${siteData.recruitmentYear} - ${formData.childName}`
    )}&body=${encodeURIComponent(
      `Imię rodzica: ${formData.parentName}\nImię dziecka: ${formData.childName}\nWiek dziecka: ${formData.childAge}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\n\nWiadomość:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setSubmitted(true);
  };

  return (
    <section id="rekrutacja" className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--color-accent-pink)]/20 text-[var(--color-accent-pink)] text-sm font-semibold mb-4">
            Rekrutacja {siteData.recruitmentYear}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Zapisz swoje dziecko do <span className="gradient-text">{siteData.name}</span>
          </h2>
          <p className="text-[var(--color-text-light)] max-w-2xl mx-auto">
            Skontaktuj się z nami — chętnie odpowiemy na wszystkie pytania i oprowdzimy po przedszkolu.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setMode("form")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              mode === "form"
                ? "bg-[var(--color-primary)] text-white shadow-lg"
                : "bg-white text-[var(--color-text)] hover:bg-gray-50"
            }`}
          >
            ✉️ Wyślij formularz
          </button>
          <button
            onClick={() => setMode("phone")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              mode === "phone"
                ? "bg-[var(--color-secondary)] text-white shadow-lg"
                : "bg-white text-[var(--color-text)] hover:bg-gray-50"
            }`}
          >
            📞 Zadzwoń do nas
          </button>
        </div>

        {mode === "phone" ? (
          <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-10 shadow-lg">
            <div className="text-6xl mb-6">📞</div>
            <h3 className="text-2xl font-bold mb-2">Zadzwoń do nas</h3>
            <p className="text-[var(--color-text-light)] mb-6">
              Chętnie porozmawiamy i umówimy wizytę w przedszkolu
            </p>
            <a
              href={`tel:${siteData.phone.replace(/\s/g, "")}`}
              className="inline-block text-3xl font-bold text-[var(--color-secondary)] hover:text-[var(--color-secondary-light)] transition-colors"
            >
              {siteData.phone}
            </a>
            <p className="text-sm text-[var(--color-text-light)] mt-4">
              {siteData.hours}
            </p>
          </div>
        ) : submitted ? (
          <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-10 shadow-lg">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold mb-2">Dziękujemy!</h3>
            <p className="text-[var(--color-text-light)]">
              Twoja wiadomość powinna otworzyć się w kliencie email.
              Jeśli nie, napisz bezpośrednio na{" "}
              <a href={`mailto:${siteData.email}`} className="text-[var(--color-primary)] font-medium">
                {siteData.email}
              </a>
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2 rounded-full bg-[var(--color-bg-alt)] text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Wyślij ponownie
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-10 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Imię i nazwisko rodzica *
                </label>
                <input
                  type="text"
                  required
                  value={formData.parentName}
                  onChange={(e) =>
                    setFormData({ ...formData, parentName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  placeholder="Jan Kowalski"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Imię dziecka *
                </label>
                <input
                  type="text"
                  required
                  value={formData.childName}
                  onChange={(e) =>
                    setFormData({ ...formData, childName: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  placeholder="Zosia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Wiek dziecka *
                </label>
                <select
                  required
                  value={formData.childAge}
                  onChange={(e) =>
                    setFormData({ ...formData, childAge: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                >
                  <option value="">Wybierz wiek</option>
                  <option value="2">2 lata</option>
                  <option value="3">3 lata</option>
                  <option value="4">4 lata</option>
                  <option value="5">5 lat</option>
                  <option value="6">6 lat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  placeholder="jan@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all"
                  placeholder="+48 123 456 789"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">
                  Wiadomość
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all resize-none"
                  placeholder="Dodatkowe informacje, pytania..."
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-6 w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-semibold text-lg hover:bg-[var(--color-primary-light)] transition-colors shadow-lg hover:shadow-xl"
            >
              Wyślij zgłoszenie ✨
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
