'use client';

import { useState } from 'react';
import { FileText, Sparkles, Loader2, Copy, Check } from 'lucide-react';

interface SummaryGeneratorProps {
  text: string;
}

export default function SummaryGenerator({ text }: SummaryGeneratorProps) {
  const [summary, setSummary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal membuat ringkasan');
      }

      const data = await response.json();
      setSummary(data.summary);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
      console.error('Summary generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Ringkasan Otomatis
          </h3>
        </div>
        {!summary && (
          <button
            onClick={generateSummary}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Membuat...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Buat Ringkasan
              </>
            )}
          </button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {summary && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              ✓ Ringkasan Siap
            </span>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Tersalin!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Salin
                </>
              )}
            </button>
          </div>
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-900 whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: summary
                  .replace(/## (.*)/g, '<h3 class="font-semibold text-lg mt-4 mb-2 text-gray-900">$1</h3>')
                  .replace(/- (.*)/g, '<li class="text-gray-800">$1</li>')
                  .replace(/\n\n/g, '<br/><br/>'),
              }}
            />
          </div>
          <button
            onClick={generateSummary}
            className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            🔄 Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
