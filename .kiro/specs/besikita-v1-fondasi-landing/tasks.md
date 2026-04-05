# Implementation Plan: BesiKita V1 - Fondasi & Landing Page

## Overview

Implementasi dilakukan secara inkremental dalam 10 subtask, masing-masing merepresentasikan satu git commit. Stack: Next.js 14 App Router, TypeScript, Tailwind CSS. Semua komponen adalah React Server Components. Tidak ada API eksternal atau state management pada V1.

## Tasks

- [ ] 1. Inisialisasi proyek
  - [x] 1.1 Buat proyek Next.js dengan TypeScript dan Tailwind CSS
    - Jalankan `create-next-app` dengan flag `--typescript` dan `--tailwind`
    - Hapus file default yang tidak diperlukan (contoh: `app/globals.css` boilerplate, `public/vercel.svg`, dll.)
    - Buat struktur folder: `components/`, `utils/`, `types/`
    - Buat `types/index.ts` dengan interface `ServiceItem` dan `AdvantageItem`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
    - Git commit: `V1: Inisialisasi proyek - setup Next.js TypeScript Tailwind dan struktur folder`

  - [x] 1.2 Konfigurasi ESLint, Prettier, dan next.config.js
    - Install dan konfigurasi Prettier dengan `.prettierrc`
    - Pastikan ESLint config kompatibel dengan Next.js dan TypeScript
    - Verifikasi `next.config.js` siap untuk deployment Vercel
    - _Requirements: 1.5, 1.6_
    - Git commit: `V1: Konfigurasi tooling - ESLint Prettier next.config.js`

- [ ] 2. Setup testing framework
  - [x] 2.1 Install dan konfigurasi Vitest, @testing-library/react, dan fast-check
    - Install `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `fast-check`
    - Buat `vitest.config.ts` dengan environment jsdom
    - Buat `vitest.setup.ts` untuk import `@testing-library/jest-dom`
    - _Requirements: 1.1_
    - Git commit: `V1: Setup testing - Vitest testing-library fast-check`

- [ ] 3. Komponen layout
  - [x] 3.1 Buat komponen Navbar
    - Buat `components/Navbar.tsx` dengan 4 item navigasi: Beranda (`/`), Layanan (`/services`), Galeri (`/gallery`), Kontak (`/contact`)
    - Gunakan `next/link` untuk setiap item menu
    - Styling dasar Tailwind (flex, padding, warna)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_
    - Git commit: `V1: Komponen Navbar - navigasi 4 item dengan next/link`

  - [ ]* 3.2 Tulis unit tests untuk Navbar
    - Test: Navbar merender 4 item menu
    - Test: setiap item menu memiliki href yang benar
    - _Requirements: 2.1, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 3.3 Tulis property test untuk Navbar (Property 1)
    - **Property 1: Setiap item navigasi Navbar memiliki href yang benar**
    - **Validates: Requirements 2.2, 2.4, 2.5, 2.6, 2.7**
    - Tag komentar: `// Feature: besikita-v1-fondasi-landing, Property 1: Setiap item navigasi Navbar memiliki href yang benar`
    - Gunakan `fc.constantFrom(...navItems)` dengan `numRuns: 100`

  - [x] 3.4 Buat komponen Footer
    - Buat `components/Footer.tsx` dengan teks copyright BesiKita
    - Tampilkan email `info@besikita.com` dan telepon `0812-3456-7890`
    - _Requirements: 3.1, 3.2, 3.3_
    - Git commit: `V1: Komponen Footer - copyright dan info kontak`

  - [ ]* 3.5 Tulis unit tests untuk Footer
    - Test: Footer menampilkan copyright BesiKita
    - Test: Footer menampilkan email dan nomor telepon
    - _Requirements: 3.1, 3.2_

  - [x] 3.6 Buat RootLayout di app/layout.tsx
    - Bungkus `children` dengan `<Navbar />` dan `<Footer />`
    - Tambahkan metadata SEO: `title` dan `description`
    - Definisikan font dan warna dasar via Tailwind di `<body>`
    - _Requirements: 4.1, 4.2, 4.3_
    - Git commit: `V1: RootLayout - layout global dengan Navbar Footer dan metadata SEO`

  - [ ]* 3.7 Tulis unit tests untuk RootLayout
    - Test: RootLayout merender Navbar sebelum children
    - Test: RootLayout merender Footer setelah children
    - Test: metadata mengandung title dan description
    - _Requirements: 4.1, 4.2_

- [ ] 4. Halaman Beranda (landing)
  - [x] 4.1 Buat HeroSection
    - Buat `components/HeroSection.tsx` dengan judul "Jasa Olah Besi Profesional untuk Bangunan Anda"
    - Tambahkan subjudul "Kursi, Pagar, Kanopi, dan segala kebutuhan besi Anda"
    - Tambahkan tombol CTA "Lihat Layanan" menggunakan `next/link` ke `/services`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
    - Git commit: `V1: HeroSection - judul subjudul dan tombol CTA ke /services`

  - [ ]* 4.2 Tulis unit tests untuk HeroSection
    - Test: HeroSection menampilkan judul utama
    - Test: HeroSection menampilkan subjudul
    - Test: tombol CTA mengarah ke `/services`
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 4.3 Buat ServiceCard dan LayananSection
    - Buat `components/ServiceCard.tsx` dengan props `title`, `description`, `icon` dan tombol "Detail" yang mengarah ke `/services`
    - Buat `components/LayananSection.tsx` dengan data 3 layanan (Kursi Besi, Pagar Besi, Kanopi) dalam grid
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_
    - Git commit: `V1: ServiceCard dan LayananSection - 3 kartu layanan dalam grid`

  - [ ]* 4.4 Tulis unit tests untuk LayananSection
    - Test: LayananSection menampilkan Kursi Besi, Pagar Besi, Kanopi
    - _Requirements: 6.2, 6.3, 6.4_

  - [ ]* 4.5 Tulis property test untuk LayananSection (Property 2)
    - **Property 2: Section Layanan Kami merender tepat 3 ServiceCard**
    - **Validates: Requirements 6.1**
    - Tag komentar: `// Feature: besikita-v1-fondasi-landing, Property 2: Section Layanan Kami merender tepat 3 ServiceCard`
    - Gunakan `fc.constant(null)` dengan `numRuns: 100`

  - [ ]* 4.6 Tulis property test untuk ServiceCard (Property 3)
    - **Property 3: Setiap ServiceCard memiliki tombol Detail yang mengarah ke /services**
    - **Validates: Requirements 6.5**
    - Tag komentar: `// Feature: besikita-v1-fondasi-landing, Property 3: Setiap ServiceCard memiliki tombol Detail yang mengarah ke /services`
    - Gunakan `fc.constantFrom(...serviceItems)` dengan `numRuns: 100`

  - [x] 4.7 Buat KeunggulanSection
    - Buat `components/KeunggulanSection.tsx` dengan 3 kolom: Bahan Berkualitas, Harga Bersaing, Pengerjaan Tepat Waktu
    - Setiap kolom memiliki judul dan deskripsi singkat
    - _Requirements: 7.1, 7.2_
    - Git commit: `V1: KeunggulanSection - 3 kolom keunggulan bisnis`

  - [ ]* 4.8 Tulis unit tests untuk KeunggulanSection
    - Test: KeunggulanSection menampilkan 3 judul keunggulan
    - _Requirements: 7.1_

  - [ ]* 4.9 Tulis property test untuk KeunggulanSection (Property 4)
    - **Property 4: Setiap item keunggulan dirender dengan judul dan deskripsi**
    - **Validates: Requirements 7.2**
    - Tag komentar: `// Feature: besikita-v1-fondasi-landing, Property 4: Setiap item keunggulan dirender dengan judul dan deskripsi`
    - Gunakan `fc.constantFrom(...advantageItems)` dengan `numRuns: 100`

  - [x] 4.10 Rakit app/page.tsx dengan semua section
    - Import dan susun `HeroSection`, `LayananSection`, `KeunggulanSection` di `app/page.tsx`
    - _Requirements: 8.1_
    - Git commit: `V1: Halaman Beranda - rakit HeroSection LayananSection KeunggulanSection`

- [ ] 5. Checkpoint - Pastikan semua tests lulus
  - Jalankan `vitest --run` dan pastikan semua tests hijau sebelum lanjut.
  - Tanya user jika ada pertanyaan atau perubahan yang diperlukan.

- [ ] 6. Routing dan halaman placeholder
  - [-] 6.1 Buat halaman placeholder /services, /gallery, /contact
    - Buat `app/services/page.tsx`, `app/gallery/page.tsx`, `app/contact/page.tsx` dengan konten minimal
    - Setiap halaman menampilkan judul yang menandai halaman tersedia
    - _Requirements: 8.2, 8.3, 8.4, 8.5_
    - Git commit: `V1: Halaman placeholder - /services /gallery /contact`

  - [ ]* 6.2 Tulis unit tests untuk halaman placeholder
    - Test: halaman `/services` dapat dirender tanpa error
    - Test: halaman `/gallery` dapat dirender tanpa error
    - Test: halaman `/contact` dapat dirender tanpa error
    - _Requirements: 8.2, 8.3, 8.4_

  - [ ] 6.3 Verifikasi navigasi Navbar ke semua halaman
    - Pastikan semua link di Navbar mengarah ke rute yang benar dan tidak ada error
    - _Requirements: 2.4, 2.5, 2.6, 2.7, 8.1, 8.2, 8.3, 8.4_
    - Git commit: `V1: Verifikasi navigasi - semua rute Navbar berjalan tanpa error`

- [ ] 7. Final checkpoint - Pastikan semua tests lulus
  - Jalankan `vitest --run` untuk memastikan semua tests lulus.
  - Tanya user jika ada pertanyaan atau penyesuaian akhir sebelum deployment.

## Notes

- Subtask bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap subtask implementasi diakhiri dengan git commit sesuai format `V1: [nama subtask] - [deskripsi singkat]`
- Jalankan tests dengan `vitest --run` (bukan watch mode)
- Property tests menggunakan `fc.constantFrom` karena data statis — tetap valid untuk memverifikasi invariant berlaku pada setiap elemen data
- Semua komponen adalah React Server Components kecuali ada kebutuhan interaktivitas
