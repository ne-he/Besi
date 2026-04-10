# Implementation Plan: BesiKita V5 — Form Permintaan Jasa Kustom

## Overview

Implementasi halaman `/request` sebagai jalur custom order. Dibangun di atas V4 (cart system, Navbar) dengan TypeScript + Next.js App Router + Tailwind CSS. Data disimpan ke `localStorage` key `"besikita_requests"`. Setiap subtask diakhiri dengan satu commit.

## Tasks

- [ ] 1. Persiapan halaman dan form dasar
  - [x] 1.1 Buat halaman skeleton dan tambah link Navbar
    - Buat folder `app/request/` dengan file `page.tsx` sebagai Client Component (`"use client"`)
    - Tampilkan heading "Permintaan Jasa Kustom" dan deskripsi singkat layanan custom order
    - Tambahkan `<Link href="/request">Custom Order</Link>` di `components/Navbar.tsx` antara "Galeri" dan "Kontak"
    - _Requirements: 1.1, 1.2, 1.3_
    - Commit: `git add . && git commit -m "V5: 1.1 Skeleton halaman /request dan link Navbar Custom Order"`

  - [x] 1.2 Buat form dasar dengan useState untuk field identitas
    - Tambahkan state `nama`, `email`, `telepon` dengan `useState`
    - Render tiga field: input text "Nama Lengkap", input email "Email", input tel "Nomor Telepon"
    - Styling Tailwind: label, input dengan border/rounded/focus ring, layout vertikal
    - _Requirements: 2.1, 2.2, 2.3_
    - Commit: `git add . && git commit -m "V5: 1.2 Form dasar field identitas (nama, email, telepon)"`

- [ ] 2. Field jenis barang dan ukuran
  - [x] 2.1 Tambahkan field select jenis barang dengan conditional field
    - Tambahkan state `jenisBarang` dan `lainnyaJikaAda`
    - Render dropdown select "Jenis Barang" dengan opsi: "Kursi Besi", "Pagar Besi", "Kanopi", "Lainnya"
    - Tampilkan field input teks "Sebutkan jenis barang" hanya jika `jenisBarang === "Lainnya"`
    - _Requirements: 3.1, 3.2, 3.3_
    - Commit: `git add . && git commit -m "V5: 2.1 Field jenis barang dengan conditional field Lainnya"`

  - [x] 2.2 Tambahkan field ukuran dalam grid 3 kolom
    - Tambahkan state `panjang`, `lebar`, `tinggi` (tipe `number | ""`)
    - Render tiga input number "Panjang (cm)", "Lebar (cm)", "Tinggi (cm)" dalam grid 3 kolom (`grid grid-cols-3 gap-4`)
    - Set atribut `min={1}` pada setiap input
    - _Requirements: 4.1, 4.2_
    - Commit: `git add . && git commit -m "V5: 2.2 Field ukuran panjang/lebar/tinggi grid 3 kolom"`

- [ ] 3. Bahan dan catatan
  - [x] 3.1 Tambahkan dropdown pilihan bahan besi dari data/materials.ts
    - Tambahkan state `bahan` dengan nilai default `"vendor"`
    - Import `materials` dari `data/materials.ts`
    - Render dropdown "Pilihan Bahan Besi": opsi pertama "Sesuai rekomendasi vendor" (value `"vendor"`), diikuti semua item dari `materials` (value = `material.id`, label = `material.nama`)
    - _Requirements: 5.1, 5.2, 5.3_
    - Commit: `git add . && git commit -m "V5: 3.1 Dropdown pilihan bahan besi dari data/materials.ts"`

  - [x] 3.2 Tambahkan textarea catatan dan input file gambar referensi
    - Tambahkan state `catatan`
    - Render textarea "Catatan Tambahan" (opsional, tidak wajib)
    - Render input file "Upload Gambar Referensi" dengan `accept="image/*"` (opsional)
    - _Requirements: 6.1, 6.2_
    - Commit: `git add . && git commit -m "V5: 3.2 Textarea catatan dan input file gambar referensi"`

- [ ] 4. Validasi, preview gambar, dan submit
  - [-] 4.1 Buat utils/requests.ts dengan fungsi validate, buildRequestObject, saveRequest, getRequests
    - Tambahkan interface `RequestObject` ke `types/index.ts` (id, nama, email, telepon, jenisBarang, lainnyaJikaAda, panjang, lebar, tinggi, bahan, catatan, gambarPreview, status: "baru", createdAt)
    - Buat `utils/requests.ts` dengan export: `FormState`, `FormErrors`, `validate()`, `buildRequestObject()`, `saveRequest()`, `getRequests()`
    - `validate()` mengembalikan semua error sekaligus (tidak berhenti di error pertama)
    - Aturan validasi: nama tidak kosong/whitespace, email regex valid, telepon minimal 10 digit, jenisBarang tidak kosong, lainnyaJikaAda wajib jika jenisBarang="Lainnya", panjang/lebar/tinggi > 0
    - `saveRequest()` dan `getRequests()` dibungkus try/catch (silent fail jika localStorage tidak tersedia)
    - _Requirements: 2.4, 2.5, 2.6, 3.4, 3.5, 4.3, 5.4, 7.1, 7.2, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5_
    - Commit: `git add . && git commit -m "V5: 4.1 utils/requests.ts — validate, buildRequestObject, saveRequest, getRequests"`

  - [ ]* 4.1a Tulis property-based tests untuk utils/requests.ts
    - Buat `utils/requests.test.ts` menggunakan Vitest + fast-check
    - **Property 1: Validasi nama kosong selalu menghasilkan error** — generator `fc.string()` filter hanya whitespace/kosong → assert `errors.nama` ada — **Validates: Requirements 2.4**
    - **Property 2: Validasi email format invalid selalu menghasilkan error** — generator `fc.string()` yang tidak cocok regex email → assert `errors.email` ada — **Validates: Requirements 2.5**
    - **Property 3: Validasi telepon kurang dari 10 digit selalu menghasilkan error** — generator `fc.string()` dengan digit count < 10 → assert `errors.telepon` ada — **Validates: Requirements 2.6**
    - **Property 4: Validasi dimensi kurang dari 1 selalu menghasilkan error** — generator `fc.record({ panjang: fc.integer({ max: 0 }), ... })` → assert error field dimensi ada — **Validates: Requirements 4.3**
    - **Property 5: Validasi mengembalikan semua error sekaligus** — generator `fc.record` dengan beberapa field invalid → assert semua key error hadir — **Validates: Requirements 7.2**
    - **Property 6: buildRequestObject menghasilkan struktur lengkap dan benar** — generator `fc.record` dengan semua field valid → assert semua field ada dengan tipe benar, `status === "baru"`, `createdAt` adalah ISO string valid — **Validates: Requirements 7.4, 8.4, 8.5**
    - **Property 7: saveRequest mempertahankan data yang sudah ada** — generator `fc.array(arbitraryRequest)` sebagai state awal + request baru → assert semua item lama masih ada setelah `saveRequest` — **Validates: Requirements 7.5, 8.2, 8.3**
    - Setiap test dikonfigurasi minimum 100 iterasi (`{ numRuns: 100 }`)
    - Tag setiap test: `// Feature: besikita-v5-form-permintaan-jasa, Property N: <teks>`
    - Commit: `git add . && git commit -m "V5: 4.1a Property-based tests untuk utils/requests.ts (fast-check)"`

  - [~] 4.2 Implementasi preview gambar dengan FileReader
    - Tambahkan state `imagePreview` (`string | null`)
    - Buat fungsi `handleImageChange(e)`: baca file dengan `FileReader.readAsDataURL`, set `imagePreview` ke data URL hasil baca; handle `onerror` dengan set `imagePreview` ke null
    - Tampilkan thumbnail `<img>` dengan `width={100}` di bawah input file jika `imagePreview` tidak null
    - _Requirements: 6.3, 6.4_
    - Commit: `git add . && git commit -m "V5: 4.2 Preview gambar referensi dengan FileReader (thumbnail 100px)"`

  - [~] 4.3 Implementasi fungsi submit dengan validasi dan simpan ke localStorage
    - Tambahkan state `errors`, `loading`, `successMessage`
    - Buat fungsi `handleSubmit(e)`: panggil `validate()`, jika ada error set `errors` dan return; jika valid set `loading=true`, panggil `buildRequestObject()` + `saveRequest()`, tampilkan success message, reset form, scroll ke atas
    - Tampilkan pesan error di bawah masing-masing field yang tidak valid
    - Tampilkan notifikasi sukses setelah submit berhasil
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_
    - Commit: `git add . && git commit -m "V5: 4.3 Fungsi submit — validasi, simpan localStorage, success message, scroll top"`

  - [~] 4.4 Tambahkan tombol Batal dan loading state pada tombol submit
    - Buat fungsi `handleReset()`: reset semua state field ke nilai awal, set `imagePreview` ke null, bersihkan `errors` dan `successMessage`
    - Render tombol "Batal" yang memanggil `handleReset()`
    - Render tombol "Kirim Permintaan" dengan atribut `disabled={loading}` dan teks berubah saat loading (misal "Menyimpan...")
    - _Requirements: 7.3, 7.9_
    - Commit: `git add . && git commit -m "V5: 4.4 Tombol Batal dan loading state tombol submit"`

- [ ] 5. Checkpoint — Pastikan semua tests pass
  - Pastikan semua tests pass, tanyakan ke user jika ada pertanyaan.

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP lebih cepat
- Setiap task mereferensikan requirements spesifik untuk traceabilitas
- `utils/requests.ts` mengikuti pola yang sama dengan `utils/cart.ts` (try/catch, silent fail)
- Property-based tests menggunakan fast-check dengan minimum 100 iterasi per property
- Tidak ada server action, API route, atau upload file ke server — semua operasi client-side
