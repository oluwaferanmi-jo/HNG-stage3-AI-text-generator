export function detectLanguageLocally(text) {
    const patterns = {
      en: /\b(the|and|you|is|this)\b/i,
      es: /\b(el|la|de|y|que)\b/i,
      fr: /\b(le|la|de|et|que)\b/i,
      pt: /\b(o|a|de|e|que)\b/i,
    };
  
    for (const [lang, regex] of Object.entries(patterns)) {
      if (regex.test(text)) return lang;
    }
  
    return "unknown"; // Default if no match
  }
  
  export function translateTextLocally(text, targetLanguage) {
    const translations = {
      hello: { es: "hola", fr: "bonjour", pt: "olá" },
      goodbye: { es: "adiós", fr: "au revoir", pt: "adeus" },
    };
  
    return translations[text.toLowerCase()]?.[targetLanguage] || `Translation unavailable for ${text}`;
  }
  