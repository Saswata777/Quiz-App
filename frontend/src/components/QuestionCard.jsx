export default function QuestionCard({ question, totalQuestions,selected, onSelect, questionNumber }) {
  return (
    // Main card container with dark theme styling
    <div className="w-3xl rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-lg mx-4">
      
      {/* Question title with accent color for the number */}
      <h3 className="mb-4 text-xl font-medium text-slate-200">
        <span className="mr-2 text-2xl font-semibold text-sky-400">
          {questionNumber} / {totalQuestions}
        </span>
        {question.problem}
      </h3>

      {/* Container for the answer options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <label
            key={idx}
            className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-colors duration-200 ease-in-out
              ${
                selected === idx
                  ? 'border-sky-400 bg-sky-900/50 text-white' // Selected state
                  : 'border-slate-600 text-slate-300 hover:bg-slate-700' // Unselected state
              }`}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              checked={selected === idx}
              onChange={() => onSelect(idx)}
              className="h-4 w-4 flex-shrink-0 appearance-none rounded-full border-2 border-slate-500 bg-slate-800 checked:border-sky-400 checked:bg-sky-400 focus:outline-none"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}