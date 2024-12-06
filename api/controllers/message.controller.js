import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId; // Extract userId from token
  const { receiverId, text } = req.body; // Receiver's user ID and message text

  if (!receiverId || !text.trim()) {
    return res
      .status(400)
      .json({ message: "Receiver ID and message text are required." });
  }

  try {
    // Step 1: Check if a chat exists between the users
    let chat = await prisma.chat.findFirst({
      where: {
        userIDs: {
          hasEvery: [tokenUserId, receiverId], // Both users in the chat
        },
      },
    });

    // Step 2: Create a new chat if it does not exist
    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          userIDs: [tokenUserId, receiverId],
        },
      });
    }

    // Step 3: Add the message to the chat
    const message = await prisma.message.create({
      data: {
        text,
        userId: tokenUserId,
        chatId: chat.id,
      },
    });

    // Step 4: Update the chat's last message and reset `seenBy`
    await prisma.chat.update({
      where: { id: chat.id },
      data: {
        lastMessage: text,
        seenBy: {
          set: [tokenUserId], // Mark the message as seen by the sender
        },
      },
    });

    // Step 5: Return the new message along with the chat ID
    res.status(200).json({ message, chatId: chat.id });
  } catch (err) {
    console.error("Error adding message:", err);
    res
      .status(500)
      .json({ message: "Failed to send message. Please try again." });
  }
};
