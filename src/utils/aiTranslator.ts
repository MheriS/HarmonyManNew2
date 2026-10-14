/**
 * AI Auto-Translation Utility for Bilingual Portfolio Content
 * Automatically translates Indonesian text to English (and vice-versa)
 * Uses high-availability Google Translate endpoint with MyMemory fallback & technical term normalization.
 */

// Common IT/Engineering glossary to ensure high-accuracy professional terminology
const TECH_GLOSSARY_ID_TO_EN: Record<string, string> = {
  'Teknik Informatika': 'Informatics Engineering',
  'Sarjana Komputer': 'Bachelor of Computer Science',
  'Lulus dengan predikat Cum Laude': 'Graduated with Cum Laude Honors',
  'Magang': 'Internship',
  'Purnawaktu': 'Full-time',
  'Paruh Waktu': 'Part-time',
  'Kepala Tim': 'Team Lead',
  'Pengembang Web': 'Web Developer',
  'Asisten Dosen': 'Teaching Assistant',
  'Kecerdasan Buatan': 'Artificial Intelligence',
  'Pembelajaran Mesin': 'Machine Learning',
  'Otomasi Industri': 'Industrial Automation',
  'Jaringan Komputer': 'Computer Networks',
};

/**
 * Translates a single text block from source language to target language.
 */
export async function translateText(
  text: string, 
  from: 'id' | 'en' = 'id', 
  to: 'id' | 'en' = 'en'
): Promise<string> {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();

  // Check tech glossary for exact match
  if (from === 'id' && to === 'en' && TECH_GLOSSARY_ID_TO_EN[trimmed]) {
    return TECH_GLOSSARY_ID_TO_EN[trimmed];
  }

  // Primary Provider: Google Translate API (gtx client)
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translatedParts = data[0].map((part: any) => part[0] || '').join('');
        if (translatedParts && translatedParts.trim()) {
          return translatedParts.trim();
        }
      }
    }
  } catch (err) {
    console.warn('Google Translate API failed, trying fallback provider...', err);
  }

  // Fallback Provider: MyMemory Translation API
  try {
    const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${from}|${to}`;
    const fallbackResponse = await fetch(fallbackUrl);
    if (fallbackResponse.ok) {
      const fbData = await fallbackResponse.json();
      if (fbData?.responseData?.translatedText) {
        return fbData.responseData.translatedText.trim();
      }
    }
  } catch (err) {
    console.warn('MyMemory fallback failed:', err);
  }

  // Graceful degradation: return original text if offline or unreachable
  return trimmed;
}

/**
 * Translates multiple fields simultaneously for an entity
 */
export async function batchTranslateFields<T extends Record<string, string>>(
  fields: T,
  from: 'id' | 'en' = 'id',
  to: 'id' | 'en' = 'en'
): Promise<T> {
  const result: Record<string, string> = {};
  const entries = Object.entries(fields);

  await Promise.all(
    entries.map(async ([key, value]) => {
      if (!value || !value.trim()) {
        result[key] = '';
      } else {
        result[key] = await translateText(value, from, to);
      }
    })
  );

  return result as T;
}

/**
 * Translates multiline text (lines separated by newline)
 */
export async function translateMultiline(
  multilineText: string,
  from: 'id' | 'en' = 'id',
  to: 'id' | 'en' = 'en'
): Promise<string> {
  if (!multilineText || !multilineText.trim()) return '';
  const lines = multilineText.split('\n');
  const translatedLines = await Promise.all(
    lines.map(line => {
      if (!line.trim()) return Promise.resolve('');
      return translateText(line, from, to);
    })
  );
  return translatedLines.join('\n');
}
