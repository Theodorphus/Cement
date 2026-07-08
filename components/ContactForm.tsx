"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "rgba(253,251,246,0.08)",
  border: "1px solid rgba(253,251,246,0.25)",
  borderRadius: 8,
  padding: "12px 14px",
  color: "var(--ljus)",
  fontSize: 15,
  fontFamily: "var(--font-sans), sans-serif",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  color: "rgba(253,251,246,0.8)",
  fontSize: 13,
  marginBottom: 6,
};

export default function ContactForm() {
  const [namn, setNamn] = useState("");
  const [epost, setEpost] = useState("");
  const [medd, setMedd] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ namn, epost, meddelande: medd }),
      });
      if (!res.ok) throw new Error("Serverfel");
      setStatus("sent");
      setNamn("");
      setEpost("");
      setMedd("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }} noValidate>
      <div>
        <div style={labelStyle}>Namn *</div>
        <input
          value={namn}
          onChange={(e) => setNamn(e.target.value)}
          required
          autoComplete="name"
          style={inputStyle}
        />
      </div>
      <div>
        <div style={labelStyle}>E-postadress *</div>
        <input
          type="email"
          value={epost}
          onChange={(e) => setEpost(e.target.value)}
          required
          autoComplete="email"
          style={inputStyle}
        />
      </div>
      <div>
        <div style={labelStyle}>Skriv ditt meddelande i fältet nedan *</div>
        <textarea
          value={medd}
          onChange={(e) => setMedd(e.target.value)}
          required
          rows={5}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-light"
        style={{
          fontSize: 15.5,
          padding: "14px 26px",
          textAlign: "center",
          border: "none",
          fontFamily: "var(--font-sans), sans-serif",
          opacity: status === "sending" ? 0.7 : 1,
        }}
      >
        {status === "sending" ? "Skickar…" : "Skicka meddelande"}
      </button>

      {status === "sent" && (
        <div
          style={{
            background: "rgba(120,190,150,0.15)",
            border: "1px solid rgba(120,190,150,0.4)",
            color: "#BEE3CC",
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 14.5,
          }}
        >
          Ditt meddelande har skickats
        </div>
      )}
      {status === "error" && (
        <div
          style={{
            background: "rgba(220,120,120,0.15)",
            border: "1px solid rgba(220,120,120,0.4)",
            color: "#F0C4C4",
            borderRadius: 8,
            padding: "12px 16px",
            fontSize: 14.5,
          }}
        >
          Något gick fel — ring oss gärna på 031-96 60 66 eller försök igen.
        </div>
      )}
    </form>
  );
}
