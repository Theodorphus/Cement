import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InnehallsSida from "@/components/InnehallsSida";
import { UTHYRNING_SIDOR, getUthyrningSida } from "@/lib/innehall";

export function generateStaticParams() {
  return UTHYRNING_SIDOR.map((s) => ({ maskin: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ maskin: string }>;
}): Promise<Metadata> {
  const { maskin } = await params;
  const sida = getUthyrningSida(maskin);
  if (!sida) return {};

  const beskrivning = sida.intro[0] ?? sida.produkter[0]?.texter[0];

  return {
    title: `${sida.namn} — Uthyrning`,
    description: beskrivning
      ? beskrivning.slice(0, 155)
      : `Hyr ${sida.namn.toLowerCase()} hos Öckerö Cementgjuteri. Ring 031-96 60 66.`,
  };
}

export default async function MaskinPage({
  params,
}: {
  params: Promise<{ maskin: string }>;
}) {
  const { maskin } = await params;
  const sida = getUthyrningSida(maskin);
  if (!sida) notFound();

  return (
    <InnehallsSida
      crumbs={[
        { label: "Startsida", href: "/" },
        { label: "Uthyrning", href: "/uthyrning" },
        { label: sida.namn },
      ]}
      eyebrow="Uthyrning"
      titel={sida.namn}
      intro={sida.intro}
      produkter={sida.produkter}
      lankar={sida.lankar}
    />
  );
}
