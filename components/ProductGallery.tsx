"use client";
import Image from "next/image";
import { useState } from "react";
export type ProductImage = { src: string; alt: string };
export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);
  if (!images.length) return null;
  const current = images[selected] ?? images[0];
  return <div className="product-gallery">
    <div className="product-main-image"><Image src={current.src} alt={current.alt} fill sizes="(max-width: 860px) 100vw, 560px" priority style={{objectFit:"contain"}} /></div>
    {images.length > 1 && <div className="product-thumbs" role="group" aria-label="Välj produktbild">{images.map((img,index)=><button type="button" key={img.src} aria-label={`Visa bild ${index+1}: ${img.alt}`} aria-pressed={selected === index} onClick={()=>setSelected(index)}><Image src={img.src} alt="" width={100} height={80} style={{objectFit:"contain",width:"100%",height:80}} /></button>)}</div>}
  </div>;
}

