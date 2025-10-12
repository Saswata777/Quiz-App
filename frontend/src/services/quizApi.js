import axios from "axios";
import process from 'process';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://quiz-app-1xxt.onrender.com/api/quiz' // Deployed URL
  : 'http://localhost:5000/api/quiz';           // Local URL

export const getQuestions = async () => {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
};

export const submitAnswers = async (answers) => {
    const response = await axios.post(`${API_URL}/submit`, { answers });
    return response.data;
};
