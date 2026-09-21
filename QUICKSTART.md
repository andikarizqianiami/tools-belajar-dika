# ⚡ Quick Start - Mulai dalam 5 Menit!

Cara tercepat untuk menjalankan aplikasi ini.

## 🚀 4 Langkah Simple

### 1️⃣ Install Dependencies (2 menit)

```bash
npm install
```

### 2️⃣ Dapatkan API Key Gratis (1 menit)

1. Buka: https://console.groq.com
2. Sign up (pakai Google/GitHub)
3. Create API Key
4. Copy key-nya

### 3️⃣ Setup Config (30 detik)

Buat file `.env.local` dengan isi:

```env
AI_PROVIDER=groq
GROQ_API_KEY=paste_key_kamu_disini
```

### 4️⃣ Run! (30 detik)

```bash
npm run dev
```

Buka: **http://localhost:3000**

## ✅ Selesai!

Upload file → Generate konten AI → Enjoy! 🎉

---

## 📖 Dokumentasi Lengkap

- **Setup detail:** Baca `SETUP.md`
- **Dokumentasi lengkap:** Baca `README.md`

## 🐛 Ada Masalah?

**Error: API key not found**
- Pastikan file `.env.local` ada di root folder
- Restart server: `Ctrl+C` → `npm run dev`

**Error: Port in use**
```bash
PORT=3001 npm run dev
```

**Error: Module not found**
```bash
npm install
```

---

**That's it! Happy learning! 🎓**
