# 📚 Panduan Setup Lengkap

Panduan step-by-step untuk setup aplikasi Pelajarin.ai Clone

## 📋 Prerequisite

Sebelum mulai, pastikan sudah install:

1. **Node.js versi 18 atau lebih baru**
   - Download: https://nodejs.org
   - Cek versi: `node --version`
   
2. **npm (biasanya sudah include dengan Node.js)**
   - Cek versi: `npm --version`

3. **Text editor** (recommended: VS Code)

## 🎯 Step 1: Download/Clone Project

### Option A: Download ZIP
1. Download project sebagai ZIP
2. Extract ke folder pilihan Anda
3. Buka folder di terminal/command prompt

### Option B: Git Clone
```bash
git clone <repository-url>
cd pelajarin-ai-clone
```

## 📦 Step 2: Install Dependencies

Buka terminal di folder project, lalu jalankan:

```bash
npm install
```

Tunggu sampai selesai (biasanya 1-3 menit tergantung koneksi internet).

## 🔑 Step 3: Dapatkan API Key (Gratis!)

### Menggunakan Groq (RECOMMENDED - Gratis & Cepat)

#### 1. Buka browser, pergi ke: https://console.groq.com

#### 2. Klik "Sign Up" atau "Get Started"
   - Bisa login dengan Google/GitHub
   - Atau daftar dengan email

#### 3. Setelah login, cari menu "API Keys"
   - Biasanya di sidebar kiri
   - Atau di menu Settings

#### 4. Klik "Create API Key"
   - Beri nama (contoh: "Pelajarin Clone")
   - Klik Create

#### 5. **PENTING:** Copy API key yang muncul
   - Akan terlihat seperti: `gsk_xxxxxxxxxxxxxxxxxxxx`
   - Save di tempat aman, karena hanya muncul sekali!

## ⚙️ Step 4: Konfigurasi Environment Variables

### 1. Buat file `.env.local`

Di root folder project (sejajar dengan `package.json`), buat file baru bernama **`.env.local`**

**Cara membuat:**
- **Windows:** Right-click → New → Text Document → Rename jadi `.env.local`
- **Mac/Linux:** `touch .env.local` di terminal
- **VS Code:** New File → Save as `.env.local`

### 2. Isi file `.env.local`

Copy paste ini ke dalam file:

```env
# AI Provider Configuration
AI_PROVIDER=groq

# Groq API Key (GRATIS!)
GROQ_API_KEY=paste_api_key_kamu_di_sini

# Uncomment jika ingin pakai OpenAI (berbayar)
# AI_PROVIDER=openai
# OPENAI_API_KEY=sk-your_openai_key

# Uncomment jika ingin pakai Gemini (gratis dengan limit)
# AI_PROVIDER=gemini
# GEMINI_API_KEY=your_gemini_key
```

### 3. Replace API key

Ganti `paste_api_key_kamu_di_sini` dengan API key Groq yang tadi kamu copy.

**Contoh hasil akhir:**
```env
AI_PROVIDER=groq
GROQ_API_KEY=gsk_abc123def456xyz789
```

### 4. Save file

**PENTING:** 
- File harus bernama **`.env.local`** (ada titik di depan!)
- Tidak boleh ada spasi di nama file
- Save di root folder project

## 🚀 Step 5: Jalankan Aplikasi

Di terminal, jalankan:

```bash
npm run dev
```

Tunggu beberapa detik sampai muncul:

```
✓ Ready in 2.3s
○ Local:   http://localhost:3000
```

## 🌐 Step 6: Buka di Browser

1. Buka browser (Chrome, Firefox, Safari, dll)
2. Pergi ke: **http://localhost:3000**
3. Seharusnya aplikasi sudah muncul! 🎉

## ✅ Step 7: Testing

### Test 1: Upload File
1. Buat file text sederhana (contoh: `test.txt`)
2. Isi dengan beberapa paragraf text
3. Upload di aplikasi
4. Jika berhasil, text akan ter-extract

### Test 2: Generate Ringkasan
1. Setelah upload file
2. Klik "Buat Ringkasan"
3. Tunggu beberapa detik
4. Jika berhasil, ringkasan akan muncul

### Test 3: Generate Flashcard
1. Klik "Buat Flashcard"
2. Tunggu beberapa detik
3. Flashcard interaktif akan muncul

### Test 4: Generate Kuis
1. Klik "Buat Kuis"
2. Jawab beberapa soal
3. Lihat hasil scoring

## 🔧 Troubleshooting

### ❌ Error: "Cannot find module"
**Solusi:** Jalankan lagi `npm install`

### ❌ Error: "Port 3000 already in use"
**Solusi 1:** Matikan aplikasi lain yang pakai port 3000
**Solusi 2:** Jalankan di port lain:
```bash
PORT=3001 npm run dev
```

### ❌ Error: "API key not found"
**Penyebab:** File `.env.local` tidak ditemukan atau salah format
**Solusi:**
1. Pastikan file bernama **`.env.local`** (ada titik di depan!)
2. Pastikan file ada di root folder (sejajar dengan `package.json`)
3. Pastikan sudah isi API key dengan benar
4. Restart server (`Ctrl+C` lalu `npm run dev` lagi)

### ❌ Error: "Failed to generate summary"
**Penyebab:** API key salah atau expired
**Solusi:**
1. Cek API key di Groq console apakah masih aktif
2. Buat API key baru jika perlu
3. Update di `.env.local`
4. Restart server

### ❌ Error: "Failed to extract text from PDF"
**Penyebab:** File PDF mungkin corrupt atau protected
**Solusi:**
1. Coba PDF lain
2. Atau convert PDF ke format lain (txt, docx)

### 📱 Aplikasi lambat / freeze
**Solusi:**
1. Check koneksi internet
2. File terlalu besar? Coba file lebih kecil dulu
3. Close tab browser lain yang berat
4. Restart browser

## 💡 Tips & Tricks

### 1. Menggunakan File Example
Untuk testing cepat, buat file `test.txt` dengan content:

```
Fotosintesis adalah proses pembentukan makanan oleh tumbuhan hijau. 
Proses ini memerlukan cahaya matahari, air, dan karbon dioksida. 
Hasil dari fotosintesis adalah glukosa dan oksigen.

Klorofil adalah pigmen hijau yang berperan penting dalam fotosintesis.
Proses fotosintesis terjadi di dalam kloroplas yang ada di daun.
```

### 2. Optimal File Size
- **Text:** 100 - 5000 kata
- **PDF:** Maksimal 50 halaman
- **Images:** Maksimal 5MB

### 3. Best Results
- Materi dengan struktur jelas
- Bahasa Indonesia atau Inggris
- Hindari text yang terlalu singkat (<50 kata)

### 4. Shortcut Keyboard
- **Upload baru:** Klik tombol "Upload Baru"
- **History:** Klik "Riwayat"
- **Refresh page:** `Ctrl+R` / `Cmd+R`

## 🔐 Keamanan

- ✅ API key hanya ada di komputer Anda
- ✅ Tidak dikirim ke server manapun (kecuali Groq API)
- ✅ Data tidak disimpan di cloud
- ✅ File `.env.local` otomatis di-ignore oleh Git

## 📞 Butuh Bantuan?

Jika masih ada masalah:

1. **Cek dokumentasi utama:** Baca `README.md`
2. **Cek error message:** Screenshot dan search di Google
3. **Restart everything:**
   ```bash
   # Stop server (Ctrl+C)
   # Clear cache
   rm -rf .next
   # Reinstall
   npm install
   # Start fresh
   npm run dev
   ```

## 🎓 Next Steps

Setelah setup berhasil:

1. ✅ Explore semua fitur
2. ✅ Upload materi belajar asli
3. ✅ Generate konten AI
4. ✅ Save riwayat pembelajaran
5. ✅ Sesuaikan jumlah flashcard/quiz
6. ✅ Compare dengan Pelajarin.ai berbayar 😉

---

**Selamat belajar! 🚀**

Jika panduan ini membantu, jangan lupa star project-nya! ⭐
