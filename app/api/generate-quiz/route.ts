import { NextRequest, NextResponse } from 'next/server';
import { AIProvider } from '@/lib/ai-provider';
import { rateLimiter, truncateText } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const { text, count = 10 } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text content is required' },
        { status: 400 }
      );
    }

    // Wait if needed to avoid rate limit
    await rateLimiter.waitIfNeeded();

    // Truncate text jika terlalu panjang (untuk menghindari rate limit)
    const processedText = truncateText(text, 800);

    const aiProvider = new AIProvider();
    
    const response = await aiProvider.generateCompletion([
      {
        role: 'system',
        content: `Kamu adalah asisten pembelajaran AI yang ahli dalam membuat kuis.
Tugas kamu adalah membuat ${count} soal pilihan ganda (multiple choice) dari materi yang diberikan.

Setiap soal harus memiliki:
- question: Pertanyaan yang jelas
- options: Array 4 pilihan jawaban (A, B, C, D)
- correctAnswer: Index jawaban yang benar (0-3)
- explanation: Penjelasan singkat mengapa jawaban tersebut benar

PENTING: Response kamu HARUS dalam format JSON array yang valid seperti ini:
[
  {
    "question": "Apa yang dimaksud dengan...?",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctAnswer": 0,
    "explanation": "Jawaban A benar karena..."
  },
  {
    "question": "Manakah pernyataan yang benar?",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "correctAnswer": 2,
    "explanation": "Jawaban C benar karena..."
  }
]

Jangan tambahkan text apapun di luar JSON array. Hanya output JSON array saja.`,
      },
      {
        role: 'user',
        content: `Buatkan ${count} soal kuis pilihan ganda dari materi berikut:\n\n${processedText}`,
      },
    ], 0.7);

    // Parse JSON response
    let quiz;
    try {
      // Remove markdown code blocks if present
      let content = response.content.trim();
      if (content.startsWith('```')) {
        content = content.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
      }
      quiz = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse quiz JSON:', response.content);
      throw new Error('AI response is not in valid JSON format');
    }

    if (!Array.isArray(quiz)) {
      throw new Error('Quiz must be an array');
    }

    return NextResponse.json({
      quiz,
      provider: response.provider,
      model: response.model,
    });
  } catch (error: any) {
    console.error('Error generating quiz:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate quiz' },
      { status: 500 }
    );
  }
}
