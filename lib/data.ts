/** Shared company information and category navigation. */

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
  { label: "Leverans", href: "/leverans" },
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
    img: "/assets/BetongCement.webp",
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
    desc: "Sand, krossmaterial och jord i lösvikt samt jord i säckar.",
    img: "/assets/SandKrossJord.webp",
  },
  {
    slug: "byggmaterial",
    name: "Byggmaterial",
    desc: "Material för husgrund och bygge.",
    img: "/assets/Byggmaterial.webp",
  },
  {
    slug: "sten-leca-ror",
    name: "Sten/Leca/Rör",
    desc: "Leca, mursten, cementsten, stegsten och rör.",
    img: "/assets/StenLecaR%C3%B6r.webp",
  },
  {
    slug: "ved",
    name: "Ved",
    desc: "Ved, pellets och värmeloggs.",
    img: "/assets/Ved.webp",
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
