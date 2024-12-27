import React, { useState } from "react";
import { FaPlus, FaTrash, FaPencilAlt, FaComments } from "react-icons/fa";
import axios from "axios";

const Sidebar = ({
  conversations,
  setConversations,
  selectedConversation,
  setSelectedConversation,
}) => {
  const [isEditing, setIsEditing] = useState(null);
  const [newLinkName, setNewLinkName] = useState("");
  const [editingValue, setEditingValue] = useState("");

  const addLink = async () => {
    if (newLinkName) {
      // Check for duplicate conversation titles
      let uniqueName = newLinkName;
      let counter = 1;

      // Keep incrementing the name until it's unique
      while (conversations.some((conv) => conv.title === uniqueName)) {
        uniqueName = `${newLinkName} (${counter})`;
        counter++;
      }

      try {
        const response = await axios.post(
          "/conversations/createANewConversation",
          {
            title: uniqueName, // Use the unique name
          }
        );
        setConversations([
          ...conversations,
          { ...response.data, messages: [] },
        ]);
        setNewLinkName(""); // Reset the input field
      } catch (error) {
        console.error("Error adding conversation:", error);
      }
    }
  };

  const deleteLink = async (id) => {
    try {
      await axios.delete(`/conversations/deleteASingleConversation/${id}`);
      setConversations(conversations.filter((conv) => conv.id !== id));
      if (selectedConversation === id) {
        setSelectedConversation(conversations[0]?.id || null);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const startEditing = (id, currentTitle) => {
    setIsEditing(id);
    setEditingValue(currentTitle);
  };

  const handleEditChange = (e) => {
    setEditingValue(e.target.value);
  };

  const saveEdit = async (id) => {
    try {
      const response = await axios.put(
        `/conversations/updateASingleConversation/${id}`,
        {
          title: editingValue,
        }
      );
      setConversations(
        conversations.map((conv) =>
          conv.id === id ? { ...conv, title: response.data.title } : conv
        )
      );
    } catch (error) {
      console.error("Error updating conversation:", error);
    } finally {
      setIsEditing(null);
      setEditingValue("");
    }
  };

  const sidebarStyles = {
    width: "250px",
    height: "100vh",
    backgroundColor: "#f0f0f0",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ccc",
  };

  const titleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  };

  const inputContainerStyles = {
    marginBottom: "20px",
    display: "flex",
  };

  const inputStyles = {
    flex: 1,
    padding: "5px",
    marginRight: "5px",
  };

  const addButtonStyles = {
    padding: "5px 10px",
    backgroundColor: "#2D5DA1",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const linkContainerStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "5px",
  };

  const linkStyles = {
    textDecoration: "none",
    color: "black",
    flex: 1,
    display: "flex",
    alignItems: "center",
  };

  const iconButtonStyles = {
    marginLeft: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={sidebarStyles}>
      <h1 style={titleStyles}>AI Chat App</h1>

      <div style={inputContainerStyles}>
        <input
          type="text"
          value={newLinkName}
          onChange={(e) => setNewLinkName(e.target.value)}
          placeholder="New chat name"
          style={inputStyles}
        />
        <button onClick={addLink} style={addButtonStyles}>
          <FaPlus />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {conversations.map((conv) => (
          <div
            key={conv.id}
            style={{
              ...linkContainerStyles,
              backgroundColor:
                selectedConversation === conv.id ? "#ddd" : "transparent",
            }}
          >
            <a
              href={`#${conv.id}`}
              onClick={() => setSelectedConversation(conv.id)}
              style={linkStyles}
            >
              <FaComments style={{ marginRight: "10px" }} />
              {isEditing === conv.id ? (
                <input
                  value={editingValue}
                  onChange={handleEditChange}
                  onBlur={() => saveEdit(conv.id)}
                  autoFocus
                  style={{ width: "100%", padding: "5px" }}
                />
              ) : (
                <span>{conv.title}</span>
              )}
            </a>
            <button
              onClick={() => startEditing(conv.id, conv.title)}
              style={iconButtonStyles}
            >
              <FaPencilAlt />
            </button>
            <button
              onClick={() => deleteLink(conv.id)}
              style={iconButtonStyles}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
