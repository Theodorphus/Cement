"use client";
import Link from "next/link";
import {useId, useState} from "react";
import {CATALOG, MATERIALS, productPath} from "@/lib/catalog";
import {getKategori, KATEGORIER} from "@/lib/data";
/** Sökbara synonymer, så att kundens ord hittar rätt produkt. */
const SYNONYMS: Record<string,string> = {
 "fardig-grasmatta":"gras grasmatta pa rulle rullgras torv matta",
 "jord-i-sackar":"matjord planteringsjord sack odling plantera",
 "grasfrogodsel":"fro godning naring gazon",
 "marksten-betong-natursten":"sten uppfart garduppfart plattor granit",
 "gards-ganggrus":"grus singel makadam gang",
 "armering":"jarn nat betongjarn armeringsjarn",
 "betongcement":"cement betong gjuta gjutning",
 "leca":"lattklinker block murblock",
 "ved":"brasa braved bjork eldning",
 "pellets":"pellet uppvarmning",
 "varmeloggs":"briketter loggs eldning",
 "ror":"pvc ht muffror avlopp bojar grenror skarvmuff",
 "dranering":"dranering dransslang dagvatten fiberduk markduk trumma",
 "brunnar-betackningar":"brunn wavin stigarror jarnbetackning spygatt golvbrunn lock",
 "rannor-galler":"aco ranna spaltgaller avvattning galler linjeavvattning",
 "verktyg-handredskap":"slev murslev spackel borste skyffel skottkarra glattare verktyg",
 "gjutning-formning":"formror distanskloss najtrad visp murarbalja gjutform",
 "infastning-forbrukning":"spik plugg skruv krampa gangstang stolpsko byggplast sopsack storsack",
 "borr-kapning":"diamantborr diamantklinga kapskiva borra kapa",
 "golvbrunnar-ventiler":"golvbrunn ventil sotlucka spjall tallriksventil",
 "skydd-underhall":"platon putsnat ograsduk markduk handske borste",
 "ejder":"ejder vaghinder trafikavstangare trafikhinder betongsugga avstangare",
 "dekorsten":"prydnadssten rabattsten",
 "ocean":"rengoring stad tvatt",
};
/** Gemener utan diakriter, så att "gräs" och "gras" ger samma träffar. */
const normalize=(value:string)=>value.toLocaleLowerCase("sv").normalize("NFD").replace(/[̀-ͯ]/g,"");
export default function ProductSearch(){
 const [query,setQuery]=useState("");
 const id=useId();
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 const entries = [
  ...CATALOG.map(p=>({name:p.name,href:productPath(p),category:getKategori(p.category)?.name,search:[p.name,p.intro,...p.details,SYNONYMS[p.slug]??""].join(" ")})),
  ...KATEGORIER.map(k=>({name:k.name,href:`/produkter/${k.slug}`,category:"Produktkategori",search:[k.name,k.desc,...(k.slug === "sand-kross-jord" ? MATERIALS.flat() : [])].join(" ")})),
 ];
 const matches=words.length
  ? entries.filter(p=>words.every(word=>normalize(p.search).includes(word)))
  : [];
 return <section className="product-search" aria-labelledby={`${id}-title`}>
  <h2 id={`${id}-title`}>Vad letar du efter?</h2>
  <label htmlFor={`${id}-input`}>Sök i sortimentet</label>
  <input id={`${id}-input`} type="search" autoComplete="off" placeholder="Till exempel armering, gräs eller pellets" value={query} onChange={e=>setQuery(e.target.value)} />
  {words.length>0&&<>
   {matches.length>0
    ? <ul className="product-search-hits">{matches.map(p=>{
       return <li key={p.href}><Link href={p.href}><strong>{p.name}</strong>{p.category&&<span> {p.category}</span>}</Link></li>;
      })}</ul>
    : <p className="product-search-empty">Vi hittade inget på ”{query.trim()}”. Prova ett annat ord eller <Link href={`/kontakt?produkt=${encodeURIComponent(query.trim().slice(0,150))}`}>fråga oss om materialet</Link> – sortimentet är större än webbplatsen.</p>}
  </>}
  {/* Uppdateringen läses upp separat från listan, så skärmläsaren inte
      avbryts vid varje tangenttryck. */}
  <p className="visually-hidden" role="status">{words.length>0?`${matches.length} ${matches.length===1?"träff":"träffar"}`:""}</p>
 </section>;
}
