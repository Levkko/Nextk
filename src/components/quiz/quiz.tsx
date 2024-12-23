"use client";
import React, { useState } from 'react';

export default function Quiz() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState<boolean>(false);

  const questions = [
    "Ти християнин?",
    "Ти віриш в Бога?",
    "Ти віриш в Ісуса?",
    "Ти віриш що Ісус помер на хресті?",
    "Ти віриш в Триєдинство? (Трійця: Отець, Син і Дух Святих)",
    "Ти віриш що Ісус є рівним Богу?",
    "Ти коли-небудь молився?",
    "Ти коли-небудь каявся у своїх гріхах?",
    "Бога можна називати тільки Єгова і ніяк інакше?",
    "Ти матюкаєшся на регулярній основі?"
  ];

  const handleAnswer = (questionIndex: number, answer: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const calculateResult = () => {
    let positiveAnswers = 0;
    const totalQuestions = questions.length;
    
    Object.entries(answers).forEach(([index, answer]) => {
      if (answer === true) positiveAnswers++;
    });

    // Інвертуємо останні два питання
    if (answers[8] === false) positiveAnswers++;
    if (answers[9] === false) positiveAnswers++;
    if (answers[8] === true) positiveAnswers--;
    if (answers[9] === true) positiveAnswers--;

    const percentage = (positiveAnswers / totalQuestions) * 100;
    return percentage >= 60 ? "раю" : "пеклі";
  };

  const allQuestionsAnswered = questions.length === Object.keys(answers).length;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-8">Опитування віри</h1>
      
      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <p className="mb-3 font-medium">{question}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(index, true)}
                className={`px-6 py-2 rounded-md w-24 transition-colors ${
                  answers[index] === true 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Так
              </button>
              <button
                onClick={() => handleAnswer(index, false)}
                className={`px-6 py-2 rounded-md w-24 transition-colors ${
                  answers[index] === false 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-gray-300 hover:bg-gray-100'
                }`}
              >
                Ні
              </button>
            </div>
          </div>
        ))}

        {!showResult && (
          <button
            onClick={() => setShowResult(true)}
            disabled={!allQuestionsAnswered}
            className={`w-full py-3 rounded-md text-white font-medium mt-6 ${
              allQuestionsAnswered 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Показати результат
          </button>
        )}

        {showResult && (
          <div className={`p-4 rounded-lg ${
            calculateResult() === "раю" ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <h2 className="text-xl font-bold mb-2">Результат опитування</h2>
            <p className="text-lg">
              Після смерті з 99% ймовірністю ти опинишся в {calculateResult()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}