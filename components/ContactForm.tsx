"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CONTACT_LIMITS } from "@/lib/contact";
export default function ContactForm({ subject = "" }: { subject?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const busy = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  /**
   * Formuläret är långt, så svaret hamnar lätt utanför skärmen när man
   * skickat. Rulla fram det när det kommer, så att både kvitto och felmeddelande
   * faktiskt syns. Respekterar inställningen för minskad rörelse.
   */
  useEffect(() => {
    if (status !== "sent" && status !== "error") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    statusRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  }, [status, message]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (busy.current) return;
    busy.current = true; setStatus("sending"); setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    let failureMessage = "Meddelandet kunde inte skickas. Kontrollera anslutningen och försök igen, eller ring oss.";
    try {
      const res = await fetch("/api/kontakt", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)), signal: AbortSignal.timeout(20_000) });
      const result = await res.json().catch(() => null);
      if (!res.ok || result?.ok !== true) {
        if (typeof result?.error === "string" && result.error.trim()) failureMessage = result.error;
        throw new Error("delivery");
      }
      setStatus("sent"); setMessage("Tack! Ditt meddelande har lämnats till vår mejltjänst."); form.reset();
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error && error.name === "TimeoutError" ? "Det tog för lång tid. Ring oss eller försök igen." : failureMessage);
    } finally { busy.current = false; }
  }
  return <form method="post" action="/api/kontakt" onSubmit={submit} className="contact-form" aria-busy={status === "sending"}>
    <noscript><p>Formuläret behöver JavaScript. Ring <a href="tel:031966066">031-96 60 66</a> eller mejla en kontaktperson.</p></noscript>
    <label htmlFor="contact-name">Namn *</label>
    <input id="contact-name" name="namn" autoComplete="name" required maxLength={CONTACT_LIMITS.namn} />
    <label htmlFor="contact-email">E-postadress *</label>
    <input id="contact-email" name="epost" type="email" autoComplete="email" required maxLength={CONTACT_LIMITS.epost} />
    <label htmlFor="contact-tel">Telefon <span className="field-optional">(frivilligt)</span></label>
    <input id="contact-tel" name="telefon" type="tel" inputMode="tel" autoComplete="tel" maxLength={CONTACT_LIMITS.telefon} aria-describedby="contact-tel-help" />
    <p id="contact-tel-help">Fyll i om du hellre vill bli uppringd.</p>
    <label htmlFor="contact-message">Meddelande *</label>
    <textarea id="contact-message" name="meddelande" required rows={7} maxLength={CONTACT_LIMITS.meddelande} defaultValue={subject ? `Jag är intresserad av ${subject}.\n\nMängd:\nLeveransort eller hämtning:\nÖnskat datum:\n` : ""} aria-describedby="contact-help" />
    <p id="contact-help">Berätta gärna vad du behöver, mängd och önskat datum.</p>
    <div className="form-trap" aria-hidden="true"><label htmlFor="contact-website">Lämna detta fält tomt</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <p>Vi använder dina uppgifter för att hantera din förfrågan. <Link href="/integritet">Läs om personuppgifter</Link>.</p>
    <button className="btn btn-light" type="submit" disabled={status === "sending"}>{status === "sending" ? "Skickar…" : "Skicka förfrågan"}</button>
    <div ref={statusRef} role="status" aria-live="polite" aria-atomic="true" className={`form-status ${status}`}>{message}</div>
  </form>;
}
