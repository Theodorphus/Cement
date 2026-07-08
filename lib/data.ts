/**
 * Delat data-lager. All copy är hämtad ordagrant från prototypen (facit)
 * och ska inte ändras utan anledning — texter är SEO-viktiga.
 */

export const FORETAG = {
  namn: "Öckerö Cementgjuteri AB",
  adressRad1: "Industriområde S Långesand 7",
  adressRad2: "475 31 Öckerö",
  telefon: "031-96 60 66",
  telefonHref: "tel:031966066",
  oppettiderRad1: "Måndag–fredag 7–16",
  oppettiderRad2: "Lördagar 9–13",
  /** Google Maps-sökning på adressen (öppnar rätt plats i alla enheter). */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Långesand 7, 475 31 Öckerö"),
  /** Inbäddningsbar karta (kräver ingen API-nyckel). */
  mapsEmbedUrl:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Långesand 7, 475 31 Öckerö") +
    "&z=14&output=embed",
};

export type NavItem = {
  label: string;
  href: string;
  /** Matcha även dessa path-prefix som "aktiv" i navet. */
  matchPrefix?: string[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Startsida", href: "/" },
  { label: "Produkter", href: "/produkter", matchPrefix: ["/produkter"] },
  { label: "Uthyrning", href: "/uthyrning" },
  { label: "Våra leverantörer", href: "/vara-leverantorer" },
  { label: "Miljö", href: "/miljo" },
  { label: "Aktuellt", href: "/aktuellt" },
  { label: "Kontakt", href: "/kontakt" },
];

export type Kategori = {
  slug: string;
  name: string;
  desc: string;
  /** Lokal asset eller extern CDN-url; null = platshållarmönster. */
  img: string | null;
};

export const KATEGORIER: Kategori[] = [
  {
    slug: "betong-cement",
    name: "Betong/Cement",
    desc: "Armering, byggkemi, murbruk, putsbruk och golvavjämning.",
    img: "/assets/BetongCement.png",
  },
  {
    slug: "markbelaggning",
    name: "Markbeläggning",
    desc: "Marksten, plattor, dekorsten, skiffer och färdig gräsmatta.",
    img: "/assets/Markbelaggning.jpg",
  },
  {
    slug: "sand-kross-jord",
    name: "Sand/Krossprodukter/Jord",
    desc: "Jord i säckar, gräsfrö och gödsel.",
    img: "/assets/SandKrossJord.png",
  },
  {
    slug: "byggmaterial",
    name: "Byggmaterial",
    desc: "Material för husgrund och bygge.",
    img: "/assets/Byggmaterial.png",
  },
  {
    slug: "sten-leca-ror",
    name: "Sten/Leca/Rör",
    desc: "Leca, mursten, cementsten, stegsten och rör.",
    img: "/assets/StenLecaR%C3%B6r.png",
  },
  {
    slug: "ved",
    name: "Ved",
    desc: "Ved, pellets och värmeloggs.",
    img: "/assets/Ved.png",
  },
  {
    slug: "tradgardsdekoration-rengoring",
    name: "Trädgårdsdekoration/Rengöring",
    desc: "Gabioner, betongkrukor, bänkar, fyrar och eldfat.",
    img: "/assets/Tradgardsdekor.jpg",
  },
];

export function getKategori(slug: string): Kategori | undefined {
  return KATEGORIER.find((k) => k.slug === slug);
}

/** Hero-/bannerbild för kategorisidan Markbeläggning. */
export const MARKBELAGGNING_HERO = "/assets/Markbelaggning.jpg";

export type Subkategori = {
  slug: string;
  name: string;
  desc: string;
  /** Brödtext på produktsidan. Placeholder tills ordagrann copy från sajten fyllts i. */
  text: string;
};

/** Underkategorier under Markbeläggning (enda kategorin med fullt innehåll i prototypen). */
export const SUBKATEGORIER: Subkategori[] = [
  {
    slug: "marksten-betong-natursten",
    name: "Marksten betong/natursten",
    desc: "Från S:T Eriks och Benders",
    text:
      "Marksten i både betong och natursten från bl.a. S:T Eriks och Benders, i flera format, ytor och färger. Marksten passar för uppfarter, gångar och uteplatser och tål vårt kustklimat väl. Vi hjälper dig gärna att räkna på hur många kvadratmeter ditt projekt kräver — kontakta oss så plockar vi fram rätt sten.",
  },
  {
    slug: "plattor",
    name: "Plattor",
    desc: "Betongplattor i flera format",
    text:
      "Betongplattor i flera format och färger för uteplatsen, altanen eller gången. Vi har allt från klassiska släta plattor till större format för en modern känsla. Ring oss så berättar vi vad vi har hemma på gården just nu.",
  },
  {
    slug: "dekorsten",
    name: "Dekorsten",
    desc: "Singel, kullersten m.m.",
    text:
      "Dekorsten som singel och kullersten för rabatter, gångar och att rama in planteringar. Finns i olika storlekar och kulörer — säljs i lösvikt och säck. Vi levererar i skärgården och Torslanda.",
  },
  {
    slug: "skiffer",
    name: "Skiffer",
    desc: "Natursten för gångar och uteplats",
    text:
      "Skiffer i natursten ger en tålig och vacker yta för gångar och uteplatser. Naturstenens variation i färg och struktur gör varje läggning unik. Kontakta oss för aktuellt sortiment och priser.",
  },
  {
    slug: "fardig-grasmatta",
    name: "Färdig Gräsmatta / Gräsmatta på Rulle",
    desc: "Från Vedums Gräs",
    text:
      "Färdig gräsmatta på rulle från Vedums Gräs — en snabb väg till grön gräsmatta utan väntan på sådd. Beställs i god tid så den är färsk när du ska lägga. Vi hjälper dig räkna på hur många kvadratmeter du behöver.",
  },
  {
    slug: "gards-ganggrus",
    name: "Gårds-/Gånggrus",
    desc: "Grus för gårdsplan och gångar",
    text:
      "Gårds- och gånggrus för gårdsplan, gångar och som sättsand under sten och plattor. Säljs i lösvikt och säck, med leverans i skärgården och Torslanda. Ring oss för mängd och pris.",
  },
  {
    slug: "laggningsanvisningar",
    name: "Läggningsanvisningar marksten och plattor",
    desc: "Guider för att lägga själv",
    text:
      "Ska du lägga marksten eller plattor själv? Här samlar vi tips och läggningsanvisningar för ett hållbart resultat — från bärlager och sättsand till fogning. Är du osäker på något steg är du välkommen att ringa oss.",
  },
];

export function getSubkategori(slug: string): Subkategori | undefined {
  return SUBKATEGORIER.find((s) => s.slug === slug);
}

export type Maskin = {
  name: string;
  desc: string;
  img: string | null;
};

export const UTHYRNING: Maskin[] = [
  {
    name: "Kombihammare/Kapmaskin",
    desc: "För rivning, bilning och kapning.",
    img: "/assets/KombihammareKapmaskin.png",
  },
  {
    name: "Betongslip/Dammsugare",
    desc: "Slipa betonggolv dammfritt.",
    img: "/assets/BetongslipDammsugare.png",
  },
  {
    name: "Jordfräs",
    desc: "Förbered rabatter och gräsmatta.",
    img: "/assets/Jordfr%C3%A4s.png",
  },
  {
    name: "Övrigt",
    desc: "Fler maskiner och tillbehör — ring oss.",
    img: null,
  },
];

export type Leverantor = {
  name: string;
  desc: string;
};

export const LEVERANTORER: Leverantor[] = [
  { name: "S:T Eriks", desc: "Marksten, plattor och murar." },
  { name: "Benders", desc: "Tak- och marksten." },
  { name: "Weber", desc: "Bruk, puts och golvavjämning." },
  { name: "Jackon", desc: "Isolering och grundelement." },
  { name: "BE-Group", desc: "Armering och stål." },
  { name: "Wienerberger", desc: "Tegel och mursten." },
  { name: "Vedums Gräs", desc: "Färdig gräsmatta på rulle." },
];

export type Kontakt = {
  name: string;
  phone: string;
  email: string | null;
};

export const KONTAKTER: Kontakt[] = [
  { name: "Lennart Jansson", phone: "0707-866449", email: "lennart@ockerocement.se" },
  { name: "Viktor Jansson", phone: "0704-825936", email: "viktor@ockerocement.se" },
  { name: "Joakim Utbult", phone: "0708-867754", email: null },
  { name: "Hanna Utbult", phone: "0737-815298", email: null },
];

export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[-\s]/g, "");
}

/** Diagonalt beige mönster som platshållare när bild saknas (från prototypen). */
export const PLACEHOLDER_STRIPES =
  "repeating-linear-gradient(45deg,#EDE8DC,#EDE8DC 12px,#E4DED0 12px,#E4DED0 24px)";
