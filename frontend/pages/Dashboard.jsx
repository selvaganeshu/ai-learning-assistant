import { useEffect, useState } from "react";
import { getDashboardData } from "../services/authServices.js";
import { useAuth } from "../context/AuthContext";
import { getBestScore } from "../services/quizAttemptServices.js";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [bestScore,setBestScore] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, bestScoreRes] = await Promise.all([
          getDashboardData(),
          getBestScore(),
        ]);
        setStats(statsRes.data);
        setBestScore(bestScoreRes.data);
      } catch (error) {
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-slate-600 mb-6">
        Welcome, <span className="font-semibold">{user?.username}</span>
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Documents" value={stats.documentCount} />
        <StatCard title="Total Flashcards" value={stats.flashCardCount} />
        <StatCard title="Total Quizzes" value={stats.quizCount} />

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-slate-500 mb-1">Best Quiz Score</p>
          {bestScore ? (
            <>
            <h2 className="text-2xl font-bold">
              {bestScore.percentage}%
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {bestScore.score} / {bestScore.totalQuestions}
            </p>
            </>
          ) : (
            <p className="text-slate-400 mt-4">No quizzes attempted yet</p>
          )}
        </div>
      </div>

      {/* Placeholder for recent activity / chat */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <p className="text-slate-500">
          Activity tracking will appear here soon.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, value}) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);



export default Dashboard;
