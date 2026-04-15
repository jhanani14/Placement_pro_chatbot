import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { useNavigate } from "react-router-dom";

export default function SummaryPage() {
  const navigate = useNavigate();

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

  const data = keys.map((key) => ({
    subject: key.replace("_", " ").toUpperCase(),
    score: parseFloat(localStorage.getItem(`similarity_${key}`) || 0)
  }));

  const avgScore = data.reduce((acc, curr) => acc + curr.score, 0) / data.length;

  let emoji = "😐";
  let message = "Good attempt! Keep improving.";
  if (avgScore > 0.7) {
    emoji = "😃";
    message = "Excellent performance! You are ready for placements.";
  } else if (avgScore > 0.4) {
    emoji = "🙂";
    message = "Decent attempt. Revise some topics for confidence.";
  } else {
    emoji = "😓";
    message = "Needs improvement. Revise thoroughly before interviews.";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🎯 Your Placement Preparation Summary</h1>

      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        width={500}
        height={400}
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 1]}
          tickFormatter={(tick) => `${tick * 100}%`}  // Shows as percentage
        />
        <Radar
          name="Similarity Score"
          dataKey="score"
          stroke="#00BFFF"
          fill="#00BFFF"
          fillOpacity={0.6}
        />
      </RadarChart>

      <div className="text-center mt-8">
        <div className="text-6xl">{emoji}</div>
        <h2 className="text-2xl font-semibold mt-4">{message}</h2>
      </div>

      <button
        onClick={() => navigate("/finalchatbot")}
        className="mt-10 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full text-white text-lg shadow-lg transition transform hover:scale-105"
      >
        Chat with Bot for More Practice 🤖
      </button>
    </div>
  );
}
