# 📋 COMMIT HISTORY — DSS-NET

> **Decision Support System** berbasis metode **TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution)**
> Repository: [https://github.com/Tedshub/dss-net](https://github.com/Tedshub/dss-net)
> Tech Stack: Laravel 11 · Inertia.js · React · Tailwind CSS · MySQL

---

## 👥 Kontributor

| Nama | GitHub | Email |
|------|--------|-------|
| Tedshub | [@Tedshub](https://github.com/Tedshub) | tedysyhh07@gmail.com |
| Zakyysme | [@Zakyysme](https://github.com/Zakyysme) | zakyysme@gmail.com |

---

## 📅 Riwayat Perubahan

> **Catatan:** Commit diurutkan dari yang **terbaru** ke yang **terlama** (descending).
> Total commit tercatat: **21 commit** | Periode: **21 September 2025 – 22 Juli 2026**

---

## 🗓️ 2026

---

### [v2.4.0] — 2026-07-22

**Commit:** `6b82f48`
**Author:** Tedshub
**Message:** `improve C11 question sub_guest`

#### 🔧 Perubahan:
Penambahan kriteria baru **C11** khusus untuk peran `sub_guest`, melengkapi pertanyaan kuesioner dengan migrasi database dan seeder.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Penyesuaian logika controller untuk kriteria C11 |
| `database/migrations/2026_07_22_000237_add_c11_to_criterias_table.php` | ✨ **[NEW]** Migrasi penambahan kolom C11 pada tabel criterias |
| `database/seeders/CriteriaSeeder.php` | Penambahan seed data untuk kriteria C11 |
| `database/seeders/DatabaseSeeder.php` | Update referensi seeder |
| `resources/js/Pages/Profile/Edit.jsx` | Perbaikan tampilan halaman edit profil |
| `resources/js/Pages/Users/Create.jsx` | Penyesuaian form pembuatan user |

**📊 Statistik:** `6 file changed` · `+58 insertions` · `-15 deletions`

---

### [v2.3.0] — 2026-07-19

**Commit:** `7a2023de`
**Author:** Tedshub
**Message:** `improve C11 question list`

#### 🔧 Perubahan:
Pengembangan besar pada fitur daftar pertanyaan C11, penambahan middleware role baru `RoleMiddleware`, halaman error 403, dan refactor besar pada routing serta tampilan alternatif.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Refactor besar logika alternatif dan C11 (+82 lines) |
| `app/Http/Middleware/AdminMiddleware.php` | Perbaikan middleware admin |
| `app/Http/Middleware/RoleMiddleware.php` | ✨ **[NEW]** Middleware baru untuk kontrol akses berbasis role |
| `app/Models/Value.php` | Penambahan relasi/atribut baru |
| `bootstrap/app.php` | Registrasi middleware RoleMiddleware |
| `database/migrations/2026_07_19_121217_add_budget_min_max_to_values_table.php` | ✨ **[NEW]** Migrasi penambahan kolom budget min/max pada tabel values |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Perbaikan layout navigasi |
| `resources/js/Pages/Alternatives/List.jsx` | Refactor besar tampilan daftar alternatif (+232 lines) |
| `resources/js/Pages/Auth/Register.jsx` | Perbaikan form registrasi |
| `resources/js/Pages/Calculation/Index.jsx` | Penambahan fitur kalkulasi (+40 lines) |
| `resources/js/Pages/Errors/403.jsx` | ✨ **[NEW]** Halaman error 403 Forbidden |
| `resources/js/Pages/Users/Edit.jsx` | Perbaikan halaman edit user |
| `resources/js/Pages/Users/Index.jsx` | Perbaikan tampilan daftar user |
| `resources/js/Pages/Users/Show.jsx` | Perbaikan halaman detail user |
| `routes/web.php` | Refactor routing dengan middleware baru |

**📊 Statistik:** `15 file changed` · `+486 insertions` · `-124 deletions`

---

### [v2.2.0] — 2026-07-15

**Commit:** `9bad7fd0`
**Author:** Tedshub
**Message:** `Add budget criteria rule`

#### 🔧 Perubahan:
Penambahan aturan kriteria anggaran (budget), penambahan role baru `sub_guest`, penambahan fitur sekolah (school_name dan parent_id pada tabel users), dan pengembangan besar pada manajemen user serta form registrasi.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Logika kriteria budget (+60 lines) |
| `app/Http/Controllers/Auth/AuthenticatedSessionController.php` | Penyesuaian session login |
| `app/Http/Controllers/Auth/OTPController.php` | Perbaikan alur OTP |
| `app/Http/Controllers/Auth/RegisteredUserController.php` | Penyesuaian registrasi dengan school |
| `app/Http/Controllers/TopsisController.php` | Pengembangan kalkulasi TOPSIS |
| `app/Http/Controllers/UserController.php` | Pengembangan manajemen user (+72 lines) |
| `app/Http/Controllers/ValueController.php` | Refactor ValueController |
| `app/Models/User.php` | Penambahan atribut school_name, parent_id |
| `app/Models/Value.php` | Penambahan atribut budget |
| `app/Services/TopsisService.php` | Pengembangan service TOPSIS |
| `database/migrations/..._add_school_name_and_parent_id_to_users_table.php` | ✨ **[NEW]** Migrasi kolom school_name dan parent_id |
| `database/migrations/2026_07_13_130437_add_user_id_to_values_table.php` | ✨ **[NEW]** Migrasi kolom user_id pada tabel values |
| `database/migrations/2026_07_13_131731_add_sub_guest_to_users_role_enum.php` | ✨ **[NEW]** Migrasi penambahan role sub_guest |
| `database/seeders/SchoolUserSeeder.php` | ✨ **[NEW]** Seeder data user sekolah |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Perbaikan layout navigasi |
| `resources/js/Pages/Alternatives/Index.jsx` | Pengembangan halaman alternatif (+210 lines) |
| `resources/js/Pages/Alternatives/List.jsx` | Pengembangan daftar alternatif (+110 lines) |
| `resources/js/Pages/Auth/Register.jsx` | Revamp besar form registrasi (+469 lines) |
| `resources/js/Pages/Calculation/Index.jsx` | Pengembangan halaman kalkulasi |
| `resources/js/Pages/Criterias/Index.jsx` | Pengembangan halaman kriteria (+364 lines) |
| `resources/js/Pages/Users/Create.jsx` | Perbaikan form buat user |
| `resources/js/Pages/Users/Edit.jsx` | Perbaikan form edit user |
| `resources/js/Pages/Users/Index.jsx` | Refactor daftar user |
| `resources/js/Pages/Users/Show.jsx` | ✨ **[NEW]** Halaman detail/show user |
| `resources/js/Pages/Values/Index.jsx` | Pengembangan halaman nilai |

**📊 Statistik:** `25 file changed` · `+1,544 insertions` · `-395 deletions`

---

### [v2.1.0] — 2026-07-12

**Commit:** `3b3cd9fe`
**Author:** Tedshub
**Message:** `improve interface`

#### 🔧 Perubahan:
Revamp besar tampilan antarmuka seluruh halaman autentikasi dan halaman utama. Perombakan desain dengan pendekatan lebih modern dan responsif menggunakan konfigurasi Tailwind yang diperbarui.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Peningkatan layout navigasi (+57 lines) |
| `resources/js/Pages/Alternatives/Index.jsx` | Perbaikan tampilan halaman alternatif |
| `resources/js/Pages/Auth/ForgotPassword.jsx` | Redesign halaman lupa password |
| `resources/js/Pages/Auth/Login.jsx` | Redesign halaman login |
| `resources/js/Pages/Auth/Register.jsx` | Redesign halaman registrasi |
| `resources/js/Pages/Auth/ResetPassword.jsx` | Redesign halaman reset password |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | Redesign halaman verifikasi OTP |
| `resources/js/Pages/Calculation/Index.jsx` | Perbaikan halaman kalkulasi |
| `resources/js/Pages/Criterias/Index.jsx` | Perbaikan halaman kriteria |
| `resources/js/Pages/Dashboard.jsx` | Perbaikan tampilan dashboard |
| `resources/js/Pages/Welcome.jsx` | Pengembangan halaman landing (+65 lines) |
| `tailwind.config.js` | Penambahan konfigurasi tema Tailwind (+24 lines) |

**📊 Statistik:** `12 file changed` · `+869 insertions` · `-1,024 deletions`

---

## 🗓️ 2025

---

### [v1.10.0] — 2025-12-08

**Commit:** `52a67c12` *(Merge Commit)*
**Author:** Tedshub
**Message:** `Merge pull request #4 from Zakyysme/Master`
**PR Title:** Change Profile Page and Adding the Role

#### 🔧 Perubahan:
Merge Pull Request #4. Penambahan fitur manajemen user oleh admin (CRUD User), sistem email notifikasi selamat datang, dan perbaikan layout navigasi yang signifikan.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/ProfileController.php` | Perbaikan logika profil |
| `app/Http/Controllers/UserController.php` | ✨ **[NEW]** Controller manajemen user oleh admin (+100 lines) |
| `app/Notifications/WelcomeEmail.php` | ✨ **[NEW]** Notifikasi email selamat datang |
| `database/migrations/0001_01_01_000000_create_users_table.php` | Penambahan kolom role |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Revamp besar sidebar navigasi (+232 lines) |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | Perbaikan halaman verifikasi OTP |
| `resources/js/Pages/Users/Create.jsx` | ✨ **[NEW]** Halaman buat user oleh admin (+174 lines) |
| `resources/js/Pages/Users/Edit.jsx` | ✨ **[NEW]** Halaman edit user oleh admin (+185 lines) |
| `resources/js/Pages/Users/Index.jsx` | ✨ **[NEW]** Halaman daftar user oleh admin (+224 lines) |
| `routes/web.php` | Penambahan route manajemen user (+95 lines) |

**📊 Statistik:** `10 file changed` · `+967 insertions` · `-117 deletions`

---

### [v1.9.0] — 2025-12-08

**Commit:** `7ead8590`
**Author:** Zakyysme
**Message:** `Change Profile Page and Adding the Role`

#### 🔧 Perubahan:
Kontribusi dari Zakyysme — penambahan halaman manajemen user, sistem notifikasi email selamat datang, dan perbaikan layout sidebar.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/ProfileController.php` | Perbaikan controller profil |
| `app/Http/Controllers/UserController.php` | ✨ **[NEW]** CRUD user management |
| `app/Notifications/WelcomeEmail.php` | ✨ **[NEW]** Email notifikasi welcome |
| `database/migrations/0001_01_01_000000_create_users_table.php` | Perubahan skema tabel users |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Revamp sidebar layout |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | Perbaikan verify OTP |
| `resources/js/Pages/Users/Create.jsx` | ✨ **[NEW]** Form buat user |
| `resources/js/Pages/Users/Edit.jsx` | ✨ **[NEW]** Form edit user |
| `resources/js/Pages/Users/Index.jsx` | ✨ **[NEW]** Daftar user |
| `routes/web.php` | Routing manajemen user |

**📊 Statistik:** `10 file changed` · `+967 insertions` · `-117 deletions`

---

### [v1.8.0] — 2025-11-27

**Commit:** `1ffdf7c4`
**Author:** Tedshub
**Message:** `Improve alternative question`

#### 🔧 Perubahan:
Penambahan file manual book dalam format DOCX dan pembaruan PDF manual book. Perbaikan kecil pada tampilan pertanyaan alternatif.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `public/assets/pdf/manual_book_rks.docx` | ✨ **[NEW]** File manual book format DOCX |
| `public/assets/pdf/manual_book_rks.pdf` | Update manual book PDF (1.0MB → 1.3MB) |
| `resources/js/Pages/Alternatives/List.jsx` | Perbaikan tampilan pertanyaan alternatif |

**📊 Statistik:** `3 file changed` · `+3 insertions` · `-3 deletions`

---

### [v1.7.0] — 2025-10-22

**Commit:** `f1f593d9`
**Author:** Tedshub
**Message:** `tambah manual book pada dashboard`

#### 🔧 Perubahan:
Penambahan tombol/link download manual book pada halaman dashboard. Upload file PDF manual book untuk pertama kalinya.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `public/assets/pdf/manual_book_rks.pdf` | ✨ **[NEW]** File PDF manual book (1MB) |
| `resources/js/Pages/Dashboard.jsx` | Penambahan link download manual book (+21 lines) |

**📊 Statistik:** `2 file changed` · `+18 insertions` · `-3 deletions`

---

### [v1.6.0] — 2025-10-13

**Commit:** `0b02245a`
**Author:** Tedshub
**Message:** `menuju validasi`

#### 🔧 Perubahan:
Perbaikan minor pada tampilan dan flow aplikasi sebagai persiapan validasi sistem/pengujian.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `resources/js/Pages/Alternatives/List.jsx` | Perbaikan tampilan daftar alternatif |
| `resources/js/Pages/Calculation/Index.jsx` | Perbaikan tampilan kalkulasi |
| `resources/js/Pages/Welcome.jsx` | Perbaikan tampilan landing page |

**📊 Statistik:** `3 file changed` · `+4 insertions` · `-5 deletions`

---

### [v1.5.1] — 2025-10-04

**Commit:** `538b163a`
**Author:** Tedshub
**Message:** `fix bug type data saat hosting`

#### 🔧 Perubahan:
Perbaikan bug tipe data yang muncul saat aplikasi di-deploy ke server hosting. Rename file `Option.jsx` menjadi `List.jsx` untuk konsistensi penamaan.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Fix type casting data (+30 lines) |
| `app/Models/Alternative.php` | Penambahan casting tipe data |
| `resources/js/Pages/Alternatives/Index.jsx` | Perbaikan tampilan |
| `resources/js/Pages/Alternatives/Option.jsx -> List.jsx` | RENAME - Rename file untuk konsistensi |
| `routes/web.php` | Penyesuaian routing |

**📊 Statistik:** `5 file changed` · `+95 insertions` · `-93 deletions`

---

### [v1.5.0] — 2025-10-04

**Commit:** `34d73f8a`
**Author:** Tedshub
**Message:** `menambah pilihan nilai pada opsi kebijakan`

#### 🔧 Perubahan:
Penambahan fitur pilihan nilai pada opsi kebijakan (option). Pembuatan halaman `Option.jsx` untuk tampilan kuesioner/opsi penilaian. Pengembangan besar pada halaman Values, Dashboard, Alternatives, dan Calculation.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Logika pilihan nilai (+93 lines) |
| `app/Http/Controllers/DashboardController.php` | Pengembangan dashboard controller |
| `database/seeders/UserSeeder.php` | Update data seeder |
| `resources/js/Pages/Alternatives/Index.jsx` | Refactor halaman alternatif (+281 lines) |
| `resources/js/Pages/Alternatives/Option.jsx` | ✨ **[NEW]** Halaman opsi penilaian kuesioner (+358 lines) |
| `resources/js/Pages/Calculation/Index.jsx` | Perbaikan kalkulasi |
| `resources/js/Pages/Dashboard.jsx` | Penyederhanaan dashboard |
| `resources/js/Pages/Values/Index.jsx` | Pengembangan besar halaman nilai (+392 lines) |
| `routes/web.php` | Penambahan route option |

**📊 Statistik:** `9 file changed` · `+940 insertions` · `-330 deletions`

---

### [v1.4.0] — 2025-09-30

**Commit:** `f0a85ea8` *(Merge Commit)*
**Author:** Tedshub
**Message:** `Merge pull request #2 from Zakyysme/main`
**PR Title:** Ubah Logo dan Tampilan Halaman Profile

#### 🔧 Perubahan:
Merge Pull Request #2. Penambahan logo DSS baru, favicon, perubahan tampilan halaman profile dan landing page, serta perbaikan alur OTP dan verifikasi.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/Auth/AuthenticatedSessionController.php` | Perbaikan session auth |
| `app/Http/Controllers/Auth/OTPController.php` | Perbaikan alur OTP |
| `app/Http/Middleware/CheckOtpVerified.php` | Perbaikan middleware OTP |
| `public/assets/images/dss.png` | ✨ **[NEW]** Logo DSS baru |
| `public/assets/images/favicon.ico` | ✨ **[NEW]** Favicon baru |
| `resources/js/Pages/Profile/Edit.jsx` | Perbaikan tampilan profil |
| `resources/js/Pages/Welcome.jsx` | Redesign landing page |
| `resources/views/app.blade.php` | Penambahan meta/head baru |
| `routes/auth.php` | Perbaikan routing auth |
| `routes/web.php` | Perbaikan routing utama |

**📊 Statistik:** `10 file changed` · `+143 insertions` · `-101 deletions`

---

### [v1.3.2] — 2025-09-30

**Commit:** `78223135`
**Author:** Zakyysme
**Message:** `Ubah tampilan halaman profile`

#### 🔧 Perubahan:
Kontribusi dari Zakyysme — perubahan tampilan halaman profile dan landing page, penambahan favicon.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `public/assets/images/favicon.ico` | ✨ **[NEW]** Favicon baru |
| `resources/js/Pages/Profile/Edit.jsx` | Perubahan tampilan halaman edit profil |
| `resources/js/Pages/Welcome.jsx` | Perubahan tampilan landing page |
| `resources/views/app.blade.php` | Penambahan link favicon di blade |

**📊 Statistik:** `4 file changed` · `+93 insertions` · `-84 deletions`

---

### [v1.3.1] — 2025-09-30

**Commit:** `773b964e`
**Author:** Zakyysme
**Message:** `Perubahan Logo dan Halaman Profile`

#### 🔧 Perubahan:
Kontribusi dari Zakyysme — penambahan logo DSS (dss.png) dan perbaikan referensi logo di halaman welcome.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `public/assets/images/dss.png` | ✨ **[NEW]** Aset logo DSS baru |
| `resources/js/Pages/Welcome.jsx` | Perubahan referensi logo |

**📊 Statistik:** `2 file changed` · `+1 insertions` · `-1 deletions`

---

### [v1.3.0] — 2025-09-29

**Commit:** `349b2ffd`
**Author:** Zakyysme
**Message:** `perubahan verifikasi email`

#### 🔧 Perubahan:
Kontribusi dari Zakyysme — perbaikan alur verifikasi email dan OTP, termasuk middleware pengecekan OTP dan routing auth.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/Auth/AuthenticatedSessionController.php` | Penyesuaian logika session & OTP |
| `app/Http/Controllers/Auth/OTPController.php` | Perbaikan controller OTP |
| `app/Http/Middleware/CheckOtpVerified.php` | Perbaikan logika middleware OTP |
| `routes/auth.php` | Penyesuaian routing auth |
| `routes/web.php` | Penyesuaian routing web |

**📊 Statistik:** `5 file changed` · `+49 insertions` · `-16 deletions`

---

### [v1.2.0] — 2025-09-29

**Commit:** `4918306c` *(Merge Commit)*
**Author:** Tedshub
**Message:** `Merge pull request #1 from Zakyysme/main`
**PR Title:** perubahaaan otp

#### 🔧 Perubahan:
Merge Pull Request #1. Penambahan sistem OTP (One Time Password) lengkap: controller, middleware, halaman verifikasi OTP, pengiriman email OTP, dan penyesuaian dependencies.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/Auth/OTPController.php` | ✨ **[NEW]** Controller OTP (+81 lines) |
| `app/Http/Middleware/CheckOtpVerified.php` | ✨ **[NEW]** Middleware cek status OTP (+26 lines) |
| `app/Models/UserOtp.php` | Pengembangan model OTP |
| `bootstrap/app.php` | Registrasi middleware baru |
| `composer.lock` | Update dependencies PHP |
| `config/app.php` | Konfigurasi app |
| `package-lock.json` | Update dependencies JS |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | Pengembangan halaman verifikasi OTP (+57 lines) |
| `routes/auth.php` | Penambahan route OTP |
| `routes/web.php` | Penyesuaian routing |

**📊 Statistik:** `10 file changed` · `+433 insertions` · `-284 deletions`

---

### [v1.1.0] — 2025-09-29

**Commit:** `4ac6aadf`
**Author:** Zakyysme
**Message:** `perubahaaan otp`

#### 🔧 Perubahan:
Kontribusi dari Zakyysme — implementasi fitur OTP (One Time Password) untuk verifikasi login. Penambahan middleware CheckOtpVerified, controller OTP, model UserOtp, dan halaman VerifyOtp.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/Auth/OTPController.php` | ✨ **[NEW]** OTP Controller |
| `app/Http/Middleware/CheckOtpVerified.php` | ✨ **[NEW]** Middleware pengecekan OTP |
| `app/Models/UserOtp.php` | Pengembangan model UserOtp |
| `bootstrap/app.php` | Registrasi middleware |
| `composer.lock` | Update PHP dependencies |
| `config/app.php` | Update konfigurasi |
| `package-lock.json` | Update JS dependencies |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | ✨ **[NEW]** Halaman verifikasi OTP |
| `routes/auth.php` | Route OTP |
| `routes/web.php` | Penyesuaian routing |

**📊 Statistik:** `10 file changed` · `+433 insertions` · `-284 deletions`

---

### [v1.0.2] — 2025-09-29

**Commit:** `bfa9d527`
**Author:** Tedshub
**Message:** `segera production`

#### 🔧 Perubahan:
Persiapan production — integrasi aset publik (CSS, JS, images) dari template landing page, penambahan halaman VerifyOtp, dan konfigurasi Vite.

#### 📁 File yang Diubah (sebagian):
| File | Perubahan |
|------|-----------|
| `public/assets/css/` | ✨ **[NEW]** Aset CSS template landing page |
| `public/assets/js/` | ✨ **[NEW]** Aset JS (jQuery, Bootstrap, dll) |
| `public/assets/images/` | ✨ **[NEW]** Aset gambar template |
| `resources/js/Pages/Auth/VerifyOtp.jsx` | ✨ **[NEW]** Halaman verifikasi OTP (+193 lines) |
| `resources/js/Pages/Welcome.jsx` | Penggantian template landing page baru |
| `resources/views/emails/otp.blade.php` | Template email OTP |
| `routes/auth.php` | Penambahan route auth |
| `vite.config.js` | Konfigurasi Vite |

**📊 Statistik:** `175 file changed` · `+16,432 insertions` · `-225 deletions`

---

### [v1.0.1] — 2025-09-27

**Commit:** `4726295c`
**Author:** Tedshub
**Message:** `Update: tambah TopsisController, service, observer, dan perbaikan view`

#### 🔧 Perubahan:
Penambahan inti sistem TOPSIS: `TopsisController`, `TopsisService`, `AlternativeObserver`. Pengembangan besar halaman Alternatives, Calculation, Values, dan Dashboard. Penambahan seeder Values.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | Pengembangan logika alternatif |
| `app/Http/Controllers/TopsisController.php` | ✨ **[NEW]** Controller kalkulasi TOPSIS (+51 lines) |
| `app/Http/Controllers/ValueController.php` | Pengembangan value controller (+346 lines) |
| `app/Models/Alternative.php` | Penambahan relasi |
| `app/Models/Criteria.php` | Perbaikan model |
| `app/Models/Value.php` | Pengembangan model Value |
| `app/Observers/AlternativeObserver.php` | ✨ **[NEW]** Observer untuk Alternative model (+26 lines) |
| `app/Providers/AppServiceProvider.php` | Registrasi observer |
| `app/Services/TopsisService.php` | ✨ **[NEW]** Service kalkulasi TOPSIS (+187 lines) |
| `database/migrations/..._create_criterias_table.php` | Perbaikan migrasi |
| `database/migrations/..._create_values_table.php` | Perbaikan migrasi values |
| `database/seeders/ValuesSeeder.php` | ✨ **[NEW]** Seeder data values |
| `resources/js/Pages/Alternatives/Index.jsx` | Revamp halaman alternatif (+789 lines) |
| `resources/js/Pages/Calculation/Index.jsx` | ✨ **[NEW]** Halaman kalkulasi TOPSIS (+721 lines) |
| `resources/js/Pages/Criterias/Index.jsx` | Refactor halaman kriteria (+613 lines) |
| `resources/js/Pages/Dashboard.jsx` | Refactor dashboard (+443 lines) |
| `resources/js/Pages/Values/Index.jsx` | ✨ **[NEW]** Halaman manajemen nilai (+728 lines) |
| `resources/js/Pages/Criteria.jsx` | DELETE - Dihapus (diganti Criterias/Index.jsx) |
| `routes/web.php` | Penambahan routing |
| `vite.config.js` | Update konfigurasi Vite |

**📊 Statistik:** `24 file changed` · `+3,295 insertions` · `-1,121 deletions`

---

### [v1.0.0] — 2025-09-25

**Commit:** `f5180c62`
**Author:** Tedshub
**Message:** `dashboard menu`

#### 🔧 Perubahan:
Pembangunan fondasi utama aplikasi DSS. Penambahan seluruh controller inti (Alternative, Criteria, Dashboard, Value), middleware admin, model-model utama, migrasi database, seeder, dan halaman React utama.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Http/Controllers/AlternativeController.php` | ✨ **[NEW]** Controller alternatif (+132 lines) |
| `app/Http/Controllers/Controller.php` | Update base controller |
| `app/Http/Controllers/CriteriaController.php` | ✨ **[NEW]** Controller kriteria (+82 lines) |
| `app/Http/Controllers/DashboardController.php` | ✨ **[NEW]** Controller dashboard (+20 lines) |
| `app/Http/Controllers/ValueController.php` | ✨ **[NEW]** Controller nilai (+65 lines) |
| `app/Http/Middleware/AdminMiddleware.php` | ✨ **[NEW]** Middleware admin (+20 lines) |
| `app/Models/Alternative.php` | ✨ **[NEW]** Model Alternative |
| `app/Models/Criteria.php` | ✨ **[NEW]** Model Criteria |
| `app/Models/User.php` | Update model User |
| `app/Models/Value.php` | ✨ **[NEW]** Model Value |
| `bootstrap/app.php` | Registrasi middleware admin |
| `database/migrations/..._create_criterias_table.php` | ✨ **[NEW]** Migrasi tabel criterias |
| `database/migrations/..._create_alternatives_table.php` | ✨ **[NEW]** Migrasi tabel alternatives |
| `database/migrations/..._create_values_table.php` | ✨ **[NEW]** Migrasi tabel values |
| `database/seeders/AlternativeSeeder.php` | ✨ **[NEW]** Seeder alternatif |
| `database/seeders/CriteriaSeeder.php` | ✨ **[NEW]** Seeder kriteria |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Update sidebar navigasi |
| `resources/js/Pages/Alternatives/Index.jsx` | ✨ **[NEW]** Halaman alternatif (+567 lines) |
| `resources/js/Pages/Criterias/Index.jsx` | ✨ **[NEW]** Halaman kriteria (+485 lines) |
| `resources/js/Pages/Dashboard.jsx` | Update dashboard |
| `routes/web.php` | Penambahan routing utama |

**📊 Statistik:** `25 file changed` · `+1,735 insertions` · `-46 deletions`

---

### [v0.3.0] — 2025-09-23

**Commit:** `09c82657`
**Author:** Tedshub
**Message:** `user role acces control, sidebar view dan auth view improvement`

#### 🔧 Perubahan:
Penambahan sistem kontrol akses berbasis role (RBAC) pada model User, perbaikan besar tampilan sidebar, halaman login, dan halaman registrasi. Penambahan seeder user dan template email notifikasi.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `app/Models/User.php` | Penambahan enum role, getter role (+17 lines) |
| `database/migrations/..._create_users_table.php` | Penambahan kolom role |
| `database/seeders/DatabaseSeeder.php` | Registrasi UserSeeder |
| `database/seeders/UserSeeder.php` | ✨ **[NEW]** Seeder data user default (+32 lines) |
| `resources/js/Layouts/AuthenticatedLayout.jsx` | Pengembangan sidebar dengan role-based menu (+103 lines) |
| `resources/js/Pages/Auth/Login.jsx` | Perbaikan tampilan halaman login |
| `resources/js/Pages/Auth/Register.jsx` | Perbaikan tampilan halaman registrasi (+172 lines) |
| `resources/js/Pages/Welcome.jsx` | Perbaikan landing page |
| `resources/views/vendor/notifications/email.blade.php` | ✨ **[NEW]** Template email notifikasi (+58 lines) |

**📊 Statistik:** `9 file changed` · `+382 insertions` · `-55 deletions`

---

### [v0.2.0] — 2025-09-21

**Commit:** `c4d5245b`
**Author:** Tedshub
**Message:** `update: perbaikan dan pengembangan README.md`

#### 🔧 Perubahan:
Pengembangan dokumentasi proyek pada file README.md secara komprehensif.

#### 📁 File yang Diubah:
| File | Perubahan |
|------|-----------|
| `README.md` | Pengembangan besar dokumentasi (+329 lines) |

**📊 Statistik:** `1 file changed` · `+329 insertions` · `-38 deletions`

---

### [v0.1.0] — 2025-09-21

**Commit:** `e1e1697d`
**Author:** Tedshub
**Message:** `first commit`

#### 🔧 Perubahan:
Inisialisasi proyek Laravel 11 dengan Inertia.js + React. Setup awal seluruh struktur proyek termasuk autentikasi dasar, konfigurasi, routing, dan komponen React dasar.

#### 📁 File yang Ditambahkan (Inisialisasi):
| Kategori | Deskripsi |
|----------|-----------|
| **Framework** | Laravel 11 skeleton (artisan, bootstrap, config, storage) |
| **Auth Controllers** | AuthenticatedSession, RegisteredUser, Profile, dll |
| **Middleware** | HandleInertiaRequests |
| **Models** | User.php (base) |
| **Migrations** | users, cache, jobs tables |
| **React Components** | ApplicationLogo, Checkbox, DangerButton, Dropdown, Modal, dll |
| **React Pages** | Auth (Login, Register, ForgotPassword, ResetPassword, VerifyEmail), Dashboard, Profile, Welcome, Criteria |
| **React Layouts** | AuthenticatedLayout, GuestLayout |
| **Config** | app, auth, cache, database, filesystems, logging, mail, queue, session |
| **Routes** | web.php, auth.php, console.php |
| **Build Tools** | vite.config.js, tailwind.config.js, postcss.config.js |
| **Tests** | Feature tests untuk Auth, Profile, Unit test |

**📊 Statistik:** `109 file changed` · `+20,062 insertions`

---

## 📊 Ringkasan Statistik Keseluruhan

| Metrik | Nilai |
|--------|-------|
| **Total Commit** | 21 commit |
| **Periode** | 21 Sep 2025 – 22 Jul 2026 |
| **Kontributor Utama** | Tedshub (16 commit) |
| **Kontributor Kolaborator** | Zakyysme (5 commit) |
| **Pull Request Merged** | 4 PR (#1, #2, #3/implicit, #4) |
| **Total Baris Kode** | ~25,000+ baris |
| **Bahasa Utama** | PHP (Laravel), JavaScript (React/Inertia) |

---

## 🏷️ Ringkasan Fase Pengembangan

| Fase | Periode | Fokus |
|------|---------|-------|
| **Phase 0: Inisialisasi** | Sep 21, 2025 | Setup project, auth dasar, README |
| **Phase 1: Core Feature** | Sep 23–27, 2025 | RBAC, TOPSIS service, model, controller |
| **Phase 2: Production Prep** | Sep 29 – Oct 4, 2025 | OTP, landing page, hosting bug fix |
| **Phase 3: Enhancement** | Oct 13–22, 2025 | Validasi, manual book, dashboard |
| **Phase 4: Collaboration** | Nov–Dec 2025 | User management, profile, email notif |
| **Phase 5: UI Revamp** | Jul 12, 2026 | Redesign antarmuka seluruh halaman |
| **Phase 6: New Feature** | Jul 15–22, 2026 | Budget criteria, sub_guest role, C11 |

---

*📝 File ini dibuat berdasarkan riwayat git commit project dss-net.*
*Terakhir diperbarui: **3 Agustus 2026***
