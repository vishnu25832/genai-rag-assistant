import { useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "demo",
          message: input
        })
      });

      const data = await res.json();

      // ✅ ONLY render STRING, NEVER object
      const aiText =
        typeof data.reply === "string"
          ? data.reply
          : "I don't have enough information.";

      setMessages(prev => [
        ...prev,
        { role: "assistant", text: aiText }
      ]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "Server error." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>GenAI RAG Assistant</h1>

      <button onClick={() => setMessages([])}>New Chat</button>

      <div className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "user-msg" : "ai-msg"}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div className="thinking">AI is thinking...</div>}
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;