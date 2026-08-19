import type { NextConfig } from "next";

/**
 * 301-karta från den gamla Visma-sajten till den nya strukturen.
 *
 * Gamla sajten hade 61 indexerade URL:er. De flesta slugs behålls ordagrant
 * så att de inte behöver någon redirect alls — listan nedan är bara de som
 * faktiskt byter adress, plus de sidor som slås ihop.
 *
 * Kategoriernas slugs avstavas ("sandkrossprodukterjord" → "sand-kross-jord")
 * för läsbarhet och sökordsseparation. Det kostar en redirect per sida men
 * ger en URL-struktur som håller framåt.
 */
const REDIRECTS: Array<[string, string]> = [
  // Startsidan låg på /startsida hos Visma.
  ["/startsida", "/"],

  // ── Betong/Cement ────────────────────────────────────────────
  ["/produkter/betongcement", "/produkter/betong-cement"],
  ["/produkter/betongcement/armering", "/produkter/betong-cement/armering"],
  ["/produkter/betongcement/betongcement", "/produkter/betong-cement/betong-cement"],
  ["/produkter/betongcement/byggkemi", "/produkter/betong-cement/byggkemi"],
  ["/produkter/betongcement/plattsattning", "/produkter/betong-cement/plattsattning"],
  ["/produkter/betongcement/murbruk", "/produkter/betong-cement/murbruk"],
  ["/produkter/betongcement/putsbruk", "/produkter/betong-cement/putsbruk"],
  ["/produkter/betongcement/golvavjamning", "/produkter/betong-cement/golvavjamning"],

  // ── Markbeläggning (kategorin behåller sin slug) ─────────────
  [
    "/produkter/markbelaggning/marksten-betongnatursten",
    "/produkter/markbelaggning/marksten-betong-natursten",
  ],
  [
    "/produkter/markbelaggning/fardig-grasmatta-grasmatta-pa-rulle",
    "/produkter/markbelaggning/fardig-grasmatta",
  ],
  [
    "/produkter/markbelaggning/laggningsanvisningar-marksten-och-plattor",
    "/produkter/markbelaggning/laggningsanvisningar",
  ],

  // ── Sand/Kross/Jord ──────────────────────────────────────────
  ["/produkter/sandkrossprodukterjord", "/produkter/sand-kross-jord"],
  ["/produkter/sandkrossprodukterjord/jord-i-sackar", "/produkter/sand-kross-jord/jord-i-sackar"],
  ["/produkter/sandkrossprodukterjord/grasfrogodsel", "/produkter/sand-kross-jord/grasfro-godsel"],

  // ── Sten/Leca/Rör ────────────────────────────────────────────
  ["/produkter/stenlecaror", "/produkter/sten-leca-ror"],
  ["/produkter/stenlecaror/leca", "/produkter/sten-leca-ror/leca"],
  ["/produkter/stenlecaror/mursten", "/produkter/sten-leca-ror/mursten"],
  ["/produkter/stenlecaror/cementsten", "/produkter/sten-leca-ror/cementsten"],
  ["/produkter/stenlecaror/stegsten", "/produkter/sten-leca-ror/stegsten"],
  ["/produkter/stenlecaror/ror", "/produkter/sten-leca-ror/ror"],
  [
    "/produkter/stenlecaror/bygg-sjalv-med-murblock",
    "/produkter/sten-leca-ror/bygg-sjalv-med-murblock",
  ],

  // ── Trädgårdsdekoration/Rengöring ────────────────────────────
  ["/produkter/tradgardsdekorationrengoring", "/produkter/tradgardsdekoration-rengoring"],
  [
    "/produkter/tradgardsdekorationrengoring/gabioner",
    "/produkter/tradgardsdekoration-rengoring/gabioner",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/betongkrukorcortenkrukor",
    "/produkter/tradgardsdekoration-rengoring/betongkrukor-cortenkrukor",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/betongbankarbordsskivor",
    "/produkter/tradgardsdekoration-rengoring/betongbankar-bordsskivor",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/fyrarvattentunna",
    "/produkter/tradgardsdekoration-rengoring/fyrar-vattentunna",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/rabattkant-cortenstaleldfat-mm",
    "/produkter/tradgardsdekoration-rengoring/rabattkant-cortenstal-eldfat",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/alternativ-till-ograsbekampning",
    "/produkter/tradgardsdekoration-rengoring/alternativ-till-ograsbekampning",
  ],
  [
    "/produkter/tradgardsdekorationrengoring/ocean",
    "/produkter/tradgardsdekoration-rengoring/ocean",
  ],

  // ── Uthyrning ────────────────────────────────────────────────
  ["/uthyrning/kombihammarekapmaskin", "/uthyrning/kombihammare-kapmaskin"],
  ["/uthyrning/betongslipdammsugare", "/uthyrning/betongslip-dammsugare"],

  // ── Sidor som slås ihop ──────────────────────────────────────
  // GDPR-sidan låg felplacerad under Aktuellt; den blir integritetspolicyn.
  ["/aktuellt/gdpr---for-din-trygghet", "/integritetspolicy"],
  // "Här hittar du oss" var en egen sida; kartan finns nu på kontaktsidan.
  ["/kontakt/har-hittar-du-oss", "/kontakt"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return REDIRECTS.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
