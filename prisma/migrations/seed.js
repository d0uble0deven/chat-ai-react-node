const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Create initial conversations
  const conversation1 = await prisma.conversation.create({
    data: {
      title: "Chat 1",
      messages: {
        create: [
          { content: "Hello from Chat 1", sender: "user" },
          { content: "Hi there! How can I help you?", sender: "bot" },
        ],
      },
    },
  });

  const conversation2 = await prisma.conversation.create({
    data: {
      title: "Chat 2",
      messages: {
        create: [
          { content: "This is Chat 2", sender: "user" },
          { content: "Welcome to Chat 2!", sender: "bot" },
        ],
      },
    },
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
