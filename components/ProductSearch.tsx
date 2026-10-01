"use client";
import Link from "next/link";
import {useId, useRef, useState} from "react";
import {normalizeSearchText, searchEntries} from "@/lib/search";
import {truncateText} from "@/lib/text";
import type {SearchEntry} from "@/lib/catalog";
export default function ProductSearch({entries}:{entries:SearchEntry[]}){
 const [query,setQuery]=useState("");
 const id=useId();
 const input=useRef<HTMLInputElement>(null);
 const hasQuery=Boolean(normalizeSearchText(query));
 const matches=searchEntries(entries,query);
 return <section className="product-search" aria-labelledby={`${id}-title`}>
  <div className="search-heading"><span className="section-kicker">Hitta rätt material</span><h2 id={`${id}-title`}>Vad letar du efter?</h2></div>
  <div className="search-field"><label htmlFor={`${id}-input`}>Sök i sortimentet</label><div className="search-input-wrap"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input ref={input} id={`${id}-input`} type="search" maxLength={200} autoComplete="off" placeholder="Till exempel armering, gräs eller pellets" value={query} onChange={e=>setQuery(e.target.value)} /></div></div>
  {query.length>0&&<div className="search-results-summary"><p>{hasQuery?`${matches.length} ${matches.length===1?"träff":"träffar"}`:"Skriv ett produktnamn eller material"}</p><button type="button" onClick={()=>{setQuery("");input.current?.focus();}}>Rensa sökningen <span aria-hidden="true">×</span></button></div>}
  {hasQuery&&<>
   {matches.length>0
    ? <ul className="product-search-hits">{matches.map(p=>{
       return <li key={p.href}><Link href={p.href}><strong>{p.name}</strong>{p.category&&<span> {p.category}</span>}</Link></li>;
      })}</ul>
    : <p className="product-search-empty">Vi hittade inget på ”{query.trim()}”. Prova ett annat ord eller <Link href={`/kontakt?produkt=${encodeURIComponent(truncateText(query.trim(),150))}#forfragan`}>fråga oss om materialet</Link> – sortimentet är större än webbplatsen.</p>}
  </>}
  <p className="visually-hidden" role="status" aria-atomic="true">{hasQuery?`${matches.length} ${matches.length===1?"träff":"träffar"}`:""}</p>
  <noscript><p className="product-search-empty">Sökningen kräver JavaScript. Du kan välja en produktkategori längre ner på sidan.</p></noscript>
 </section>;
}
