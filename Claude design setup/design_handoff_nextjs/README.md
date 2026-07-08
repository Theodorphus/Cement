# Handoff: Ockerocement.se — Redesign (Next.js)

## Overview
Komplett redesign av **ockerocement.se** (Öckerö Cementgjuteri AB) — byggvaruhandel på Öckerö i Göteborgs skärgård. Nuvarande sajt är byggd i Visma Website. Målet: modern, premium, varm kustkänsla, med **alla befintliga sidor, funktioner och SEO-texter bevarade**.

**Målgrupp:** privatpersoner/villaägare i skärgården + hantverkare & byggfirmor.
**Ton:** lugnt och stilrent — subtila animationer, inga flashiga effekter.

## About the Design Files
Filerna i detta paket är **designreferenser skapade i HTML** (`Ockero Cement.dc.html` — öppnas i webbläsare, en SPA-prototyp med alla sidmallar). De är INTE produktionskod. Uppgiften är att **återskapa designen i Next.js** (App Router rekommenderas) med riktiga routes, och deploya till Vercel.

## Fidelity
**High-fidelity.** Färger, typografi, spacing, animationer och copy är avsiktliga och ska återskapas exakt. Copy är hämtad ordagrant från nuvarande sajt (viktigt för SEO — ändra inte texterna).

## Föreslagen Next.js-struktur
Behåll nuvarande URL-struktur exakt (SEO):

```
app/
  layout.tsx                 ← header, footer, toppbanner, fonter
  page.tsx                   ← startsida (redirect eller innehåll; nuvarande sajt har /startsida)
  produkter/page.tsx
  produkter/[kategori]/page.tsx
  produkter/[kategori]/[produkt]/page.tsx
  uthyrning/page.tsx  (+ underssidor)
  vara-leverantorer/page.tsx (+ undersidor)
  miljo/page.tsx (+ miljopolicy, miljodiplom)
  aktuellt/page.tsx
  kontakt/page.tsx (+ har-hittar-du-oss)
```

Fullständig sitemap (alla slugs) finns på nuvarande sajt — kräv 1:1-mappning eller 301-redirects. Sätt `<title>` och `meta description` per sida identiskt med nuvarande sajt.

## Design Tokens

### Färger
| Token | Värde | Användning |
|---|---|---|
| bg | `#F6F3EC` | Sidbakgrund (varm off-white) |
| paper | `#FFFFFF` | Kort/ytor |
| ink | `#202B2E` | Brödtext/rubriker |
| muted | `#5F6E72` | Sekundär text |
| deep | `#24404C` | Mörk havsblå — knappar, band, toppbanner, form-panel |
| footer | `#1B3039` | Footer |
| accent | `#2E6E7E` | Länkar, pilar, hover |
| sand | `#E8E1D2` | Beige ytor/callouts |
| ljus text | `#FDFBF6` | Text på mörka ytor |
| kantlinje | `rgba(32,43,46,0.08)` | Borders |
| grön status | `#3E6E52` | "Finns på gården" |

### Typografi (Google Fonts)
- **Rubriker:** `Instrument Serif` 400 (aldrig bold) — H1 54–72px, H2 36–46px, line-height ~1.02–1.1
- **Brödtext/UI:** `Instrument Sans` — body 15–19px, nav 14.5px
- **Eyebrows:** 11–12px, uppercase, letter-spacing 0.14–0.22em, färg muted
- Ladda via `next/font/google`.

### Övrigt
- Border-radius: kort 12–14px, knappar 8px, band 16px
- Skuggor: kort-hover `0 16px 34px rgba(24,40,46,0.12)`; facts-kort `0 14px 40px rgba(24,40,46,0.1)`
- Max innehållsbredd: 1200px, sidopadding 28px

## Screens / Views (se prototypen för exakt layout)

### Global
- **Toppbanner** (deep): öppettider "Mån–fre 7–16 · Lördagar 9–13" + tel 031-96 60 66
- **Header** (sticky, blur `backdrop-filter:blur(12px)`, bg `rgba(246,243,236,0.92)`): logotyp-ruta "Ö" (38px, deep, radius 8) + wordmark "Öckerö Cementgjuteri" (Instrument Serif 21px) + tagline. Nav: Startsida, Produkter, Uthyrning, Våra leverantörer, Miljö, Aktuellt, Kontakt. Aktiv: bg `rgba(36,64,76,0.08)` + vikt 600.
- **Footer** (#1B3039): 4 kolumner — adress/tel, Sortiment, Företaget, Öppettider + cookiesrad. Adress: "Industriområde S Långesand 7, 475 31 Öckerö, Tel: 031-966066".

### Startsida
1. **Hero**: fullbredd bild `assets/Hero2.png`, min-height 600px, Ken Burns-zoom (scale 1.09→1, 16s ease-out). Två gradient-overlays (bottentung + vänsterlutad `linear-gradient(100deg,...)`) för textkontrast + text-shadow på rubrik/ingress. Eyebrow "ÖCKERÖ · GÖTEBORGS SKÄRGÅRD · SEDAN GENERATIONER", H1 "Välkommen!" 72px, ingress = exakt copy från sajten, två CTA:er ("Se våra produkter" ljus / "Kontakta oss" outline). Staggad intro-animation (fadeUp 0.7s, delay 0.05/0.15/0.3/0.45s).
2. **Facts-kort** (överlappar hero, margin-top -34px): 3 kolumner — Öppettider / Leverans / Hitta hit.
3. **"01 — Produkter / Vårt sortiment"**: grid `repeat(auto-fill,minmax(260px,1fr))`, 7 kategorikort (bild 170px + namn + beskrivning). Hover: kort lyfts -4px + skugga, bild scale 1.045 (transition 0.6s).
4. **"02 — Uthyrning / Maskinuthyrning"**: mörkt band (deep, radius 16) med CTA.
5. **"03 — Ute på öarna / Gjutet på Öckerö"**: grid 1.1fr/0.9fr — vänster: **video** `assets/Hero vid.mp4` (autoplay muted loop playsinline, object-fit:cover, radius 14, badge "Vår gård vid havet" med blur-bakgrund). Höger: sand-callout med Tullhuset-copy (exakt) + litet kort "Ejder 400 kg".
6. **Leverantörsstrip** (vit): namn i Instrument Serif 20px, grå → deep vid hover.

### Produkter (översikt)
Breadcrumb, H1 54px, ingress, samma kortgrid som startsidan + "Visa kategori →".

### Produktkategori (mall, ex. Markbeläggning)
Hero-banner 300px med kategoribild + gradient + breadcrumb + H1. Grid av underkategorikort (namn + kort beskrivning + pil). Sand-callout: "Osäker på mängd eller val av sten?" + CTA.

### Produktsida (mall)
Breadcrumb. 2 kolumner: bild 440px + 4 miniatyrer / eyebrow + H1 44px + produkttext (**ordagrann från nuvarande sajt**) + spec-kort (Lager/Leverans/Pris, värden högerställda) + CTA:er "Begär offert" + "Ring 031-96 60 66".

### Uthyrning
Kortgrid: Kombihammare/Kapmaskin, Betongslip/Dammsugare, Jordfräs, Övrigt — bild + beskrivning + "Ring för bokning →".

### Kontakt
2 kolumner. Vänster: adresskort, kontaktpersoner (Lennart Jansson 0707-866449 lennart@, Viktor Jansson 0704-825936 viktor@, Joakim Utbult 0708-867754, Hanna Utbult 0737-815298), butiksbild. Höger (sticky top 100px): mörk form-panel "Mejla oss" — Namn*, E-postadress*, meddelande*, skicka-knapp, bekräftelse "Ditt meddelande har skickats". Koppla till e-post via t.ex. Resend eller API-route.

## Interactions & Behavior
- **Scroll-reveal**: sektioner fadeUp+translateY(28px). Prototypen använder CSS `animation-timeline: view()` (`animation-range: entry 0% entry 30%`) — funkar i Chrome; för bredare stöd i produktion, använd IntersectionObserver eller Framer Motion `whileInView`.
- **Hero-video-fallback**: sätt `muted` som DOM-attribut + `video.play().catch()` i effect — React sätter annars bara JS-property och Chrome blockerar autoplay.
- Kort-hover: translateY(-4px) + skugga, 0.25s ease; bildzoom scale 1.045, 0.6s
- Knapp-hover: färgskifte + translateY(-2px), 0.25s
- Inga sidövergångsanimationer utöver fadeUp vid mount

## SEO-krav
- Behåll alla URL-slugs och sidtitlar/meta descriptions från nuvarande sajt
- All produktcopy ordagrann
- Semantisk HTML (h1 per sida, nav, main, footer), alt-texter på bilder
- Generera sitemap.xml + robots.txt

## Assets (i `assets/`)
AI-genererade (kan ersättas med riktiga foton senare): `Hero2.png` (hero), `Hero vid.mp4` (video, 960×960 — visas beskuren), `BetongCement.png`, `SandKrossJord.png`, `Byggmaterial.png`, `StenLecaRör.png`, `Ved.png` (kategorikort), `KombihammareKapmaskin.png`, `BetongslipDammsugare.png`, `Jordfräs.png` (uthyrning), `Produktsida.png`, `Miniatyr.png` (produktsida), `Hero.png` (äldre hero, reserv).

Från nuvarande sajts CDN (hämta hem lokalt innan lansering): Markbeläggning-kortet + kategori-hero (`cdn.yourvismawebsite.com/img/04/486d7eac...`), Trädgårdsdekor-kortet (`.../ee2b2bb8...`), Ejder-minibild (`.../77eeae66...`), butiksbild kontakt (`.../d265d74a...`).

## Files
- `Ockero Cement.dc.html` — hela prototypen (alla sidmallar; navigera via menyn). Layoutvärden i inline-styles = facit.
- `assets/` — alla bilder + video
