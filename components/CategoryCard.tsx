import Image from "next/image";
import Link from "next/link";
/**
 * Rubriknivån är valbar så att kortet kan följa sidans egen rubrikordning.
 * På startsidan ligger korten under en h2 och behåller h3; på produktsidan
 * följer de direkt på h1 och ska då vara h2.
 */
export default function CategoryCard({href,name,desc,img,showCta=false,headingLevel=3}:{href:string;name:string;desc:string;img:string|null;showCta?:boolean;headingLevel?:2|3}){
 const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3";
 /**
  * Namn som "Trädgårdsdekoration/Rengöring" är ett enda långt ord. Utan en
  * brytpunkt bryts det mitt inne i ordet ("Reng/öring"). Ett nollbrett
  * blanksteg efter snedstrecket låter raden brytas där i stället, utan att
  * ändra hur texten läses upp eller kopieras.
  */
 const wrappable = name.replace(/\//g, "/​");
 return <Link href={href} className="card category-card">
 {img&&<div className="card-img"><Image src={img} alt="" fill sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 380px" style={{objectFit:"cover"}}/></div>}
 <div className="category-card-body"><Heading>{wrappable}</Heading><p>{desc}</p>{showCta&&<span className="link-arrow">Visa kategori →</span>}</div></Link>;
}
