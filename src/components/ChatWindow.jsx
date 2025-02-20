import React, { useState } from "react";
import { translateTextLocally, detectLanguage, summarizeText } from "../LocalLanguageUtils";
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

        setLoading(true);

        // Detect language
        const { detectedLanguage } = await detectLanguage(text);
        console.log("Detected Language:", detectedLanguage);

        let newMessage = {
            text,
            sender: "bot",
            language: detectedLanguage,
            summary: null,
        };

        setMessages((prev) => [...prev, newMessage]); // Add the initial message to UI

        // Summarization logic (only for long English texts)
        if (detectedLanguage === "en" && text.split(" ").length > 150) {
            try {
                const summary = await summarizeText(text);
                if (summary) {
                    setMessages((prev) => 
                        prev.map((msg) => 
                            msg.text === text ? { ...msg, summary } : msg
                        )
                    );
                }
            } catch (error) {
                console.error("Summarization error:", error);
            }
        }

        setLoading(false);
    };

    // Function to translate text
    const handleTranslate = async (text, index) => {
        setLoading(true);
        console.log("Translating:", text, "to", selectedLanguage);

        let translation = translateTextLocally(text, selectedLanguage);

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

                        {/* Display Summarized Output */}
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

            {/* Loading Indicator */}
            {loading && <p className="Loading">Processing...</p>}
            <br/>

            {/* Text Input */}
            <TextInput onSend={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
