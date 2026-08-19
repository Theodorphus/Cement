/**
 * Kontrollerar att varje URL från den gamla sajten landar på en route som
 * faktiskt finns i det nya bygget — antingen direkt eller via en 301.
 * Om något inte stämmer skulle den gamla länken ge en 404 efter lansering.
 */
const fs = require("fs");
const path = require("path");

const REPO = process.argv[2];
const SP = __dirname;

const gamla = fs.readFileSync(path.join(SP, "urls.txt"), "utf8")
  .split("\n").map((s) => s.trim()).filter(Boolean)
  .map((u) => u.replace("https://www.ockerocement.se", ""));

// Redirects ur next.config.ts
const cfg = fs.readFileSync(path.join(REPO, "next.config.ts"), "utf8");
const redirects = new Map();
for (const m of cfg.matchAll(/\[\s*"([^"]+)",\s*"([^"]+)"\s*,?\s*\]/g)) {
  redirects.set(m[1], m[2]);
}

// Routes ur det genererade datalagret + de statiska sidorna
const inn = fs.readFileSync(path.join(REPO, "lib", "innehall.ts"), "utf8");
const bit = (namn) => {
  const i = inn.indexOf("export const " + namn);
  const j = inn.indexOf("\n\nexport", i);
  return JSON.parse(inn.slice(inn.indexOf("=", i) + 1, j).replace(/ as [^=]*$/s, "").trim().replace(/;$/, ""));
};

const routes = new Set([
  "/", "/produkter", "/uthyrning", "/vara-leverantorer",
  "/miljo", "/miljo/miljopolicy", "/miljo/miljodiplom",
  "/aktuellt", "/kontakt", "/integritetspolicy",
]);

const data = fs.readFileSync(path.join(REPO, "lib", "data.ts"), "utf8");
for (const m of data.matchAll(/slug:\s*"([a-z0-9-]+)"/g)) {
  // kategorislugs ligger i KATEGORIER; övriga slugs fångas nedan ändå
}
const kategorier = [...data.matchAll(/\{\s*slug:\s*"([a-z0-9-]+)",\s*name:/g)].map((m) => m[1]);
for (const k of kategorier) routes.add("/produkter/" + k);

for (const u of bit("UNDERSIDOR")) routes.add(`/produkter/${u.kategori}/${u.slug}`);
for (const s of bit("UTHYRNING_SIDOR")) routes.add(`/uthyrning/${s.slug}`);
for (const s of bit("LEVERANTOR_SIDOR")) routes.add(`/vara-leverantorer/${s.slug}`);

let ok = 0;
const trasiga = [];
for (const gammal of gamla) {
  const mal = redirects.get(gammal) ?? gammal;
  if (routes.has(mal)) ok++;
  else trasiga.push({ gammal, mal, viaRedirect: redirects.has(gammal) });
}

console.log("Gamla URL:er:      ", gamla.length);
console.log("Landar rätt:       ", ok);
console.log("Trasiga:           ", trasiga.length);
if (trasiga.length) {
  console.log("\nDESSA SKULLE GE 404:");
  for (const t of trasiga) {
    console.log(`  ${t.gammal}\n      -> ${t.mal}  ${t.viaRedirect ? "(via redirect)" : "(ingen redirect)"}`);
  }
}

// Redirects som pekar på en route som inte finns
const dodaMal = [...redirects.entries()].filter(([, d]) => !routes.has(d));
if (dodaMal.length) {
  console.log("\nREDIRECTS MED DÖTT MÅL:");
  for (const [s, d] of dodaMal) console.log(`  ${s} -> ${d}`);
}

console.log("\nAntal routes i bygget:", routes.size);
