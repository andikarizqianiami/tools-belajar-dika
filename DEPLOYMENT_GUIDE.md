# 🚀 Panduan Deploy Tools Belajar Dika ke Vercel

## 📋 Langkah-Langkah Deploy:

### 1️⃣ Buat Akun Vercel (Gratis!)
1. Buka: https://vercel.com/signup
2. Sign up dengan **GitHub account** (PENTING!)
3. Verifikasi email

### 2️⃣ Push Code ke GitHub
```bash
# 1. Buat repository baru di GitHub
# Buka: https://github.com/new
# Nama: tools-belajar-dika
# Set: Public
# Jangan centang "Add README"

# 2. Push code (jalankan di terminal):
cd /Users/otr1/Documents/pelajarin-ai-clone
git remote add origin https://github.com/USERNAME/tools-belajar-dika.git
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy ke Vercel

#### Opsi A: Via Website (TERMUDAH!)
1. Login ke https://vercel.com
2. Klik **"Add New Project"**
3. **Import** repository "tools-belajar-dika"
4. Klik **"Deploy"**
5. Tunggu 2-3 menit
6. **DONE!** Dapat link seperti: `tools-belajar-dika.vercel.app`

#### Opsi B: Via CLI
```bash
# Login dulu
vercel login

# Deploy
vercel

# Ikuti instruksi:
# - Link to existing project? No
# - Project name? tools-belajar-dika
# - Directory? ./
# - Override settings? No

# Deploy production
vercel --prod
```

### 4️⃣ Setup Environment Variables di Vercel

**PENTING! Tambahkan API Key:**

1. Buka project di Vercel Dashboard
2. Go to: **Settings** → **Environment Variables**
3. Tambahkan:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `<Your Groq API Key Here>` (gunakan API key dari `.env.local` Anda)
   - **Environment:** Production, Preview, Development (centang semua)
4. Klik **"Save"**
5. **Redeploy** project (klik "Redeploy" di Deployments tab)

### 5️⃣ Test Production

Buka URL production Anda: `https://tools-belajar-dika.vercel.app`

**Test checklist:**
- ✅ Upload file PDF/DOCX/PPTX
- ✅ Generate Summary
- ✅ Generate Flashcards
- ✅ Generate Quiz
- ✅ Cek History

---

## 🎯 Custom Domain (Opsional)

Jika punya domain sendiri (misal: `belajardika.com`):

1. Buka project settings → **Domains**
2. Klik **"Add"**
3. Masukkan domain: `belajardika.com`
4. Ikuti instruksi setup DNS di domain registrar Anda
5. Tunggu propagasi DNS (5-48 jam)

---

## 🔧 Troubleshooting

### Error: "API Key not found"
**Solusi:** Pastikan `GROQ_API_KEY` sudah diset di Environment Variables

### Error: "Rate limit exceeded"
**Solusi:** Normal, tunggu 1 menit lalu coba lagi. Atau upgrade Groq ke paid tier.

### Build Failed
**Solusi:** 
```bash
# Test build lokal dulu:
npm run build

# Jika ada error, perbaiki dulu sebelum deploy
```

### Deploy Success tapi Website Blank
**Solusi:** 
1. Cek Console di browser (F12)
2. Biasanya missing environment variable
3. Pastikan sudah redeploy setelah add env vars

---

## 💡 Tips Production:

1. **Monitoring:** Vercel dashboard otomatis tracking visits, errors, performance
2. **Analytics:** Enable Vercel Analytics (gratis) untuk data lebih detail
3. **Updates:** Setiap `git push` otomatis deploy ulang
4. **Rollback:** Bisa rollback ke deployment sebelumnya kapan saja
5. **Preview:** Setiap PR/branch otomatis dapat preview URL

---

## 📊 Free Tier Limits:

- ✅ **Bandwidth:** 100GB/bulan
- ✅ **Build Time:** 6000 menit/bulan
- ✅ **Deployments:** Unlimited
- ✅ **Team Members:** 1 (cukup untuk personal use)

**Cukup banget untuk personal/portfolio project!** 🎉

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deploy Guide: https://nextjs.org/docs/deployment
- Community: https://github.com/vercel/vercel/discussions

---

**Happy Deploying! 🚀**
