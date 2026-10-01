import {bild} from "./bild"
import {hyrmaskin} from "./hyrmaskin"
import {nyhet} from "./nyhet"
import {oppettider} from "./oppettider"
import {produkt} from "./produkt"

export const schemaTypes = [oppettider, nyhet, produkt, hyrmaskin, bild]

/** Typer som bara har ett dokument, med fast id lika med typnamnet. */
export const SINGLETONS = new Set(["oppettider"])
