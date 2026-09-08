import type {NextConfig} from "next";
import {CATALOG,productPath} from "./lib/catalog";
const categoryMoves = [
 ["betongcement","betong-cement"],["sandkrossprodukterjord","sand-kross-jord"],["stenlecaror","sten-leca-ror"],["tradgardsdekorationrengoring","tradgardsdekoration-rengoring"]
];
const config:NextConfig={
 distDir: process.env.NEXT_DIST_DIR || ".next",
 poweredByHeader:false,
 async redirects(){return [
  ...CATALOG.filter(p=>p.oldPath!==productPath(p)).map(p=>({source:p.oldPath,destination:productPath(p),permanent:true})),
  ...categoryMoves.map(([oldSlug,newSlug])=>({source:`/produkter/${oldSlug}`,destination:`/produkter/${newSlug}`,permanent:true})),
  {source:"/startsida",destination:"/",permanent:true},
  {source:"/kontakt/har-hittar-du-oss",destination:"/kontakt",permanent:true},
  {source:"/aktuellt/gdpr---for-din-trygghet",destination:"/integritet",permanent:true}
 ];},
 async headers(){return [{source:"/:path*",headers:[
  {key:"X-Content-Type-Options",value:"nosniff"},
  {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
  {key:"X-Frame-Options",value:"SAMEORIGIN"},
  {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"}
 ]},
 // Bilderna i /public har inte innehållshashade filnamn, så de får en
 // måttlig cachetid med revalidering i stället för "immutable". Byts en
 // bild ut slår ändringen igenom inom ett dygn utan hård cachetömning.
 {source:"/assets/:path*",headers:[
  {key:"Cache-Control",value:"public, max-age=86400, stale-while-revalidate=604800"}
 ]}];}
};
export default config;

