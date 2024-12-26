import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const chatInputStyles = {
    display: "flex",
    padding: "20px",
    borderTop: "1px solid #ccc",
  };

  const inputStyles = {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    marginRight: "10px",
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: "#2D5DA1",
    color: "white",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <form onSubmit={handleSubmit} style={chatInputStyles}>
      <input
        style={inputStyles}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button style={buttonStyles} type="submit">
        <FaPaperPlane />
      </button>
    </form>
  );
};

export default ChatInput;
