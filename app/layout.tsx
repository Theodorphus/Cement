import type { Metadata } from "next";
import "./globals.css";
import { instrumentSerif, instrumentSans } from "@/lib/fonts";
import TopBanner from "@/components/TopBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
