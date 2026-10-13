import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getWriteClient } from "@/sanity/client";
import { notifySubmission } from "@/lib/notify";

// ID z kropką = "ścieżka" w Sanity: dokument niewidoczny dla publicznego API
// (dataset jest publiczny, a zgłoszenia zawierają dane osobowe).
const privateId = () => `submission.${randomUUID()}`;

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Brak konfiguracji zapisu" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const writeClient = getWriteClient();

    if (body.type === "consultation") {
      const { name, email, phone, preferredTime, message } = body;

      if (!name || !email) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      const doc = {
        _id: privateId(),
        _type: "submission",
        type: "consultation",
        parentName: name,
        email,
        phone: phone || "",
        preferredTime: preferredTime || "",
        message: message || "",
        status: "new",
        submittedAt: new Date().toISOString(),
      };
      await writeClient.create(doc);
      await notifySubmission("consultation", doc);
    } else {
      const { parentName, childName, childAge, email, phone, recruitmentYear } = body;

      if (!parentName || !childName || !childAge || !email) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      const doc = {
        _id: privateId(),
        _type: "submission",
        type: "recruitment",
        parentName,
        childName,
        childAge: `${childAge} lat`,
        email,
        phone: phone || "",
        message: `Rekrutacja ${recruitmentYear}`,
        status: "new",
        submittedAt: new Date().toISOString(),
      };
      await writeClient.create(doc);
      await notifySubmission("recruitment", doc);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Nie udało się zapisać zgłoszenia: ${message}` },
      { status: 500 }
    );
  }
}
