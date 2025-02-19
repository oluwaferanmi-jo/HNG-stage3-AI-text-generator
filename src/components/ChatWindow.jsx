import React, { useState } from "react";
import { detectLanguageLocally, translateTextLocally } from "../LocalLanguageUtils";
import { summarizeText } from "../api/APIHandler";
import TextInput from "./TextInput";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]); // Store chat messages
    const [selectedLanguage, setSelectedLanguage] = useState("en"); // Default language
    const [loading, setLoading] = useState(false); // Track loading state

    // Function to handle text submission
    const handleSendMessage = async (text) => { 
        if (!text.trim()) return; 

        const userMessage = { text, sender: "user" };
        setMessages((prev) => [...prev, userMessage]); 

        setLoading(true);

        // Detect language
        const detectedLanguage = detectLanguageLocally(text);

        let newMessage = {
            text,
            sender: "bot",
            language: detectedLanguage,
            summary: null,
        };

        // Automatically summarize if text is longer than 150 words
        if (detectedLanguage === "en" && text.split(" ").length > 150) {
            const summary = await summarizeText(text);
            if (summary) {
                newMessage.summary = summary;
            }
        }

        setMessages((prev) => [...prev, newMessage]);
        setLoading(false);
    };

    // Function to translate text
    const handleTranslate = async (text, index) => {
        setLoading(true);
        const translation = translateTextLocally(text, selectedLanguage);

        if (translation) {
            setMessages((prev) =>
                prev.map((msg, i) => (i === index ? { ...msg, translation } : msg))
            );
        }
        setLoading(false);
    };

    return (
        <div className="Chat">
            {/* Chat Messages */}
            <div className="Messages">
                {messages.map((msg, index) => (
                    <div key={index} className="MessageContainer">
                        <MessageBubble text={msg.text} sender={msg.sender} />

                        {msg.language && <p className="Language">Detected Language: {msg.language}</p>}

                        {/* Display Summarized Output Automatically */}
                        {msg.summary && <p className="Summary">Summary: {msg.summary}</p>}

                        {/* Translate Section */}
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

                        {/* Display Translated Output */}
                        {msg.translation && <p className="Translation">Translation: {msg.translation}</p>}
                    </div>
                ))}
            </div>

            {/* Text Input */}
            <TextInput onSend={handleSendMessage} />

            {/* Loading Indicator */}
            {loading && <p className="Loading">Processing...</p>}
        </div>
    );
};

export default ChatWindow;
