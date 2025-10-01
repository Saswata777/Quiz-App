const express = require("express");
const cors = require("cors");
const quizRoutes = require("./routes/quizRoutes");
const Question = require("./models/Question");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/quiz", quizRoutes);

// Seed data only once (dev mode)
if (process.env.SEED === "true") {
  Question.seed();
}

module.exports = app;
