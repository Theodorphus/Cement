import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnehallsSida from "@/components/InnehallsSida";
import { LEVERANTOR_SIDOR, getLeverantorSida } from "@/lib/innehall";

export function generateStaticParams() {
  return LEVERANTOR_SIDOR.map((s) => ({ leverantor: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ leverantor: string }>;
}): Promise<Metadata> {
  const { leverantor } = await params;
  const sida = getLeverantorSida(leverantor);
  if (!sida) return {};

  const beskrivning = sida.intro[0] ?? sida.produkter[0]?.texter[0];

  return {
    title: `${sida.namn} — Våra leverantörer`,
    description: beskrivning
      ? beskrivning.slice(0, 155)
      : `${sida.namn} är en av leverantörerna bakom sortimentet hos Öckerö Cementgjuteri.`,
  };
}

export default async function LeverantorPage({
  params,
}: {
  params: Promise<{ leverantor: string }>;
}) {
  const { leverantor } = await params;
  const sida = getLeverantorSida(leverantor);
  if (!sida) notFound();

  return (
    <InnehallsSida
      crumbs={[
        { label: "Startsida", href: "/" },
        { label: "Våra leverantörer", href: "/vara-leverantorer" },
        { label: sida.namn },
      ]}
      eyebrow="Leverantör"
      titel={sida.namn}
      intro={sida.intro}
      produkter={sida.produkter}
    />
  );
}
