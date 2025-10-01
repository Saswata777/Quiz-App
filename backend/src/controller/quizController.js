const Question = require("../models/Question");
const { calculateScore } = require("../services/quizService");

exports.getQuestions = (req, res) => {
  Question.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: "DB error" });

    // Parse JSON options before sending
    const questions = rows.map((q) => ({
      id: q.id,
      problem: q.problem,
      options: JSON.parse(q.options)
    }));

    res.json(questions);
  });
};

exports.submitAnswers = (req, res) => {
  const userAnswers = req.body.answers; // { questionId: selectedIndex }

  if (!userAnswers) {
    return res.status(400).json({ message: "No answers provided" });
  }

  calculateScore(userAnswers, (err, result) => {
    if (err) return res.status(500).json({ error: "Score calculation error" });
    return res.json(result);
  });
};
