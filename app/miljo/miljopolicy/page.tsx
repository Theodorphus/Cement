import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Miljöpolicy",
  description:
    "Öckerö Cementgjuteris miljöpolicy — hur vi tar ansvar för miljön i vår dagliga verksamhet.",
};

export default function MiljopolicyPage() {
  return (
    <SimplePage
      crumbs={[
        { label: "Startsida", href: "/" },
        { label: "Miljö", href: "/miljo" },
        { label: "Miljöpolicy" },
      ]}
      title="Miljöpolicy"
      intro="Vi strävar efter att minska vår miljöpåverkan i varje led — från inköp och lager till leverans ut i skärgården."
      paragraphs={[
        "Vi väljer i möjligaste mån material och leverantörer med god miljöprofil, och samordnar våra leveranser för att hålla nere antalet transporter i skärgården.",
        "Avfall källsorteras och återvinns. Vi arbetar löpande med att förbättra våra rutiner och följa gällande miljölagstiftning.",
      ]}
    />
  );
}
