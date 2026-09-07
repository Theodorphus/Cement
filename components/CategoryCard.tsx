import Image from "next/image";
import Link from "next/link";
export default function CategoryCard({href,name,desc,img,showCta=false}:{href:string;name:string;desc:string;img:string|null;showCta?:boolean}){
 return <Link href={href} className="card category-card">
 {img&&<div className="card-img"><Image src={img} alt="" fill sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 380px" style={{objectFit:"cover"}}/></div>}
 <div className="category-card-body"><h3>{name}</h3><p>{desc}</p>{showCta&&<span className="link-arrow">Visa kategori →</span>}</div></Link>;
}

