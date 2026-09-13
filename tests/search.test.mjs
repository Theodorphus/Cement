import test from 'node:test';
import assert from 'node:assert/strict';
import { searchEntries } from '../lib/search.ts';

const entries = [
  { name: 'Trädgård', search: 'Marksten, ved och gräs för trädgården' },
  { name: 'Ved', search: 'Björkved och brännved' },
  { name: 'Gräsmatta på rulle', search: 'Rullgräs torv' },
  { name: 'Sand/Krossprodukter/Jord', search: 'Material i lösvikt' },
];
test('exact product names rank above mentions in descriptions', () => {
  assert.equal(searchEntries(entries, 'ved')[0].name, 'Ved');
});
test('Swedish accents, case and slash-separated names are searchable', () => {
  assert.equal(searchEntries(entries, 'GRASMATTA PA RULLE')[0].name, 'Gräsmatta på rulle');
  assert.equal(searchEntries(entries, 'sand krossprodukter jord')[0].name, 'Sand/Krossprodukter/Jord');
  assert.equal(searchEntries(entries, 'sand/krossprodukter/jord')[0].name, 'Sand/Krossprodukter/Jord');
});
test('synonyms match and every query word must be present', () => {
  assert.equal(searchEntries(entries, 'rullgräs')[0].name, 'Gräsmatta på rulle');
  assert.deepEqual(searchEntries(entries, 'rullgräs pellets'), []);
});
test('empty or punctuation-only searches return no results', () => {
  for (const query of ['', '  ', ' / - ']) assert.deepEqual(searchEntries(entries, query), []);
});
