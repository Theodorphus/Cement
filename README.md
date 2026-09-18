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

- `lib/data.ts`: företagsuppgifter, öppettider, kontaktpersoner och kategorier.
- `lib/catalog.ts`: produktgrupper, guider och material i lösvikt.
- `lib/catalog-images.json`: produktbilder och alternativtexter.
- `lib/rental.ts` och `lib/suppliers.ts`: maskiner och leverantörer.
- `lib/resources.ts`: verifierade länkar till tillverkaranvisningar och dokument.
- `public/assets/`: lokala bilder och film.

Kundens aktuella produktuppgifter inväntas. Ändra inte mått, lagerstatus, priser eller miljöpåståenden utifrån antaganden. Se `docs/audit/status-2026-09-10.md` för innehållsarbete och `docs/audit/forbattringar-2026-09-10.md` för senaste ändringar. Uppdatera `CONTENT_UPDATED` i `lib/site.ts` när publikt innehåll ändras.

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

Gamla produktadresser och dokumentlänkar hanteras i `next.config.ts`. `docs/audit` innehåller källinventering och granskningsunderlag; äldre rapporter beskriver läget vid respektive datum.
