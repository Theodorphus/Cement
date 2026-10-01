# Öckerö Cementgjuteri

Next.js 15 med App Router, React 19 och TypeScript. Webbplatsen innehåller produktkategorier och produkt-/guidesidor, maskinuthyrning, leverantörer, leverans, kontakt och företagsinformation.

## Utveckling och kontroll

Node.js 24 LTS rekommenderas.

```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

Vid parallell utveckling och produktionskontroll: sätt `NEXT_DIST_DIR=.next-dev` för utvecklingsservern och använd en annan port för produktionsservern. Bygg inte i samma mapp som en aktiv server använder.

Google Fonts hämtas vid bygget och serveras sedan lokalt med next/font. Om datorns certifikatkedja kräver systemets CA-lager kan `NODE_OPTIONS=--use-system-ca` användas; certifikatkontrollen ska förbli aktiverad.

## Innehåll

Kunden redigerar produkter, hyrmaskiner, öppettider och inlägg under Aktuellt i Sanity (se nedan). Övrigt ligger i koden:

- `lib/content.ts`: hämtar innehållet från Sanity.
- `lib/data.ts`: företagsuppgifter, kontaktpersoner och de sju produktkategorierna.
- `lib/catalog.ts`: produktadresser, sökindex och material i lösvikt.
- `lib/suppliers.ts`: leverantörer.
- `lib/resources.ts`: verifierade länkar till tillverkaranvisningar och dokument.
- `public/assets/`: lokala bilder och film.

Kundens aktuella produktuppgifter inväntas. Ändra inte mått, lagerstatus, priser eller miljöpåståenden utifrån antaganden. Se `docs/audit/status-2026-09-10.md` för innehållsarbete och `docs/audit/forbattringar-2026-09-10.md` för senaste ändringar. Uppdatera `CONTENT_UPDATED` i `lib/site.ts` när publikt innehåll ändras.

## Sanity

Studion ligger i `studio/` och publiceras på https://ockerocement.sanity.studio. Kunden loggar in där. Projekt-id står i `studio/projekt.ts` och `lib/sanity/env.ts` och ska vara samma på båda ställena. Kategorierna i `studio/schemaTypes/kategorier.ts` måste matcha `KATEGORIER` i `lib/data.ts`, och testerna kontrollerar det.

Sajten hämtar publicerat innehåll vid bygget och cachar det. När något publiceras skickar Sanity en webhook till `/api/revalidate`, som förnyar just den innehållstypen inom några sekunder. Om en webhook skulle gå förlorad förnyas innehållet ändå inom en timme. Nya produkter och maskiner renderas vid första besöket.

Första gången:

1. Skapa projektet på sanity.io/manage med datasetet `production`. Skriv in projekt-id i de två filerna ovan.
2. Skapa en token med Editor-behörighet under API → Tokens och lägg den som `SANITY_WRITE_TOKEN` i `.env.local`.
3. Flytta innehållet: först `node scripts/sanity/migrera.mjs` (torrkörning) och sedan `node --env-file=.env.local scripts/sanity/migrera.mjs --skarpt`. Skriptet avbryter om datasetet redan har innehåll.
4. Publicera Studion: `cd studio && npm ci && npm run deploy`.
5. Skapa en webhook under API → Webhooks med URL `https://www.ockerocement.se/api/revalidate`, dataset `production`, triggers Create, Update och Delete, filter `_type in ["produkt", "hyrmaskin", "nyhet", "oppettider"]`, projection `{_type}` och en hemlighet. Lägg samma hemlighet som `SANITY_REVALIDATE_SECRET` i Vercel.
6. Bjud in kunden som Editor under Members.

Studion kan köras lokalt med `cd studio && npm run dev` (localhost:3333) efter `npx sanity cors add http://localhost:3333 --credentials`.

Redaktörer kan inte ändra kategorier, adresser till befintliga sidor eller sajtens design. Prisfält saknas medvetet, eftersom kunderna ska höra av sig för pris.

## Kontakt och Resend

Konfiguration finns i `.env.example`. Lägg hemligheter i `.env.local` vid lokal utveckling och i driftplattformens miljövariabler i produktion.

Kontaktsidan visar formuläret med namn, e-post, frivilligt telefonnummer och meddelande. Startsidan länkar direkt till det via `/kontakt#forfragan`. Utan komplett konfiguration är fälten och skicka-knappen inaktiverade och besökaren hänvisas till telefon eller info@ockerocement.se. Produktens namn fylls i meddelandet när besökaren kommer från en produkt. API:t ger 503 om konfiguration saknas; inget meddelande loggas som ersättning för leverans.

När `RESEND_API_KEY`, `CONTACT_TO` och `CONTACT_FROM` är satta aktiveras formuläret automatiskt. Använd `CONTACT_TO=info@ockerocement.se` och `CONTACT_FROM=Öckerö Cementgjuteri <hemsidan@formular.ockerocement.se>`. Avsändardomänen formular.ockerocement.se måste vara verifierad i Resend. Lägg variablerna i Vercels produktionsmiljö och gör en ny deployment. Resends onboarding-avsändare accepteras inte. Ett godkänt API-svar betyder att mejltjänsten accepterat meddelandet, inte att det säkert nått inkorgen. Verifiera leverans och att Svara går till besökarens adress innan lansering.

API:t har typ- och längdvalidering, ursprungskontroll, dold botfälla, tidsgränser och en anropsbegränsning per serverinstans. Lägg även ett delat skydd mot upprepade anrop på driftplattformen när formuläret aktiveras.

## Inför lansering

1. Färdigställ kundens produktuppgifter och godkända miljödokument.
2. Kontrollera kontaktuppgifter, öppettider och produktbilder med kunden.
3. Konfigurera domän, HTTPS och vald huvudvärd. `SITE_URL` i `lib/site.ts` används av canonical och sidkarta; matcha den mot driftens domän och omdirigera den andra värden.
4. Sätt `SITE_INDEXABLE=true` enbart för publik produktion och bygg om. Förhandsversioner är noindex som standard.
5. Konfigurera Resend och verifiera mottagning samt svar till avsändaren med ett godkänt testmejl.
6. Stäm av integritetstexten mot valda drift- och mejltjänster.
7. Kör `npm run check:site` mot ett produktionsbygge. Standard är localhost:3000. Annan port anges med `BASE_URL`, exempelvis `$env:BASE_URL='http://localhost:3100'` i PowerShell.

Gamla produktadresser hanteras i `lib/legacy-redirects.ts` och dokumentlänkar i `next.config.ts`. `docs/audit` innehåller källinventering och granskningsunderlag; äldre rapporter beskriver läget vid respektive datum.
