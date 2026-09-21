'use client';

import { useState, useEffect } from 'react';
import { BookOpen, History, Trash2, Clock } from 'lucide-react';
import FileUploader from '@/components/FileUploader';
import SummaryGenerator from '@/components/SummaryGenerator';
import FlashcardGenerator from '@/components/FlashcardGenerator';
import QuizGenerator from '@/components/QuizGenerator';
import { StorageManager, LearningSession } from '@/lib/storage';

export default function Home() {
  const [currentText, setCurrentText] = useState('');
  const [currentFileName, setCurrentFileName] = useState('');
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [sessions, setSessions] = useState<LearningSession[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [storageSize, setStorageSize] = useState('0 KB');

  const storage = new StorageManager();

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = () => {
    const loadedSessions = storage.getSessions();
    setSessions(loadedSessions);
    setStorageSize(storage.getStorageSize());
  };

  const handleTextExtracted = (text: string, fileName: string) => {
    const sessionId = Date.now().toString();
    const session: LearningSession = {
      id: sessionId,
      fileName,
      text,
      createdAt: new Date().toISOString(),
    };

    storage.saveSession(session);
    setCurrentText(text);
    setCurrentFileName(fileName);
    setCurrentSessionId(sessionId);
    loadSessions();
  };

  const loadSession = (session: LearningSession) => {
    setCurrentText(session.text);
    setCurrentFileName(session.fileName);
    setCurrentSessionId(session.id);
    setShowHistory(false);
  };

  const deleteSession = (id: string) => {
    storage.deleteSession(id);
    if (id === currentSessionId) {
      setCurrentText('');
      setCurrentFileName('');
      setCurrentSessionId('');
    }
    loadSessions();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays < 7) return `${diffDays} hari lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Tools Belajar Dika
                </h1>
                <p className="text-sm text-gray-500">
                  AI Learning Assistant - Gratis Selamanya
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <History className="w-4 h-4" />
              Riwayat ({sessions.length})
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {showHistory ? (
          /* History View */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Riwayat Pembelajaran
              </h2>
              <div className="text-sm text-gray-500">
                Storage: {storageSize}
              </div>
            </div>

            {sessions.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Belum ada riwayat pembelajaran</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {session.fileName}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDate(session.createdAt)}
                          </span>
                          <span>
                            {session.text.split(/\s+/).length} kata
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadSession(session)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Buka
                        </button>
                        <button
                          onClick={() => deleteSession(session.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : currentText ? (
          /* Learning View */
          <div className="space-y-8">
            {/* Current File Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {currentFileName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {currentText.split(/\s+/).length} kata • {Math.ceil(currentText.length / 1000)} menit baca
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCurrentText('');
                    setCurrentFileName('');
                    setCurrentSessionId('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Upload Baru
                </button>
              </div>
            </div>

            {/* AI Features */}
            <div className="grid gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <SummaryGenerator text={currentText} />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <FlashcardGenerator text={currentText} />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <QuizGenerator text={currentText} />
              </div>
            </div>
          </div>
        ) : (
          /* Upload View */
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <div className="inline-block bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-2xl mb-4">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900">
                Belajar Lebih Cepat dengan AI
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Upload materi apapun, dapatkan ringkasan, flashcard, dan kuis dalam sekejap. 
                100% gratis dan berjalan di komputer kamu!
              </p>
            </div>

            {/* Upload Section */}
            <FileUploader onTextExtracted={handleTextExtracted} />

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Ringkasan Otomatis
                </h3>
                <p className="text-sm text-gray-600">
                  AI merangkum poin-poin penting dari materimu
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎴</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Flashcard Generator
                </h3>
                <p className="text-sm text-gray-600">
                  Buat kartu belajar interaktif dengan cepat
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Kuis Pintar
                </h3>
                <p className="text-sm text-gray-600">
                  Uji pemahamanmu dengan kuis otomatis
                </p>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-2">
                💡 Tips: Mendapatkan API Key Gratis
              </h4>
              <p className="text-sm text-blue-800 mb-3">
                Aplikasi ini menggunakan AI API. Rekomendasi kami: gunakan <strong>Groq</strong> (gratis & cepat!)
              </p>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Daftar di <a href="https://console.groq.com" target="_blank" rel="noopener" className="underline font-medium">console.groq.com</a></li>
                <li>Buat API key baru (gratis)</li>
                <li>Salin API key ke file <code className="bg-blue-100 px-1 rounded">.env.local</code></li>
                <li>Restart aplikasi</li>
              </ol>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-gray-600">
            <p>
              Tools Belajar Dika © 2024 • Made with ❤️ using Next.js, TypeScript, and AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
