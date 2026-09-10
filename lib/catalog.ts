export type CatalogItem = {
  category: string; slug: string; name: string; intro: string; details: string[];
  oldPath: string; guide?: boolean; image?: string; imageAlt?: string;
};
type Row = [string, string, string, string[], boolean?];
// Product groups and variants recovered from the original site on 2026-09-07.
// Prices and live stock are deliberately not inferred from the old catalogue.
const groups: Record<string, { old: string; rows: Row[] }> = {
 "betong-cement": { old: "betongcement", rows: [
 ["armering","Armering","Armeringsjärn, nät och bistål för gjutning och murverk.",["Armeringsjärn i dimensionerna 6, 8, 10, 12, 16 och 25 mm.","Armeringsnät i 5 × 2,30 m och 2,5 × 1,5 m. Fråga oss om kapning till önskat mått.","Nät för golvspackling i två utföranden: 80 × 120 cm med 3,4 mm tråd och 10 × 10 cm rutor, samt 75 × 115 cm med 2,5 mm tråd och 6,5 cm rutor.","Bistål för murverk."]],
 ["betongcement","Betong och cement","Betong, cement och reparationsbruk för olika gjutnings- och lagningsarbeten.",["Finbetong och grovbetong, byggcement och cementbruk.","Reparationsbruk, betongspackel och expanderbruk.","Berätta om underlag, användning och mängd så hjälper vi dig välja rätt produkt."]],
 ["byggkemi","Byggkemi","Produkter för behandling, rengöring och komplettering av mineraliska underlag.",["Fasadskydd, murtvätt och vattenstopp/ytförstärkare.","Kontakta oss för aktuell produkt och tillverkarens anvisningar för ditt underlag."]],
 ["plattsattning","Plattsättning","Fix och fog för keramiska plattor.",["Fästmassa och fogmassa från sortiment som Weber och Mapei.","Valet beror på platta, underlag, fogbredd och om ytan är inom- eller utomhus. Be om rätt produktblad."]],
 ["murbruk","Murbruk","Bruk för murning och lagning.",["Murbruk, puts- och murbruk, tunnfogsbruk och eldfast bruk.","Ange vilken sten eller vilket block du arbetar med när du kontaktar oss."]],
 ["putsbruk","Putsbruk","Grundning och puts för mineraliska ytor.",["Grundningsbruk samt puts- och murbruk i olika klasser.","Underlag och befintlig puts avgör vilket system som passar. Följ produktens anvisningar."]],
 ["golvavjamning","Golvavjämning","Avjämning, primer och handspackel för golvarbeten.",["Värmegolvspackel, självutjämnande avjämningsmassa och golvprimer.","Handspackel och snabbhårdnande golvbruk.","Beskriv underlag, yta och önskad skikttjocklek vid förfrågan."]]
 ]},
 "markbelaggning": { old: "markbelaggning", rows: [
 ["marksten-betongnatursten","Marksten i betong och natursten","Marksten för uppfart, gång och uteplats.",["Sortiment från S:T Eriks och Benders samt tumlad granit.","Olika format, färger och ytor. En del produkter tas hem på beställning.","Skicka gärna yta i kvadratmeter och hur platsen ska användas."]],
 ["plattor","Plattor","Plattor för uteplatser och gångar.",["Betongplattor från S:T Eriks och Benders i olika utföranden.","Lager och beställningssortiment varierar. Kontakta oss för aktuella alternativ."]],
 ["dekorsten","Dekorsten","Sten för rabatter, planteringar och trädgårdens detaljer.",["Dekorsten kan köpas litervis – ta gärna med en spann.","Fråga oss om aktuella kulörer och storlekar."]],
 ["skiffer","Skiffer","Natursten med varierande struktur och uttryck.",["Offerdal natural riven finns beskriven i vårt skiffersortiment.","Kontakta oss för format, mängd och beställning."]],
 ["fardig-grasmatta-grasmatta-pa-rulle","Gräsmatta på rulle","Färdig gräsmatta från Vedums Gräs, på beställning.",["Beställningar samordnas för att ta hem gräsmattan färsk.","Leverans och läggningsdag behöver planeras tillsammans. Ange yta, adress och önskat datum.","Kontakta oss innan du planerar hämtning eller leverans."]],
 ["gards-ganggrus","Gårds- och gånggrus","Grus i olika färger och fraktioner för gård och gång.",["Rund natur 8/16, singel röd 8/11, singel grå 8/11 och singel 4/8.","Ange önskad yta och användning så hjälper vi dig med materialval och mängd."]],
 ["ejder","Ejder 400 kg","Vår egen gjutna ejder – ett vackert väghinder som håller sig på plats.",["Gjuten i betong och väger cirka 400 kg, vilket gör den stadig som avstängare vid infarter, gångar och parkeringar.","Ett dekorativt alternativ till betongsuggor och plastbockar – den syns ute på öarna, bland annat uppradad på stenpiren vid Tullhuset.","Kontakta oss för aktuellt utförande, pris och hjälp med transport. Tyngden gör att den behöver lastas med maskin."]],
 ["laggningsanvisningar-marksten-och-plattor","Lägga marksten och plattor","Planera material och underarbete innan du börjar lägga.",["Börja med att mäta ytan och bestäm om den ska användas som gång, uteplats eller uppfart.","Välj sten och läggningsmönster. Planera avslut, kantstöd och avvattning.","Anpassa schaktning, bärlager och packning efter markförhållanden och belastning. Följ stenleverantörens anvisning.","Lägg stenen enligt anvisningen och avsluta med rätt fogmaterial. Kontrollera om vald produkt får maskinpackas.","Ta med mått och gärna en bild på platsen så hjälper vi dig med materiallistan."],true]
 ]},
 "sand-kross-jord": { old: "sandkrossprodukterjord", rows: [
 ["jord-i-sackar","Jord i säckar","Jord och jordförbättring för plantering och odling.",["Planteringsjord, urnjord, så- och kaktusjord samt grönsaksjord.","Rosjord, rhododendronjord och gräsmattedress.","Barkmull, täckbark, torv och naturgödsel. Fråga oss om aktuell säckstorlek och sortiment."]],
 ["grasfrogodsel","Gräsfrö och gödsel","Frö och näring för gräsmatta och trädgård.",["Gräsfrö i olika blandningar och förpackningar, bland annat Villa Classic och Extra Green.","Hönsgödsel och organisk universalnäring.","Beskriv växtplats och yta så hjälper vi dig hitta ett lämpligt alternativ."]]
 ]},
 "sten-leca-ror": { old: "stenlecaror", rows: [
 ["leca","Leca","Lättklinker, murblock och balkar.",["Lättklinker i säck och större mängd. Fråga om försäljningsenhet.","Murblock i bredder 7, 9, 12, 15, 19, 25 och 30 cm, med höjd 19 och längd 59 cm.","Balkar, isolerblock och kompletterande delar. Kontrollera aktuellt utförande vid beställning."]],
 ["mursten","Mursten","Mursten och murblock för trädgårdens avgränsningar.",["Alternativ från S:T Eriks och Benders.","Ange höjd, längd och markförhållanden när du frågar efter material."]],
 ["cementsten","Cementsten","Cementsten i flera format.",["Format som 10 × 40, 15 × 40, 20 × 40, 25 × 40 och 30 × 40 cm.","Kontakta oss för fullständiga mått, användning och tillgänglighet."]],
 ["stegsten","Stegsten","Enstaka steg eller en gång genom trädgården.",["Oregelbunden stegsten i skiffer, ungefär 400 × 400 × 30–40 mm.","Stegsten i granit, 56 × 42 × 3 cm. Bekräfta format vid beställning."]],
 ["ror","Rör och rördelar","Avloppsrör, muffrör och delar i plast och betong.",["PVC-rör 110 och 160 mm med böjar 15°, 30°, 45° och 90°, grenrör, skarvmuffar, skjutmuff, förminskning 160/110 och propp.","HT-rör 50, 75 och 110 mm i tremeterslängder med böjar, grenrör, skarvar och förminskning 110/75.","Muffrör i betong 6, 9, 12 och 16 tum med tillhörande lock och packningar.","Manschett 110 mm, lövsil, rensbrunn och skyddslock.","Ange dimension, användningsområde och mängd så hjälper vi dig kontrollera rätt utförande."]],
 ["dranering","Dränering och dagvatten","Dräneringsrör, slang och delar för att leda bort vatten.",["Dräneringsrör 110 mm samt dränslang 50 och 92 mm på rulle.","Grenrör T och Y, skarvar och dränanslutning 110/92 för 92-systemet.","Dagvattenslang 110 mm, flexböj och elkabelslang 50 mm.","Fiberduk och markduk per kvadratmeter eller på rulle.","Beskriv gärna hur vattnet ska ledas bort så hjälper vi dig få ihop rätt delar."]],
 ["brunnar-betackningar","Brunnar och betäckningar","Brunnar, stigarrör och lock för mark och gård.",["Wavin-system med botten, rör, teleskopsrör, packning och lock med handtag.","Stigarrör 400 mm med botten samt förhöjningsringar i plast.","Järnbetäckningar 150, 225, 300 och 400 mm i tät och silad utföring.","Spygatt med sido- eller bottenutlopp, golvbrunnar och serviceplatta.","Ange brunnsdiameter och djup när du hör av dig."]],
 ["rannor-galler","Rännor och galler","Linjeavvattning för uppfart, garageinfart och entré.",["ACO Self ränna 1 m och halvränna 0,5 m, med utlopp i botten eller gavel.","Spaltgaller varmförzinkat, täta gavlar och tillvalssats.","Golvsil i rostfritt, tallriksventil och ventiler i galvat och koppar.","Berätta hur lång sträcka du ska avvattna så räknar vi ihop delarna."]],
 ["bygg-sjalv-med-murblock","Bygga med murblock","Förbered ditt murprojekt med rätt material och anvisningar.",["Skissa placering och mått och beskriv om muren ska hålla tillbaka jord eller vara fristående.","Välj ett blocksystem anpassat till konstruktionen. Följ systemets anvisningar för grundläggning, dränering och eventuell armering.","Ta med skissen när du kontaktar oss för material. Bärande konstruktioner behöver dimensioneras för platsen."],true]
 ]},
 "byggmaterial": { old: "byggmaterial", rows: [
 ["verktyg-handredskap","Verktyg och handredskap","Handverktyg för mur-, puts- och betongarbete.",["Murslevar, iläggarslevar i flera storlekar, skärslev, tungslev och fogslev.","Stålslipar, filtbrädor, rivbrädor i plast, putshakar och glättare.","Bredspacklar, tandspacklar och fyllhammare.","Murarhammare, gummiklubba, najtång och najvev.","Byggskyfflar, grävspade, krattor, snöskyffel och skottkärra 90 l."]],
 ["gjutning-formning","Gjutning och formsättning","Formrör, distans och tillbehör för gjutning.",["Formrör 12, 15, 19, 25, 30 och 40 cm, säljs per meter.","Distanskloss i höjder från 15 upp till 150 mm, distanskona och distansrör i plast.","Najtråd på rulle och i bunt, armeringsstöd och nivåpinnar.","Fiber i lösvikt, avstängarlist och fogbrädor.","Vispar och blandare för borrmaskin i flera storlekar samt murarbaljor och mätbägare."]],
 ["infastning-forbrukning","Infästning och förbrukning","Spik, plugg, skruv och byggmaterial som går åt.",["Spikplugg, metallspikplugg, slagspik, krampor och hullingar.","Gängstång M8 och M10, franska skruv, bergdubb och bergögla 18×175 mm.","Stolpskor 2, 3 och 4 tum, vinkeljärn, plintjärn och hålband.","Byggplast, byggtejp, bjälklagspapp, träkilar och plastkilar.","Sopsäckar, sandsäckar och storsäckar för 1,25 och 1,5 ton – med eller utan lastning."]],
 ["borr-kapning","Borr och kapning","Diamantverktyg för borrning och kapning.",["Diamantborr 20, 35 och 70 mm.","Diamantklingor 125, 180 och 230 mm samt kapskiva för stål.","Beskriv material och djup så hjälper vi dig välja rätt verktyg."]],
 ["golvbrunnar-ventiler","Golvbrunnar, ventiler och luckor","Detaljer till golv, fasad och skorsten.",["Golvbrunnar i plast med rakt utlopp, klämring och golvsil i rostfritt.","Ventiler i galvat 15×15 och 20×20 cm, fasadventil och kopparventil.","Sotluckor 125×125 och 150×150 mm samt isolerad sotlucka.","Spjäll i gjutjärn 150×225 mm och tallriksventil."]],
 ["skydd-underhall","Skydd och underhåll","Dukar, mattor och produkter som skyddar konstruktionen.",["Platonmatta per kvadratmeter med list och fästbricka.","Putsnät i rulle, per kvadratmeter och glasfibernät.","Ogräsduk 140 g/m² och markduk på rulle om 200 m².","Borstar för fasad, slam och stål, piasavakvastar med skaft samt penslar och roller.","Arbetshandskar i flera utföranden och handsträckfilm."]]
 ]},
 "ved": { old: "ved", rows: [
 ["ved","Björkved","Ved i säck och större volymer.",["Vedsäck cirka 80 liter.","Grovhuggen björkved i 1 och 2 kubik samt finhuggen i 1 och 1,5 kubik.","Vid hemkörning tillkommer transportkostnad. Bekräfta volymmått, pris och leverans vid beställning."]],
 ["pellets","Pellets","Pellets i säck eller på pall.",["Säck om 16 kg och pall med 52 säckar enligt sortimentet.","Kontakta oss för aktuell pellets, pris och leverans."]],
 ["varmeloggs","Värmeloggs","Komprimerat spån för eldning i lämplig eldstad.",["Förpackning med 12 loggs, tre förpackningar eller pall med 96 förpackningar.","Följ alltid eldstadens och bränslets anvisningar. Fråga oss om aktuellt sortiment."]]
 ]},
 "tradgardsdekoration-rengoring": { old: "tradgardsdekorationrengoring", rows: [
 ["gabioner","Gabioner","Stenfyllda gabioner för trädgårdens rum och avgränsningar.",["Raka och runda modeller från Gabiola.","Olika diametrar, höjder och maskstorlekar. Be om monteringsanvisning för vald modell."]],
 ["betongkrukorcortenkrukor","Betongkrukor och cortenkrukor","Krukor, kuber och planteringskärl i olika former.",["Runda, höga och rektangulära betongkrukor samt skålar.","Kuber och rektangulära kärl i cortenstål.","Ange önskad form och mått när du kontaktar oss."]],
 ["betongbankarbordsskivor","Betongbänkar och bordsskivor","Bänkar och skivor för uteplats och trädgård.",["Betongbänkar i grått och antracit, bland annat längder 120 och 130 cm.","Runda och rektangulära skivor i flera storlekar.","Kontakta oss för aktuella mått, vikt, pris och leveransmöjlighet."]],
 ["fyrarvattentunna","Fyrar och vattentunnor","Dekorativa fyrar och tunnor för trädgården.",["Fyrar i olika storlekar och gabionfyrar.","Ektunnor och begagnade vin- och sherryfat i olika volymer.","Fråga oss om aktuella modeller, skick och storlekar."]],
 ["rabattkant-cortenstaleldfat-mm","Cortenstål och eldfat","Rabattkanter, ringar och detaljer i stål.",["Cortenplåt med skarvsats, slät cortenplåt och cortenringar.","Eldfat i diametrar 47, 75 och 90 cm samt dekorationsklot.","Kontakta oss för aktuella mått och utföranden."]],
 ["alternativ-till-ograsbekampning","Ogräs i trädgården","Behöver du hjälp att välja en lösning för ogräs?",["Berätta om ytan och vad som växer där. Vi hjälper dig undersöka lämpliga alternativ i sortimentet.","Följ alltid produktens etikett och användningsanvisning."]],
 ["ocean","Rengöring och Ocean","Rengöringsprodukter för hem och arbete.",["Oceanprodukter, allrengöring och bastvätt med refill.","Beskriv yta och användning när du frågar efter en produkt. Följ produktens dosering och anvisningar."]]
 ]}
};
const renamed: Record<string,string> = {
 "marksten-betongnatursten":"marksten-betong-natursten",
 "fardig-grasmatta-grasmatta-pa-rulle":"fardig-grasmatta",
 "laggningsanvisningar-marksten-och-plattor":"laggningsanvisningar"
};
export const CATALOG: CatalogItem[] = Object.entries(groups).flatMap(([category, group]) => group.rows.map(([oldSlug,name,intro,details,guide]) => ({
 category, slug: renamed[oldSlug] ?? oldSlug, name, intro, details, guide,
 oldPath: `/produkter/${group.old}/${oldSlug}`
})));
export function productPath(item: CatalogItem) { return `/produkter/${item.category}/${item.slug}`; }
export function getProduct(category: string, slug: string) { return CATALOG.find(p => p.category === category && p.slug === slug); }
export const MATERIALS = [
 ["Sand", "Gjutsand 0/8", "Putssand 0/4"],
 ["Krossprodukter", "Bärlagergrus 0/32", "Väggrus 0/18", "Stenmjöl 0/5", "Flis 2/5", "Singel 5/8 och 8/11", "Makadam 11/16 och 16/22", "Asfaltkross"],
 ["Jord i lösvikt", "Harpad matjord", "Fyllnadsjord"]
];

