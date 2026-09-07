# Granskning inför lansering – Öckerö Cementgjuteri

Granskad 7 september 2026. Original: https://www.ockerocement.se/. Ny version: projektet Cement, visat på http://localhost:3000/.

## Bedömning

Den nya sidan har en tydligt förbättrad visuell grund: sammanhållen färgskala, bättre typografi, tydliga produktkort, kontaktvägar och öppettider. Behåll den riktningen. Den är däremot inte innehållsmässigt eller funktionellt färdig för lansering.

Originalets meny innehåller 32 produktundersidor. Den nya modellen har motsvarigheter till sju av dem, samtliga under Markbeläggning. **25 produktundersidor saknar egen motsvarighet**, även om flera produktnamn nämns i översiktstexterna. Sju motsvarigheter innebär inte att innehållet är färdigflyttat: detaljer, bilder, guider och korrekt lagerinformation saknas även där.

Rekommenderad ordning: säkra innehåll och fakta, färdigställ produkt- och uthyrningsmallar, rätta kontaktfunktion och mobil/tillgänglighet, optimera medier, verifiera URL-flytt och drift. Domänen pekas om först när lanseringskraven nedan är uppfyllda.

## Underlag och avgränsning

- Direkt hämtning av 64 adresser länkade från originalets startsida, inklusive navigation och cookies. 63 svarade HTTP 200; `/shop/Checkout` svarade 404 redan på originalet. `/startsida` är en extra adress till startsidan. Antalet är inte ett mått på unika innehållssidor.
- Text, bildreferenser och innehållslänkar finns i `original-inventory.json`. Det är en menybaserad inventering, inte en fullständig export av Visma eller Search Console. Vissa texter ligger i bilder och behöver transkriberas och faktagranskas vid innehållsflytten.
- Samtliga 23 sidor i den nya sidkartan svarade HTTP 200. Sju kontrollerade gamla adresser svarade 404 lokalt. Resultat finns i `local-checks.json`.
- Kodgranskning av sidmallar, gemensamma data, formulär/API, navigation, CSS, metadata, robots och sitemap.
- Visuell kontroll i Chrome av båda startsidorna, ny kontakt- och produktsida, originalets GDPR-information och miljödiplom. Mobilkontroll vid 390 och 320 CSS-pixlar samt öppning, sidbyte och Escape i mobilmenyn.
- TypeScript-kontroll passerade. `npm run lint` startar en interaktiv konfigurationsfråga; lint är alltså inte etablerat som automatiskt godkännandekrav. `npm audit` rapporterade fyra paket med hög allvarlighetsgrad.
- Ingen mejlleverans testades och inga kundmeddelanden skickades. Produktionsbygge, skarp hosting, DNS, Search Console, full cookieinventering, extern länkhälsa och verkliga Core Web Vitals har inte verifierats. Mobiltestet är webbläsarens storleksemulering, inte test på fysisk iPhone/Android.

## Måste rättas före lansering

### 1. Kontaktformuläret kan ge falsk bekräftelse

I `app/api/kontakt/route.ts` returneras `{ok:true}` även när `RESEND_API_KEY` saknas. Då loggas meddelandet och kunden får beskedet att det skickats. Loggning är inte en tillförlitlig inkorg. Detta är konstaterat i koden; det säger inte att en framtida produktionsmiljö saknar konfiguration.

Gör e-postkonfiguration obligatorisk i produktion, använd verifierad avsändare och bekräftad mottagare, och visa fel om leveransen inte accepteras. Testa därefter faktisk mottagning och svar till kundens adress. Lägg till typkontroll av JSON-fält, längdgränser, begränsad anropsfrekvens och enkelt botskydd. Numeriska eller oväntade fält kan i dag orsaka fel vid `.trim()`.

Kundens namn, e-post och meddelande ska inte rutinmässigt hamna i driftloggar. Bestäm hantering och gallring utifrån den faktiska verksamheten.

### 2. Produktsidorna innehåller felaktig generell presentation

Alla sju produktundersidor använder samma huvudbild och fyra statiska miniatyrer i `app/produkter/[kategori]/[produkt]/page.tsx`. Gräsmatta på rulle illustreras exempelvis av en asfalterad gång. Miniatyrerna går inte att använda som bildgalleri.

Alla visar dessutom **”Finns på gården”**, även gräs som brödtexten säger beställs. Även guiden för stenläggning får produktens lager- och prisruta. Originalet skiljer mellan lager och beställning på [marksten](https://www.ockerocement.se/produkter/markbelaggning/marksten-betongnatursten) och beskriver samordnad beställning av [gräsmatta](https://www.ockerocement.se/produkter/markbelaggning/fardig-grasmatta-grasmatta-pa-rulle).

Inför separata mallar för produktgrupp, produkt och guide. Låt bilder, specifikationer, leverantör, lager/beställning och relaterat innehåll vara individuella data. Ange ”Kontakta oss för lagerstatus” när status inte underhålls. Använd verkliga produktbilder och faktagranska nya påståenden, bland annat säckförsäljning, materialanvändning och svarstid samma dag.

### 3. Bevara gamla länkar och sökingångar

`next.config.ts` saknar omdirigeringar. Följande gamla adresser testades och ger 404 lokalt:

- `/startsida`
- `/produkter/betongcement/armering`
- `/produkter/markbelaggning/fardig-grasmatta-grasmatta-pa-rulle`
- `/uthyrning/jordfras`
- `/kontakt/har-hittar-du-oss`
- `/cookies`
- `/aktuellt/gdpr---for-din-trygghet`

Bevara gamla adresser där det är praktiskt. För ändrade adresser: skapa en uttrycklig gammal→ny-mappning, bygg relevant målsida och använd permanent omdirigering. Undvik att skicka alla produkter till startsidan. Även dokumentlänkar behöver inventeras: originalets leverantörssidor länkar bland annat till `/BE-Armeringshandboken.pdf` och `/WB+Produktkatalog.pdf`, vars filer och aktualitet ännu inte har verifierats.

Ingen av de 23 kontrollerade nya sidorna har canonical-tagg. Välj huvudvärd (`www` eller utan), lägg självrefererande canonical per sida och håll internlänkar, sitemap och delningsmetadata konsekventa. Nu är `openGraph.url` gemensamt satt till startsidan. Datum i sitemap ska motsvara innehållsändring, inte automatiskt bli ”nu” vid generering. [Googles flyttguide](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

Jag utgår från att ”domänbyte” betyder att befintliga ockerocement.se pekas till den nya driften. Vid ett faktiskt namnbyte behövs även en separat plan för den gamla domänen och dess omdirigeringar.

### 4. Integritet och cookies är ofärdiga

Sidfotens båda cookiealternativ länkar till `#` och har ingen funktion. En egen integritetssida saknas. Originalets [GDPR-sida](https://www.ockerocement.se/aktuellt/gdpr---for-din-trygghet) innehåller information som bild; den behöver ersättas med läsbar och aktuell information om den nya lösningen, inte kopieras okritiskt.

Kontaktens Google-karta är inbäddad direkt i sidan. Kartans faktiska lagring och externa anrop behöver undersökas. En enkel lösning är adress, kartlänk och en karta som laddas först efter ett aktivt val. Välj cookiehantering efter tjänsterna som faktiskt används; bygg inte en tom samtyckesruta. Icke nödvändiga kakor kräver som huvudregel samtycke, medan nödvändiga kakor har undantag. [PTS om kakor](https://pts.se/internet-och-telefoni/kakor-cookies/).

### 5. Miljöpåståenden behöver aktuella belägg

Det publicerade [miljödiplomet](https://www.ockerocement.se/miljo/miljodiplom) anger giltighet till **2017-03-09**, visuellt avläst i dokumentbilden. Det bevisar inte att företaget saknar senare diplom, men det publicerade underlaget styrker inte en aktuell diplomering.

Hämta det senaste godkända diplomet och miljöpolicyn. Visa utfärdare, datum och nedladdningsbar handling, med läsbar sammanfattning. Nuvarande nya miljösidor består av generell text och saknar själva handlingarna. Originalets [miljötext](https://www.ockerocement.se/miljo) innehåller också konkreta åtaganden som bör stämmas av, exempelvis elval, inköpsbedömning och samlastning.

### 6. Uppdatera och verifiera beroenden

`npm audit` rapporterar fyra berörda paket med hög allvarlighetsgrad: Next.js, PostCSS, Sharp och Nanoid. Installerad Next.js är 15.5.20; npm föreslog 15.5.25 som tillgänglig rättning vid kontrollen. Gör en kontrollerad uppdatering och granska återstående rapport efteråt. Kör produktionsbygge och relevanta funktionstester. Rapporten visar paketträffar, inte fyra bevisat exploaterbara angrepp mot just denna sajt.

## Innehåll som ska räddas och förbättras

### Betong/Cement – sju saknade undersidor

Armering, Betong/Cement, Byggkemi, Plattsättning, Murbruk, Putsbruk och Golvavjämning. Originalet har produktnamn, egenskaper, bilder och tillverkarlänkar. [Armering](https://www.ockerocement.se/produkter/betongcement/armering) beskriver exempelvis dimensioner och möjlighet att kapa armeringsnät. Nya sidan är en kort översikt.

Bygg tydliga produktgrupper med användningsområde, relevanta mått och aktuella produkt-/säkerhetsblad. Kontrollera att gamla produktnamn fortfarande säljs. Skapa även tydlig beställningsinformation för färdig betong, som lyfts på startsidan men saknar en ordentlig kundväg.

### Markbeläggning – sju sidor finns men behöver fyllas

Bevara produktval, verkliga bilder, leverantörslänkar och skillnaden mellan lager och beställning. Originalets [dekorsten](https://www.ockerocement.se/produkter/markbelaggning/dekorsten) nämner köp litervis med egen spann. [Gårds-/gånggrus](https://www.ockerocement.se/produkter/markbelaggning/gards-ganggrus) skiljer på fyra materialvarianter. Skiffer har namngiven produktserie. Gräsmatta har beställnings- och leveransupplägg.

Den nya läggningsguiden lovar anvisningar men innehåller bara en introduktion. Gör en riktig guide med steg, illustrationer och aktuella tillverkaranvisningar. Faktagranska särskilt formuleringen om gårds-/gånggrus som sättsand; olika material och fraktioner ska inte behandlas som utbytbara.

### Sand/Kross/Jord – två undersidor och viktig översiktsinformation saknas

Originalets [materialsida](https://www.ockerocement.se/produkter/sandkrossprodukterjord) anger gjut- och putssand, bärlager, väggrus, stenmjöl, flis, flera singel-/makadamfraktioner, asfaltkross och jord i lösvikt. Den nya beskrivningen reducerar kategorin till jord i säckar, gräsfrö och gödsel.

Återför sortimentet med fraktion, användning och försäljningsenhet. Återskapa Jord i säckar och Gräsfrö/gödsel. En senare mängdhjälp kan räkna volym utifrån yta och djup; tonnage kräver materialanpassad densitet och tydliga antaganden.

### Byggmaterial – bekräfta bildbaserat sortiment

Originalet anger ”Lagervaror” och visar bilder. Inventeringen av text räcker inte för att fastställa alla varor. Identifiera bilderna med företaget och gör produktnamn och användning till riktig text. Ersätt den nya mycket allmänna formuleringen med ett konkret sortiment.

### Sten/Leca/Rör – sex saknade undersidor

Leca, Mursten, Cementsten, **Stegsten**, Rör och Bygg själv med murblock. Stegsten finns på den direkt hämtade originalsidan även om äldre sökmotorunderlag missar den. Bevara dimensionsval, bilder och instruktioner. [Leca](https://www.ockerocement.se/produkter/stenlecaror/leca) beskriver flera format och försäljningsenheter.

### Ved – tre saknade undersidor

[Ved](https://www.ockerocement.se/produkter/ved/ved), Pellets och Värmeloggs har olika förpackningar och leveransinformation. Bevara dessa som valbara, jämförbara alternativ, med tydligt besked om frakt. Gamla priser och volymbegrepp måste bekräftas innan publicering.

### Trädgårdsdekoration/Rengöring – sju saknade undersidor

Gabioner, Betongkrukor/Cortenkrukor, Betongbänkar/Bordsskivor, Fyrar/Vattentunna, Rabattkant Cortenstål/Eldfat, Alternativ till ogräsbekämpning och Ocean. Originalet har mått, material, bilder, vissa priser samt guider. Exempel: [krukor](https://www.ockerocement.se/produkter/tradgardsdekorationrengoring/betongkrukorcortenkrukor) och [gabioner](https://www.ockerocement.se/produkter/tradgardsdekorationrengoring/gabioner).

Separera dekoration från rengöring visuellt. Ge egen betonggjutning en tydligare presentation med verkliga projekt, mått och offertväg. Startsidan bevarar Tullhuset och Ejder, men gör dem också möjliga att hitta i sortimentet. Stäm av vilka produkter som faktiskt gjuts av företaget respektive köps in.

### Uthyrning – fyra gamla undersidor har blivit fyra kort

[Övrigt](https://www.ockerocement.se/uthyrning/ovrigt) omfattar nio namngivna utrustningar: doppvärmare, glättare, jordborr, markvibrator, spridarvagn, tombola, vibrator, visp och trädgårdsvält. De är inte namngivna i nya versionen. [Jordfräsen](https://www.ockerocement.se/uthyrning/jordfras) har modell, arbetsmått och vikt som också försvunnit.

Ge varje relevant maskin en faktisk bild, kapacitet, användningsområde, hämtning/återlämning, tillbehör och tydlig bokningsförfrågan. Visa pris/villkor om företaget kan hålla dem aktuella. Byt platshållaren ”foto: Övrigt”. Automatisk bokningskalender behövs först om verksamheten kan underhålla tillgängligheten.

### Leverantörer – inventera mer än menyn

Nya sidan har sju textkort utan utgående länkar. Originalets [leverantörsöversikt](https://www.ockerocement.se/vara-leverantorer) innehåller fler logotyper och länkar, bland annat Göteborgs Handelsstål, Magrab, Fågelfors, Econova, Flisby, BEWI, Ocean och Minera. Menyn och översikten är inte helt samstämmiga.

Låt företaget bekräfta aktuella samarbeten och varumärkesnamn. Visa logotyp, produktområde, relevant katalog och riktig leverantörslänk. Ersätt gamla länkar först efter kontroll; flera använder äldre domäner och dokumentadresser.

### Kontakt, hitta hit och aktuellt

Adress, växelnummer, fyra kontaktpersoner och två mejladresser är bevarade. Kartlänkarna är tydligare. Lägg även till den praktiska informationen från [Här hittar du oss](https://www.ockerocement.se/kontakt/har-hittar-du-oss): möjlighet att se markstensutställning och kollektivtrafikinformation, efter aktuell kontroll.

Nyhetssidan består nu av en odaterad text om att fylla på inför säsongen. Originalets [Aktuellt](https://www.ockerocement.se/aktuellt) lyfter andra produkter. Inför daterade nyheter med slutdatum för kampanjer och ett enkelt sätt att ändra öppettider. Lägg en vanlig länk till företagets Facebook där den hjälper besökaren; ett tungt inbäddat flöde är inte nödvändigt.

## Förbättringar i design och kundflöde

1. **Gör startsidans huvudrubrik konkret.** Förslag: ”Byggmaterial och betong i Göteborgs skärgård”. Låt ”Välkommen till Öckerö Cementgjuteri” bli stödtext. Det synliggör erbjudandet snabbare.
2. **Behåll havsblått och sandfärger men förstärk verkligheten.** Använd fler egna fotografier av gården, personalen, leveranser och produkter. Kontrollera ursprung och användningsrätt för alla nya bilder. De stämningsfulla bilderna ska inte ge fel föreställning om produkt, anläggning eller referensprojekt.
3. **Prioritera tre ärenden:** hitta material, hyra maskin och ordna leverans. Visa dessa som korta vägar och låt ”Hitta hit” på startsidan vara klickbart.
4. **Förbättra sortimentsnavigationen.** En utfällbar kategorimeny och kategorispecifika underlänkar minskar letandet. Lägg till enkel sökning när hela sortimentet finns, gärna med synonymer som matjord/jord och gräsmatta/gräs på rulle.
5. **Låt offertknappen bära produktinformationen vidare.** Förifyll produkt/maskin och be om mängd, ort och önskat datum. Besökaren ska inte behöva skriva om vad den nyss tittade på.
6. **Anpassa hjälprutan till kategorin.** ”Osäker på mängd eller val av sten?” visas även under Ved och Betong. Skriv hjälp som passar materialet.
7. **Skapa en tydlig leveranssida.** Beskriv bekräftade leveransområden, hur beställning går till, vilka uppgifter ni behöver och hur frakt prissätts. Lova inte lastbilskapacitet, lossningssätt eller leveranstid utan underlag.
8. **Gör öppettider enkla att underhålla.** I dag upprepas hårdkodade tider i startsida, toppbanner och datafil. Samla dem och stöd avvikande helgdagar. Vem som ska kunna redigera sidan avgör om ett litet redigeringsgränssnitt behövs.

## Mobil, tillgänglighet och prestanda

- Vid 390 px fungerar den kontrollerade startsidans och kontaktsidans huvudsakliga stapling. Vid 320 px går menyknappen till cirka x=336 och klipps; `overflow-x:hidden` döljer breddfelet. Korta/omforma logotypraden och justera avstånd.
- Mobilmenyn öppnas och stängs vid sidbyte. Escape stänger den inte. Den kollapsade menyn finns kvar i tillgänglighetsträdet; gör dolda länkar oåtkomliga när menyn är stängd, koppla knappen till menyn och verifiera tangentbordsordningen.
- Formulärets tre fält har noll kopplade etiketter och saknar `aria-label`. Synlig etikett är i dag en `div`. Använd `label`/`htmlFor`, identifierbara fältfel, synligt tangentbordsfokus och tillgängliga statusmeddelanden. [W3C om formuläretiketter](https://www.w3.org/WAI/tutorials/forms/labels/).
- `noValidate` stänger av webbläsarens validering och API-fel blir ett generellt felmeddelande. Hjälp kunden att rätta det konkreta fältet.
- Produktbilder är CSS-bakgrunder och saknar bildalternativ. Använd riktiga bilder med relevanta alternativtexter där bilden bär produktinformation. Dekorativa bakgrunder kan fortsatt vara dekorativa.
- Lägg till ”Hoppa till innehåll”, `aria-current` för aktuell navigationslänk och kontrollera kontrast/fokus med automatiskt stöd och manuella tester.
- `.reveal` är osynlig innan JavaScript aktiverar den. CSS-regeln `.no-js .reveal` hjälper inte eftersom klassen aldrig sätts i layouten. Gör innehåll synligt som grundläge. Stöd för minskad rörelse täcker inte herons alla animationer eller den automatiska videon; ge pausmöjlighet och stillbildsalternativ.
- Startsidan refererar till drygt 13,6 MB bildfiler och en video på cirka 5,9 MB före eventuell nätverksoptimering. Detta är filstorlekar, inte uppmätt överföring eller laddtid. Flera små kort använder PNG på 1,7–2,8 MB. Gör responsiva WebP/AVIF-bilder, korrekt prioritering av huvudbild och uppskjuten laddning av övriga medier. Videon har `preload="auto"`, saknar poster och försöker spela direkt.
- Mät slutligen produktionsversionen på långsammare mobilnät. Sätt prestandabudget och följ LCP, INP och CLS; inga verifierade värden eller Lighthouse-poäng finns ännu i denna granskning.

## Förslag till arbetsordning och godkännandekrav

### Etapp 1 – innehåll och fakta

Gå igenom inventeringen med företaget. Märk varje sida behåll/uppdatera/slå ihop/utgå. Bekräfta sortiment, mått, pris, lager, leveranser, kontakter och miljöhandlingar. Samla rätt bilder och aktuella leverantörsdokument. Ingen blank eller generisk ersättningssida ska räknas som färdigflyttad.

### Etapp 2 – färdig produkt och kundväg

Utöka datamodellen till alla produktgrupper och hyrmaskiner. Bygg relevanta sidmallar och verkligt bildgalleri. Lägg till leveransinformation, guidemall och produktkopplad offert. Klart när en besökare kan hitta en viss produkt/maskin, förstå alternativen och skicka en tydlig förfrågan.

### Etapp 3 – kvalitet och drift

Rätta mejlleverans, integritet/cookies, mobil, tangentbord och bildprestanda. Uppdatera beroenden och konfigurera lint. Klart när produktionsbygge och kontroller passerar, mejlet har kommit fram i mottagarens inkorg och felfall ger korrekt återkoppling.

### Etapp 4 – lansering

- Varje gammal viktig adress behålls, omdirigeras till relevant innehåll eller får ett medvetet 404/410-beslut. Kontrollera mot Search Console och loggar, inte bara menylistan.
- Alla nya interna länkar, bilder, dokument, canonical-adresser och sitemap-poster fungerar i den skarpa miljön.
- Förhandsmiljön hålls utanför sökindex; produktionsmiljön får rätt indexeringsinställningar när den är färdig.
- Domän, HTTPS, vald www-variant, DNS och e-postposter verifieras. Befintliga MX/SPF/DKIM/DMARC ska bevaras eller ändras enligt en separat, verifierad mejlplan.
- Skarp sida visar rätt kontaktuppgifter, tider, lagerformuleringar och miljöbelägg.
- Ta backup och dokumentera återgång till gamla hostingen före ompekning. Följ därefter fel, mejlleverans, 404 och söktrafik.

Granskningen har lagt till underlag i `docs/audit/`. Applikationens innehåll, design och produktionsinställningar har inte ändrats.
