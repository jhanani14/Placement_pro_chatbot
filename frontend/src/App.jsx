import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import ChatPage from "./pages/ChatPage";
import Summary from "./pages/Summary";
import FinalChatBot from "./pages/FinalChatBot";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/finalchatbot" element={<FinalChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;
