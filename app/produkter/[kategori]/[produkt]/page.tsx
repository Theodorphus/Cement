import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnehallsSida from "@/components/InnehallsSida";
import { getKategori } from "@/lib/data";
import { UNDERSIDOR, getUndersida } from "@/lib/innehall";

export function generateStaticParams() {
  return UNDERSIDOR.map((u) => ({ kategori: u.kategori, produkt: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; produkt: string }>;
}): Promise<Metadata> {
  const { kategori, produkt } = await params;
  const kat = getKategori(kategori);
  const sida = getUndersida(kategori, produkt);
  if (!kat || !sida) return {};

  // Beskrivningen tas från sidans eget innehåll så den speglar det som
  // faktiskt står på sidan, inte en generisk mall.
  const beskrivning =
    sida.intro[0] ??
    sida.produkter
      .map((p) => p.namn)
      .filter(Boolean)
      .slice(0, 6)
      .join(", ");

  return {
    title: `${sida.namn} — ${kat.name}`,
    description: beskrivning
      ? `${beskrivning}`.slice(0, 155)
      : `${sida.namn} hos Öckerö Cementgjuteri. Leverans i Göteborgs skärgård och Torslanda.`,
  };
}

export default async function ProduktPage({
  params,
}: {
  params: Promise<{ kategori: string; produkt: string }>;
}) {
  const { kategori, produkt } = await params;
  const kat = getKategori(kategori);
  const sida = getUndersida(kategori, produkt);
  if (!kat || !sida) notFound();

  return (
    <InnehallsSida
      crumbs={[
        { label: "Startsida", href: "/" },
        { label: "Produkter", href: "/produkter" },
        { label: kat.name, href: `/produkter/${kat.slug}` },
        { label: sida.namn },
      ]}
      eyebrow={kat.name}
      titel={sida.namn}
      intro={sida.intro}
      produkter={sida.produkter}
    />
  );
}
