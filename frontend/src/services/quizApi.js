import axios from "axios";

const API_URL = "http://localhost:5000/api/quiz"; // Ensure this matches your backend URL

export const getQuestions = async () => {
    const response = await axios.get(`${API_URL}/questions`);
    return response.data;
};

export const submitAnswers = async (answers) => {
    const response = await axios.post(`${API_URL}/submit`, { answers });
    return response.data;
};
