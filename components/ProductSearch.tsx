"use client";
import Link from "next/link";
import {useState} from "react";
import {CATALOG, productPath} from "@/lib/catalog";
const normalize=(value:string)=>value.toLocaleLowerCase("sv").normalize("NFD").replace(/[\u0300-\u036f]/g,"");
export default function ProductSearch(){
 const [query,setQuery]=useState("");
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 const matches=words.length?CATALOG.filter(p=>words.every(word=>normalize([p.name,p.intro,...p.details].join(" ")).includes(word))):[];
 return <section className="product-search" aria-label="Sök i sortimentet"><label htmlFor="product-search">Vad letar du efter?</label><input id="product-search" type="search" placeholder="Till exempel armering, gräs eller pellets" value={query} onChange={e=>setQuery(e.target.value)}/>{words.length>0&&<><p role="status">{matches.length} träffar</p><ul>{matches.map(p=><li key={productPath(p)}><Link href={productPath(p)}>{p.name}</Link></li>)}</ul>{matches.length===0&&<p>Prova ett annat ord eller <Link href="/kontakt">fråga oss om materialet</Link>.</p>}</>}</section>;
}
