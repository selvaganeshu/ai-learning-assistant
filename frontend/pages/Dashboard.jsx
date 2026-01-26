import { useEffect, useState } from "react";
import AppLayout from "../layouts/AppLayout.jsx";
import { getDashboardData } from "../services/authServices.js";
import { useAuth } from "../context/AuthContext";
import { getRecentActivities } from "../services/activityServices.js";
import { getBestScore,getQuizProgress} from "../services/quizAttemptServices.js";
import {LineChart,Line,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user } = useAuth();
  const [bestScore,setBestScore] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activity,setActivity] = useState([]);
  const [progress,setProgress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [statsRes, bestScoreRes,progressRes,activityRes] = await Promise.all([
          getDashboardData(),
          getBestScore(),
          getQuizProgress(),
          getRecentActivities()
        ]);
        setStats(statsRes.data);
        setBestScore(bestScoreRes.data);
        setProgress(progressRes.data);
        setActivity(activityRes.data);
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
    <AppLayout>
      <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-slate-600 mb-6">
        Welcome, <span className="font-semibold">{user?.username}</span>
      </p>

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

      <div className="bg-white p-6 rounded-xl shadow mb-4">
        <h2 className="text-lg font-semibold mb-4">Quiz Accuracy Over Time</h2>

        {progress.length === 0 ? (
          <p className="text-slate-500">Take quiz to see your progress.</p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="75%" height="100%">
              <LineChart 
              data={progress}>
                <XAxis 
                dataKey="data"
                tickFormatter={(date)=> new Date(date).toLocaleDateString()}
                />
                <YAxis domain={[0,100]}/>
                <Tooltip 
                formatter={(value)=> `${value}%`}
                labelFormatter={(label)=> new Date(label).toLocaleDateString()}
                />
                <Line 
                type="monotone"
                  dataKey="accuracy"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 4 }}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-slate-500">No Recent activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {activity.map((act,index)=>(
              <li className="flex justify-between items-center text-sm cursor-pointer hover:bg-slate-100 p-2 rounded"
              onClick = {()=> {
                if(act.type === 'document'){
                  navigate(`/documents`);
                }else if(act.type === 'quiz'){
                  navigate(`/documents/${act.documentId}/quiz-history`);
                }
                else{
                  navigate(`/documents/${act.documentId}/chat`);
                }
              }}
              key={index}>
                <span>{act.text}</span>
                <span>{new Date(act.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )} 
      </div>
    </div>
    </AppLayout>
  );
};

const StatCard = ({ title, value}) => (
  <div className="bg-white rounded-xl shadow p-6">
    <p className="text-sm text-slate-500">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);



export default Dashboard;
