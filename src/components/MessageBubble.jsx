import React from "react";

const MessageBubble = ({ text, sender }) => {
  return (
    <div className={`p-3 rounded-lg m-2 ${sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}>
      {text}
    </div>
  );
};

export default MessageBubble;
