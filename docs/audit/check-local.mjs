import fs from 'node:fs/promises';
const base='http://localhost:3000';
const xml=await (await fetch(base+'/sitemap.xml')).text();
const paths=[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
const samples=['/startsida','/produkter/betongcement/armering','/produkter/markbelaggning/fardig-grasmatta-grasmatta-pa-rulle','/uthyrning/jordfras','/kontakt/har-hittar-du-oss','/cookies','/aktuellt/gdpr---for-din-trygghet'];
const rows=[];
for(const path of [...paths,...samples]){
 const res=await fetch(base+path,{redirect:'manual'}); const html=await res.text();
 rows.push({path,status:res.status,location:res.headers.get('location'),title:html.match(/<title>(.*?)<\/title>/)?.[1],canonical:html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0]??null,assets:[...new Set([...html.matchAll(/(?:url\(['"]?)(\/assets\/[^)'"\s]+)|(?:src=")(\/assets\/[^"\s]+)/g)].map(m=>m[1]??m[2]))]});
}
await fs.writeFile(new URL('./local-checks.json',import.meta.url),JSON.stringify({checkedAt:new Date().toISOString(),sitemapPages:paths.length,rows},null,2));
console.log(JSON.stringify({sitemapPages:paths.length,rows:rows.map(({assets,...r})=>r)},null,2));
