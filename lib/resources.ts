export type ProductResource = { title: string; url: string; description: string };
// Official manufacturer pages checked 2026-09-10.
export const RESOURCES = {
 paving: {title:"Lägga marksten och plattor – Benders",url:"https://www.benders.se/om-oss/artikelarkiv/2014/anlaggning-for-marksten-plattor-och-murar/",description:"Illustrerad vägledning för underarbete, läggning och fogning."},
 blocks: {title:"Dokument och anvisningar – Leca",url:"https://www.leca.se/dokument",description:"Välj anvisningen för den produkt och konstruktion du ska använda."},
 reinforcement: {title:"Armering och Armeringshandboken – BE Group",url:"https://www.begroup.se/produkter/armering",description:"Produktinformation och nedladdningsbar armeringshandbok."},
 brick: {title:"Kataloger och broschyrer – Wienerberger",url:"https://www.wienerberger.se/verktyg-service/kataloger-broschyrer.html",description:"Tillverkarens kataloger för tegel och tillhörande produktområden."},
} satisfies Record<string, ProductResource>;
export function productResources(slug: string): ProductResource[] {
 if (["laggningsanvisningar","marksten-betong-natursten","plattor"].includes(slug)) return [RESOURCES.paving];
 if (["bygg-sjalv-med-murblock","leca"].includes(slug)) return [RESOURCES.blocks];
 return slug === "armering" ? [RESOURCES.reinforcement] : [];
}
export function supplierResources(slug: string): ProductResource[] {
 if (slug === "be-group") return [RESOURCES.reinforcement];
 if (slug === "wienerberger") return [RESOURCES.brick];
 return slug === "benders" ? [RESOURCES.paving] : [];
}
