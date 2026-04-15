import { useState } from "react";
import axios from "axios";

export default function FinalChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("http://localhost:5000/api/bot_reply", { message: input });
      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." }
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🤖 Placement Interview Bot</h1>
      <div className="bg-gray-700 rounded p-4 w-full max-w-xl h-96 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block px-3 py-2 rounded ${
                msg.sender === "user" ? "bg-blue-600" : "bg-green-600"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex w-full max-w-xl">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your question..."
          className="flex-1 p-2 rounded text-black"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
