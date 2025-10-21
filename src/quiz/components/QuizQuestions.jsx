import React, { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function QuizQuestions({ questions, onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionIndex, score) => {
    const newAnswers = { ...answers, [questionIndex]: score };
    setAnswers(newAnswers);

    if (questionIndex === questions.length - 1) {
      // Última pergunta - completar quiz
      setTimeout(() => onComplete(newAnswers), 300);
    } else {
      // Próxima pergunta
      setTimeout(() => setCurrentQuestion(questionIndex + 1), 300);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <section className="cp-card cp-animate">
      <h2 className="cp-quiz-title">Teste de Perfil em Saúde</h2>
      
      <ProgressBar progress={progress} />
      
      <div className="cp-question">
        <div className="cp-question-number">
          Pergunta {currentQuestion + 1} de {questions.length}
        </div>
        <h3 className="cp-question-text">{question.text}</h3>
        
        <div className="cp-options">
          {question.options.map((option) => (
            <button
              key={option.id}
              className="cp-option"
              onClick={() => handleAnswer(currentQuestion, option.score)}
            >
              <span className={`badge badge-${option.id}`}>{option.id}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}