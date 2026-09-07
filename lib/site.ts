import type { Metadata } from "next";
export const SITE_URL = "https://ockerocement.se";
export const CONTENT_UPDATED = "2026-09-08";
export function pageMetadata(title: string, description: string, path: string): Metadata {
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } };
}

