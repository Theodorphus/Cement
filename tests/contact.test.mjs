import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, CONTACT_LIMITS } from '../lib/contact.ts';
import { contactConfigured } from '../lib/contact-config.ts';

const valid = { namn: ' Testperson ', epost: ' test@example.com ', meddelande: ' En fråga ' };
test('trims input and accepts a normal enquiry', () => {
  assert.deepEqual(validateContact(valid).fields, { namn:'Testperson', epost:'test@example.com', telefon:'', meddelande:'En fråga', website:'' });
});
test('accepts an optional phone number and rejects a malformed one', () => {
  for (const telefon of ['031-96 60 66', '+46 31 966066', '0709123456']) {
    assert.equal(validateContact({...valid, telefon}).fields?.telefon, telefon);
  }
  for (const telefon of ['abc', '12', 'ring mig!']) {
    assert.equal(validateContact({...valid, telefon}).fields, undefined);
  }
});
test('rejects malformed payloads, invalid addresses and excessive input', () => {
  for (const value of [null, [], 1, 'text', {...valid, namn:23}, {...valid, meddelande:' '}, {...valid, epost:'a@b'}, {...valid, epost:'a@example.com\r\nb@example.com'}, {...valid, meddelande:'x'.repeat(CONTACT_LIMITS.meddelande+1)}]) {
    assert.equal(validateContact(value).fields, undefined);
    assert.equal(typeof validateContact(value).error, 'string');
  }
});
test('configuration must be complete and cannot use the onboarding sender', () => {
  const names = ['RESEND_API_KEY','CONTACT_TO','CONTACT_FROM'];
  const saved = Object.fromEntries(names.map(name=>[name,process.env[name]]));
  try {
    for(const name of names) delete process.env[name];
    assert.equal(contactConfigured(),false);
    process.env.RESEND_API_KEY='test-key'; process.env.CONTACT_TO='test@example.com';
    assert.equal(contactConfigured(),false);
    process.env.CONTACT_FROM='Test <ONBOARDING@RESEND.DEV>';
    assert.equal(contactConfigured(),false);
    process.env.CONTACT_FROM='Test <web@example.com>';
    assert.equal(contactConfigured(),true);
    process.env.CONTACT_TO=' ';
    assert.equal(contactConfigured(),false);
  } finally {
    for(const name of names) { if(saved[name] === undefined) delete process.env[name]; else process.env[name]=saved[name]; }
  }
});
