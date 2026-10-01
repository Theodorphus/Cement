import test from 'node:test';
import assert from 'node:assert/strict';
import { KATEGORIER } from '../lib/data.ts';
import { KATEGORIER as STUDIO_KATEGORIER } from '../studio/schemaTypes/kategorier.ts';
import { slugify } from '../studio/schemaTypes/slugify.ts';
import { formatOpeningRow, shortTime } from '../lib/oppettider.ts';
import { toSiteImage } from '../lib/sanity/image.ts';
import { CATALOG, productPath } from '../scripts/sanity/kalla-katalog.ts';
import { CATALOG_REDIRECTS } from '../lib/legacy-redirects.ts';

test('the Studio offers exactly the categories the website has pages for', () => {
  assert.deepEqual(STUDIO_KATEGORIER.map(k => [k.value, k.title]), KATEGORIER.map(k => [k.slug, k.name]));
});

test('new addresses are ASCII without Swedish characters or punctuation', () => {
  assert.equal(slugify('Gräsfrö & gödsel'), 'grasfro-godsel');
  assert.equal(slugify('  Betongkrukor och cortenkrukor! '), 'betongkrukor-och-cortenkrukor');
  assert.equal(slugify('Ved 1,5 m³'), 'ved-1-5-m3');
});

test('opening hours keep the short format the site used before', () => {
  assert.equal(shortTime('07:00'), '7');
  assert.equal(shortTime('09:30'), '9.30');
  assert.equal(formatOpeningRow({ label: 'Måndag–fredag', days: ['Monday'], opens: '07:00', closes: '16:00' }), 'Måndag–fredag 7–16');
});

test('cropped images report the dimensions of the crop and the focus point', () => {
  const image = toSiteImage({ alt: 'Krukor', asset: { _id: 'image-abc123-2000x1000-jpg' }, crop: { top: 0.1, bottom: 0.1, left: 0.25, right: 0.25 }, hotspot: { x: 0.3, y: 0.6 } });
  assert.deepEqual({ ...image, src: undefined }, { src: undefined, alt: 'Krukor', width: 1000, height: 800, objectPosition: '30% 60%' });
  assert.match(image.src, /^https:\/\/cdn\.sanity\.io\/images\/.+\/abc123-2000x1000\.jpg\?rect=500,100,1000,800$/);
  assert.equal(toSiteImage({ asset: { _id: 'image-abc123-640x480-png' } }, 'Reserv').alt, 'Reserv');
});

test('every product address from the original site still redirects to its current page', () => {
  const resolve = path => {
    for (const { source, destination } of CATALOG_REDIRECTS) {
      const pattern = new RegExp('^' + source.replace(/:produkt/, '([^/]+)') + '$');
      const match = path.match(pattern);
      if (match) return destination.replace(':produkt', match[1] ?? '');
    }
    return path;
  };
  const moved = CATALOG.filter(p => p.oldPath !== productPath(p));
  assert.equal(moved.length, 28);
  for (const product of moved) assert.equal(resolve(product.oldPath), productPath(product), product.oldPath);
});
