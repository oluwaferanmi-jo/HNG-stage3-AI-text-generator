import React from "react";
import ChatWindow from "./components/ChatWindow";

function App() {
  


  return (
    <div className="app-container">

    <p className="Header"><i>Instantly process your messages with CHEQ-AI precision! </i></p>

    <div className="chatwindow w-[100%] max-w-3.7xl mt-0 bg-white shadow-md rounded-md">
      
      <ChatWindow />
    </div>
    </div>
  );
}

export default App;
