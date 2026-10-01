import {ClockIcon} from "@sanity/icons/Clock"
import {PackageIcon} from "@sanity/icons/Package"
import type {StructureResolver} from "sanity/structure"
import {KATEGORIER} from "./schemaTypes/kategorier"

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Innehåll")
    .items([
      S.listItem()
        .id("oppettider")
        .title("Öppettider")
        .icon(ClockIcon)
        .child(S.document().schemaType("oppettider").documentId("oppettider").title("Öppettider")),
      S.divider(),
      S.listItem()
        .id("nyhet")
        .title("Aktuellt")
        .schemaType("nyhet")
        .child(S.documentTypeList("nyhet").title("Aktuellt").defaultOrdering([{field: "datum", direction: "desc"}])),
      S.listItem()
        .id("produkter")
        .title("Produkter")
        .icon(PackageIcon)
        .child(
          S.list()
            .title("Produkter")
            .items([
              ...KATEGORIER.map((kategori) =>
                S.listItem()
                  .id(kategori.value)
                  .title(kategori.title)
                  .schemaType("produkt")
                  .child(
                    S.documentTypeList("produkt")
                      .title(kategori.title)
                      .filter('_type == "produkt" && kategori == $kategori')
                      .params({kategori: kategori.value})
                      .defaultOrdering([{field: "ordning", direction: "asc"}])
                      .initialValueTemplates([S.initialValueTemplateItem("produkt-i-kategori", {kategori: kategori.value})]),
                  ),
              ),
              S.divider(),
              S.listItem()
                .id("alla-produkter")
                .title("Alla produkter")
                .schemaType("produkt")
                .child(S.documentTypeList("produkt").title("Alla produkter").defaultOrdering([{field: "namn", direction: "asc"}])),
            ]),
        ),
      S.listItem()
        .id("hyrmaskin")
        .title("Hyrmaskiner")
        .schemaType("hyrmaskin")
        .child(S.documentTypeList("hyrmaskin").title("Hyrmaskiner").defaultOrdering([{field: "ordning", direction: "asc"}])),
    ])
