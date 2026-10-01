import { FORETAG } from "@/lib/data";
import type { OpeningHours } from "@/lib/oppettider";
import { SITE_URL } from "@/lib/site";

/**
 * Strukturerad data för sökmotorer (schema.org).
 *
 * Endast uppgifter som redan är bekräftade i FORETAG används här. Fält som
 * kräver företagets bekräftelse – organisationsnummer, geokoordinater,
 * betalsätt, avvikande helgdagstider – är medvetet utelämnade hellre än
 * gissade. Öppettiderna kommer från Sanity, samma källa som sidorna visar.
 */
export function localBusinessJsonLd(hours: OpeningHours) {
  return {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${SITE_URL}/#foretag`,
    name: FORETAG.namn,
    url: SITE_URL,
    telephone: FORETAG.telefon,
    address: {
      "@type": "PostalAddress",
      streetAddress: FORETAG.gataFullstandig,
      postalCode: FORETAG.postnummer,
      addressLocality: FORETAG.ort,
      addressCountry: "SE",
    },
    hasMap: FORETAG.mapsUrl,
    openingHoursSpecification: hours.rows.map(row => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: row.days,
      opens: row.opens,
      closes: row.closes,
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
