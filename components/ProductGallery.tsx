"use client";
import Image from "next/image";
import { useState } from "react";
export type ProductImage = { src: string; alt: string };
export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);
  if (!images.length) return null;
  const selected = Math.max(0, images.findIndex(image => image.src === selectedSrc));
  const current = images[selected];
  return <div className="product-gallery">
    <div className="product-main-image"><Image key={current.src} src={current.src} alt={current.alt} fill sizes="(max-width: 860px) 100vw, 560px" priority style={{objectFit:"contain"}} />{images.length>1&&<span className="gallery-position" aria-hidden="true">{String(selected+1).padStart(2,"0")} <span>/ {String(images.length).padStart(2,"0")}</span></span>}</div>
    {images.length > 1 && <div className="product-thumbs" role="group" aria-label="Välj produktbild">{images.map((img,index)=><button type="button" key={img.src} aria-label={`Visa bild ${index+1}: ${img.alt}`} aria-pressed={selected === index} onClick={()=>setSelectedSrc(img.src)}><Image src={img.src} alt="" width={100} height={80} style={{objectFit:"contain",width:"100%",height:80}} /></button>)}</div>}
  </div>;
}
