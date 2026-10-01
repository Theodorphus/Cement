/** Kategorier som bytte adress när sajten byggdes om 2026-09: [gammal, ny]. */
const categoryMoves = [
 ["betongcement","betong-cement"],["sandkrossprodukterjord","sand-kross-jord"],["stenlecaror","sten-leca-ror"],["tradgardsdekorationrengoring","tradgardsdekoration-rengoring"]
];
// Produkter som fick ny adress vid samma tillfälle. Övriga gamla
// produktadresser skiljer sig bara i kategorin och fångas av categoryMoves.
const renamedProducts = [
 ["/produkter/markbelaggning/marksten-betongnatursten","/produkter/markbelaggning/marksten-betong-natursten"],
 ["/produkter/markbelaggning/fardig-grasmatta-grasmatta-pa-rulle","/produkter/markbelaggning/fardig-grasmatta"],
 ["/produkter/markbelaggning/laggningsanvisningar-marksten-och-plattor","/produkter/markbelaggning/laggningsanvisningar"]
];
export const CATALOG_REDIRECTS = [
 ...renamedProducts.map(([source,destination])=>({source,destination,permanent:true})),
 ...categoryMoves.map(([oldSlug,newSlug])=>({source:`/produkter/${oldSlug}/:produkt`,destination:`/produkter/${newSlug}/:produkt`,permanent:true})),
 ...categoryMoves.map(([oldSlug,newSlug])=>({source:`/produkter/${oldSlug}`,destination:`/produkter/${newSlug}`,permanent:true})),
];
