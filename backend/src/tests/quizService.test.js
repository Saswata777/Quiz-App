// Import the function to be tested
const { calculateScore } = require('../services/quizService');
// Mock the Question model to avoid actual database calls in tests
const Question = require('../models/Question');

// jest.mock() replaces the original module with a mock version
jest.mock('../models/Question');

// Describe block groups related tests for the quizService
describe('quizService', () => {
  // describe block for the calculateScore function
  describe('calculateScore', () => {
    // Mock data representing questions fetched from the database
    const mockQuestions = [
      {
        id: 1,
        problem: 'In React, what is used to pass data to a component from the outside?',
        options: JSON.stringify(['state', 'props', 'setState', 'render']),
        correctIndex: 1,
      },
      {
        id: 2,
        problem: 'Which hook is used to perform side effects in a functional component?',
        options: JSON.stringify(['useState', 'useContext', 'useReducer', 'useEffect']),
        correctIndex: 3,
      },
      {
        id: 3,
        problem: 'What does JSX stand for?',
        options: JSON.stringify(['JavaScript XML', 'JSON Syntax Extension', 'Java Syntax X-factor', 'JavaScript XHR']),
        correctIndex: 0,
      },
    ];

    // beforeEach is a Jest hook that runs before each test in this block
    beforeEach(() => {
      // Clear any previous mock implementations and calls
      Question.getAll.mockClear();
    });

    // Test case: All answers are correct
    test('should return a full score when all answers are correct', (done) => {
      // Mock the implementation of Question.getAll for this specific test
      Question.getAll.mockImplementation((callback) => {
        // We pass null for the error and mockQuestions for the data
        callback(null, mockQuestions);
      });

      // User answers where all selections match the correctIndex
      const userAnswers = { 1: 1, 2: 3, 3: 0 };

      // Call the function we are testing
      calculateScore(userAnswers, (err, result) => {
        // Assertions to check if the result is as expected
        expect(err).toBeNull();
        expect(result.score).toBe(3);
        expect(result.total).toBe(3);
        expect(result.details[0].isCorrect).toBe(true);
        expect(result.details[1].isCorrect).toBe(true);
        expect(result.details[2].isCorrect).toBe(true);
        // done() is called to signal that the async test is complete
        done();
      });
    });

    // Test case: All answers are incorrect
    test('should return a zero score when all answers are incorrect', (done) => {
      Question.getAll.mockImplementation((callback) => {
        callback(null, mockQuestions);
      });

      // User answers where no selection matches the correctIndex
      const userAnswers = { 1: 0, 2: 1, 3: 2 };

      calculateScore(userAnswers, (err, result) => {
        expect(err).toBeNull();
        expect(result.score).toBe(0);
        expect(result.total).toBe(3);
        expect(result.details[0].isCorrect).toBe(false);
        expect(result.details[1].isCorrect).toBe(false);
        expect(result.details[2].isCorrect).toBe(false);
        done();
      });
    });

    // Test case: A mix of correct and incorrect answers
    test('should calculate the correct score for a mix of answers', (done) => {
      Question.getAll.mockImplementation((callback) => {
        callback(null, mockQuestions);
      });

      // User answers with one correct and two incorrect selections
      const userAnswers = { 1: 1, 2: 0, 3: 1 };

      calculateScore(userAnswers, (err, result) => {
        expect(err).toBeNull();
        expect(result.score).toBe(1);
        expect(result.total).toBe(3);
        expect(result.details[0].isCorrect).toBe(true);
        expect(result.details[1].isCorrect).toBe(false);
        expect(result.details[2].isCorrect).toBe(false);
        done();
      });
    });
    
    // Test case: No answers are provided by the user
    test('should handle empty user answers gracefully', (done) => {
        Question.getAll.mockImplementation((callback) => {
            callback(null, mockQuestions);
        });

        // An empty object for user answers
        const userAnswers = {};

        calculateScore(userAnswers, (err, result) => {
            expect(err).toBeNull();
            expect(result.score).toBe(0);
            expect(result.total).toBe(3);
            // Check that isCorrect is false for all questions since no answers were given
            expect(result.details.every(d => !d.isCorrect)).toBe(true);
            done();
        });
    });


    // Test case: The database model returns an error
    test('should propagate an error from the model', (done) => {
      // Mock an error being returned from the database
      const dbError = new Error('Database connection failed');
      Question.getAll.mockImplementation((callback) => {
        callback(dbError, null);
      });

      const userAnswers = { 1: 1 };

      calculateScore(userAnswers, (err, result) => {
        // Assert that the error is passed correctly and the result is null
        expect(err).toBe(dbError);
        expect(result).toBeUndefined();
        done();
      });
    });
  });
});