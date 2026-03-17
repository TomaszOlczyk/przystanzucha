import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Brak konfiguracji email" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await request.json();
    const toEmail = process.env.CONTACT_EMAIL || "rekrutacja@przystanzucha.pl";
    const fromEmail = `Formularz Przystań Zucha <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`;

    let subject: string;
    let html: string;
    let replyTo: string;

    if (body.type === "consultation") {
      const { name, email, phone, preferredTime, message } = body;

      if (!name || !email) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      replyTo = email;
      subject = `Konsultacja — ${name}`;
      html = `
        <h2>Nowa prośba o konsultację</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Imię</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone || "—"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Preferowany termin</td><td style="padding:8px;border-bottom:1px solid #eee;">${preferredTime || "—"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Wiadomość</td><td style="padding:8px;border-bottom:1px solid #eee;">${message || "—"}</td></tr>
        </table>
      `;
    } else {
      const { parentName, childName, childAge, email, phone, recruitmentYear } = body;

      if (!parentName || !childName || !childAge || !email) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      replyTo = email;
      subject = `Rekrutacja ${recruitmentYear} — ${childName} (${childAge} lat)`;
      html = `
        <h2>Nowe zgłoszenie rekrutacyjne</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Rodzic</td><td style="padding:8px;border-bottom:1px solid #eee;">${parentName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Dziecko</td><td style="padding:8px;border-bottom:1px solid #eee;">${childName}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Wiek</td><td style="padding:8px;border-bottom:1px solid #eee;">${childAge} lat</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee;">${phone || "—"}</td></tr>
        </table>
      `;
    }

    const { data, error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo,
      subject,
      html,
    });

    if (sendError) {
      console.error("Resend error:", sendError);
      return NextResponse.json(
        { error: `Błąd wysyłania: ${sendError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Nie udało się wysłać wiadomości: ${message}` },
      { status: 500 }
    );
  }
}
