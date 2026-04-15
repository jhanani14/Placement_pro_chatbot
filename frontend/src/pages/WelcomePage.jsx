import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">Welcome to Placement Pro Chatbot</h1>
      <button
        onClick={() => navigate("/role")}
        className="bg-blue-600 px-6 py-3 rounded"
      >
        Get Started
      </button>
    </div>
  );
}
