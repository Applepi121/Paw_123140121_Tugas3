# Paw_123140121_Tugas3

# Product Review Analyzer 🚀

Aplikasi Full-Stack modern untuk menganalisis ulasan produk secara otomatis menggunakan kekuatan Artificial Intelligence (AI). Aplikasi ini menentukan sentimen (Positif/Negatif) dan mengekstrak poin-poin penting (Pros/Cons) dari teks ulasan.

Dibangun menggunakan **FastAPI**, **React**, **PostgreSQL**, dan **Google Gemini AI**.

---

## 📸 Tampilan Aplikasi
<img width="848" height="867" alt="image" src="https://github.com/user-attachments/assets/743f88d1-6876-4844-8e46-e71cd470bdcb" />

Berikut adalah tampilan antarmuka aplikasi.

### 1. Halaman Utama (Input Review)
<img width="848" height="867" alt="image" src="https://github.com/user-attachments/assets/b7ad2f82-6ce0-49a1-a621-c9a1a9893f5e" />

### 2. Hasil Analisis (Sentiment & Insight)
<img width="800" height="862" alt="image" src="https://github.com/user-attachments/assets/31202340-a0ff-424d-a11f-aeedd32dee8e" />

### 3. Riwayat Analisis (History Tab)
<img width="883" height="866" alt="image" src="https://github.com/user-attachments/assets/1b2ff367-dfd4-444d-9fa3-36480b4e5935" />

---

## ✨ Fitur Utama

* **Analisis Sentimen Otomatis:** Menggunakan model Deep Learning (Hugging Face Transformers) untuk mengklasifikasikan ulasan menjadi *Positive*, *Negative*, atau *Neutral*.
* **Ekstraksi Insight Cerdas:** Menggunakan **Google Gemini AI** untuk merangkum poin-poin kunci (kelebihan & kekurangan) dari ulasan panjang.
* **Riwayat Tersimpan:** Semua hasil analisis disimpan secara permanen ke database **PostgreSQL**.
* **Modern UI/UX:** Antarmuka responsif dengan tema *Blackpink Dark Mode* yang elegan.
* **RESTful API:** Backend yang cepat dan terdokumentasi menggunakan FastAPI.

---

## 🛠️ Teknologi yang Digunakan

### Backend
* **Language:** Python 3.x
* **Framework:** FastAPI
* **Server:** Uvicorn
* **Database ORM:** SQLAlchemy
* **AI Libraries:** `transformers` (Hugging Face), `google-generativeai`

### Frontend
* **Library:** React (Vite)
* **Styling:** CSS3 (Custom Dark Theme)
* **HTTP Client:** Axios
* **Icons:** Lucide React

### Database
* **System:** PostgreSQL

---

## ⚙️ Cara Instalasi & Menjalankan

Ikuti langkah-langkah berikut untuk menjalankan proyek di komputer lokal.

### 1. Persiapan Database
Pastikan PostgreSQL sudah terinstall dan berjalan.
1.  Buka **pgAdmin 4**.
2.  Buat database baru dengan nama: `review_db`.

### 2. Setup Backend (API)
```bash
# Masuk ke folder backend
cd backend

# Buat Virtual Environment
python -m venv venv

# Aktifkan Virtual Environment
# (Windows)
.\venv\Scripts\activate
# (Mac/Linux)
source venv/bin/activate

# Install Dependencies
pip install -r requirements.txt

# Setup Environment Variables
# Buat file .env dan isi dengan konfigurasi berikut:
# DATABASE_URL="postgresql://postgres:password_kamu@localhost/review_db"
# GOOGLE_API_KEY="api_key_gemini_kamu"

# Jalankan Server
uvicorn main:app --reload
