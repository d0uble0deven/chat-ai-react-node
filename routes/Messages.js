const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

// Get messages for a conversation
router.get("/getAllMessagesForConversation/:id", async (req, res) => {
  const { id } = req.params;
  console.log("getAllMessagesForConversation id:", id);

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: parseInt(id) },
    });
    console.log("getAllMessagesForConversation messages:", messages);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// Add a message
router.post("/addNewMessageToConversation/:id", async (req, res) => {
  console.log("addNewMessageToConversation req:", req);
  const { id } = req.params;
  const { content, sender } = req.body;
  console.log(
    "addNewMessageToConversation id, content, sender:",
    id,
    content,
    sender
  );

  try {
    const message = await prisma.message.create({
      data: {
        content,
        sender,
        conversationId: parseInt(id),
      },
    });
    console.log("addNewMessageToConversation - message:", message);
    res.json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;
