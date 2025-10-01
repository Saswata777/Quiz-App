const Question = require("../models/Question");

function calculateScore(userAnswers, callback) {
  Question.getAll((err, rows) => {
    if (err) return callback(err);

    let score = 0;
    let details = [];

    rows.forEach((row) => {
      const options = JSON.parse(row.options);
      const userAnswerIndex = userAnswers[row.id]; // what user selected
      const isCorrect = userAnswerIndex === row.correctIndex;

      if (isCorrect) score++;

      details.push({
      questionId: row.id,
      question: row.problem,
      options,
      userAnswerIndex,
      userAnswer: options[userAnswerIndex] ?? null, // Use the 'options' array
      correctAnswerIndex: row.correctIndex,
      correctAnswer: options[row.correctIndex], // Use the 'options' array
      isCorrect,
    });

    });

    callback(null, { score, total: rows.length, details });
  });
}

module.exports = { calculateScore };
