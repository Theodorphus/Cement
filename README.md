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
                                          Breadcrumb, ContactForm, SimplePage, InnehallsSida,
                                          StruktureradData (schema.org LocalBusiness)
lib/
  data.ts                                 företagsuppgifter, kategorier, nav
  innehall.ts                             GENERERAD — allt migrerat sidinnehåll
  fonts.ts                                next/font
public/assets/                            bilder + video (tunga PNG:er konverterade till WebP)
public/assets/produkter/                  182 bilder migrerade från gamla sajtens mediabibliotek
next.config.ts                            37 permanenta redirects från gamla URL:er
```

## Innehållsmigrering

Hela den gamla sajten (61 indexerade URL:er) speglades och innehållet plockades ut
ordagrant till `lib/innehall.ts`: 164 produktposter fördelade på 32 produktundersidor,
4 maskinsidor och 7 leverantörssidor, plus 182 bildfiler och 75 kontrollerade
utgående länkar till leverantörernas egna sajter.

`lib/innehall.ts` är **genererad** — redigera den inte för hand om migreringen ska
kunna köras om. Texterna är kundens egna och SEO-viktiga; ändra dem inte utan
avstämning.

### Redirects

`next.config.ts` innehåller 37 permanenta redirects. Övriga gamla URL:er behåller
sina slugs och behöver ingen. Alla 61 gamla adresser är verifierade att landa på en
route som finns — kör om kontrollen efter varje ändring av slugs eller redirects.

## Bilder

Handoffens PNG:er är konverterade till WebP (20 MB → 2,3 MB) och har fått
ASCII-filnamn, så referenserna slipper procent-kodning. Fyra oanvända filer är
borttagna. Byter du ut en bild: behåll filnamnet, eller uppdatera referensen i
`lib/data.ts`.

Delningsbilden finns även som JPG (`hero-delning.jpg`) eftersom WebP stöds
ojämnt av förhandsvisningar i sociala medier.

## Integritet och cookies

Sajten sätter **inga cookies** och har ingen besöksstatistik, inga annonsverktyg
och ingen spårning. Google Maps bäddas medvetet inte in som iframe — kartan är
en vanlig länk — vilket gör att inget tredjepartsinnehåll laddas och att
sajten inte behöver något samtyckesbanner. Bygger du in analytics eller en
kartinbäddning senare ändras den bedömningen, och då krävs samtycke.

## Kontaktformulärets spamskydd

Formuläret har ett dolt honeypot-fält och en kontroll av hur snabbt det skickas
in. Träffar någon av dem returneras OK utan att mejl skickas, så en bot inte får
veta att den blockerades. Ingen extern tjänst och inga cookies inblandade.

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

**Integritetspolicyn bör läsas igenom av kunden.** Grundtexten är deras egen men
skrevs 2018 och handlade bara om kundregistret. Avsnitten om cookies och
kontaktformuläret är tillagda av oss och beskriver hur sajten faktiskt fungerar
— men kunden ska godkänna formuleringarna.

**Adressen är inte avgjord.** Gamla sajtens footer skriver "Industriområde S
Långesand 7", kundens GDPR-dokument bara "Långesand 7". Bygget använder den korta
formen. Fråga kunden vilken som gäller — den står även i schema.org-markupen.

**Jackon heter numera BEWI.** Leverantörslänken pekar på bewi.com. Fråga om
leverantörslistan ska byta namn.

**Uppgifter att verifiera med kunden.** Org.nr och F-skatt till footern,
kontaktpersonernas roller, leveransområde och eventuella fraktavgifter, samt om de
fortfarande säljer färdig betong (påstås på startsidan). Öppettiderna är
verifierade mot gamla sajten och stämmer.

**Koordinater saknas i schema.org-markupen.** `geo` är medvetet utelämnat i
`components/StruktureradData.tsx` — fyll i riktiga koordinater när du varit
på plats, gissa dem inte.

**Miljösidorna** innehåller platshållartext. Kundens riktiga miljöpolicy och
uppgifter om miljödiplomeringen (vilken diplomering, vilket år) saknas.

**Sätt rätt domän** i `metadataBase`, `sitemap.ts` och `robots.ts` om den avviker.

## Deploy

Deploya till Vercel. Sätt ev. `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` som environment variables.

DNS ligger hos One.com. Mejlen går till Microsoft 365 — rör aldrig MX, SPF,
`MS=`-verifieringen eller autodiscover-posterna vid domänbytet, bara `A` på apex
och `www`.
