import React from "react";

function ChatBox({ messages }) {
  return (
    <div className="chat-container">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`chat-bubble ${msg.sender === "user" ? "user" : "bot"}`}
        >
          <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
}

export default ChatBox;

