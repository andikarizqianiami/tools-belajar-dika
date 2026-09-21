import { NextRequest, NextResponse } from 'next/server';
import { AIProvider } from '@/lib/ai-provider';
import { rateLimiter, truncateText } from '@/lib/rate-limiter';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text content is required' },
        { status: 400 }
      );
    }

    // Wait if needed to avoid rate limit
    await rateLimiter.waitIfNeeded();

    // Truncate text jika terlalu panjang
    const processedText = truncateText(text, 1000); // Summary bisa lebih panjang

    const aiProvider = new AIProvider();
    
    const response = await aiProvider.generateCompletion([
      {
        role: 'system',
        content: `Kamu adalah asisten pembelajaran AI yang ahli dalam merangkum materi.
Tugas kamu adalah membuat ringkasan yang:
- Jelas dan mudah dipahami
- Mencakup poin-poin penting
- Terstruktur dengan baik
- Menggunakan Bahasa Indonesia yang baik
- Maksimal 500 kata

Format ringkasan dalam bentuk:
## Ringkasan Utama
[ringkasan singkat]

## Poin-Poin Penting
- Poin 1
- Poin 2
- dst.

## Kesimpulan
[kesimpulan singkat]`,
      },
      {
        role: 'user',
        content: `Buatkan ringkasan dari materi berikut:\n\n${processedText}`,
      },
    ], 0.5);

    return NextResponse.json({
      summary: response.content,
      provider: response.provider,
      model: response.model,
    });
  } catch (error: any) {
    console.error('Error generating summary:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate summary' },
      { status: 500 }
    );
  }
}
