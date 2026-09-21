// Rate limiter untuk menghindari API rate limit
// Otomatis delay antara request ke AI provider

class RateLimiter {
  private lastRequestTime: number = 0;
  private minDelayMs: number = 5000; // 5 detik antara request (lebih aman)

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minDelayMs) {
      const waitTime = this.minDelayMs - timeSinceLastRequest;
      console.log(`⏳ Rate limiter: Waiting ${Math.ceil(waitTime/1000)}s to avoid rate limit...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  setDelay(delayMs: number): void {
    this.minDelayMs = delayMs;
  }
}

// Helper function to truncate text if too long
export function truncateText(text: string, maxWords: number = 800): string {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) {
    return text;
  }
  console.log(`⚠️  Text truncated from ${words.length} to ${maxWords} words to avoid rate limit`);
  return words.slice(0, maxWords).join(' ') + '\n\n[... materi dipotong untuk menghindari rate limit. Upload file lebih kecil untuk hasil lengkap.]';
}

// Export singleton instance
export const rateLimiter = new RateLimiter();
