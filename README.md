# Öckerocement.se — Next.js

Redesign av **ockerocement.se** (Öckerö Cementgjuteri AB) byggd i **Next.js (App Router)** enligt designhandoffen i `Claude design setup/design_handoff_nextjs/`. Prototypen `Ockero Cement.dc.html` är facit för layout, färger, typografi och copy.

## Kom igång

```bash
npm install
npm run dev        # http://localhost:3000
```

Bygg för produktion:

```bash
npm run build
npm start
```

## Struktur

```
app/
  layout.tsx                              header, footer, toppbanner, fonter, global metadata
  page.tsx                                startsida (hero, sortiment, uthyrning, Tullhuset, leverantörer)
  produkter/page.tsx                      produktöversikt
  produkter/[kategori]/page.tsx           kategorisida (Markbeläggning har underkategorier)
  produkter/[kategori]/[produkt]/page.tsx produktsida
  uthyrning/page.tsx
  vara-leverantorer/page.tsx
  miljo/page.tsx  (+ miljopolicy, miljodiplom)
  aktuellt/page.tsx
  kontakt/page.tsx                        med formulär → /api/kontakt
  api/kontakt/route.ts                    tar emot formuläret (Resend om konfigurerat)
  sitemap.ts, robots.ts                   SEO
components/                               Header, Footer, TopBanner, CategoryCard, Reveal, HeroVideo, Breadcrumb, ContactForm, SimplePage
lib/                                      data.ts (all copy), fonts.ts (next/font)
public/assets/                            bilder + video från handoffen
```

## Designtokens

Definierade som CSS-variabler i `app/globals.css` (`--bg`, `--deep`, `--accent`, `--sand`, …) enligt handoffens tabell. Fonter (`Instrument Serif`, `Instrument Sans`) laddas via `next/font/google`.

## Interaktioner

- **Scroll-reveal**: `components/Reveal.tsx` använder IntersectionObserver (bredare stöd än prototypens `animation-timeline: view()`). Respekterar `prefers-reduced-motion`.
- **Hero-video**: `components/HeroVideo.tsx` sätter `muted`-attributet i DOM och kallar `play().catch()` så Chrome inte blockerar autoplay.
- **Hero**: Ken Burns-zoom + staggad intro (`heroText`-delays).

## Kontaktformulär

`app/api/kontakt/route.ts` skickar mejl via [Resend](https://resend.com) om `RESEND_API_KEY` är satt (se `.env.example`). Utan konfiguration loggas meddelandet serverside och formuläret bekräftar ändå — så det fungerar direkt i utveckling.

## Att göra innan lansering

- **SEO 1:1**: verifiera att alla slugs, `<title>` och meta descriptions matchar nuvarande sajt exakt; lägg annars 301-redirects (se `next.config.ts`).
- **Riktig copy**: produktsidan har nu skriven produkttext per underkategori i `lib/data.ts` (`SUBKATEGORIER[].text`) — ersätt med ordagrann text från nuvarande sajt om sådan finns, för exakt SEO-matchning.
- **Kategorier**: bara Markbeläggning har underkategorier/produktsidor i prototypen; övriga kategorier visar en presentation + callout tills innehåll finns.
- Sätt rätt domän i `metadataBase`, `sitemap.ts`, `robots.ts` om den avviker.

### Redan åtgärdat
- Alla bilder är hemtagna lokalt till `public/assets/` (Markbeläggning, Trädgårdsdekor, Ejder, butiksbild) — inga externa CDN-beroenden kvar.
- Google Maps-länk till adressen finns på kontaktsidan (adresskort + butiksbild) och i footern (`FORETAG.mapsUrl` i `lib/data.ts`).

## Deploy

Deploya till Vercel. Sätt ev. `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` som environment variables.
