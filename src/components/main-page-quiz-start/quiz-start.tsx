"use client";
import Link from "next/link";

export default function QuizStart() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white shadow-lg border border-gray-300 rounded-2xl p-8">
        <div className="text-center space-y-2 mb-2">
          <h1 className="text-3xl font-bold text-gray-800">
            Де ти опинишся після смерті?
          </h1>
          <p className="text-lg text-gray-600">Пройди тест та дізнайся</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <p className="text-gray-700 text-center">
            Відповівши на 8 питань, ти дізнаєшся де ти опинишся після смерті з
            ймовірністю 99%
          </p>
          <Link href="/quiz-page">
            <button className="px-8 py-3 bg-gray-700 text-white hover:bg-gray-600 active:bg-gray-800 transition duration-300 font-semibold rounded-lg shadow-md flex items-center justify-center">
              Почати тест
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
