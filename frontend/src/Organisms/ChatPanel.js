import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "../Atoms/ChatBubble";
import ChatInput from "../Molecules/ChatInput";
import axios from "axios";

const ChatPanel = ({
  conversation,
  setConversations,
  selectedConversation,
}) => {
  const chatHistoryRef = useRef(null);
  const [messages, setMessages] = useState([]);

  // Fetch messages for the selected conversation on initial load or when the conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation) {
        try {
          const response = await axios.get(
            `/messages/getAllMessagesForConversation/${selectedConversation}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);

  const saveMessageToDB = async (conversationId, content, sender) => {
    try {
      await axios.post(
        `/messages/addNewMessageToConversation/${conversationId}`,
        {
          content,
          sender,
        }
      );
    } catch (error) {
      console.error("Error saving message to the database:", error);
    }
  };

  const addMessage = async (message) => {
    const newUserMessage = { sender: "user", content: message };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Save user message to DB
    await saveMessageToDB(selectedConversation, message, "user");

    try {
      const response = await axios.post("/perplexity", { prompt: message });
      const botMessage = { sender: "bot", content: response.data };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      // Save bot message to DB
      await saveMessageToDB(selectedConversation, response.data, "bot");

      setConversations((prevConversations) =>
        prevConversations.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: [...conv.messages, newUserMessage, botMessage],
              }
            : conv
        )
      );
    } catch (error) {
      console.error("Error getting response from Perplexity:", error);
      const errorMessage = {
        sender: "bot",
        content: "Sorry, there was an error processing your request.",
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);

      // Optionally, save error message to DB
      await saveMessageToDB(selectedConversation, errorMessage.content, "bot");
    }
  };

  const chatPanelStyles = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
  };

  const chatHistoryStyles = {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
  };

  return (
    <div style={chatPanelStyles}>
      <div style={chatHistoryStyles} ref={chatHistoryRef}>
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            sender={message.sender}
            message={message.content}
            style={{
              alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                message.sender === "user" ? "#d1e7ff" : "#e2e2e2",
              borderRadius: "20px",
              padding: "10px",
              margin: "5px 0",
              maxWidth: "70%",
            }}
          />
        ))}
      </div>
      <ChatInput onSendMessage={addMessage} />
    </div>
  );
};

export default ChatPanel;
