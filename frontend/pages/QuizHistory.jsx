import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getQuizAttempt } from "../services/quizAttemptServices.js";


const QuizHistory = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    const [attempts, setAttempts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const res = await getQuizAttempt(documentId);
                setAttempts(res.data);
            } catch {
                toast.error("Failed to load quiz History");
            } finally {
                setLoading(false);
            }
        }
        fetchAttempts();
    }, [documentId]);

    if (loading) return <p className="p-6">Loading quiz history...</p>;

    return (
        <div className="min-h-screen bg-slate-100 p-6 flex justify-center">
            <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl">
                <div className="flex items-center flex-col mb-4">
                    <div className="flex justify-between w-full p-6 items-center">
                        <h2 className="text-xl font-semibold">Quiz History</h2>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-sm text-emerald-600 bg-slate-100 cursor-pointer p-2  w-[100px] rounded-lg hover:underline"
                        >
                            Back
                        </button>
                    </div>
                    <div className="overflow-y-auto w-full">
                        {attempts.length === 0 ? (
                            <p>No quiz attempts yet.</p>
                        ) : (
                            <div className="flex flex-col gap-y-3 max-h-[400px] overflow-y-auto">
                                {attempts.map((attempt) => {
                                    const percentage = Math.round((attempt.score / attempt.totalQuestions) * 100);
                                    return (
                                        <div
                                            key={attempt._id}
                                            className="border rounded-lg p-4 flex justify-between items-center w-full">
                                            <div>
                                                <p>Score : {attempt.score}/{attempt.totalQuestions}</p>
                                                <p className="text-sm text-slate-500">
                                                    <strong>{percentage}</strong>% accuracy
                                                </p>
                                            </div>
                                            <p className="text-xs text-slate-400">
                                                {attempt.createdAt
                                                    ? new Date(attempt.createdAt).toLocaleString()
                                                    : "Date unavailable"}
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizHistory;