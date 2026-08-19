import { FORETAG } from "@/lib/data";

/**
 * Schema.org-markup för företaget. För en lokal handel är det här den
 * viktigaste SEO-detaljen: den kopplar ihop namn, adress, telefon och
 * öppettider så att Google kan visa dem direkt i sökresultatet och matcha
 * mot företagsprofilen.
 *
 * Koordinater (geo) är medvetet utelämnade — de ska mätas upp, inte gissas.
 */
export default function StruktureradData({ siteUrl }: { siteUrl: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HardwareStore",
    "@id": `${siteUrl}#foretag`,
    name: FORETAG.namn,
    url: siteUrl,
    telephone: FORETAG.telefon,
    email: FORETAG.epost,
    image: `${siteUrl}/assets/hero-delning.jpg`,
    description:
      "Vi säljer och levererar kvalitetsvaror till husgrunder och trädgårdar främst i Göteborgs Skärgård och Torslanda. Byggmaterial, maskinuthyrning, ved och färdig betong.",
    address: {
      "@type": "PostalAddress",
      streetAddress: FORETAG.adressRad1,
      postalCode: "475 31",
      addressLocality: "Öckerö",
      addressCountry: "SE",
    },
    areaServed: [
      { "@type": "Place", name: "Göteborgs skärgård" },
      { "@type": "Place", name: "Torslanda" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    sameAs: [FORETAG.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // Innehållet är statiskt och byggt av oss, inte av användarinmatning.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
