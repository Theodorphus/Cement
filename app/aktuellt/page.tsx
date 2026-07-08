import type { Metadata } from "next";
import SimplePage from "@/components/SimplePage";

export const metadata: Metadata = {
  title: "Aktuellt",
  description:
    "Aktuellt hos Öckerö Cementgjuteri — nyheter, säsong och tips för husgrund och trädgård i skärgården.",
};

export default function AktuelltPage() {
  return (
    <SimplePage
      crumbs={[{ label: "Startsida", href: "/" }, { label: "Aktuellt" }]}
      title="Aktuellt"
      intro="Här samlar vi nyheter, säsongstips och det som är på gång hos oss på gården."
      paragraphs={[
        "Just nu fyller vi på inför säsongen med marksten, jord och gräs på rulle. Ring oss gärna så berättar vi vad som finns hemma.",
      ]}
    />
  );
}
