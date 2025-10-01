const express = require("express");
const router = express.Router();
const quizController = require("../controller/quizController");

router.get("/questions", quizController.getQuestions);
router.post("/submit", quizController.submitAnswers);

module.exports = router;
