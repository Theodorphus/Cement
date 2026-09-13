export type ProductResource = { title: string; url: string; description: string };
// Official manufacturer pages checked 2026-09-10.
export const RESOURCES = {
 paving: {title:"Lägga marksten och plattor – Benders",url:"https://www.benders.se/om-oss/artikelarkiv/2014/anlaggning-for-marksten-plattor-och-murar/",description:"Illustrerad vägledning för underarbete, läggning och fogning."},
 blocks: {title:"Dokument och anvisningar – Leca",url:"https://www.leca.se/dokument",description:"Välj anvisningen för den produkt och konstruktion du ska använda."},
 reinforcement: {title:"Armering och Armeringshandboken – BE Group",url:"https://www.begroup.se/produkter/armering",description:"Produktinformation och nedladdningsbar armeringshandbok."},
 brick: {title:"Kataloger och broschyrer – Wienerberger",url:"https://www.wienerberger.se/verktyg-service/kataloger-broschyrer.html",description:"Tillverkarens kataloger för tegel och tillhörande produktområden."},
 originalPaving: {title:"Lägga marksten och plattor – S:T Eriks",url:"/assets/guides/marksten-st-eriks.png",description:"Illustrerad läggningsanvisning med arbetssteg och materiallista. Öppnas som bild."},
 originalBlocks: {title:"Bygg själv med murblock – S:T Eriks",url:"/assets/guides/murblock-st-eriks.png",description:"Illustrerad anvisning för låg mur, stödmur och trappor. Öppnas som bild."},
 grass: {title:"Läggningsanvisningar – Vedums Gräs",url:"/assets/guides/gras-vedums.png",description:"Förarbete, utrullning, vattning och första klippningen. Öppnas som bild."},
 building: {title:"Produktöversikt – byggmaterial",url:"/assets/guides/byggmaterial-sortiment.png",description:"Äldre sortimentsöversikt med produktnamn och mått. Bekräfta aktuellt utförande och tillgänglighet med oss."},
 pipes: {title:"Produktöversikt – rör och tillbehör",url:"/assets/guides/ror-sortiment.png",description:"Äldre sortimentsöversikt med dimensioner för rör, brunnar och tillbehör. Bekräfta aktuellt utförande och tillgänglighet med oss."},
} satisfies Record<string, ProductResource>;
export function productResources(slug: string): ProductResource[] {
 if (["laggningsanvisningar","marksten-betong-natursten","plattor"].includes(slug)) return [RESOURCES.originalPaving, RESOURCES.paving];
 if (slug === "bygg-sjalv-med-murblock") return [RESOURCES.originalBlocks, RESOURCES.blocks];
 if (slug === "leca") return [RESOURCES.blocks];
 if (["fardig-grasmatta","lagga-grasmatta-pa-rulle"].includes(slug)) return [RESOURCES.grass];
 if (["verktyg-handredskap","gjutning-formning","infastning-forbrukning","borr-kapning","golvbrunnar-ventiler","skydd-underhall"].includes(slug)) return [RESOURCES.building];
 if (["ror","dranering","brunnar-betackningar","rannor-galler"].includes(slug)) return [RESOURCES.pipes];
 return slug === "armering" ? [RESOURCES.reinforcement] : [];
}
export function supplierResources(slug: string): ProductResource[] {
 if (slug === "st-eriks") return [RESOURCES.originalPaving, RESOURCES.originalBlocks];
 if (slug === "vedums-gras") return [RESOURCES.grass];
 if (slug === "be-group") return [RESOURCES.reinforcement];
 if (slug === "wienerberger") return [RESOURCES.brick];
 return slug === "benders" ? [RESOURCES.paving] : [];
}
