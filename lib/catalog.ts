export type CatalogItem = {
  category: string; slug: string; name: string; intro: string; details: string[];
  oldPath: string; guide?: boolean; image?: string; imageAlt?: string;
};
type Row = [string, string, string, string[], boolean?];
// Product groups and variants recovered from the original site on 2026-09-07.
// Prices and live stock are deliberately not inferred from the old catalogue.
const groups: Record<string, { old: string; rows: Row[] }> = {
 "betong-cement": { old: "betongcement", rows: [
 ["armering","Armering","Armeringsjärn, nät och bistål för gjutning och murverk.",["Armeringsjärn i dimensionerna 6, 8, 10, 12, 16 och 25 mm.","Armeringsnät i 5 × 2,30 m och 2,5 × 1,5 m. Fråga oss om kapning till önskat mått.","Nät för golvspackling och bistål för murverk."]],
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
 ["ror","Rör","Kontakta oss om rör och kompletterande material.",["Ange dimension, användningsområde och mängd så hjälper vi dig kontrollera rätt utförande."]],
 ["bygg-sjalv-med-murblock","Bygga med murblock","Förbered ditt murprojekt med rätt material och anvisningar.",["Skissa placering och mått och beskriv om muren ska hålla tillbaka jord eller vara fristående.","Välj ett blocksystem anpassat till konstruktionen. Följ systemets anvisningar för grundläggning, dränering och eventuell armering.","Ta med skissen när du kontaktar oss för material. Bärande konstruktioner behöver dimensioneras för platsen."],true]
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
 ["ocean","Rengöring och Ocean","Rengöringsprodukter för hem och arbete.",["Oceanprodukter samt allrengöring och handvård.","Beskriv yta och användning när du frågar efter en produkt. Följ produktens dosering och anvisningar."]]
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

