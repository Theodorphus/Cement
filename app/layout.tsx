import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, instrumentSans } from "@/lib/fonts";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StruktureradData from "@/components/StruktureradData";

const SITE_URL = "https://ockerocement.se";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
        url: "/assets/hero-delning.jpg",
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
    images: ["/assets/hero-delning.jpg"],
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
        <StruktureradData siteUrl={SITE_URL} />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TopBanner />
          <Header />
          {/* Ingen flex:1 här — main är innehållshög så footern följer direkt
              utan ljus glipa. Body (footer-färgad) fyller ev. rest på höga skärmar. */}
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
