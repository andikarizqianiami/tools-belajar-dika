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

    // Truncate text jika terlalu panjang
    const processedText = truncateText(text, 800);

    const aiProvider = new AIProvider();
    
    const response = await aiProvider.generateCompletion([
      {
        role: 'system',
        content: `Kamu adalah asisten pembelajaran AI yang ahli dalam membuat flashcard.
Tugas kamu adalah membuat ${count} flashcard (kartu belajar) dari materi yang diberikan.

Setiap flashcard harus memiliki:
- Pertanyaan (front): Pertanyaan yang jelas dan spesifik
- Jawaban (back): Jawaban yang ringkas dan akurat

PENTING: Response kamu HARUS dalam format JSON array yang valid seperti ini:
[
  {
    "front": "Pertanyaan 1?",
    "back": "Jawaban 1"
  },
  {
    "front": "Pertanyaan 2?",
    "back": "Jawaban 2"
  }
]

Jangan tambahkan text apapun di luar JSON array. Hanya output JSON array saja.`,
      },
      {
        role: 'user',
        content: `Buatkan ${count} flashcard dari materi berikut:\n\n${processedText}`,
      },
    ], 0.7);

    // Parse JSON response
    let flashcards;
    try {
      // Remove markdown code blocks if present
      let content = response.content.trim();
      if (content.startsWith('```')) {
        content = content.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
      }
      flashcards = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse flashcards JSON:', response.content);
      throw new Error('AI response is not in valid JSON format');
    }

    if (!Array.isArray(flashcards)) {
      throw new Error('Flashcards must be an array');
    }

    return NextResponse.json({
      flashcards,
      provider: response.provider,
      model: response.model,
    });
  } catch (error: any) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate flashcards' },
      { status: 500 }
    );
  }
}
