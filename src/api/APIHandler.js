
const LANGUAGE_API_TOKEN = import.meta.env.VITE_GOOGLE_LANG_TOKEN;
const TRANSLATION_API_TOKEN = import.meta.env.VITE_GOOGLE_TRANS_TOKEN;
const SUMMARIZER_API_TOKEN = import.meta.env.VITE_GOOGLE_SUMM_TOKEN;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
export default API_KEY;


export async function detectLanguage(text) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/language-detection:detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LANGUAGE_API_TOKEN}`
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    return data.language || detectLanguageLocally(text);
  } catch (error) {
    console.error("Google Language Detection API failed. Using local fallback.");
    return detectLanguageLocally(text);
  }
}

export async function translateText(text, targetLanguage) {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/text-translation:translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TRANSLATION_API_TOKEN}`
      },
      body: JSON.stringify({ text, target_language: targetLanguage })
    });

    const data = await response.json();
    return data.translation || translateTextLocally(text, targetLanguage);
  } catch (error) {
    console.error("Google Translation API failed. Using local fallback.");
    return translateTextLocally(text, targetLanguage);
  }
}

export async function summarizeText(text) {
  if (text.split(" ").length <= 150) return text;

  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/text-summarization:summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SUMMARIZER_API_TOKEN}`
      },
      body: JSON.stringify({ text })
    });

    const data = await response.json();
    return data.summary || localSummarizeText(text);
  } catch (error) {
    console.error("Google Summarization API failed. Using local fallback.");
    return localSummarizeText(text);
  }
}
