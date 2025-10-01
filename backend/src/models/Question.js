const db = require("../config/db");

class Question {
  static getAll(callback) {
    db.all("SELECT id, problem, correctIndex ,options FROM questions", [], callback);
  }

  static getCorrectAnswers(callback) {
    db.all("SELECT id, correctIndex FROM questions", [], callback);
  }
}

module.exports = Question;
