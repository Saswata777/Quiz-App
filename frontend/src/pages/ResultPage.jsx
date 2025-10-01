// import { useNavigate } from "react-router-dom";
// import { useQuiz } from "../context/QuizContext";

// export default function ResultPage() {
//   const navigate = useNavigate();
//   const { score } = useQuiz();

//   if (!score) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <p className="text-lg">No result found. Please start a quiz first.</p>
//         <button
//           onClick={() => navigate("/")}
//           className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
//         >
//           Go to Start
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen space-y-6">
//       <h1 className="text-3xl font-bold">Your Result</h1>
//       <p className="text-xl">
//         You scored <span className="font-bold">{score.score}</span> out of{" "}
//         <span className="font-bold">{score.total}</span>
//       </p>
//       <button
//         onClick={() => navigate("/")}
//         className="px-6 py-2 bg-blue-600 text-white rounded-lg"
//       >
//         Try Again
//       </button>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function ResultPage() {
  const navigate = useNavigate();
  const { score } = useQuiz();

  if (!score) {
    return (
      <div className="flex flex-col items-center justify-center h-screen backdrop:blur-sm">
        <p className="text-lg">No result found. Please start a quiz first.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Go to Start
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">Your Result</h1>
      <p className="text-xl text-center">
        You scored <span className="font-bold">{score.score}</span> out of{" "}
        <span className="font-bold">{score.total}</span>
      </p>

      
     
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No.</th>
              <th scope="col" className="px-6 py-3">Question</th>
              <th scope="col" className="px-6 py-3">Your Answer</th>
              <th scope="col" className="px-6 py-3">Correct Answer</th>
              <th scope="col" className="px-6 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {score.details.map((q, index) => (
              <tr 
                key={q.questionId} 
                className="odd:bg-white even:bg-gray-50 border-b dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {q.question}
                </th>
                <td className={`px-6 py-4 font-medium ${!q.isCorrect ? 'text-red-600' : ''}`}>
                  {q.userAnswer ?? "Not Answered"}
                </td>
                <td className="px-6 py-4 font-medium text-green-600">
                  {q.correctAnswer}
                </td>
                <td className="px-6 py-4 text-center">
                  {q.isCorrect ? (
                    <span className="font-bold text-green-600">Correct ✔️</span>
                  ) : (
                    <span className="font-bold text-red-600">Wrong ❌</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* --- Table Ends Here --- */}

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
