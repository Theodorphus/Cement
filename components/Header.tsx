"use client";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef,useState} from "react";
import {NAV_ITEMS} from "@/lib/data";
export default function Header(){
 const pathname=usePathname();const [open,setOpen]=useState(false);const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>setOpen(false),[pathname]);
 useEffect(()=>{
  function key(event:KeyboardEvent){if(event.key==="Escape"&&open){setOpen(false);toggle.current?.focus();}}
  const media=window.matchMedia("(min-width: 1101px)");
  function resize(){if(media.matches)setOpen(false);}
  document.addEventListener("keydown",key);media.addEventListener("change",resize);
  return ()=>{document.removeEventListener("keydown",key);media.removeEventListener("change",resize);};
 },[open]);
 const nav=NAV_ITEMS.map(item=><Link key={item.href} href={item.href} onClick={()=>setOpen(false)} className="nav-link" aria-current={(item.href==="/" ? pathname==="/" : pathname===item.href||pathname.startsWith(item.href+"/")) ? "page":undefined}>{item.label}</Link>);
 return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="Öckerö Cementgjuteri – startsida"><Image src="/assets/Logotyp.webp" alt="Öckerö Cementgjuteri" width={713} height={180} priority className="brand-logo" /><span className="brand-tag">Byggmaterial i skärgården</span></Link><nav className="nav-desktop" aria-label="Huvudmeny">{nav}</nav><button ref={toggle} type="button" className="nav-toggle" aria-label={open?"Stäng meny":"Öppna meny"} aria-expanded={open} aria-controls="mobile-menu" onClick={()=>setOpen(!open)}><span aria-hidden="true">{open?"×":"☰"}</span></button></div><nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label="Mobilmeny">{nav}</nav></header>;
}

