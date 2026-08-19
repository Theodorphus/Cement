# Öckerocement.se — Next.js

Redesign av **ockerocement.se** (Öckerö Cementgjuteri AB) byggd i **Next.js (App Router)** enligt designhandoffen i `Claude design setup/design_handoff_nextjs/`. Prototypen `Ockero Cement.dc.html` är facit för layout, färger, typografi och copy.

Innehållet är migrerat från den tidigare sajten, som låg i Vismas hemsidesverktyg.

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
  produkter/[kategori]/page.tsx           kategorisida med undersidor
  produkter/[kategori]/[produkt]/page.tsx produktundersida (32 st, migrerade)
  uthyrning/page.tsx
  uthyrning/[maskin]/page.tsx             maskinsida (4 st, migrerade)
  vara-leverantorer/page.tsx
  vara-leverantorer/[leverantor]/page.tsx leverantörssida (7 st, migrerade)
  miljo/page.tsx  (+ miljopolicy, miljodiplom)
  aktuellt/page.tsx
  integritetspolicy/page.tsx              GDPR-text, avskriven från gamla sajtens bild
  kontakt/page.tsx                        med formulär → /api/kontakt
  api/kontakt/route.ts                    tar emot formuläret (Resend om konfigurerat)
  sitemap.ts, robots.ts                   SEO
components/                               Header, Footer, TopBanner, CategoryCard, Reveal, HeroVideo,
                                          Breadcrumb, ContactForm, SimplePage, InnehallsSida
lib/
  data.ts                                 företagsuppgifter, kategorier, nav
  innehall.ts                             GENERERAD — allt migrerat sidinnehåll
  fonts.ts                                next/font
public/assets/                            bilder + video från handoffen
public/assets/produkter/                  182 bilder migrerade från gamla sajtens mediabibliotek
next.config.ts                            37 permanenta redirects från gamla URL:er
```

## Innehållsmigrering

Hela den gamla sajten (61 indexerade URL:er) speglades och innehållet plockades ut
ordagrant till `lib/innehall.ts`: 184 produktposter fördelade på 32 produktundersidor,
4 maskinsidor och 7 leverantörssidor, plus 182 bildfiler.

`lib/innehall.ts` är **genererad** — redigera den inte för hand om migreringen ska
kunna köras om. Texterna är kundens egna och SEO-viktiga; ändra dem inte utan
avstämning.

### Redirects

`next.config.ts` innehåller 37 permanenta redirects. Övriga gamla URL:er behåller
sina slugs och behöver ingen. Alla 61 gamla adresser är verifierade att landa på en
route som finns — kör om kontrollen efter varje ändring av slugs eller redirects.

## Designtokens

Definierade som CSS-variabler i `app/globals.css` (`--bg`, `--deep`, `--accent`, `--sand`, …) enligt handoffens tabell. Fonter (`Instrument Serif`, `Instrument Sans`) laddas via `next/font/google`.

## Interaktioner

- **Scroll-reveal**: `components/Reveal.tsx` använder IntersectionObserver (bredare stöd än prototypens `animation-timeline: view()`). Respekterar `prefers-reduced-motion`.
- **Hero-video**: `components/HeroVideo.tsx` sätter `muted`-attributet i DOM och kallar `play().catch()` så Chrome inte blockerar autoplay.
- **Hero**: Ken Burns-zoom + staggad intro (`heroText`-delays).

## Kontaktformulär

`app/api/kontakt/route.ts` skickar mejl via [Resend](https://resend.com) om `RESEND_API_KEY` är satt (se `.env.example`). Utan konfiguration loggas meddelandet serverside och formuläret bekräftar ändå — så det fungerar direkt i utveckling.

Mottagaradressen `info@ockerocement.se` är bekräftad som kundens riktiga adress
(står i deras egen GDPR-text).

## Att göra innan lansering

**Bilder.** Kategoribilder, hero och maskinbilder är fortfarande AI-genererade från
handoffen. De migrerade produktbilderna är kundens egna men lågupplösta (mellan
150 och 800 px breda) — de duger som produktkort men inte som helbredds-hero.
Nyfotografering behövs framför allt för: startsidans hero, kategorikorten,
butiken/gården utifrån och stämningsbilder.

**Integritetspolicyn är ofullständig.** Texten på `/integritetspolicy` är kundens
egen, men skrevs 2018 och handlar bara om kundregistret. Den säger ingenting om
kontaktformuläret eller den inbäddade Google Maps-kartan (som sätter cookies).
Kunden behöver komplettera, och sajten behöver troligen ett cookie-samtycke för
kartan.

**Uppgifter att verifiera med kunden.** Öppettider, org.nr och F-skatt till footern,
kontaktpersonernas roller, leveransområde och eventuella fraktavgifter, samt om de
fortfarande säljer färdig betong (påstås på startsidan).

**Miljösidorna** innehåller platshållartext. Kundens riktiga miljöpolicy och
uppgifter om miljödiplomeringen (vilken diplomering, vilket år) saknas.

**Sätt rätt domän** i `metadataBase`, `sitemap.ts` och `robots.ts` om den avviker.

## Deploy

Deploya till Vercel. Sätt ev. `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` som environment variables.

DNS ligger hos One.com. Mejlen går till Microsoft 365 — rör aldrig MX, SPF,
`MS=`-verifieringen eller autodiscover-posterna vid domänbytet, bara `A` på apex
och `www`.
