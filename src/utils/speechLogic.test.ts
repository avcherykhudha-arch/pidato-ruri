import test from 'node:test';
import assert from 'node:assert/strict';
import {
  stripIntonationTags,
  prepareTextForTTS,
  calculateReadingDuration,
  countWords,
  generateClozeItems,
  extractParagraphCue,
} from './speechLogic.js';

test('stripIntonationTags removes all speech tags cleanly', () => {
  const input = '[TEGAS] Hari ini kita berdiri tegak [JEDA 3 DETIK] di bawah kibaran Merah Putih. [LEMBUT] Tataplah mereka.';
  const expected = 'Hari ini kita berdiri tegak di bawah kibaran Merah Putih. Tataplah mereka.';
  assert.equal(stripIntonationTags(input), expected);
});

test('prepareTextForTTS strips tags and expands acronyms for Indonesian speech', () => {
  const input = '[TEGAS] Salam untuk keluarga besar SMAS Tunas Baru Jin Seung Batam.';
  const prepared = prepareTextForTTS(input);
  assert.match(prepared, /S-M-A Swasta/);
  assert.ok(!prepared.includes('[TEGAS]'));
});

test('calculateReadingDuration computes accurate minutes for ceremonial pace', () => {
  const duration = calculateReadingDuration(2000, 100);
  assert.equal(duration, 20);

  const shortDuration = calculateReadingDuration(500, 100);
  assert.equal(shortDuration, 5);
});

test('countWords calculates accurate word count excluding bracket tags', () => {
  const text = '[TEGAS] Pahlawanku Teladanku [SEMANGAT] Melangkah Bersama Melanjutkan Perjuangan [JEDA 3 DETIK]';
  const count = countWords(text);
  assert.equal(count, 6); // Pahlawanku, Teladanku, Melangkah, Bersama, Melanjutkan, Perjuangan
});

test('generateClozeItems hides correct proportions of words based on difficulty', () => {
  const sentence = 'Kita adalah generasi penerus bangsa Indonesia yang berakhlak mulia dan tangguh berintegritas.';
  
  const cloze100 = generateClozeItems(sentence, 100);
  const hidden100 = cloze100.filter(c => c.cleanWord && c.isHidden);
  const words100 = cloze100.filter(c => c.cleanWord);
  assert.equal(hidden100.length, words100.length, 'At 100% all words must be hidden');

  const cloze50 = generateClozeItems(sentence, 50);
  const hidden50 = cloze50.filter(c => c.cleanWord && c.isHidden);
  assert.ok(hidden50.length > 0 && hidden50.length < words100.length, 'At 50% roughly half words hidden');
});

test('extractParagraphCue returns initial 6 words and total word count', () => {
  const p = '[TEGAS] Syalom, damai sejahtera dalam kasih Tuhan kita Yesus Kristus bagi kita semua!';
  const cue = extractParagraphCue(p);
  assert.ok(cue.triggerText.startsWith('Syalom'));
  assert.ok(cue.totalWords >= 8);
});
