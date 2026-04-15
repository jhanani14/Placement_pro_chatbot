import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RoleSelection() {
  const [role, setRole] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!role || !file) {
      alert("Please select a role and upload your resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("role", role);

    const res = await axios.post("http://localhost:5000/api/upload_resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    localStorage.setItem("questions", JSON.stringify(res.data.generated_questions));
    navigate("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h2 className="text-2xl mb-4">Select Your Role</h2>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="text-black mb-4 p-2 rounded"
      >
        <option value="">Select a role</option>
        <option value="Software Developer">Software Developer</option>
        <option value="Data Scientist">Data Scientist</option>
        <option value="AI Engineer">AI Engineer</option>
      </select>

      <h2 className="text-2xl mb-4">Upload Your Resume (PDF)</h2>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleStart}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Start Mock Test
      </button>
    </div>
  );
}
