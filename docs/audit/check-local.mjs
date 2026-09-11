import fs from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://localhost:3000';
const get = (path, options={}) => fetch(new URL(path,base),{signal:AbortSignal.timeout(15000),...options});
const xmlResponse = await get('/sitemap.xml');
if (!xmlResponse.ok) throw new Error('Sitemap could not be loaded');
const paths = [...(await xmlResponse.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
if (!paths.length) throw new Error('Sitemap is empty');
const inventory = JSON.parse(await fs.readFile(new URL('./original-inventory.json',import.meta.url),'utf8'));
const oldPaths = inventory.pages.filter(p=>p.status===200).map(p=>new URL(p.url).pathname);
const failures = [], rows = [], localLinks = new Set(), assets = new Set();
const decode = value => value.replace(/&amp;/g,'&').replace(/&#x27;|&#39;/g,"'").replace(/&quot;/g,'"');
for(const path of new Set([...paths,...oldPaths])) {
  const response = await get(path,{redirect:'manual'});
  const location = response.headers.get('location');
  const html = await response.text();
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? null;
  const targetStatus = location ? (await get(location)).status : null;
  rows.push({path,status:response.status,location,targetStatus,canonical});
  if(response.status!==200 && !([301,308].includes(response.status)&&targetStatus===200)) failures.push(path+': invalid status or redirect');
  if(paths.includes(path) && !canonical) failures.push(path+': missing canonical');
  if(response.status===200) {
    const headings = [...html.matchAll(/<h1(?:\s|>)/g)];
    if(headings.length!==1) failures.push(path+': expected exactly one main heading');
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
    if(new Set(ids).size!==ids.length) failures.push(path+': duplicate element IDs');
    for(const image of html.matchAll(/<img\b[^>]*>/g)) {
      if(!/\salt="[^"]*"/.test(image[0])) failures.push(path+': image missing alt attribute');
    }
    for(const control of html.matchAll(/\saria-controls="([^"]+)"/g)) {
      if(control[1].split(/\s+/).some(id=>!ids.includes(id))) failures.push(path+': control points to a missing element');
    }
    for(const m of html.matchAll(/href="([^"]+)"/g)) { const link=decode(m[1]); if(link.startsWith('/')&&!link.startsWith('//')) localLinks.add(link.split('#')[0]); }
    for(const m of decode(html).matchAll(/\/assets\/[^\s"'<>\\)]+/g)) assets.add(m[0]);
  }
}
for(const path of new Set([...localLinks,...assets])) {
  if(path && !(await get(path)).ok) failures.push(path+': broken local link or asset');
}
for(const [path,destination] of [
 ['/BE-Armeringshandboken.pdf','https://www.begroup.se/produkter/armering'],
 ['/WB+Produktkatalog.pdf','https://www.wienerberger.se/verktyg-service/kataloger-broschyrer.html'],
]) {
 const response=await get(path,{redirect:'manual'});
 if(response.status!==308 || response.headers.get('location')!==destination) failures.push(path+': incorrect document redirect');
}
const missing = await get('/page-that-does-not-exist-audit');
if(missing.status!==404) failures.push('Unknown page does not return 404');
// Deliberately invalid requests: these cannot send a customer message.
for(const [body,status,headers] of [
  ['{}',400,{'Content-Type':'application/json'}],
  ['not-json',400,{'Content-Type':'application/json'}],
  ['{}',415,{'Content-Type':'text/plain'}],
  ['{}',403,{'Content-Type':'application/json',Origin:'https://invalid.example'}],
  ['x'.repeat(24001),413,{'Content-Type':'application/json'}],
]) {
  const response=await get('/api/kontakt',{method:'POST',headers,body});
  if(response.status!==status) failures.push('Contact validation: expected '+status+', got '+response.status);
}
const result={checkedAt:new Date().toISOString(),base,sitemapPages:paths.length,oldPages:oldPaths.length,assetsChecked:assets.size,localLinksChecked:localLinks.size,rows,failures};
await fs.writeFile(new URL('./local-checks.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify({sitemapPages:paths.length,oldPages:oldPaths.length,assetsChecked:assets.size,localLinksChecked:localLinks.size,failures},null,2));
if(failures.length) process.exitCode=1;
