import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Fetch quizzes from the backend
    axios
      .get('/api/quizzes')
      .then((res) => {
        setQuizzes(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleQuizSelection = (quizId) => {
    // Fetch selected quiz from the backend
    axios
      .get(`/api/quiz/${quizId}`)
      .then((res) => {
        setSelectedQuiz(res.data);
        setAnswers(new Array(res.data.questions.length).fill(''));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAnswerChange = (index, e) => {
    const newAnswers = [...answers];
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    // Submit answers to the backend
    axios
      .post('/api/submit', { quizId: selectedQuiz.id, answers })
      .then((res) => {
        setScore(res.data.score);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz.id}>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <button onClick={() => handleQuizSelection(quiz.id)}>
            Start Quiz
          </button>
        </div>
      ))}
      {selectedQuiz && (
        <div>
          <h2>{selectedQuiz.title}</h2>
          <p>{selectedQuiz.description}</p>
          {selectedQuiz.questions.map((question, index) => (
            <div key={question.id}>
              <p>{question.text}</p>
              {question.options.map((option) => (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={`option-${option.id}`}
                    name={`question-${question.id}`}
                    value={option.id}
                    checked={answers[index] === option.id}
                    onChange={(e) => handleAnswerChange(index, e)}
                  />
                  <label htmlFor={`option-${option.id}`}>{option.text}</label>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
          {score !== null && <p>Your score: {score}</p>}
        </div>
      )}
    </div>
  );
};

export default Quiz;