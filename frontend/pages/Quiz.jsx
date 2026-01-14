import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getQuizByDocument } from "../services/quizServices.js";
import { useParams, useNavigate } from "react-router-dom";

const Quiz = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await getQuizByDocument(documentId);
        setQuiz(res.data);
      } catch {
        toast.error("Failed to fetch quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [documentId]);

  if (loading) return <p className="p-6">Loading Quizzes</p>;

  if (!quiz) return <p className="p-6">No quiz are currently availalbe.</p>;

  const question = quiz.questions[index];

  const handleSelect = (option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleNext = () => {
    if (index === quiz.questions.length - 1) {
      setShowResults(true);
    } else {
      setIndex(index + 1);
    }
  };

  const score = quiz.questions.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen p-6 bg-slate-100 flex justify-center">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-xl">
        {!showResults ? (
          <>
            <h2 className="font-semibold text-lg mb-4">
              Question {index + 1}/{quiz.questions.length}
            </h2>

            <p className="mb-4">{question.question}</p>

            <div className="space-y-3">
              {question.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`w-full px-4 py-2 border rounded-lg text-left cursor-pointer
                                ${
                                  answers[index] === opt
                                    ? "bg-emerald-100 border-emerald-400"
                                    : "hover:bg-slate-50"
                                }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={answers[index] == null}
              className="mt-6 w-full bg-emerald-500 text-white cursor-pointer py-2 rounded-lg disabled:opacity-50"
            >
              {index === quiz.questions.length - 1 ? "Finish" : "Next"}
            </button>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-lg font-semibold">Quiz Result</h2>
            <p>
              You scored <strong>{score}</strong> / {quiz.questions.length}
            </p>

            <div className="mb-6 flex gap-4">
              <button
                className="flex-1 bg-slate-200 py-2 rounded"
                onClick={() => {
                  setIndex(0);
                  setAnswers({});
                  setShowResults(false);
                }}
              >
                Restart
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex-1 bg-emerald-500 text-white py-2 rounded"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
