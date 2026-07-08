import type { MetadataRoute } from "next";
import { KATEGORIER, SUBKATEGORIER } from "@/lib/data";

const BASE = "https://ockerocement.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/produkter",
    "/uthyrning",
    "/vara-leverantorer",
    "/miljo",
    "/miljo/miljopolicy",
    "/miljo/miljodiplom",
    "/aktuellt",
    "/kontakt",
  ];

  const kategoriPaths = KATEGORIER.map((k) => `/produkter/${k.slug}`);

  // Produktsidor finns endast under Markbeläggning i denna version.
  const produktPaths = SUBKATEGORIER.map(
    (s) => `/produkter/markbelaggning/${s.slug}`
  );

  return [...staticPaths, ...kategoriPaths, ...produktPaths].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/produkter") ? 0.8 : 0.6,
  }));
}
