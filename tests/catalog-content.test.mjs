import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('product image descriptions preserve Swedish characters', () => {
  const content=fs.readFileSync(new URL('../lib/catalog-images.json',import.meta.url),'utf8');
  assert.equal(content.includes('\uFFFD'),false,'Image descriptions contain replacement characters');
  const images=Object.values(JSON.parse(content)).flat();
  assert.ok(images.some(image=>image.alt==='Armeringsjärn'));
  assert.ok(images.every(image=>image.alt.trim().length>0));
});

