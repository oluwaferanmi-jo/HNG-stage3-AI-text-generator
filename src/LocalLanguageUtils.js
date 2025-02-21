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


export const isTranslationSupported = "ai" in window && "translator" in window.ai;

export const translateText = async (text, sourceLanguage, targetLanguage) => {
  if (!isTranslationSupported) {
      console.warn("Translation API is not supported in this browser.");
      return null;
  }

  try {
      const capabilities = await window.ai.translator.capabilities();
      if (capabilities.available === "no") {
          console.warn("Translation API is not available.");
          return null;
      }

      const translator = await window.ai.translator.create({
          sourceLanguage: sourceLanguage || "auto", // Auto-detect if not provided
          targetLanguage: targetLanguage, // Ensure this is defined
      });

      const translatedText = await translator.translate(text);
      console.log("Translation Result:", translatedText);
      return translatedText;
  } catch (error) {
      console.error("Error during translation:", error);
      return null;
  }
};



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