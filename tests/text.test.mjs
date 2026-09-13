import test from 'node:test';
import assert from 'node:assert/strict';
import { truncateText } from '../lib/text.ts';

test('long enquiry subjects stay safe to put in contact and mail links', () => {
  const subject = 'a'.repeat(149) + '\u{1F600}' + 'extra';
  const limited = truncateText(subject, 150);
  assert.equal(limited, 'a'.repeat(149) + '\u{1F600}');
  assert.equal(decodeURIComponent(encodeURIComponent(limited)), limited);
});
test('short Swedish text is preserved and zero length is empty', () => {
  assert.equal(truncateText('Gräs och jord', 150), 'Gräs och jord');
  assert.equal(truncateText('Gräs', 0), '');
});
