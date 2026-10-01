/**
 * Flyttar sajtens innehåll (produkter, hyrmaskiner, öppettider och inlägget om
 * ved på Aktuellt) till Sanity. Körs en gång när projektet skapats.
 *
 *   Torrkörning:  node scripts/sanity/migrera.mjs [--ndjson=fil.ndjson]
 *   Skarp körning: node --env-file=.env.local scripts/sanity/migrera.mjs --skarpt
 *
 * Den skarpa körningen kräver SANITY_WRITE_TOKEN (en Editor-token från
 * sanity.io/manage → API → Tokens) och avbryter om datasetet redan har
 * innehåll, så att inget dubbleras. --tvinga hoppar över den kontrollen.
 */
import { createClient } from "@sanity/client";
import { createHash, randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CATALOG } from "./kalla-katalog.ts";
import { RENTALS } from "./kalla-uthyrning.ts";
import { SYNONYMS } from "./kalla-sokord.ts";
import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from "../../lib/sanity/env.ts";

const ROT = fileURLToPath(new URL("../../", import.meta.url));
const BILDER = JSON.parse(fs.readFileSync(new URL("./kalla-bilder.json", import.meta.url), "utf8"));
const TYPER = ["produkt", "hyrmaskin", "nyhet", "oppettider"];
const skarpt = process.argv.includes("--skarpt");
const tvinga = process.argv.includes("--tvinga");
const ndjson = process.argv.find(arg => arg.startsWith("--ndjson="))?.slice("--ndjson=".length);

const key = () => randomUUID().replace(/-/g, "").slice(0, 12);
const fel = meddelande => { console.error(`\n${meddelande}`); process.exit(1); };

let client;
if (skarpt) {
  if (!SANITY_PROJECT_ID) fel("Ange projekt-id i lib/sanity/env.ts först.");
  if (!process.env.SANITY_WRITE_TOKEN) fel("SANITY_WRITE_TOKEN saknas. Lägg den i .env.local och kör med --env-file=.env.local.");
  client = createClient({ projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET, apiVersion: SANITY_API_VERSION, token: process.env.SANITY_WRITE_TOKEN, useCdn: false });
  const befintliga = await client.fetch("count(*[_type in $typer])", { typer: TYPER });
  if (befintliga > 0 && !tvinga) fel(`Datasetet ${SANITY_DATASET} har redan ${befintliga} dokument av typerna ${TYPER.join(", ")}. Avbryter för att inte dubblera. Använd --tvinga om det är meningen.`);
}

/** Laddar upp en bild från public/ en gång och returnerar bildfältet. */
const uppladdade = new Map();
async function ladda(fil) {
  if (!client) {
    // Torrkörning: ett id i Sanitys format, så att --ndjson kan användas för att granska resultatet.
    const hash = createHash("sha1").update(fs.readFileSync(fil)).digest("hex");
    return `image-${hash}-1600x1200-${path.extname(fil).slice(1)}`;
  }
  const asset = await client.assets.upload("image", fs.createReadStream(fil), { filename: path.basename(fil) });
  process.stdout.write(".");
  return asset._id;
}
async function bild(src, alt) {
  const fil = path.join(ROT, "public", decodeURIComponent(src));
  if (!fs.existsSync(fil)) fel(`Bildfilen saknas: ${fil}`);
  if (!uppladdade.has(fil)) uppladdade.set(fil, ladda(fil));
  return { _type: "bild", _key: key(), asset: { _type: "reference", _ref: await uppladdade.get(fil) }, alt };
}

const dokument = [];

const ordningIKategori = new Map();
for (const p of CATALOG) {
  const plats = (ordningIKategori.get(p.category) ?? 0) + 1;
  ordningIKategori.set(p.category, plats);
  dokument.push({
    _type: "produkt",
    namn: p.name,
    kategori: p.category,
    slug: { _type: "slug", current: p.slug },
    typ: p.guide ? "guide" : "produktgrupp",
    ingress: p.intro,
    punkter: p.details,
    bilder: await Promise.all((BILDER[p.oldPath] ?? []).map(b => bild(b.src, b.alt))),
    ...(p.slug === "fardig-grasmatta" ? { tillganglighet: "På beställning" } : {}),
    ...(SYNONYMS[p.slug] ? { sokord: SYNONYMS[p.slug] } : {}),
    ordning: plats * 10,
  });
}

for (const [index, r] of RENTALS.entries()) {
  dokument.push({
    _type: "hyrmaskin",
    namn: r.name,
    slug: { _type: "slug", current: r.slug },
    ingress: r.intro,
    punkter: r.details,
    bild: await bild(r.img, r.name),
    ordning: (index + 1) * 10,
  });
}

// Öppettiderna och vedrutan på Aktuellt så som de stod i koden 2026-10-01.
dokument.push({
  _id: "oppettider",
  _type: "oppettider",
  tider: [
    { _type: "oppettid", _key: key(), rubrik: "Måndag–fredag", dagar: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], oppnar: "07:00", stanger: "16:00" },
    { _type: "oppettid", _key: key(), rubrik: "Lördagar", dagar: ["Saturday"], oppnar: "09:00", stanger: "13:00" },
  ],
  avvikelse: "De flesta röda dagar har vi stängt. Vi har inget semesterstängt – ring gärna om du är osäker inför en helg.",
});
dokument.push({
  _type: "nyhet",
  rubrik: "Bränsle för kaminen",
  etikett: "Ved · Pellets · Värmeloggs",
  text: "Kontakta oss för aktuella priser, tillgänglighet och leverans.",
  bild: await bild("/assets/Ved.webp", "Ved"),
  lankar: [
    { _type: "lank", _key: key(), text: "Björkved", url: "/produkter/ved/ved" },
    { _type: "lank", _key: key(), text: "Fågelfors pellets", url: "/produkter/ved/pellets" },
    { _type: "lank", _key: key(), text: "Fågelfors värmeloggs", url: "/produkter/ved/varmeloggs" },
  ],
  datum: "2026-10-01",
});

const okopplade = Object.keys(BILDER).filter(oldPath => !CATALOG.some(p => p.oldPath === oldPath));
const antal = typ => dokument.filter(d => d._type === typ).length;
console.log(`\n${TYPER.map(typ => `${antal(typ)} ${typ}`).join(", ")} och ${uppladdade.size} bilder.`);
if (okopplade.length) console.log(`Bilder som inte hör till någon produkt och därför inte flyttas: ${okopplade.join(", ")}`);

if (ndjson) {
  fs.writeFileSync(ndjson, dokument.map(d => JSON.stringify({ _id: d._id ?? randomUUID(), ...d })).join("\n") + "\n");
  console.log(`Skrev ${dokument.length} dokument till ${ndjson}.`);
}

if (!client) {
  console.log("Torrkörning – inget skrevs till Sanity. Kör med --skarpt för att flytta innehållet.");
} else {
  const transaktion = client.transaction();
  for (const d of dokument) d._id ? transaktion.createOrReplace(d) : transaktion.create(d);
  await transaktion.commit();
  console.log(`Klart. ${dokument.length} dokument skapade i ${SANITY_PROJECT_ID}/${SANITY_DATASET}.`);
}
