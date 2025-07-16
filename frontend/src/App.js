import React, { useState } from "react";
import { uploadPDF, sendPrompt } from "./api";
import ChatBox from "./ChatBox";
import "./styles.css";

function App() {
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const result = await uploadPDF(file);
    alert(result.message);
    setPdfUploaded(true);
  };

  const handlePromptSend = async () => {
    if (!prompt) return;
    const userMsg = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMsg]);

    const res = await sendPrompt(prompt);
    const botMsg = { sender: "bot", text: res.response };
    setMessages((prev) => [...prev, botMsg]);

    setPrompt("");
  };

  return (
    <div className="App">
      <h2>🧠 PDF-Aware GenAI Chatbot</h2>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <br />

      <ChatBox messages={messages} />

      <div className="input-bar">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handlePromptSend} disabled={!pdfUploaded}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
