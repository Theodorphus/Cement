import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, instrumentSans } from "@/lib/fonts";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { SITE_URL } from "@/lib/site";
import { localBusinessJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
  title: {
    default:
      "Öckerö Cementgjuteri AB — Byggmaterial, betong & maskinuthyrning i skärgården",
    template: "%s — Öckerö Cementgjuteri AB",
  },
  description:
    "Vi säljer och levererar kvalitetsvaror till husgrunder och trädgårdar främst i Göteborgs Skärgård och Torslanda. Byggmaterial, maskinuthyrning, ved och färdig betong.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Öckerö Cementgjuteri AB",
    url: SITE_URL,
    images: [
      {
        url: "/assets/Hero4.webp",
        width: 1536,
        height: 1024,
        alt: "Öckerö Cementgjuteri — byggvaruhandel i Göteborgs skärgård",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Öckerö Cementgjuteri AB — Byggmaterial, betong & maskinuthyrning i skärgården",
    description:
      "Vi säljer och levererar kvalitetsvaror till husgrunder och trädgårdar främst i Göteborgs Skärgård och Torslanda.",
    images: ["/assets/Hero4.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="sv"
      className={`${instrumentSerif.variable} ${instrumentSans.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <a href="#main-content" className="skip-link">Hoppa till innehåll</a>
          <TopBanner />
          <Header />
          {/* Ingen flex:1 här — main är innehållshög så footern följer direkt
              utan ljus glipa. Body (footer-färgad) fyller ev. rest på höga skärmar. */}
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
