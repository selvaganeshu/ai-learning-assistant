import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getQuizByDocument } from "../services/quizServices.js";
import { useParams, useNavigate } from "react-router-dom";
import { saveQuizAttempt } from "../services/quizAttemptServices.js";
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

  const handleNext = async () => {
    if (index === quiz.questions.length - 1) {
      try {
        await saveQuizAttempt(documentId, score);
        toast.success("Quiz score saved");
      } catch {
        toast.error("Failed to save Quiz score");
      }
      console.log("saved");
      setShowResults(true);
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    setIndex(index - 1);
  };

  const score = quiz.questions.reduce((acc, q, index) => {
    return acc + (answers[index] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen p-6 bg-slate-100 flex justify-center items-center">
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
                  className={`w-full px-4 py-2 border rounded-lg text-left
      ${answers[index] === opt
                      ? "bg-emerald-100 border-emerald-400"
                      : "hover:bg-slate-50"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <button
                disabled={index === 0}
                onClick={handleBack}
                className="mt-6 w-[200px] bg-slate-200 text-black cursor-pointer py-2 rounded-lg disabled:opacity-50"
              >
                Back
              </button>
              <button
                disabled={answers[index] == null}
                onClick={handleNext}
                className="mt-6 w-[200px] bg-green-200 text-black cursor-pointer py-2 rounded-lg disabled:opacity-50"
              >
                {index === quiz.questions.length - 1 ? "Finish Quiz" : "Next"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-4 text-lg font-semibold">Quiz Result</h2>
            <p className="mb-4">
              You scored <strong>{score}</strong> / {quiz.questions.length}
            </p>
            <div className="mb-4 max-h-[400px] overflow-y-auto">
              {quiz.questions.map((ques, Index) => {
                const userAnswer = answers[Index];
                const isCorrect = userAnswer === ques.correctAnswer;
                return (
                  <div
                    key={Index}
                    className={`p-4 rounded-lg border flex flex-col gap-y-3 mb-4 ${isCorrect
                        ? "bg-green-50 border-green-300"
                        : "bg-red-50 border-red-300"
                      }`}
                  >
                    <p className=" font-medium">
                      Q{Index + 1}.{ques.question}
                    </p>

                    <p>Your Answer : {answers[Index]}</p>

                    {!isCorrect && <p>Correct Answer : {ques.correctAnswer}</p>}

                    <p className="mt-2 font-semibold">
                      {isCorrect ? "Correct" : "Wrong"}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={() => {
                  setShowResults(false);
                  setIndex(0);
                  setAnswers({});
                }}
                className="bg-slate-300 p-2 w-[100px] rounded-lg cursor-pointer"
              >
                Restart
              </button>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="bg-green-300 p-2 w-[100px] rounded-lg cursor-pointer"
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
