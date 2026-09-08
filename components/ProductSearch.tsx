"use client";
import Link from "next/link";
import {useId, useState} from "react";
import {CATALOG, productPath} from "@/lib/catalog";
import {getKategori} from "@/lib/data";
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
 "ror":"dranering avlopp trumma",
 "dekorsten":"prydnadssten rabattsten",
 "ocean":"rengoring stad tvatt",
};
/** Gemener utan diakriter, så att "gräs" och "gras" ger samma träffar. */
const normalize=(value:string)=>value.toLocaleLowerCase("sv").normalize("NFD").replace(/[̀-ͯ]/g,"");
export default function ProductSearch(){
 const [query,setQuery]=useState("");
 const id=useId();
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 const matches=words.length
  ? CATALOG.filter(p=>{
     const haystack=normalize([p.name,p.intro,...p.details].join(" "))+" "+(SYNONYMS[p.slug]??"");
     return words.every(word=>haystack.includes(word));
    })
  : [];
 return <section className="product-search" aria-labelledby={`${id}-title`}>
  <h2 id={`${id}-title`}>Vad letar du efter?</h2>
  <label htmlFor={`${id}-input`}>Sök i sortimentet</label>
  <input id={`${id}-input`} type="search" autoComplete="off" placeholder="Till exempel armering, gräs eller pellets" value={query} onChange={e=>setQuery(e.target.value)} />
  {words.length>0&&<>
   {matches.length>0
    ? <ul className="product-search-hits">{matches.map(p=>{
       const category=getKategori(p.category);
       return <li key={productPath(p)}><Link href={productPath(p)}><strong>{p.name}</strong>{category&&<span> {category.name}</span>}</Link></li>;
      })}</ul>
    : <p className="product-search-empty">Vi hittade inget på ”{query.trim()}”. Prova ett annat ord eller <Link href="/kontakt">fråga oss om materialet</Link> – sortimentet är större än webbplatsen.</p>}
  </>}
  {/* Uppdateringen läses upp separat från listan, så skärmläsaren inte
      avbryts vid varje tangenttryck. */}
  <p className="visually-hidden" role="status">{words.length>0?`${matches.length} träffar`:""}</p>
 </section>;
}
