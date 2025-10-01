import { createContext, useState , useContext} from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null); 

    return (
    <QuizContext.Provider
      value={{ questions, setQuestions, answers, setAnswers, score, setScore }}
    >   

        {children}
    </QuizContext.Provider>
  );
}

export const useQuiz = () => {
  return useContext(QuizContext);
};