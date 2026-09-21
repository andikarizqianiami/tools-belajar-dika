'use client';

import { useState } from 'react';
import { CreditCard, Sparkles, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardGeneratorProps {
  text: string;
}

export default function FlashcardGenerator({ text }: FlashcardGeneratorProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(10);

  const generateFlashcards = async () => {
    setIsGenerating(true);
    setError(null);
    setCurrentIndex(0);
    setIsFlipped(false);

    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat flashcard');
      }

      const data = await response.json();
      setFlashcards(data.flashcards);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      console.error('Flashcard generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Flashcard Generator
          </h3>
        </div>
        {flashcards.length === 0 && (
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
              onClick={generateFlashcards}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Membuat...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Buat Flashcard
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

      {flashcards.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Kartu {currentIndex + 1} dari {flashcards.length}
            </span>
            <button
              onClick={generateFlashcards}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              🔄 Regenerate
            </button>
          </div>

          <div
            className="relative bg-white border-2 border-purple-200 rounded-xl p-8 shadow-lg cursor-pointer min-h-[250px] flex items-center justify-center"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="text-center">
              <div className="text-xs font-medium text-purple-600 mb-4">
                {isFlipped ? 'JAWABAN' : 'PERTANYAAN'}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {isFlipped
                  ? flashcards[currentIndex].back
                  : flashcards[currentIndex].front}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 text-xs text-gray-500">
              Klik untuk {isFlipped ? 'lihat pertanyaan' : 'lihat jawaban'}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevCard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Sebelumnya
            </button>
            <button
              onClick={nextCard}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Selanjutnya
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
