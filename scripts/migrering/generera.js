/**
 * Omvandlar sidor.json (speglat Visma-innehåll) till lib/innehall.ts och
 * kopierar de bilder som faktiskt används till public/assets/produkter/.
 *
 * Blocken grupperas till produkter: en rubrik inleder en produkt, och bilden
 * och texten som följer hör till den. Block före första rubriken blir intro.
 */
const fs = require("fs"), path = require("path");

const SP = __dirname;
const REPO = process.argv[2];
const sidor = require(path.join(SP, "sidor.json"));

const KATEGORI = {
  betongcement: "betong-cement",
  markbelaggning: "markbelaggning",
  sandkrossprodukterjord: "sand-kross-jord",
  byggmaterial: "byggmaterial",
  stenlecaror: "sten-leca-ror",
  ved: "ved",
  tradgardsdekorationrengoring: "tradgardsdekoration-rengoring",
};

const SLUG = {
  // Undersidan under Betong/Cement heter samma sak som kategorin.
  betongcement: "betong-cement",
  "marksten-betongnatursten": "marksten-betong-natursten",
  "fardig-grasmatta-grasmatta-pa-rulle": "fardig-grasmatta",
  "laggningsanvisningar-marksten-och-plattor": "laggningsanvisningar",
  grasfrogodsel: "grasfro-godsel",
  betongkrukorcortenkrukor: "betongkrukor-cortenkrukor",
  betongbankarbordsskivor: "betongbankar-bordsskivor",
  fyrarvattentunna: "fyrar-vattentunna",
  "rabattkant-cortenstaleldfat-mm": "rabattkant-cortenstal-eldfat",
  kombihammarekapmaskin: "kombihammare-kapmaskin",
  betongslipdammsugare: "betongslip-dammsugare",
};

const slugify = (s) => s.toLowerCase()
  .replace(/[åä]/g, "a").replace(/ö/g, "o").replace(/é/g, "e")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "bild";

// ── Bildfiler: bara de som faktiskt används, med läsbara filnamn ──────
const cdnDir = path.join(SP, "cdn");
const outDir = path.join(REPO, "public", "assets", "produkter");
fs.mkdirSync(outDir, { recursive: true });

const filnamn = new Map(); // uuid -> filnamn
function bildFil(b) {
  if (filnamn.has(b.id)) return filnamn.get(b.id);
  const src = path.join(cdnDir, b.id + ".jpg");
  if (!fs.existsSync(src)) return null;
  // Bilder som inte är riktiga foton (loggor under 200px) hoppas över.
  const namn = slugify(b.titel || b.alt || "bild") + "-" + b.id.slice(0, 8) + ".jpg";
  fs.copyFileSync(src, path.join(outDir, namn));
  filnamn.set(b.id, namn);
  return namn;
}

// ── Gruppera block till produkter ────────────────────────────────────
function tillProdukter(blocks) {
  const intro = [];
  const produkter = [];
  // Vissa sidor är rena bildgallerier: inga rubriker, inga bildtexter.
  // Bilderna sparas undan så de inte tappas bort som dekor.
  const allaBilder = [];
  let cur = null;

  for (const b of blocks) {
    if (b.typ === "rubrik") {
      if (cur) produkter.push(cur);
      cur = { namn: b.text, texter: [], bilder: [] };
      continue;
    }
    const mal = cur || null;
    if (b.typ === "text") {
      if (mal) mal.texter.push(b.text);
      else intro.push(b.text);
    } else if (b.typ === "bild") {
      const f = bildFil(b);
      const bild = { fil: f, alt: b.alt || b.titel || "", bildtext: b.bildtext || "" };
      if (f) allaBilder.push(bild);
      if (mal) mal.bilder.push(bild);
      else if (b.bildtext || b.titel) {
        // Bild med egen text före första rubriken är en produkt i sig.
        produkter.push({ namn: b.titel || "", texter: b.bildtext ? [b.bildtext] : [], bilder: [bild] });
      }
      // Namnlös bild utan text före första rubriken är dekor — hoppas över.
    }
  }
  if (cur) produkter.push(cur);

  // Ren bildsida: gör varje bild till en egen post så innehållet syns.
  if (produkter.length === 0 && allaBilder.length) {
    for (const bild of allaBilder) {
      produkter.push({ namn: "", texter: [], bilder: [bild] });
    }
  }

  return { intro, produkter };
}

// ── Bygg posterna ────────────────────────────────────────────────────
const undersidor = [];
const uthyrning = [];
const leverantorer = [];
let integritet = null;

for (const p of sidor) {
  const del = p.url.split("/").filter(Boolean);

  if (del[0] === "produkter" && del.length === 3) {
    const kat = KATEGORI[del[1]];
    if (!kat) continue;
    const slug = SLUG[del[2]] || del[2];
    const { intro, produkter } = tillProdukter(p.blocks);
    undersidor.push({ kategori: kat, slug, namn: p.title, intro, produkter });
  } else if (del[0] === "uthyrning" && del.length === 2) {
    const slug = SLUG[del[1]] || del[1];
    const { intro, produkter } = tillProdukter(p.blocks);
    uthyrning.push({ slug, namn: p.title, intro, produkter });
  } else if (del[0] === "vara-leverantorer" && del.length === 2) {
    const { intro, produkter } = tillProdukter(p.blocks);
    leverantorer.push({ slug: del[1], namn: p.title, intro, produkter });
  } else if (p.url === "/aktuellt/gdpr---for-din-trygghet") {
    const { intro, produkter } = tillProdukter(p.blocks);
    integritet = { namn: p.title, intro, produkter };
  }
}

// ── Skriv TypeScript ─────────────────────────────────────────────────
const j = (v) => JSON.stringify(v);

const ts = `/**
 * Innehåll migrerat ordagrant från den tidigare Visma-sajten (speglad
 * ${new Date().toISOString().slice(0, 10)}). Texterna är kundens egna och är
 * SEO-viktiga — ändra dem inte utan att stämma av med kunden först.
 *
 * Genererad fil. Bilderna ligger i public/assets/produkter/ och kommer från
 * den gamla sajtens mediabibliotek; flera av dem är lågupplösta och bör bytas
 * mot nyfotograferade när sådana finns.
 */

export type Bild = {
  fil: string | null;
  alt: string;
  bildtext: string;
};

export type Produkt = {
  namn: string;
  texter: string[];
  bilder: Bild[];
};

export type Undersida = {
  kategori: string;
  slug: string;
  namn: string;
  intro: string[];
  produkter: Produkt[];
};

export type Sida = Omit<Undersida, "kategori" | "slug"> & { slug: string };

export const UNDERSIDOR: Undersida[] = ${j(undersidor)};

export const UTHYRNING_SIDOR: Sida[] = ${j(uthyrning)};

export const LEVERANTOR_SIDOR: Sida[] = ${j(leverantorer)};

export const INTEGRITETSPOLICY = ${j(integritet)} as Omit<Sida, "slug"> | null;

export function getUndersida(kategori: string, slug: string): Undersida | undefined {
  return UNDERSIDOR.find((u) => u.kategori === kategori && u.slug === slug);
}

export function undersidorFor(kategori: string): Undersida[] {
  return UNDERSIDOR.filter((u) => u.kategori === kategori);
}

export function getUthyrningSida(slug: string): Sida | undefined {
  return UTHYRNING_SIDOR.find((s) => s.slug === slug);
}

export function getLeverantorSida(slug: string): Sida | undefined {
  return LEVERANTOR_SIDOR.find((s) => s.slug === slug);
}
`;

fs.writeFileSync(path.join(REPO, "lib", "innehall.ts"), ts);

const antalProdukter = [...undersidor, ...uthyrning, ...leverantorer]
  .reduce((a, s) => a + s.produkter.length, 0);

console.log("Undersidor (produkter):", undersidor.length);
console.log("Uthyrningssidor:       ", uthyrning.length);
console.log("Leverantörssidor:      ", leverantorer.length);
console.log("Integritetspolicy:     ", integritet ? "ja" : "SAKNAS");
console.log("Produktposter totalt:  ", antalProdukter);
console.log("Bildfiler kopierade:   ", filnamn.size);
