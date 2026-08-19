import type { MetadataRoute } from "next";
import { KATEGORIER } from "@/lib/data";
import { UNDERSIDOR, UTHYRNING_SIDOR, LEVERANTOR_SIDOR } from "@/lib/innehall";

const BASE = "https://ockerocement.se";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statiska = [
    "",
    "/produkter",
    "/uthyrning",
    "/vara-leverantorer",
    "/miljo",
    "/miljo/miljopolicy",
    "/miljo/miljodiplom",
    "/aktuellt",
    "/kontakt",
    "/integritetspolicy",
  ];

  const kategorier = KATEGORIER.map((k) => `/produkter/${k.slug}`);
  const produkter = UNDERSIDOR.map((u) => `/produkter/${u.kategori}/${u.slug}`);
  const maskiner = UTHYRNING_SIDOR.map((s) => `/uthyrning/${s.slug}`);
  const leverantorer = LEVERANTOR_SIDOR.map((s) => `/vara-leverantorer/${s.slug}`);

  const alla = [...statiska, ...kategorier, ...produkter, ...maskiner, ...leverantorer];

  return alla.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority:
      path === "" ? 1 : path.startsWith("/produkter") ? 0.8 : path === "/integritetspolicy" ? 0.3 : 0.6,
  }));
}
