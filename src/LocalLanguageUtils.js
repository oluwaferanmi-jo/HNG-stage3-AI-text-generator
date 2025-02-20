// LocalLanguageUtils.js

export const isLanguageDetectorSupported = "ai" in window && "languageDetector" in window.ai;

export const detectLanguage = async (text) => {
	if (!isLanguageDetectorSupported) {
		console.warn("Language Detector API is not supported in this browser.");
		return null;
	}

	try {
		const capabilities = await window.ai.languageDetector.capabilities();
		if (capabilities.available === "no") {
			console.warn("Language Detector API is not available.");
			return null;
		}

		const detector = await window.ai.languageDetector.create();
		const result = await detector.detect(text);
		console.log("Language Detection Result:", result);
		return result[0]; // Returns the detected language code
	} catch (error) {
		console.error("Error during language detection:", error);
		return null;
	}
};


export function translateTextLocally(text, targetLanguage) {
  console.log("Local translation attempt:", text, "to", targetLanguage);

  const translations = {
    hello: { es: "hola", fr: "bonjour", pt: "olá", de: "hallo" },
    goodbye: { es: "adiós", fr: "au revoir", pt: "adeus", de: "auf wiedersehen" },
    thanks: { es: "gracias", fr: "merci", pt: "obrigado", de: "danke" },
    yes: { es: "sí", fr: "oui", pt: "sim", de: "ja" },
    no: { es: "no", fr: "non", pt: "não", de: "nein" },
    friend: { es: "amigo", fr: "ami", pt: "amigo", de: "freund" },
    food: { es: "comida", fr: "nourriture", pt: "comida", de: "essen" },
  };

  return translations[text.toLowerCase()]?.[targetLanguage] || `Translation unavailable for "${text}"`;
}

export const summarizeText = async (text) => {
  try {
      if (window.ai?.summarizer) {
          const summarizer = await window.ai.summarizer.create({
              type: "headline",
              format: "plain-text",
              length: "short",
          });

          return await summarizer.summarize(text);
      } else {
          console.warn("Summarizer API is not supported in this browser.");
          return null;
      }
  } catch (error) {
      console.error("Error during summarization:", error);
      return null;
  }
};