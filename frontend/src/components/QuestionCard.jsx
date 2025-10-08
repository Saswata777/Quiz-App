export default function QuestionCard({ question, totalQuestions,selected, onSelect, questionNumber }) {
  return (
    <div className="max-w-3xl w-full rounded-lg border border-slate-700 bg-slate-800 p-4 sm:p-6 shadow-lg mx-auto my-4">
  {/* Question title */}
  <h3 className="mb-4 text-lg sm:text-xl font-medium text-slate-200 break-words">
    <span className="mr-2 text-xl sm:text-2xl font-semibold text-sky-400">
      {questionNumber} / {totalQuestions}
    </span>
    {question.problem}
  </h3>

  {/* Options */}
  <div className="space-y-3">
    {question.options.map((opt, idx) => (
      <label
        key={idx}
        className={`flex flex-col sm:flex-row cursor-pointer items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 rounded-lg border p-3 transition-colors duration-200 ease-in-out
          ${
            selected === idx
              ? 'border-sky-400 bg-sky-900/50 text-white'
              : 'border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
      >
        <input
          type="radio"
          name={`question-${question.id}`}
          checked={selected === idx}
          onChange={() => onSelect(idx)}
          className="h-4 w-4 flex-shrink-0 appearance-none rounded-full border-2 border-slate-500 bg-slate-800 checked:border-sky-400 checked:bg-sky-400 focus:outline-none"
        />
        <span className="text-sm sm:text-base break-words">{opt}</span>
      </label>
    ))}
  </div>
</div>

  );
}