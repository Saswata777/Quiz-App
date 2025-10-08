import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { getQuestions, submitAnswers } from "../services/quizApi";
import QuestionCard from "../components/QuestionCard";

import blackboardBg from "../assets/empty-blackboard.jpg";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const { answers, setAnswers, setScore } = useQuiz();

  useEffect(() => {
    getQuestions()
      .then((res) => setQuestions(res))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Exit early if timer is already at 0
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    // Set up the interval
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component unmounts or timeLeft changes
    return () => clearInterval(timerId);
  }, [timeLeft]); // This effect depends on timeLeft

  const handleAnswer = (questionId, selectedIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      if (timeLeft <= 0) {
        console.log("Time is up! Submitting answers...");
      }
      const result = await submitAnswers(answers);
      setScore(result);
      navigate("/result");
    } catch (err) {
      console.error("Error submitting answers", err);
    }
  };

  // if (loading) return <p className="text-center mt-10">Loading questions...</p>;
  if (loading || questions.length === 0) {
    return <p className="text-center text-white mt-10">Loading questions...</p>;
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div
      className="w-full mx-auto p-6 flex justify-center"
      style={{
        backgroundImage: `url(${blackboardBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
        // borderRadius: "8px",
      }}
    >
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max mb-6 fixed top-4 right-4 backdrop-blur-xs rounded-4xl z-10">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 24 } /* as React.CSSProperties */}
                aria-live="polite"
              >
                {String(minutes).padStart(2, "0")}
              </span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 59 } /* as React.CSSProperties */}
                aria-live="polite"
              >
                {String(seconds).padStart(2, "0")}
              </span>
            </span>
            sec
          </div>
        </div>
      <div className="w-full px-10 min-h-screen justify-center flex flex-col items-center space-y-6 max-w-4xl backdrop-blur-md rounded-4xl">

        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          selected={answers[currentQuestion.id]}
          onSelect={(idx) => handleAnswer(currentQuestion.id, idx)}
        />
        <div className="mt-8 flex justify-between w-full">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 bg-slate-900 text-slate-50 rounded-lg hover:bg-slate-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {!isLastQuestion ? (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
