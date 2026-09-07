import { FORETAG } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

/**
 * Strukturerad data för sökmotorer (schema.org).
 *
 * Endast uppgifter som redan är bekräftade i FORETAG används här. Fält som
 * kräver företagets bekräftelse – organisationsnummer, geokoordinater,
 * betalsätt, avvikande helgdagstider – är medvetet utelämnade hellre än
 * gissade. Öppettiderna speglar FORETAG och måste ändras på ett ställe.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${SITE_URL}/#foretag`,
    name: FORETAG.namn,
    url: SITE_URL,
    telephone: FORETAG.telefon,
    address: {
      "@type": "PostalAddress",
      streetAddress: FORETAG.adressRad1,
      postalCode: "475 31",
      addressLocality: "Öckerö",
      addressCountry: "SE",
    },
    hasMap: FORETAG.mapsUrl,
    openingHoursSpecification: FORETAG.oppettider.map(tid => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: tid.dagar,
      opens: tid.oppnar,
      closes: tid.stanger,
    })),
  };
}

/** Brödsmulor som strukturerad data, byggda från sidans egna crumbs. */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: SITE_URL + (crumb.href === "/" ? "" : crumb.href) } : {}),
    })),
  };
}
