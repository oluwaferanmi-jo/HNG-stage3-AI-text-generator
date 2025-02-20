import React from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  


  return (
    <div className="flex-row justify-center items-center h-screen bg-gray-200">
      <p className="Header"><i>Instantly process your messages with CHEQ-AI precision! </i></p>
      <ChatWindow />
    </div>
    
  );
}

export default App;
