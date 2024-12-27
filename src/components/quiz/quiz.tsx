"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Answers {
  [key: number]: string;
}

export default function Quiz() {
  const questions = [
    "Ти християнин?",
    "Ти віриш в Бога?",
    "Ти віриш в Ісуса?",
    "Ти читав коли-небудь Біблію?",
    "На твою думку чи можна піти в рай не вірячи в Ісуса?",
    "Ти віриш що Ісус помер на хресті?",
    "Ти віриш в Триєдинство? (Трійця: Отець, Син і Дух Святих)",
    "Бога можна називати тільки Єгова і ніяк інакше?",
    "Ти віриш що Ісус є рівним Богу?",
    "Ти коли-небудь молився?",
    "Ти матюкаєшся на регулярній основі?",
    "Ти коли-небудь каявся у своїх гріхах?",
  ];

  // Ініціалізуємо стан з localStorage, якщо дані є
  const [answers, setAnswers] = useState<Answers>(() => {
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem('quizAnswers');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    }
    return {};
  });
  
  const [result, setResult] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('quizResult');
    }
    return null;
  });
  
  const [showLink, setShowLink] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('showLink') === 'true';
    }
    return false;
  });

  // Зберігаємо відповіді в localStorage при кожній зміні
  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(answers));
    localStorage.setItem('quizResult', result || '');
    localStorage.setItem('showLink', showLink.toString());
  }, [answers, result, showLink]);

  const handleAnswer = (questionIndex: number, answer: string): void => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer.toLowerCase(),
    }));
  };

  const calculateResult = (): void => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Будь ласка, дайте відповідь на всі питання");
      return;
    }

    const criticalChecks = [
      { index: 0, failAnswer: "ні" },
      { index: 1, failAnswer: "ні" },
      { index: 2, failAnswer: "ні" },
      { index: 4, failAnswer: "так" },
      { index: 5, failAnswer: "ні" },
      { index: 6, failAnswer: "ні" },
      { index: 8, failAnswer: "ні" },
      { index: 10, failAnswer: "так" },
      { index: 11, failAnswer: "ні" },
    ];

    for (const check of criticalChecks) {
      if (answers[check.index]?.toLowerCase() === check.failAnswer) {
        setResult("Пекло");
        setShowLink(true);
        return;
      }
    }

    setResult("Рай");
    setShowLink(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-3 text-2xl font-bold">
        <h1>Тест: Куди ти підеш після смерті</h1>
      </div>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="mb-2 font-medium">{question}</p>
          <div className="space-x-4">
            <button
              onClick={() => handleAnswer(index, "так")}
              className={`px-4 py-2 rounded ${
                answers[index]?.toLowerCase() === "так"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Так
            </button>
            <button
              onClick={() => handleAnswer(index, "ні")}
              className={`px-4 py-2 rounded ${
                answers[index]?.toLowerCase() === "ні"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Ні
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={calculateResult}
        className="w-full py-3 rounded-md text-white font-medium mt-6 bg-blue-500 hover:bg-blue-600"
      >
        Показати результат
      </button>

      {result && showLink && (
        <div
          className={`mt-6 p-4 rounded-lg text-white ${
            result === "Пекло" ? "bg-red-500" : "bg-green-500"
          }`}
        >
          <p className="text-xl font-bold text-center mb-4">
            Після смерті ти з 99% ймовірністю підеш в {result}
          </p>
          <Link
            href={result === "Пекло" ? "/result-hell" : "/result-heaven"}
            className="block w-full py-2 text-center bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
          >
            Дізнатися більше
          </Link>
        </div>
      )}
    </div>
  );
}