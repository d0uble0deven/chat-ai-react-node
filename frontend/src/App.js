import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./Organisms/Sidebar";
import ChatPanel from "./Organisms/ChatPanel";
import axios from "axios";

function App() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get("/conversations/getAllConversations");
        const fetchedConversations = response.data;

        setConversations(fetchedConversations);

        // Automatically select the first conversation
        if (fetchedConversations.length > 0) {
          setSelectedConversation(fetchedConversations[0].id);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, []);

  const appStyles = {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  };

  return (
    <div className="App" style={appStyles}>
      <Sidebar
        conversations={conversations}
        setConversations={setConversations}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
      {selectedConversation && (
        <ChatPanel
          conversation={conversations.find(
            (conv) => conv.id === selectedConversation
          )}
          setConversations={setConversations}
          selectedConversation={selectedConversation}
        />
      )}
    </div>
  );
}

export default App;
