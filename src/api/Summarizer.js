export const summarizeText = async (text) => {
    const wordCount = text.split(/\s+/).length;
    if (wordCount <= 150) {
      return text; // No need to summarize
    }
  
    try {
      // Simple text summarization logic
      const sentences = text.split(". ");
      const summary = sentences.slice(0, Math.ceil(sentences.length / 2)).join(". ") + ".";
      return summary;
    } catch (error) {
      console.error("Summarization error:", error);
      return text;
    }
  };
  