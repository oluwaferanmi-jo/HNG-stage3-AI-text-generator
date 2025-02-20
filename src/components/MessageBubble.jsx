import React from "react";

const MessageBubble = ({ text, sender }) => {
  return (
    <div className={`p-3 rounded-lg m-2 shadow-md transition-transform duration-200 hover:scale-105 
      ${sender === "user" ? "bg-green-500 text-white self-end" : "bg-blue-500 text-white self-start"}`}>
      {text}
    </div>
    
  );
};

export default MessageBubble;
