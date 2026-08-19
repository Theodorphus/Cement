/**
 * Läser de speglade Visma-sidorna och plockar ut innehållet som en ordnad
 * lista av block. Dokumentordningen är hela poängen: rubrik, bild och bildtext
 * hör ihop just för att de står efter varandra, och den kopplingen finns inte
 * kvar om man samlar varje sort för sig.
 */
const fs = require("fs"), path = require("path");
const dir = process.argv[2];

const ents = {
  nbsp: " ", amp: "&", quot: '"', apos: "'", lt: "<", gt: ">",
  auml: "ä", Auml: "Ä", ouml: "ö", Ouml: "Ö", aring: "å", Aring: "Å",
  eacute: "é", Eacute: "É", uuml: "ü", Uuml: "Ü", oslash: "ø", aelig: "æ",
  ndash: "–", mdash: "—", hellip: "…", rsquo: "’", lsquo: "‘",
  ldquo: "”", rdquo: "”", bull: "•", deg: "°", times: "×",
  frac12: "½", frac14: "¼", sup2: "²", sup3: "³", euro: "€", copy: "©", reg: "®",
};

const dec = (s) => s
  .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))
  .replace(/&#x([0-9a-f]+);/gi, (_, d) => String.fromCharCode(parseInt(d, 16)))
  .replace(/&([a-zA-Z]+[0-9]*);/g, (m, e) => (e in ents ? ents[e] : m));

const clean = (s) => dec(s.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const isRule = (t) => /^[.\s·_–—-]+$/.test(t);

const pages = [];

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".html")).sort()) {
  const h = fs.readFileSync(path.join(dir, file), "utf8").replace(/\s+/g, " ");
  const url = "/" + (file === "_root.html" ? "" : file.replace(/\.html$/, "").replace(/__/g, "/"));
  const title = dec((h.match(/<title>([^<]*)<\/title>/) || [, ""])[1])
    .replace(/ - Öckerö Cementgjuteri AB$/, "").trim();

  let body = h;
  const navEnd = body.lastIndexOf('data-cy="mobile-menu');
  if (navEnd > -1) body = body.slice(navEnd);
  const footStart = body.indexOf('class="footer');
  if (footStart > -1) body = body.slice(0, footStart);

  // Ett svep över dokumentet som fångar alla tre blocktyperna med position,
  // så ordningen kan återställas exakt.
  const found = [];

  let m;
  const hre = /<(h[1-6])[^>]*data-cy="headline-element"[^>]*>(.*?)<\/\1>/g;
  while ((m = hre.exec(body))) {
    const text = clean(m[2]);
    if (text && !isRule(text)) {
      found.push({ at: m.index, typ: "rubrik", niva: +m[1][1], text });
    }
  }

  const ire = /<img[^>]*id="image-title-([0-9a-f-]+)"[^>]*>/g;
  while ((m = ire.exec(body))) {
    const tag = m[0], id = m[1];
    const src = (tag.match(/src="([^"]+)"/) || [, ""])[1];
    const titleAttr = dec((tag.match(/title="([^"]*)"/) || [, ""])[1]).trim();
    const alt = dec((tag.match(/alt="([^"]*)"/) || [, ""])[1]).trim();
    if (/Cementgjuteri AB/.test(titleAttr)) continue; // logotypen, inte innehåll
    const cap = clean(
      (body.match(new RegExp('id="image-caption-' + id + '"[^>]*>(.*?)</span>')) || [, ""])[1] || ""
    );
    found.push({ at: m.index, typ: "bild", id, src, titel: titleAttr, alt, bildtext: cap });
  }

  const pre = /<p[^>]*>(.*?)<\/p>/g;
  while ((m = pre.exec(body))) {
    const text = clean(m[1]);
    if (text && text.length > 2 && !/Lagt i varukorgen|Till kassan/.test(text)) {
      found.push({ at: m.index, typ: "text", text });
    }
  }

  found.sort((a, b) => a.at - b.at);

  // Sidans egen H1 upprepar titeln — den sätts av mallen istället.
  const blocks = found
    .filter((b, i) => !(i === 0 && b.typ === "rubrik" && b.text === title))
    .map(({ at, ...rest }) => rest);

  // Slå ihop text som Visma delat i flera <p> mitt i en mening.
  const merged = [];
  for (const b of blocks) {
    const prev = merged[merged.length - 1];
    if (b.typ === "text" && prev && prev.typ === "text" && !/[.!?:]$/.test(prev.text)) {
      prev.text += " " + b.text;
    } else {
      merged.push(b);
    }
  }

  pages.push({ url, title, blocks: merged });
}

fs.writeFileSync(path.join(dir, "..", "sidor.json"), JSON.stringify(pages, null, 2));

const tot = pages.reduce((a, p) => a + p.blocks.length, 0);
console.log("Sidor:", pages.length, " Block:", tot);
console.log(
  "  rubriker:", pages.reduce((a, p) => a + p.blocks.filter((b) => b.typ === "rubrik").length, 0),
  " bilder:", pages.reduce((a, p) => a + p.blocks.filter((b) => b.typ === "bild").length, 0),
  " text:", pages.reduce((a, p) => a + p.blocks.filter((b) => b.typ === "text").length, 0)
);
