const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../quiz.db");

// Establish the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database.");
    // Call the setup function ONLY after a successful connection
    setupDatabase();
  }
});

// This function will handle table creation and data seeding
function setupDatabase() {
  db.serialize(() => {
    // 1. Create the table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        problem TEXT NOT NULL,
        options TEXT NOT NULL,  -- JSON string of options
        correctIndex INTEGER NOT NULL
      )
    `);

    console.log("Table 'questions' is ready.");

    // 2. Clear all existing data from the table to ensure a fresh start
    db.run("DELETE FROM questions", (err) => {
      if (err) {
        console.error("Error clearing questions table:", err);
        return;
      }
      
      console.log("Cleared old data from questions table.");

      // 3. Prepare the insert statement
      const stmt = db.prepare(
        "INSERT INTO questions (problem, options, correctIndex) VALUES (?, ?, ?)"
      );

      // 4. Insert all your questions (pasted from your Question.js file)
      stmt.run(
        "In React, what is used to pass data to a component from the outside?",
        JSON.stringify(["state", "props", "setState", "render"]),
        1
      );

      stmt.run(
        "Which hook is used to perform side effects in a functional component?",
        JSON.stringify(["useState", "useContext", "useReducer", "useEffect"]),
        3
      );

      stmt.run(
        "What does JSX stand for?",
        JSON.stringify([
          "JavaScript XML",
          "JSON Syntax Extension",
          "Java Syntax X-factor",
          "JavaScript XHR",
        ]),
        0
      );

      stmt.run(
        "What is the virtual DOM?",
        JSON.stringify([
          "A browser feature",
          "A direct copy of the real DOM",
          "A lightweight in-memory representation of the real DOM",
          "A server-side rendering engine",
        ]),
        2
      );

      stmt.run(
        "In React, which method is called to update the state of a component?",
        JSON.stringify([
          "updateState()",
          "changeState()",
          "modifyState()",
          "setState()",
        ]),
        3
      );

      stmt.run(
        "Which keyword is used to declare a variable that cannot be reassigned?",
        JSON.stringify(["var", "let", "const", "static"]),
        2
      );

      stmt.run(
        "What does the '===' operator check for?",
        JSON.stringify([
          "Value equality only",
          "Reference equality",
          "Value and type equality",
          "Type equality only",
        ]),
        2
      );

      stmt.run(
        "What is a 'closure' in JavaScript?",
        JSON.stringify([
          "A syntax for classes",
          "A function that has no access to its outer scope",
          "A function that remembers variables from the scope where it was created",
          "A built-in method for arrays",
        ]),
        2
      );

      stmt.run(
        "Which method adds a new element to the end of an array and returns the new length?",
        JSON.stringify(["pop()", "shift()", "unshift()", "push()"]),
        3
      );

      stmt.run(
        "What does 'NaN' represent?",
        JSON.stringify([
          "Null and None",
          "Not a Node",
          "Not-a-Number",
          "No Action Needed",
        ]),
        2
      );

      stmt.run(
        "Which SQL command is used to retrieve data from a database?",
        JSON.stringify(["GET", "FETCH", "OPEN", "SELECT"]),
        3
      );

      stmt.run(
        "What type of database is MongoDB?",
        JSON.stringify(["SQL", "Relational", "NoSQL", "Graph"]),
        2
      );

      stmt.run(
        "In a SQL database, what uniquely identifies each record in a table?",
        JSON.stringify(["Foreign Key", "Primary Key", "Index", "Super Key"]),
        1
      );

      stmt.run(
        "Which SQL clause is used to filter the results of a query?",
        JSON.stringify(["FILTER BY", "HAVING", "GROUP", "WHERE"]),
        3
      );

      stmt.run(
        "Which type of JOIN returns all records when there is a match in either the left or the right table?",
        JSON.stringify([
          "INNER JOIN",
          "LEFT JOIN",
          "FULL OUTER JOIN",
          "RIGHT JOIN",
        ]),
        2
      );

      stmt.run(
        "What does REST stand for?",
        JSON.stringify([
          "Representational State Transfer",
          "Remote State Transaction",
          "Relational State Transfer",
          "Representational System Transfer",
        ]),
        0
      );

      stmt.run(
        "Which HTTP method is typically used to create a new resource on a server?",
        JSON.stringify(["GET", "POST", "PUT", "DELETE"]),
        1
      );

      stmt.run(
        "What HTTP status code indicates a successful request?",
        JSON.stringify(["200", "404", "500", "301"]),
        0
      );

      stmt.run(
        "What does API stand for?",
        JSON.stringify([
          "Automated Program Interface",
          "Application Programming Interface",
          "Associated Program Interaction",
          "Application Process Integration",
        ]),
        1
      );

      stmt.run(
        "What is JSON?",
        JSON.stringify([
          "A JavaScript-only object",
          "A database query language",
          "A server-side scripting language",
          "A lightweight data-interchange format",
        ]),
        3
      );

      // 5. Finalize the statement after all insertions are done
      stmt.finalize((err) => {
        if (err) {
          console.error("Error seeding data:", err);
        } else {
          console.log("Database successfully seeded with new questions. ✅");
        }
      });
    });
  });
}

module.exports = db;