# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2024-12-20

### ✨ New Features
- **PowerPoint Support (.ppt, .pptx)**: Upload dan extract text dari file PowerPoint
  - Extract text dari semua slides
  - Support title, content, dan notes
  - Integration dengan AI features (summary, flashcard, quiz)

### 📦 Dependencies
- Added `pptx-parser` for PowerPoint processing

---

## [1.0.0] - 2024-12-20

### 🎉 Initial Release

#### Features
- ✨ AI-powered summary generation
- ✨ Interactive flashcard generator
- ✨ Smart quiz generator with scoring
- ✨ Multi-format file support (PDF, DOCX, TXT, Images)
- ✨ OCR support for images (Indonesian language)
- ✨ Local storage for learning history
- ✨ Multi-AI provider support (Groq, OpenAI, Gemini)
- ✨ Responsive design for mobile and desktop
- ✨ History management (save, load, delete sessions)

#### Tech Stack
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- Lucide React Icons
- pdf-parse for PDF processing
- mammoth for Word processing
- tesseract.js for OCR
- OpenAI SDK (compatible with Groq)

#### Components
- FileUploader: Drag & drop file upload
- SummaryGenerator: AI-powered summaries
- FlashcardGenerator: Interactive flip cards
- QuizGenerator: Multiple choice quiz with review
- StorageManager: Local storage management

#### API Routes
- /api/extract-text: File text extraction
- /api/generate-summary: AI summary generation
- /api/generate-flashcards: AI flashcard generation
- /api/generate-quiz: AI quiz generation

#### Documentation
- Complete README with setup guide
- Detailed SETUP.md for beginners
- QUICKSTART.md for fast setup
- API key setup instructions
- Troubleshooting guide

### 🔒 Security
- API keys stored locally only
- No cloud data storage
- Privacy-focused design
- .gitignore for sensitive files

### 📝 Notes
- Default AI provider: Groq (free)
- Supports up to 50 learning sessions in history
- Maximum file size: 10MB
- Recommended material length: 100-5000 words

---

## Future Roadmap

### Planned Features
- [ ] Export results to PDF
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Audio transcription
- [ ] Collaborative learning features
- [ ] Spaced repetition system
- [ ] Progress tracking and analytics
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Custom AI prompts

### Improvements
- [ ] Better error handling
- [ ] Loading states optimization
- [ ] Performance improvements
- [ ] Better mobile UX
- [ ] Accessibility improvements
- [ ] More file format support
- [ ] Bulk file processing
- [ ] Export/import learning data

---

**Version Format:** [Major.Minor.Patch]
- **Major:** Breaking changes
- **Minor:** New features (backwards compatible)
- **Patch:** Bug fixes
