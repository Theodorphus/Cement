import type { Metadata } from "next";
export const SITE_URL = "https://www.ockerocement.se";
export const sharedOpenGraph = {
  type: "website" as const,
  locale: "sv_SE",
  siteName: "Öckerö Cementgjuteri AB",
  images: [{ url: "/assets/Hero5.webp", width: 1916, height: 821, alt: "Öckerö Cementgjuteri — byggvaruhandel i Göteborgs skärgård" }],
};
export const CONTENT_UPDATED = "2026-09-10";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { ...sharedOpenGraph, title, description, url: path }, twitter: { card: "summary_large_image", title, description, images: sharedOpenGraph.images } };
}

