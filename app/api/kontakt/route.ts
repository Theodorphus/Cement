import { NextResponse } from "next/server";

/**
 * Tar emot kontaktformuläret. Om RESEND_API_KEY är satt skickas ett mejl via
 * Resend till mottagaren i CONTACT_TO. Utan konfiguration loggas meddelandet
 * och ett OK-svar returneras, så att formuläret fungerar direkt i utveckling.
 *
 * Miljövariabler (valfria):
 *   RESEND_API_KEY   – API-nyckel från resend.com
 *   CONTACT_TO       – mottagaradress (t.ex. info@ockerocement.se)
 *   CONTACT_FROM     – avsändaradress verifierad hos Resend
 */
/** Minsta rimliga tid för en människa att fylla i formuläret. */
const MIN_IFYLLNADSTID_MS = 3000;
const MAX_LANGD = 5000;

export async function POST(request: Request) {
  let body: {
    namn?: string;
    epost?: string;
    meddelande?: string;
    webbplats?: string;
    tid?: number;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ogiltig förfrågan" }, { status: 400 });
  }

  const namn = (body.namn ?? "").trim();
  const epost = (body.epost ?? "").trim();
  const meddelande = (body.meddelande ?? "").trim();

  // Spamskydd. Ett ifyllt honeypot-fält eller en orimligt snabb inskickning
  // besvaras med OK utan att något skickas — en bot ska inte få veta att den
  // fastnade, för då justerar den bara sitt beteende.
  const honeypot = (body.webbplats ?? "").trim();
  const tid = typeof body.tid === "number" ? body.tid : Number.MAX_SAFE_INTEGER;
  if (honeypot || tid < MIN_IFYLLNADSTID_MS) {
    console.info("[kontaktformulär] avvisat som spam", {
      honeypot: Boolean(honeypot),
      tid,
    });
    return NextResponse.json({ ok: true });
  }

  if (!namn || !epost || !meddelande) {
    return NextResponse.json(
      { error: "Namn, e-postadress och meddelande krävs." },
      { status: 400 }
    );
  }

  if (namn.length > 200 || epost.length > 200 || meddelande.length > MAX_LANGD) {
    return NextResponse.json(
      { error: "Meddelandet är för långt." },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost);
  if (!emailOk) {
    return NextResponse.json(
      { error: "Ange en giltig e-postadress." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? "info@ockerocement.se";
  const from = process.env.CONTACT_FROM ?? "Öckerö Cementgjuteri <onboarding@resend.dev>";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: epost,
          subject: `Nytt meddelande från ${namn} (ockerocement.se)`,
          text: `Namn: ${namn}\nE-post: ${epost}\n\n${meddelande}`,
        }),
      });
      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend-fel:", res.status, detail);
        return NextResponse.json(
          { error: "Kunde inte skicka meddelandet just nu." },
          { status: 502 }
        );
      }
    } catch (err) {
      console.error("Resend-undantag:", err);
      return NextResponse.json(
        { error: "Kunde inte skicka meddelandet just nu." },
        { status: 502 }
      );
    }
  } else {
    // Ingen e-posttjänst konfigurerad — logga så inget tappas bort.
    console.info("[kontaktformulär] (ingen RESEND_API_KEY satt):", {
      namn,
      epost,
      meddelande,
    });
  }

  return NextResponse.json({ ok: true });
}
