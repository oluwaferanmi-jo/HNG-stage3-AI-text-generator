import React, { useState } from "react";
import { translateText, detectLanguage, summarizeText } from "../LocalLanguageUtils";
import TextInput from "./TextInput";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const [loading, setLoading] = useState(false);

    // Handle text submission
    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        const userMessage = { text, sender: "user" };
        setMessages((prev) => [...prev, userMessage]);

        setLoading(true); // Start loading indicator

        // Detect language
        const { detectedLanguage } = await detectLanguage(text);
        console.log("Detected Language:", detectedLanguage);

        let newMessage = {
            text,
            sender: "bot",
            language: detectedLanguage,
            summarizedText: null, // Placeholder for summary
        };

        setMessages((prev) => [...prev, newMessage]); // Add bot response

        setLoading(false); // Stop loading indicator
    };

    // Function to handle text summarization
    const handleSummarize = async (text, index) => {
        setLoading(true); // Start loading indicator
        const summary = await summarizeText(text);
        if (summary) {
            setMessages((prevMessages) => {
                const newMessages = [...prevMessages]; // Copy state
                newMessages[index] = { ...newMessages[index], summarizedText: summary }; // Update specific message
                return newMessages;
            });
        }
        setLoading(false); // Stop loading indicator
    };

    // Function to translate text
    const handleTranslate = async (text, index) => { // Add async here
        if (!text) return;
        
        setLoading(true);
    
        const detectedLanguageObj = await detectLanguage(text);
        const detectedLanguage = detectedLanguageObj?.detectedLanguage; // Extract the actual language code
        
        if (!detectedLanguage || typeof detectedLanguage !== "string") {
            console.error("Invalid detected language:", detectedLanguageObj);
            setLoading(false);
            return;
        }
        
    
        const supportedLanguages = ["en", "pt", "es", "ru", "tr", "fr"];
        if (!supportedLanguages.includes(selectedLanguage)) {
            console.error("Target language not supported:", selectedLanguage);
            setLoading(false);
            return;
        }
    
        console.log("Translating from:", detectedLanguage, "to:", selectedLanguage);
    
        try {
            const translatedText = await translateText(text, detectedLanguage, selectedLanguage);
            if (translatedText) {
                setMessages((prevMessages) => {
                    const newMessages = [...prevMessages];
                    newMessages[index] = { ...newMessages[index], translation: translatedText };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Translation failed:", error);
        }
    
        setLoading(false);
    };
    
    
    

    return (
        <div className="Chat">
            

            {/* Chat Messages */}
            <div className="Messages">
                {messages.map((msg, index) => (
                    <div key={index} className="MessageContainer">
                        {/* User message in green */}
                        {msg.sender === "user" && (
                            <MessageBubble text={msg.text} sender={msg.sender} />
                        )}

                        {/* Language detection */}
                        {msg.language && <p className="Language">Detected Language: {msg.language}</p>}

                        {/* Translation section only for user messages */}
                        {msg.sender === "user" && (
                            <div className="TranslateSection">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                >
                                    <option value="en">English</option>
                                    <option value="pt">Portuguese</option>
                                    <option value="es">Spanish</option>
                                    <option value="ru">Russian</option>
                                    <option value="tr">Turkish</option>
                                    <option value="fr">French</option>
                                </select>
                                <button className="TranslateButton" onClick={() => handleTranslate(msg.text, index)}>
                                 Translate
                                </button>

                            </div>
                        )}

                        {/* System-generated translation */}
                        {msg.translation && (
                            <MessageBubble text={msg.translation} sender="system" />
                        )}

                        {/* Summarization Section (Only if text is long enough) */}
                        {msg.sender === "user" && msg.text.split(" ").length > 150 && (
                            <div className="SummarizeSection">
                                {!msg.summarizedText ? (
                                    <button className="SummarizeButton" onClick={() => handleSummarize(msg.text, index)}>
                                        Summarize
                                    </button>
                                ) : (
                                    <MessageBubble text={msg.summarizedText} sender="system" />
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {/* Loading Indicator - Shows while processing translation or summary */}
            {loading && <p className="Loading">Processing...</p>}
            <br />

            {/* Text Input */}
            <TextInput onSend={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
