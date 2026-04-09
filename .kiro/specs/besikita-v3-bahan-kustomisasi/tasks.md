# Implementation Plan: BesiKita V3 — Bahan Besi & Kustomisasi

## Overview

Implementasi dilakukan secara incremental dalam 4 task utama dan 10 subtask. Setiap subtask diakhiri dengan satu git commit. Semua kode menggunakan TypeScript + React (Next.js 14 App Router).

## Tasks

- [ ] 1. Data bahan besi
  - [x] 1.1 Buat `data/materials.ts` dengan tipe `Material` dan array `materials` (3 item)
    - Definisikan interface `Material` dengan field `id`, `nama`, `hargaTambahanPerUnit`, `satuan`
    - Ekspor array `materials` berisi Hollow Hitam (50000), Hollow Galvanis (75000), Siku Besi (40000)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_
    - Git commit: `V3: data/materials.ts - definisi tipe Material dan 3 data bahan besi`

  - [ ]* 1.2 Tulis property test untuk `materials`
    - **Property 1: Integritas Struktur Data** — setiap elemen memiliki field bertipe benar
    - **Property 2: Keunikan ID** — tidak ada dua elemen dengan `id` yang sama
    - **Validates: Requirements 1.1, 1.2, 1.6**
    - Sertakan unit test untuk nilai konkret (Req 1.3, 1.4, 1.5)

  - [x] 1.3 Buat `data/thickness.ts` dengan tipe `ThicknessOption` dan array `thicknessOptions` (3 item)
    - Definisikan interface `ThicknessOption` dengan field `id`, `label`, `hargaTambahan`
    - Ekspor array `thicknessOptions` berisi 1.2mm (0), 1.5mm (25000), 2.0mm (50000)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_
    - Git commit: `V3: data/thickness.ts - definisi tipe ThicknessOption dan 3 opsi ketebalan`

  - [ ]* 1.4 Tulis property test untuk `thicknessOptions`
    - **Property 1: Integritas Struktur Data** — setiap elemen memiliki field bertipe benar
    - **Property 2: Keunikan ID** — tidak ada dua elemen dengan `id` yang sama
    - **Validates: Requirements 2.1, 2.2, 2.6**
    - Sertakan unit test untuk nilai konkret (Req 2.3, 2.4, 2.5)

- [ ] 2. Komponen selector
  - [x] 2.1 Buat `components/MaterialSelector.tsx` (Client Component)
    - Tambahkan `"use client"` directive
    - Terima props `selectedMaterial: Material` dan `onMaterialChange: (m: Material) => void`
    - Render semua material dari `data/materials.ts` sebagai tombol radio-style
    - Tampilkan `nama` dan `hargaTambahanPerUnit` (format Rupiah) di setiap tombol
    - Tandai tombol aktif berdasarkan `selectedMaterial.id`
    - _Requirements: 3.1, 3.2, 3.4, 3.5_
    - Git commit: `V3: MaterialSelector.tsx - komponen pilihan jenis bahan besi`

  - [ ]* 2.2 Tulis property test untuk `MaterialSelector`
    - **Property 3: MaterialSelector Merender Semua Material** — jumlah tombol = panjang array
    - **Property 4: MaterialSelector Callback Dipanggil dengan Argumen Benar** — klik memanggil callback dengan material yang tepat
    - **Property 5: MaterialSelector Menandai Pilihan Aktif** — hanya satu tombol aktif sesuai `selectedMaterial.id`
    - **Validates: Requirements 3.2, 3.3, 3.4, 3.5**

  - [x] 2.3 Buat `components/ThicknessSelector.tsx` (Client Component)
    - Tambahkan `"use client"` directive
    - Terima props `selectedThickness: ThicknessOption` dan `onThicknessChange: (t: ThicknessOption) => void`
    - Render semua opsi dari `data/thickness.ts` sebagai tombol radio-style
    - Tampilkan `label` dan `hargaTambahan` (format Rupiah, "Gratis" jika 0) di setiap tombol
    - Tandai tombol aktif berdasarkan `selectedThickness.id`
    - _Requirements: 4.1, 4.2, 4.4, 4.5_
    - Git commit: `V3: ThicknessSelector.tsx - komponen pilihan ketebalan besi`

  - [ ]* 2.4 Tulis property test untuk `ThicknessSelector`
    - **Property 6: ThicknessSelector Merender Semua Opsi** — jumlah tombol = panjang array
    - **Property 7: ThicknessSelector Callback Dipanggil dengan Argumen Benar** — klik memanggil callback dengan thickness yang tepat
    - **Property 8: ThicknessSelector Menandai Pilihan Aktif** — hanya satu tombol aktif sesuai `selectedThickness.id`
    - **Validates: Requirements 4.2, 4.3, 4.4, 4.5**

- [ ] 3. Checkpoint — Pastikan semua tests pass
  - Jalankan `vitest --run` dan pastikan semua test data dan selector lulus sebelum lanjut ke integrasi.

- [ ] 4. Integrasi ke halaman detail
  - [x] 4.1 Buat `components/ProductDetailClient.tsx` (Client Component wrapper dengan state)
    - Tambahkan `"use client"` directive
    - Terima props `product: Product`
    - Inisialisasi state `selectedMaterial` dengan `materials[0]` dan `selectedThickness` dengan `thicknessOptions[0]`
    - Tambahkan state `savedSelection` untuk menyimpan pilihan
    - _Requirements: 5.3, 5.4, 7.2_
    - Git commit: `V3: ProductDetailClient.tsx - wrapper client component dengan state kustomisasi`

  - [x] 4.2 Tampilkan `MaterialSelector` dan `ThicknessSelector` di `ProductDetailClient`
    - Render `MaterialSelector` di bawah deskripsi produk dan sebelum tampilan harga
    - Render `ThicknessSelector` di bawah `MaterialSelector` dan sebelum tampilan harga
    - Hubungkan `onChange` handler ke state `selectedMaterial` dan `selectedThickness`
    - _Requirements: 5.1, 5.2, 4.1, 4.3_
    - Git commit: `V3: ProductDetailClient - tampilkan MaterialSelector dan ThicknessSelector`

  - [x] 4.3 Hitung dan tampilkan harga total realtime
    - Hitung `hargaTotal = product.hargaDasar + selectedMaterial.hargaTambahanPerUnit + selectedThickness.hargaTambahan`
    - Tampilkan `hargaTotal` yang diformat dengan `toLocaleString("id-ID")`
    - Tampilkan Price Breakdown: "Harga dasar", "+ Bahan", "+ Ketebalan", "Total"
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
    - Git commit: `V3: ProductDetailClient - kalkulasi dan tampilan harga total realtime`

  - [ ]* 4.4 Tulis property test untuk kalkulasi harga dan Price Breakdown
    - **Property 9: Kalkulasi Harga Total** — `hargaTotal` selalu = jumlah ketiga komponen
    - **Property 10: Price Breakdown Merender Semua Komponen Harga** — tiga baris harga selalu tampil
    - **Property 11: Format Mata Uang Indonesia** — angka diformat dengan locale `"id-ID"`
    - **Validates: Requirements 6.1, 6.3, 6.4**

- [ ] 5. State dan realtime update
  - [x] 5.1 Pastikan `onChange` handler update state realtime
    - Verifikasi bahwa perubahan `selectedMaterial` atau `selectedThickness` langsung memperbarui `hargaTotal` tanpa reload
    - Pastikan tidak ada stale state atau closure issue pada handler
    - _Requirements: 6.1, 6.2_
    - Git commit: `V3: ProductDetailClient - verifikasi onChange handler update state realtime`

  - [x] 5.2 Ganti tombol "Pesan Jasa" menjadi tombol "Simpan Pilihan"
    - Hapus atau ganti `PesanJasaButton` dengan tombol "Simpan Pilihan" di `ProductDetailClient`
    - Saat diklik, simpan `{ material: selectedMaterial, thickness: selectedThickness }` ke state `savedSelection`
    - Tampilkan `alert("Pilihan disimpan sementara")` setelah menyimpan
    - _Requirements: 7.1, 7.2, 7.3_
    - Git commit: `V3: ProductDetailClient - ganti PesanJasaButton dengan SimpanPilihan`

  - [x] 5.3 Tambahkan Price Breakdown (rincian harga)
    - Pastikan Price Breakdown sudah terintegrasi dan tampil dengan benar di bawah selector
    - Format: "Harga dasar: Rp X", "+ Bahan: Rp Y", "+ Ketebalan: Rp Z", "Total: Rp [hargaTotal]"
    - _Requirements: 6.3, 6.4_
    - Git commit: `V3: ProductDetailClient - tambahkan Price Breakdown rincian harga`

  - [ ]* 5.4 Tulis property test untuk Simpan Pilihan
    - **Property 12: Simpan Pilihan Memperbarui State** — setelah klik, `savedSelection` berisi `selectedMaterial` dan `selectedThickness` yang aktif
    - **Validates: Requirements 7.2**
    - Sertakan unit test: tombol "Simpan Pilihan" ada di halaman (Req 7.1), klik menampilkan alert (Req 7.3)

- [ ] 6. Wire ke `app/product/[id]/page.tsx`
  - [x] 6.1 Update `page.tsx` untuk menggunakan `ProductDetailClient`
    - Pertahankan `page.tsx` sebagai Server Component
    - Teruskan data `product` ke `ProductDetailClient` sebagai props
    - Pastikan halaman detail merender `ProductDetailClient` sebagai pengganti tampilan lama
    - _Requirements: 5.1, 5.2, 5.3, 5.4_
    - Git commit: `V3: page.tsx - wire ProductDetailClient ke halaman detail produk`

- [ ] 7. Final checkpoint — Pastikan semua tests pass
  - Jalankan `vitest --run` dan pastikan semua test lulus.
  - Verifikasi halaman `/product/[id]` merender selector, harga realtime, dan tombol Simpan Pilihan dengan benar.

## Notes

- Subtask bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap subtask diakhiri satu git commit dengan format `V3: [nama subtask] - [deskripsi singkat]`
- Property tests menggunakan `fast-check` dengan minimum 100 iterasi per property
- Unit tests menggunakan Vitest + `@testing-library/react`
- Semua kalkulasi harga terjadi di sisi klien, tidak ada API call
