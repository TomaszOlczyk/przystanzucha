/**
 * Powiadomienie mailowe o nowym zgłoszeniu (Resend, bez dodatkowej zależności).
 * Wymaga: RESEND_API_KEY, CONTACT_EMAIL (adresaci, po przecinku),
 * opcjonalnie CONTACT_FROM / RESEND_FROM_EMAIL (domena musi być zweryfikowana w Resend).
 * Błąd wysyłki nie blokuje zapisu zgłoszenia — zwracamy false i logujemy.
 */
type Submission = Record<string, string | undefined>;

const LABELS: Record<string, string> = {
  parentName: "Rodzic",
  childName: "Dziecko",
  childAge: "Wiek dziecka",
  email: "E-mail",
  phone: "Telefon",
  preferredTime: "Preferowany termin",
  message: "Wiadomość",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function notifySubmission(kind: "recruitment" | "consultation", data: Submission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (!apiKey || !to) {
    console.error("Powiadomienie mailowe wyłączone: brak RESEND_API_KEY lub CONTACT_EMAIL");
    return false;
  }

  const title = kind === "consultation" ? "Nowa prośba o konsultację" : "Nowe zgłoszenie rekrutacyjne";
  const rows = Object.entries(LABELS)
    .filter(([key]) => data[key])
    .map(([key, label]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td>${escapeHtml(data[key]!)}</td></tr>`)
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || process.env.RESEND_FROM_EMAIL || "Przystań Zucha <formularz@przystanzucha.pl>",
        to: to.split(",").map((a) => a.trim()).filter(Boolean),
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `${title}: ${data.parentName ?? ""}`.trim(),
        html: `<h2>${title}</h2><table>${rows}</table><p style="color:#999">Zgłoszenie zapisane też w panelu /studio → CRM — Leady.</p>`,
      }),
    });
    if (!res.ok) {
      console.error("Resend error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Resend request failed:", error);
    return false;
  }
}
