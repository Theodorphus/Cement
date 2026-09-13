import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { FORETAG, KONTAKTER } from '../lib/data.ts';

const original = JSON.parse(fs.readFileSync(new URL('../docs/audit/original-inventory.json', import.meta.url), 'utf8'));
const originalHome = original.pages.find(page => new URL(page.url).pathname === '/').text;
const originalContact = original.pages.find(page => new URL(page.url).pathname === '/kontakt').text;
const compact = value => value.replace(/\s+/g, ' ').trim();

test('homepage introduction preserves the archived original wording', () => {
  assert.ok(compact(originalHome).includes(compact(FORETAG.intro)));
});

test('company and personal phone numbers stay consistent with the original', () => {
  assert.ok(originalContact.includes(FORETAG.telefon));
  for (const person of KONTAKTER) {
    assert.ok(originalContact.includes(person.name), person.name);
    assert.ok(originalContact.includes(person.phone), person.phone);
  }
});
