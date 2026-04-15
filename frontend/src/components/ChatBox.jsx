import { useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/evaluate", {
        user_answer: input,
        ideal_answer: "This is an ideal sample answer for testing."
      });
      setResponse(
        `Similarity: ${res.data.similarity}, Polarity: ${res.data.polarity}, Subjectivity: ${res.data.subjectivity}`
      );
    } catch (err) {
      console.error("Error:", err);
      setResponse("Error connecting to server.");
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-md w-full max-w-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 px-4 py-2 w-full rounded mb-4"
        placeholder="Type your answer..."
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Submit Answer
      </button>
      {response && (
        <div className="mt-4 bg-gray-100 p-3 rounded">
          <strong>Bot:</strong> {response}
        </div>
      )}
    </div>
  );
}
