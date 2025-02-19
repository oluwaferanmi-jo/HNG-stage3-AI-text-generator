import { useState, useRef } from "react";

const TextInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const textAreaRef = useRef(null);

  const handleSubmit = () => {
    if (input.trim()) {
      onSend(input); // Call onSend function from props
      setInput(""); // Clear input field
    }
  };

  const adjustHeight = () => {
    const textarea = textAreaRef.current;
    textarea.style.height = "40px"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height
  };

  return (
    <div className="Textbox">
      <textarea
        id="Textfield"
        ref={textAreaRef}
        placeholder="Type a message..."
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          adjustHeight();
        }}
        rows={1}
      />
      <button id="Send-btn" onClick={handleSubmit}>➤</button>
    </div>
  );
};

export default TextInput;
