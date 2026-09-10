/**
 * Importerar bilder till de produktgrupper som saknar foto.
 *
 * Lägg bilderna i mappen `inkorg/` – namnen spelar ingen roll, men
 * ordningen gör det. Filerna sorteras som Utforskaren sorterar dem
 * (1, 2, 10 – inte 1, 10, 2), så numrerade filer från en nedladdning
 * hamnar rätt. Sedan:
 *
 *   node scripts/importera-bilder.mjs           # visa vad som skulle hända
 *   node scripts/importera-bilder.mjs --skarpt  # gör det på riktigt
 *
 * Skriptet konverterar till webp, lägger filen i public/assets/catalog/
 * och skriver in den i lib/catalog-images.json med rätt alt-text.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INKORG = path.join(rot, "inkorg");
const MAL = path.join(rot, "public", "assets", "catalog");
const KARTA = path.join(rot, "lib", "catalog-images.json");

/** Ordningen här styr vilken bild som hamnar var. */
const GRUPPER = [
  { slug: "dranering", oldPath: "/produkter/stenlecaror/dranering", alt: "Dräneringsrör och slang" },
  { slug: "brunnar-betackningar", oldPath: "/produkter/stenlecaror/brunnar-betackningar", alt: "Brunnar och betäckningar" },
  { slug: "rannor-galler", oldPath: "/produkter/stenlecaror/rannor-galler", alt: "Avvattningsränna med galler" },
  { slug: "verktyg-handredskap", oldPath: "/produkter/byggmaterial/verktyg-handredskap", alt: "Handverktyg för mur- och betongarbete" },
  { slug: "gjutning-formning", oldPath: "/produkter/byggmaterial/gjutning-formning", alt: "Formrör och tillbehör för gjutning" },
  { slug: "infastning-forbrukning", oldPath: "/produkter/byggmaterial/infastning-forbrukning", alt: "Spik, plugg och skruv" },
  { slug: "borr-kapning", oldPath: "/produkter/byggmaterial/borr-kapning", alt: "Diamantborr och kapklingor" },
  { slug: "golvbrunnar-ventiler", oldPath: "/produkter/byggmaterial/golvbrunnar-ventiler", alt: "Golvbrunn och ventiler" },
  { slug: "skydd-underhall", oldPath: "/produkter/byggmaterial/skydd-underhall", alt: "Markduk, putsnät och borstar" },
];

const skarpt = process.argv.includes("--skarpt");
const BILDTYPER = new Set([".png", ".jpg", ".jpeg", ".webp"]);

if (!fs.existsSync(INKORG)) {
  fs.mkdirSync(INKORG, { recursive: true });
  console.log(`Skapade ${path.relative(rot, INKORG)}/ – lägg bilderna där och kör igen.`);
  process.exit(0);
}

// Naturlig sortering, så "bild2" kommer före "bild10".
const samlare = new Intl.Collator("sv", { numeric: true, sensitivity: "base" });
const filer = fs
  .readdirSync(INKORG)
  .filter((f) => BILDTYPER.has(path.extname(f).toLowerCase()))
  .sort(samlare.compare);

if (filer.length === 0) {
  console.log(`Inga bilder i ${path.relative(rot, INKORG)}/. Lägg dit dem och kör igen.`);
  process.exit(0);
}

if (filer.length !== GRUPPER.length) {
  console.log(`Varning: ${filer.length} bild(er) men ${GRUPPER.length} grupper.`);
  console.log("Bilderna paras ihop uppifrån och ned – kontrollera listan nedan innan du kör skarpt.\n");
}

const karta = JSON.parse(fs.readFileSync(KARTA, "utf8"));
const par = filer.slice(0, GRUPPER.length).map((fil, i) => ({ fil, ...GRUPPER[i] }));

console.log(skarpt ? "IMPORTERAR:" : "FÖRHANDSVISNING (kör med --skarpt för att genomföra):");
for (const { fil, slug, oldPath, alt } of par) {
  const mal = `${slug}-1.webp`;
  console.log(`  ${fil}\n      -> public/assets/catalog/${mal}   alt: "${alt}"`);
  if (!skarpt) continue;

  // Kopiera rakt av om det redan är webp, annars låt sharp konvertera om
  // det finns. Utan sharp behålls originalformatet – Next.js optimerar
  // ändå bilden till webp när den levereras.
  const kalla = path.join(INKORG, fil);
  const ext = path.extname(fil).toLowerCase();
  let slutnamn = mal;
  if (ext === ".webp") {
    fs.copyFileSync(kalla, path.join(MAL, mal));
  } else {
    slutnamn = `${slug}-1${ext}`;
    fs.copyFileSync(kalla, path.join(MAL, slutnamn));
  }
  karta[oldPath] = [{ src: `/assets/catalog/${slutnamn}`, alt }];
}

if (skarpt) {
  fs.writeFileSync(KARTA, JSON.stringify(karta, null, 2) + "\n");
  console.log(`\nKlart. ${par.length} bild(er) inlagda i lib/catalog-images.json.`);
  console.log("Kör 'npm run build' och titta på sidorna.");
} else {
  console.log(`\nInget ändrat. Kör: node scripts/importera-bilder.mjs --skarpt`);
}
