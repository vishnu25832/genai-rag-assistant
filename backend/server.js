import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { runRAG } from "./services/ragService.js";

dotenv.config();

const app = express();



app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://genai-rag-assistant-ten.vercel.app/"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// 🧠 In-memory session storage
const sessions = {};

app.get("/", (req, res) => {
  res.send("✅ RAG Assistant Backend Running");
});

// 🔥 MAIN CHAT ENDPOINT
app.post("/api/chat", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.json({ reply: "Message required." });
    }

    if (!sessions[sessionId]) {
      sessions[sessionId] = [];
    }

    sessions[sessionId].push({
      role: "user",
      content: message,
    });

    // 🧠 Run RAG
    const result = await runRAG(message);

    sessions[sessionId].push({
      role: "assistant",
      content: result.reply,
    });

    res.json({
      reply: result.reply,
      retrievedChunks: result.retrievedChunks,
    });
  } catch (err) {
    console.error("SERVER ERROR:", err.message);

    res.status(500).json({
      reply: "Server error.",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
