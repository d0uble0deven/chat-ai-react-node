const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

// Get all conversations
router.get("/getAllConversations", async (req, res) => {
  const conversations = await prisma.conversation.findMany({
    include: { messages: true },
  });
  res.json(conversations);
});

// Create a conversation
router.post("/createANewConversation", async (req, res) => {
  const { title } = req.body;
  const conversation = await prisma.conversation.create({
    data: { title },
  });
  res.json(conversation);
});

// Update a conversation
router.put("/updateASingleConversation/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const updatedConversation = await prisma.conversation.update({
    where: { id: parseInt(id) },
    data: { title },
  });
  res.json(updatedConversation);
});

// Delete a conversation
router.delete("/deleteASingleConversation/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.conversation.delete({ where: { id: parseInt(id) } });
  res.sendStatus(204);
});

module.exports = router;
