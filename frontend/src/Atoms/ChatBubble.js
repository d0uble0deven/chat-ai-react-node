import React, { useState, useEffect } from "react";

const ChatBubble = ({ sender, message }) => {
  const [opacity, setOpacity] = useState(sender === "bot" ? 0 : 1);

  useEffect(() => {
    if (sender === "bot") {
      const timer = setTimeout(() => setOpacity(1), 500);
      return () => clearTimeout(timer);
    }
  }, [sender]);

  const bubbleStyles = {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: "20px",
    marginBottom: "10px",
    color: "white",
    wordWrap: "break-word",
    opacity: opacity,
    transition: "opacity 0.5s ease-in-out",
  };

  const userBubbleStyles = {
    ...bubbleStyles,
    backgroundColor: "#2D5DA1",
    marginLeft: "auto",
  };

  const botBubbleStyles = {
    ...bubbleStyles,
    backgroundColor: "#4A4A4A",
    marginRight: "auto",
  };

  return (
    <div style={sender === "user" ? userBubbleStyles : botBubbleStyles}>
      {message}
    </div>
  );
};

export default ChatBubble;
