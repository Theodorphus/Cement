# Genomförda förbättringar medan produktuppgifter inväntas

Denna uppföljning gäller efter innehållsgranskningen `status-2026-09-10.md`.

## Genomfört

- Produktkortens minsta bredd anpassas till skärmen på startsida, produktöversikt och miljösida. Uthyrningsbandets sidmarginaler är också responsiva.
- Sidans overflow-regel använder `clip`, så den fasta huvudmenyn fungerar vid scrollning. Filmens bildtext har flyttats från spelarknapparna till överkanten.
- Sökningen omfattar kategorier och material i lösvikt, exempelvis bärlager och stenmjöl. Ejder är sökbar och har förfrågelänk från startsida och dekorkategori. Sökord följer med till kontakt när ingen träff finns.
- Kontaktsidan visar telefon och direkta mejllänkar tills Resend är konfigurerat. Produktnamnet följer med i mejlets ämne. Formuläret visas automatiskt när samtliga inställningar finns. Öppettider visas även i kontaktens adresskort.
- En gemensam serverkontroll håller kontaktpanel och API överens om konfigurationen. Formuläret har uttrycklig POST-metod och JavaScript-information för att undvika standardbeteendet GET vid avstängd JavaScript.
- Relevanta produkt-, guide- och leverantörssidor länkar till verifierade officiella underlag från Benders, Leca, BE Group och Wienerberger. Äldre dokumentadresser omdirigeras till respektive tillverkares underlag.
- Trasiga svenska tecken i produktbildernas alternativtexter har reparerats.
- README beskriver dagens implementation och lanseringsordning. Nytt kommando `npm run check:site` kontrollerar sidkarta, gamla sidor, interna länkar, tillgångar, 404 och formulärets avvisning av felaktiga anrop.

## Verifiering

- Produktionsbygge, lint, TypeScript och fyra automatiska tester passerar.
- Lokal HTTP-kontroll: 69 sidkartsadresser, 63 gamla adresser, 134 interna länkar och 68 extraherade tillgångsadresser. Inga fel. Gamla dokumentadresser kontrolleras separat som 308-omdirigeringar.
- Manuellt i Chrome: produktöversikt och kontakt vid 320 CSS-pixlar, produktgalleri vid 390 och guide/huvudmeny vid 1280. Ingen horisontell överbredd i de kontrollerade vyerna. Mobilmenyn öppnar, stänger med Escape och återför fokus. Bildval byter huvudbild. Sökning på stenmjöl, gräs på rulle och Ejder fungerar.
- `npm audit --omit=dev`: inga rapporterade sårbarheter. Kontrollen gäller produktionsberoendena vid kontrolltillfället.
- Inga mejl har skickats och ingen publicering, domänändring eller Resend-konfiguration har gjorts. Mobilkontrollen är webbläsaremulering, inte fysiska telefoner. Full mejlleverans och driftens anropsbegränsning verifieras vid aktivering.

## Kvar att få från kunden

Aktuellt sortiment, mått, varianter, godkända bilder, eventuella priser och uthyrningsvillkor samt aktuell miljöpolicy och eventuellt miljödiplom. Byggmaterial och Rör behöver framför allt konkreta produktuppgifter. Gamla priser eller lagerlöften har inte återinförts.

## När användaren ordnar domän och Resend

Verifiera HTTPS, huvudvärd och omdirigeringar, sätt indexering för publik produktion, konfigurera och testa mejlmottagning/svar samt anpassa integritetsinformationen efter valda drifttjänster. Lägg ett delat skydd mot upprepade formuläranrop på driftplattformen.

Tillverkarunderlag, kontrollerade 10 september 2026:

- https://www.benders.se/om-oss/artikelarkiv/2014/anlaggning-for-marksten-plattor-och-murar/
- https://www.leca.se/dokument
- https://www.begroup.se/produkter/armering
- https://www.wienerberger.se/verktyg-service/kataloger-broschyrer.html
