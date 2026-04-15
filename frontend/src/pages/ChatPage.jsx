import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const navigate = useNavigate();

  const questions = [
    "Please introduce yourself.",
    "What is Object-Oriented Programming?",
    "Explain data cleaning in data science.",
    "What is Machine Learning?",
    "What is Python?",
    "Explain any project you have done.",
    "What are your strengths?",
    "What is your weakness?",
    "What are your future goals?",
    "Describe any internship experience you have."
  ];

  const keys = [
    "self_intro",
    "oop",
    "data_cleaning",
    "ml",
    "python",
    "project",
    "strengths",
    "weakness",
    "future_goal",
    "internship"
  ];

  const [questionIndex, setQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async () => {
    if (!input.trim() || questionIndex >= questions.length) return;

    const res = await axios.post("http://localhost:5000/api/evaluate", {
      user_answer: input,
      question_key: keys[questionIndex]   // match current question key
    });

    setFeedback(res.data.feedback);

    // Save to localStorage for summary
    localStorage.setItem(`similarity_${keys[questionIndex]}`, res.data.similarity);
    localStorage.setItem(`polarity_${keys[questionIndex]}`, res.data.polarity);
    localStorage.setItem(`subjectivity_${keys[questionIndex]}`, res.data.subjectivity);

    setTimeout(() => {
      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
        setInput("");
        setFeedback("");
      } else {
        navigate("/summary");
      }
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">{questions[questionIndex]}</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
        className="w-full max-w-md p-2 rounded text-black mb-4"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 px-4 py-2 rounded mb-4"
      >
        Submit Answer
      </button>
      {feedback && <p className="bg-gray-700 p-4 rounded">{feedback}</p>}
    </div>
  );
}
