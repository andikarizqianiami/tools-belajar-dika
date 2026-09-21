# 🚀 Deploy Dalam 5 Menit!

## Langkah 1: Buat Akun GitHub (Jika Belum Punya)
1. Buka: https://github.com/signup
2. Isi username, email, password
3. Verifikasi email

## Langkah 2: Buat Repository Baru
1. Buka: https://github.com/new
2. **Repository name:** `tools-belajar-dika`
3. Set **Public**
4. **JANGAN** centang "Add README"
5. Klik **"Create repository"**

## Langkah 3: Push Code (Copy-Paste Saja!)

Buka **Terminal** dan jalankan:

```bash
cd /Users/otr1/Documents/pelajarin-ai-clone

# Ganti USERNAME dengan username GitHub kamu!
git remote add origin https://github.com/USERNAME/tools-belajar-dika.git

git push -u origin main
```

## Langkah 4: Deploy ke Vercel

### 4a. Buat Akun Vercel
1. Buka: https://vercel.com/signup
2. Klik **"Continue with GitHub"**
3. Login dengan GitHub account kamu
4. Authorize Vercel

### 4b. Import Project
1. Di Vercel Dashboard, klik **"Add New..."** → **"Project"**
2. Cari repository **"tools-belajar-dika"**
3. Klik **"Import"**

### 4c. Configure Project
1. **Framework Preset:** Next.js (otomatis detect)
2. **Root Directory:** `./`
3. Klik **"Deploy"**
4. ⏳ Tunggu 2-3 menit...

## Langkah 5: Setup API Key (PENTING!)

Setelah deploy selesai:

1. Buka **Settings** tab (di project)
2. Klik **"Environment Variables"** di sidebar
3. Klik **"Add New"**
4. Isi:
   - **Key:** `GROQ_API_KEY`
   - **Value:** `<Your Groq API Key>` (gunakan key dari file `.env.local` Anda)
   - **Environment:** Centang **semua** (Production, Preview, Development)
5. Klik **"Save"**
6. Kembali ke **"Deployments"** tab
7. Klik titik 3 di deployment terakhir → **"Redeploy"**

## ✅ SELESAI!

Website kamu live di: `https://tools-belajar-dika.vercel.app`

(Atau domain custom yang Vercel berikan)

---

## 🎯 Cara Akses:

Setelah redeploy selesai:
1. Klik **"Visit"** di Vercel dashboard
2. Atau buka link yang diberikan
3. **Share link ini ke siapa saja!** 🎉

---

## 💡 Tips:

- Setiap kali kamu `git push`, Vercel otomatis update website
- Free tier cukup untuk ribuan pengunjung per bulan
- Tidak perlu bayar hosting apapun!

---

## 🆘 Kalau Ada Error:

**"Site not working"**
→ Tunggu 2-3 menit lagi, deployment masih process

**"API Error"**
→ Pastikan Environment Variable `GROQ_API_KEY` sudah di-save dan sudah redeploy

**"Build Failed"**
→ Screenshot error nya, tanya ke saya

---

**Selamat! Website kamu sudah online! 🚀**
