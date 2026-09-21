# 🎓 Pelajarin.ai Clone - Tools Pembelajaran AI Gratis

Aplikasi pembelajaran berbasis AI yang **100% gratis selamanya** dan berjalan di komputer Anda sendiri. Mirip dengan Pelajarin.ai tapi tidak perlu berlangganan!

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Fitur Utama

### 📝 Ringkasan Otomatis
- Upload materi dalam berbagai format
- AI menghasilkan ringkasan terstruktur
- Mencakup poin-poin penting
- Format yang mudah dipahami

### 🎴 Flashcard Generator
- Buat kartu belajar otomatis dari materi
- Interactive flip cards
- Navigasi mudah antar kartu
- Jumlah kartu bisa disesuaikan (5-20)

### 🧠 Kuis Pintar
- Generate kuis pilihan ganda otomatis
- Scoring dan review jawaban
- Penjelasan untuk setiap soal
- Track progress dengan visual indicator

### 📁 File Processing
Support berbagai format file:
- **PDF** (.pdf)
- **Word** (.doc, .docx)
- **PowerPoint** (.ppt, .pptx) ✨ NEW!
- **Text** (.txt, .md)
- **Gambar** (.jpg, .png, .webp) - dengan OCR

### 💾 Local Storage
- Simpan riwayat pembelajaran
- Load sesi sebelumnya
- Semua data tersimpan di browser Anda
- Maksimal 50 sesi terakhir

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ dan npm
- API key dari salah satu provider AI (lihat bagian Setup API Key)

### Instalasi

1. **Clone atau download project ini**

2. **Install dependencies**
```bash
npm install
```

3. **Setup API Key** (lihat bagian Setup API Key di bawah)

4. **Jalankan development server**
```bash
npm run dev
```

5. **Buka browser**
```
http://localhost:3000
```

## 🔑 Setup API Key

Aplikasi ini membutuhkan API key dari AI provider. **Rekomendasi: Gunakan Groq (gratis & cepat!)**

### Option 1: Groq (RECOMMENDED - Gratis!)

1. Daftar di [https://console.groq.com](https://console.groq.com)
2. Buat API key baru (gratis, tanpa kartu kredit)
3. Copy API key
4. Buka file `.env.local` di root project
5. Isi dengan:
```env
AI_PROVIDER=groq
GROQ_API_KEY=gsk_your_api_key_here
```

**Keuntungan Groq:**
- ✅ Gratis
- ✅ Sangat cepat
- ✅ Model Llama 3.1 70B yang powerful
- ✅ Tidak perlu kartu kredit

### Option 2: OpenAI (GPT)

1. Daftar di [https://platform.openai.com](https://platform.openai.com)
2. Beli credit (mulai dari $5)
3. Buat API key
4. Edit `.env.local`:
```env
AI_PROVIDER=openai
OPENAI_API_KEY=sk-your_api_key_here
```

### Option 3: Google Gemini

1. Daftar di [https://ai.google.dev](https://ai.google.dev)
2. Buat API key (gratis untuk quota tertentu)
3. Edit `.env.local`:
```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
```

## 📖 Cara Menggunakan

### 1. Upload Materi

- Klik area upload atau drag & drop file
- Support: PDF, Word, Text, atau Gambar
- File akan diproses otomatis

### 2. Generate Konten AI

Setelah upload, Anda bisa:

**Ringkasan:**
- Klik "Buat Ringkasan"
- Tunggu beberapa detik
- Salin atau regenerate jika perlu

**Flashcard:**
- Pilih jumlah kartu (5-20)
- Klik "Buat Flashcard"
- Klik kartu untuk flip
- Navigate dengan tombol next/previous

**Kuis:**
- Pilih jumlah soal (5-20)
- Klik "Buat Kuis"
- Jawab semua soal
- Lihat hasil dan review

### 3. Kelola Riwayat

- Klik "Riwayat" di header
- Load sesi lama
- Hapus sesi yang tidak diperlukan

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **AI Integration:** 
  - OpenAI SDK (compatible dengan Groq)
  - Multi-provider support
- **File Processing:**
  - pdf-parse (PDF)
  - mammoth (Word)
  - pptx-parser (PowerPoint) ✨ NEW!
  - tesseract.js (OCR untuk gambar)

## 📁 Struktur Project

```
pelajarin-ai-clone/
├── app/
│   ├── api/                    # API routes
│   │   ├── extract-text/       # File text extraction
│   │   ├── generate-summary/   # AI summary
│   │   ├── generate-flashcards/# AI flashcards
│   │   └── generate-quiz/      # AI quiz
│   ├── page.tsx                # Main page
│   └── layout.tsx              # Root layout
├── components/
│   ├── FileUploader.tsx        # Upload component
│   ├── SummaryGenerator.tsx    # Summary feature
│   ├── FlashcardGenerator.tsx  # Flashcard feature
│   └── QuizGenerator.tsx       # Quiz feature
├── lib/
│   ├── ai-provider.ts          # AI abstraction layer
│   ├── file-processor.ts       # File processing
│   └── storage.ts              # Local storage manager
└── .env.local                  # Configuration (gitignored)
```

## 🎨 Fitur UI/UX

- ✨ Modern gradient design
- 📱 Fully responsive (mobile & desktop)
- 🎭 Smooth transitions dan animations
- 🌓 Clean dan minimalist
- ♿ Accessible components

## 🔒 Privacy & Security

- ✅ Semua data tersimpan di browser Anda (localStorage)
- ✅ Tidak ada server untuk menyimpan data
- ✅ API key hanya ada di komputer Anda
- ✅ 100% private dan secure

## 🚢 Deployment

### Option 1: Vercel (Recommended)

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables (API keys)
4. Deploy!

### Option 2: Docker

```bash
# Build image
docker build -t pelajarin-ai-clone .

# Run container
docker run -p 3000:3000 \
  -e AI_PROVIDER=groq \
  -e GROQ_API_KEY=your_key \
  pelajarin-ai-clone
```

### Option 3: Self-hosted

```bash
# Build production
npm run build

# Start production server
npm start
```

## 🎯 Roadmap

- [ ] Export hasil ke PDF
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Audio transcription
- [ ] Collaborative learning
- [ ] Spaced repetition system
- [ ] Mobile app (React Native)

## 🐛 Troubleshooting

### Error: "API key not found"
- Pastikan file `.env.local` sudah dibuat
- Restart development server setelah menambah env variables

### Error: "Failed to extract text"
- File mungkin corrupt atau format tidak supported
- Coba convert file ke format lain

### Error: "AI response not valid"
- Coba regenerate
- Pastikan koneksi internet stabil
- Check API key masih valid

### Flashcard/Quiz tidak muncul
- Pastikan materi cukup panjang (minimal 100 kata)
- Coba dengan jumlah yang lebih sedikit

## 📝 License

MIT License - Bebas digunakan untuk personal maupun komersial

## 🙏 Credits

- Inspired by [Pelajarin.ai](https://pelajarin.ai)
- Built with [Next.js](https://nextjs.org)
- AI powered by [Groq](https://groq.com), OpenAI, or Gemini

## 💬 Support

Jika ada pertanyaan atau issue:
1. Check dokumentasi ini dulu
2. Check section Troubleshooting
3. Open issue di GitHub repository

---

**Made with ❤️ for students everywhere**

Semoga tools ini membantu belajar kamu lebih efektif! 🚀
