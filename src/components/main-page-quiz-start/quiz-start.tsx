"use client";
import Link from "next/link";

export default function QuizStart() {
  return (
    <div className="min-h-screen bg-[#aca18e] flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white/80 backdrop-blur-lg border border-white/30 rounded-2xl p-8">
        <div className="text-center space-y-2 mb-2">
          <h1 className="text-3xl font-bold text-[#333]">
            Де ти опинишся після смерті?
          </h1>
          <p className="text-lg text-[#666]">Пройди тест та дізнайся</p>
        </div>
        <div className="flex flex-col items-center space-y-6">
          <p className="text-[#555] text-center">
            Відповівши на 8 питань, ти дізнаєшся де ти опинишся після смерті з
            ймовірністю 99%
          </p>
          <Link href="/quiz-page">
            <button className="px-8 py-3 bg-[#6B4F4F] text-white hover:bg-[#8D6363] active:bg-[#5A3F3F] transition duration-300 font-semibold rounded-lg shadow-lg flex items-center justify-center">
              Почати тест
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}