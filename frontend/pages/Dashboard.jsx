import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Dashboard = () => {
  const {logout} = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-emerald-600">
            Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600
            text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <p className="mt-4 text-slate-600">
          Welcome! You are successfully logged in.
        </p>

        <div className="mt-6 border-t pt-4">
          <p className="text-sm text-slate-500">
            🚧 Features coming soon:
          </p>
          <ul className="list-disc ml-5 mt-2 text-slate-600">
            <li>Upload PDF documents</li>
            <li>Generate flashcards</li>
            <li>AI-based quizzes</li>
            <li>Track learning progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
