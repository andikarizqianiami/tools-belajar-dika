'use client';

import { useState } from 'react';
import { Brain, Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizGeneratorProps {
  text: string;
}

export default function QuizGenerator({ text }: QuizGeneratorProps) {
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(10);

  const generateQuiz = async () => {
    setIsGenerating(true);
    setError(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat kuis');
      }

      const data = await response.json();
      setQuiz(data.quiz);
      setAnswers(new Array(data.quiz.length).fill(null));
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      console.error('Quiz generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1] ?? null);
    } else {
      // Calculate score
      const finalScore = answers.reduce((acc, answer, idx) => {
        return (acc || 0) + (answer === quiz[idx].correctAnswer ? 1 : 0);
      }, 0 as number);
      setScore(finalScore || 0);
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(quiz.length).fill(null));
  };

  if (showResult) {
    const percentage = Math.round((score / quiz.length) * 100);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Hasil Kuis</h3>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-6xl font-bold text-green-600 mb-2">
            {percentage}%
          </div>
          <div className="text-lg text-gray-700 mb-4">
            Skor: {score} dari {quiz.length}
          </div>
          <div className="text-sm text-gray-600">
            {percentage >= 80
              ? '🎉 Hebat! Kamu menguasai materi ini!'
              : percentage >= 60
              ? '👍 Bagus! Terus belajar!'
              : '💪 Jangan menyerah! Coba lagi!'}
          </div>
        </div>

        <div className="space-y-3">
          {quiz.map((q, idx) => {
            const userAnswer = answers[idx];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 ${
                  isCorrect
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-2">
                      {idx + 1}. {q.question}
                    </p>
                    <p className="text-sm text-gray-800">
                      Jawaban kamu: {userAnswer !== null ? q.options[userAnswer] : 'Tidak dijawab'}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-gray-800">
                        Jawaban benar: {q.options[q.correctAnswer]}
                      </p>
                    )}
                    <p className="text-sm text-gray-700 mt-2 italic">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-2">
          <button
            onClick={resetQuiz}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Coba Lagi
          </button>
          <button
            onClick={generateQuiz}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Kuis Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Kuis Generator
          </h3>
        </div>
        {quiz.length === 0 && (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="5"
              max="20"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
            />
            <button
              onClick={generateQuiz}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Membuat...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Buat Kuis
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {quiz.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Soal {currentQuestion + 1} dari {quiz.length}
            </span>
            <div className="flex gap-1">
              {quiz.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    answers[idx] !== null
                      ? 'bg-green-500'
                      : idx === currentQuestion
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-lg font-semibold text-gray-900 mb-4">
              {quiz[currentQuestion].question}
            </p>

            <div className="space-y-2">
              {quiz[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === idx
                      ? 'border-blue-500 bg-blue-50 text-gray-900'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <span className="font-medium text-gray-900">
                    {String.fromCharCode(65 + idx)}.
                  </span>{' '}
                  <span className="text-gray-900">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="px-4 py-2 text-gray-700 font-medium hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={nextQuestion}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestion === quiz.length - 1 ? 'Selesai' : 'Selanjutnya →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
