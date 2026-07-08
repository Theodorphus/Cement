import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Miljödiplom",
  description:
    "Öckerö Cementgjuteris miljödiplomering — vårt kvitto på ett systematiskt miljöarbete.",
};

export default function MiljodiplomPage() {
  return (
    <SimplePage
      crumbs={[
        { label: "Startsida", href: "/" },
        { label: "Miljö", href: "/miljo" },
        { label: "Miljödiplom" },
      ]}
      title="Miljödiplom"
      intro="Vår miljödiplomering är ett kvitto på att vi arbetar systematiskt och löpande med miljöfrågor."
      paragraphs={[
        "Diplomeringen innebär att vi kartlägger vår miljöpåverkan, sätter mål och följer upp dem varje år.",
        "Har du frågor om vårt miljöarbete är du välkommen att kontakta oss.",
      ]}
    />
  );
}
