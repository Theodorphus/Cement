import fs from 'node:fs/promises';
const base = 'https://www.ockerocement.se';
const decode = s => s.replace(/&#(x[0-9a-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1),16) : Number(n))).replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
const plain = s => decode(s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ')).trim();
const links = html => [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m=>({url:new URL(decode(m[1]),base).href,label:plain(m[2])}));
const home = await (await fetch(base)).text();
const urls = [...new Set([base+'/',...links(home).map(a=>a.url).filter(u=>u.startsWith(base+'/')&&!u.includes('#')&&!u.includes('?'))])];
const results=[];
for(let i=0;i<urls.length;i+=4){
  const batch=await Promise.all(urls.slice(i,i+4).map(async url=>{
    try {
      const res=await fetch(url,{signal:AbortSignal.timeout(25000)}); const html=await res.text();
      const body=html.split('id="page-content"')[1]?.split('id="page-footer"')[0] ?? html;
      return {url,status:res.status,title:plain(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]??''),description:decode(html.match(/<meta name="description" content="([^"]*)"/i)?.[1]??''),text:plain(body),links:links(body),images:[...body.matchAll(/<img\b[^>]*>/gi)].map(m=>({alt:decode(m[0].match(/alt="([^"]*)"/)?.[1]??''),src:decode(m[0].match(/src="([^"]*)"/)?.[1]??'')}))};
    }catch(e){return {url,error:String(e)}}
  }));results.push(...batch);
}
await fs.writeFile(new URL('./original-inventory.json',import.meta.url),JSON.stringify({checkedAt:new Date().toISOString(),pages:results},null,2));
for(const p of results) console.log(JSON.stringify({url:p.url,status:p.status,error:p.error,text:p.text?.slice(0,5000),links:p.links?.filter(a=>!a.url.includes('cdn.yourvismawebsite.com/img/')),images:p.images?.length}));
