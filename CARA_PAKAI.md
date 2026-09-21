# 🚀 Cara Pakai - Panduan Lengkap

Panduan step-by-step menggunakan aplikasi Pelajarin.ai Clone.

---

## 📋 Persiapan Awal

### 1. Pastikan Aplikasi Sudah Running
```bash
cd pelajarin-ai-clone
npm run dev
```

Buka browser: **http://localhost:3000**

### 2. Pastikan API Key Sudah Terpasang
File `.env.local` harus sudah berisi:
```env
AI_PROVIDER=groq
GROQ_API_KEY=your_api_key_here
```

---

## 📝 Cara Menggunakan Setiap Fitur

### 1. Upload Materi Pembelajaran

#### Langkah-langkah:
1. **Siapkan file materi**
   - PDF (contoh: buku pelajaran, modul)
   - Word (contoh: catatan kuliah)
   - Text (contoh: artikel)
   - Gambar (contoh: screenshot slide)

2. **Upload file**
   - **Cara 1:** Drag & drop file ke area upload
   - **Cara 2:** Klik area upload → pilih file

3. **Tunggu proses**
   - Text/Markdown: Instant
   - PDF/Word: 5-10 detik
   - Gambar (OCR): 10-30 detik

4. **Cek hasil**
   - Nama file akan muncul di atas
   - Jumlah kata ditampilkan
   - Estimasi waktu baca

---

### 2. Generate Ringkasan

#### Langkah-langkah:
1. Setelah upload berhasil, scroll ke section **"Ringkasan Otomatis"**

2. Klik tombol **"Buat Ringkasan"**

3. Tunggu 5-15 detik (AI sedang bekerja)

4. Ringkasan akan muncul dengan format:
   ```
   ## Ringkasan Utama
   [ringkasan singkat]

   ## Poin-Poin Penting
   - Poin 1
   - Poin 2
   - dst.

   ## Kesimpulan
   [kesimpulan singkat]
   ```

5. **Opsi tambahan:**
   - Klik **icon Copy** untuk salin ke clipboard
   - Klik **🔄 Regenerate** jika hasil kurang memuaskan

#### Tips:
- Ringkasan terbaik dari materi 200-3000 kata
- Jika materi terlalu panjang, bagi jadi beberapa bagian
- Hasil bisa langsung di-paste ke catatan

---

### 3. Generate Flashcard

#### Langkah-langkah:
1. Scroll ke section **"Flashcard Generator"**

2. **Pilih jumlah kartu** (default: 10)
   - Input number: 5-20 kartu
   - Semakin banyak, semakin lama generate

3. Klik tombol **"Buat Flashcard"**

4. Tunggu 10-20 detik (tergantung jumlah kartu)

5. **Gunakan flashcard:**
   - **Klik kartu** untuk flip (lihat jawaban)
   - **Klik lagi** untuk balik ke pertanyaan
   - **Tombol "Selanjutnya"** untuk kartu berikutnya
   - **Tombol "Sebelumnya"** untuk kartu sebelumnya
   - Progress indicator menunjukkan posisi (contoh: "Kartu 3 dari 10")

6. **Review & regenerate:**
   - Klik **🔄 Regenerate** untuk buat set baru
   - Set baru akan berbeda dari sebelumnya

#### Tips Belajar dengan Flashcard:
1. **First Pass:** Baca semua kartu sekali
2. **Practice:** Coba jawab sebelum flip
3. **Mark:** Ingat kartu yang sulit
4. **Repeat:** Review kartu sulit berkali-kali
5. **Spaced Repetition:** Review besok, minggu depan, bulan depan

---

### 4. Generate & Kerjakan Kuis

#### Langkah-langkah Generate:
1. Scroll ke section **"Kuis Generator"**

2. **Pilih jumlah soal** (default: 10)
   - Input number: 5-20 soal
   - Recommended: 10 soal untuk 1 sesi

3. Klik tombol **"Buat Kuis"**

4. Tunggu 10-25 detik (tergantung jumlah soal)

#### Mengerjakan Kuis:
1. **Baca soal dengan teliti**

2. **Pilih jawaban:**
   - Klik salah satu dari 4 pilihan (A, B, C, D)
   - Pilihan yang dipilih akan highlight biru

3. **Navigate:**
   - **Tombol "Selanjutnya"** → Lanjut ke soal berikutnya
   - **Tombol "Sebelumnya"** → Kembali ke soal sebelumnya
   - Bisa ganti jawaban sebelum submit

4. **Progress tracking:**
   - Dot indicators di atas:
     - 🟢 Hijau = Sudah dijawab
     - 🔵 Biru = Soal sekarang
     - ⚪ Abu-abu = Belum dijawab

5. **Submit:**
   - Soal terakhir → Tombol berubah jadi **"Selesai"**
   - Klik "Selesai" untuk lihat hasil

#### Melihat Hasil:
1. **Skor ditampilkan:**
   - Percentage: 0-100%
   - Skor: X dari Y benar
   - Pesan motivasi

2. **Review jawaban:**
   - ✅ **Hijau** = Jawaban benar
   - ❌ **Merah** = Jawaban salah
   - Untuk yang salah, ditampilkan:
     - Jawaban kamu
     - Jawaban yang benar
     - Penjelasan

3. **Opsi setelah selesai:**
   - **"Coba Lagi"** → Ulang quiz yang sama
   - **"Kuis Baru"** → Generate soal baru

#### Tips Mengerjakan Kuis:
- Baca soal sampai selesai sebelum memilih
- Jangan terburu-buru
- Review jawaban sebelum submit
- Jika skor rendah, baca materi lagi → retry
- Baca penjelasan untuk setiap soal (belajar dari kesalahan)

---

### 5. Kelola Riwayat (History)

#### Membuka History:
1. Klik tombol **"Riwayat (X)"** di header kanan atas
2. Lihat semua sesi pembelajaran sebelumnya

#### Informasi yang Ditampilkan:
- Nama file
- Waktu upload (contoh: "2 jam lalu", "3 hari lalu")
- Jumlah kata
- Storage yang digunakan

#### Aksi yang Bisa Dilakukan:
1. **Buka Session:**
   - Klik tombol **"Buka"**
   - Session akan ter-load dengan materi lengkap
   - Bisa langsung generate summary/flashcard/quiz

2. **Hapus Session:**
   - Klik **icon trash** (🗑️)
   - Session akan dihapus permanent
   - Tidak bisa di-undo!

3. **Kembali ke Upload:**
   - Klik tombol "Riwayat" lagi untuk tutup
   - Atau load session untuk kembali ke learning view

#### Tips History Management:
- Hapus session lama yang tidak diperlukan
- Keep storage di bawah 5MB untuk performa optimal
- Export materi penting sebelum clear browser data

---

## 🎯 Workflow Rekomendasi

### Untuk Belajar Materi Baru:
```
1. Upload materi
2. Baca ringkasan dulu (overview)
3. Baca materi asli sambil pahami
4. Generate flashcard (untuk hafalan)
5. Practice flashcard berkali-kali
6. Generate quiz (tes pemahaman)
7. Review hasil quiz
8. Ulangi untuk topik berikutnya
```

### Untuk Persiapan Ujian:
```
1. Load session materi yang sudah ada
2. Review ringkasan (refresh memory)
3. Practice flashcard (hafalan istilah)
4. Kerjakan quiz (tes pemahaman)
5. Focus pada yang salah
6. Generate quiz baru (practice lebih banyak)
7. Repeat until 80%+ score
```

### Untuk Review Cepat:
```
1. Load session
2. Baca ringkasan (5 menit)
3. Quick review flashcard (10 menit)
4. Done!
```

---

## 🐛 Troubleshooting Umum

### "Failed to generate summary/flashcard/quiz"
**Penyebab:**
- API key salah/expired
- Koneksi internet terputus
- Materi terlalu pendek (<50 kata)

**Solusi:**
1. Check koneksi internet
2. Verify API key di `.env.local`
3. Restart server
4. Coba dengan materi yang lebih panjang

---

### "No text extracted from file"
**Penyebab:**
- File corrupt
- PDF protected/encrypted
- Gambar terlalu blur untuk OCR

**Solusi:**
1. Coba file lain
2. Convert PDF ke format lain
3. Untuk gambar: gunakan image dengan text jelas
4. Check file size (max 10MB)

---

### Flashcard/Quiz tidak keluar
**Penyebab:**
- Materi terlalu pendek
- AI tidak bisa generate soal dari materi

**Solusi:**
1. Pastikan materi minimal 100 kata
2. Materi harus punya konten substantif (bukan header/footer saja)
3. Coba kurangi jumlah kartu/soal
4. Regenerate beberapa kali

---

### Loading sangat lama
**Penyebab:**
- File terlalu besar
- Koneksi lambat
- API provider sedang sibuk

**Solusi:**
1. Gunakan file lebih kecil
2. Check speed internet
3. Coba lagi beberapa saat kemudian
4. Ganti AI provider (Groq paling cepat)

---

## 💡 Tips & Tricks

### Maksimalkan Hasil AI:
1. **Materi berkualitas** = Hasil berkualitas
2. **Struktur jelas** = Ringkasan lebih baik
3. **Length optimal:** 300-2000 kata per upload
4. **Bahasa konsisten:** Indonesia atau English, jangan campur

### Efisiensi Belajar:
1. **Review berkala** (spaced repetition)
2. **Focus on weak points** (soal yang sering salah)
3. **Active recall** (jawab dulu baru lihat jawaban)
4. **Mix methods** (baca → flashcard → quiz)

### Workflow Tips:
1. **Batch processing:** Upload beberapa materi sekaligus
2. **Tag files:** Beri nama file yang jelas
3. **Regular cleanup:** Hapus session lama
4. **Export results:** Copy ringkasan ke notes app

---

## 🎓 Best Practices

### Untuk Pelajar:
- Upload materi per bab/topik
- Generate 10-15 flashcard per topik
- Kerjakan quiz 2-3x sampai 80%+
- Review seminggu sebelum ujian

### Untuk Mahasiswa:
- Upload slide kuliah setelah kelas
- Buat ringkasan untuk setiap pertemuan
- Generate flashcard untuk istilah-istilah penting
- Practice quiz sebelum UTS/UAS

### Untuk Self-Learner:
- Upload artikel/tutorial yang mau dipelajari
- Buat flashcard untuk konsep-konsep baru
- Quiz untuk validasi pemahaman
- Track progress dengan history

---

**Selamat Belajar! 🚀**

Jika ada pertanyaan atau butuh bantuan, check dokumentasi lainnya:
- `README.md` - Overview lengkap
- `SETUP.md` - Setup dari awal
- `FEATURES.md` - Dokumentasi fitur detail
- `QUICKSTART.md` - Setup super cepat
