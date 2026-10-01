import { createImageUrlBuilder } from "@sanity/image-url";
import { SANITY_DATASET, SANITY_PROJECT_ID } from "./env.ts";

/** Bildfält så som GROQ-frågorna i lib/content.ts returnerar dem. */
export type SanityImage = {
  alt?: string;
  asset: { _id: string };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number };
};

export type SiteImage = { src: string; alt: string; width: number; height: number; objectPosition?: string };

const builder = createImageUrlBuilder({ projectId: SANITY_PROJECT_ID || "saknas", dataset: SANITY_DATASET });

/**
 * Gör om en Sanity-bild till det next/image behöver. Redaktörens beskärning
 * följer med i adressen och fokuspunkten blir object-position för bilder som
 * fyller en ruta.
 */
export function toSiteImage(image: SanityImage, fallbackAlt = ""): SiteImage {
  const [, , size] = image.asset._id.split("-");
  const [fullWidth, fullHeight] = size.split("x").map(Number);
  const crop = image.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  return {
    src: builder.image(image).url(),
    alt: image.alt ?? fallbackAlt,
    width: Math.round(fullWidth * (1 - crop.left - crop.right)),
    height: Math.round(fullHeight * (1 - crop.top - crop.bottom)),
    objectPosition: image.hotspot ? `${Math.round(image.hotspot.x * 100)}% ${Math.round(image.hotspot.y * 100)}%` : undefined,
  };
}
