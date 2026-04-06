# Implementation Plan: BesiKita V2 — Layanan & Produk

## Overview

Implementasi dilakukan secara incremental dalam 4 task utama (10 subtask), setiap subtask diakhiri dengan satu git commit. Data produk disimpan sebagai static array TypeScript, tanpa database atau API eksternal.

## Tasks

- [ ] 1. Data produk dummy
  - [x] 1.1 Buat folder `data/` dan file `data/products.ts`. Definisikan interface `Product` di `types/index.ts` dengan field: `id`, `nama`, `slug`, `kategori`, `deskripsiSingkat`, `deskripsiPanjang`, `gambar`, `hargaDasar`, `dimensiContoh`. Re-export tipe dari `data/products.ts`.
    - _Requirements: 1.1_
    - _Commit: "V2: Setup tipe Product - Definisikan interface Product di types/index.ts dan buat data/products.ts"_

  - [ ]* 1.1.1 Write property test untuk tipe Product (Property 1)
    - **Property 1: Semua produk memiliki field yang lengkap dan bertipe benar**
    - **Validates: Requirements 1.1**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 1: semua field lengkap`

  - [x] 1.2 Isi array `products` di `data/products.ts` dengan 6 produk: 2 Kursi Besi (`kursi-lipat-01`, `kursi-taman-01`), 2 Pagar Besi (`pagar-minimalis-01`, `pagar-klasik-01`), 2 Kanopi (`kanopi-carport-01`, `kanopi-teras-01`). Semua `gambar` menggunakan `https://placehold.co/400x300`.
    - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_
    - _Commit: "V2: Isi data produk - Tambahkan 6 produk dummy dengan gambar placeholder"_

  - [ ]* 1.2.1 Write property tests untuk data produk (Property 2, 3, 4)
    - **Property 2: Semua id produk unik** — `Set(ids).size === products.length`
    - **Property 3: Semua gambar menggunakan URL placeholder yang benar** — `gambar.startsWith("https://placehold.co")`
    - **Property 4: Distribusi kategori sesuai spesifikasi** — tiap kategori tepat 2 produk, total 6
    - **Validates: Requirements 1.2, 1.3, 1.4, 1.5, 1.6, 1.7**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 2: id unik`
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 3: URL gambar valid`
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 4: distribusi kategori`

- [ ] 2. Halaman /services
  - [-] 2.1 Update `app/services/page.tsx`. Import array `products` dari `data/products.ts`. Render heading `<h1>Layanan Olah Besi Kami</h1>` di bagian atas halaman.
    - _Requirements: 2.1_
    - _Commit: "V2: Services page heading - Import data produk dan tampilkan judul halaman"_

  - [~] 2.2 Buat komponen `components/ProductCard.tsx` dengan props `{ product: Product }`. Render gambar (`<img>`), nama, deskripsiSingkat. Buat grid responsif di `app/services/page.tsx`: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Map `products` → `<ProductCard />`.
    - _Requirements: 2.2, 2.3, 2.4_
    - _Commit: "V2: ProductCard dan grid - Buat komponen ProductCard dan grid responsif di /services"_

  - [ ]* 2.2.1 Write property test untuk ProductCard render (Property 5)
    - **Property 5: ProductCard merender informasi produk dengan benar**
    - For all products, render `<ProductCard product={p} />` → output mengandung `p.nama`, `p.deskripsiSingkat`, dan link dengan href `/product/${p.id}`
    - **Validates: Requirements 2.4, 2.5, 2.6**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 5: ProductCard render`

  - [ ]* 2.2.2 Write property test untuk halaman daftar (Property 6)
    - **Property 6: Halaman daftar merender semua produk**
    - Render ServicesPage → jumlah elemen ProductCard === `products.length`
    - **Validates: Requirements 2.2**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 6: semua produk dirender`

  - [~] 2.3 Tambahkan tombol "Lihat Detail" di `ProductCard` menggunakan `next/link` dengan `href={/product/${product.id}}`.
    - _Requirements: 2.5, 2.6_
    - _Commit: "V2: Tombol Lihat Detail - Tambahkan Link ke /product/[id] di ProductCard"_

- [ ] 3. Halaman detail produk
  - [~] 3.1 Buat `app/product/[id]/page.tsx` dengan dynamic routing. Terima `params: { id: string }`. Cari produk dengan `products.find(p => p.id === params.id)`. Jika tidak ditemukan, render pesan "Produk tidak ditemukan".
    - _Requirements: 3.2_
    - _Commit: "V2: Detail page routing - Buat halaman /product/[id] dengan dynamic routing dan not-found handling"_

  - [ ]* 3.1.1 Write property test untuk invalid id (Property 8)
    - **Property 8: Id tidak valid menampilkan pesan not-found**
    - Generate arbitrary string yang bukan id produk valid → render detail page → output mengandung "Produk tidak ditemukan"
    - **Validates: Requirements 3.2**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 8: detail page invalid id`

  - [~] 3.2 Tampilkan detail lengkap produk: gambar, nama, kategori, deskripsiPanjang, dimensiContoh, dan hargaDasar (format Rupiah).
    - _Requirements: 3.1_
    - _Commit: "V2: Detail produk lengkap - Tampilkan semua field produk di halaman detail"_

  - [ ]* 3.2.1 Write property test untuk valid id (Property 7)
    - **Property 7: Halaman detail menampilkan semua field untuk id yang valid**
    - For all products, render detail page dengan `p.id` → output mengandung nama, kategori, deskripsiPanjang, dimensiContoh, hargaDasar
    - **Validates: Requirements 3.1**
    - Tag: `// Feature: besikita-v2-layanan-produk, Property 7: detail page valid id`

  - [~] 3.3 Tambahkan tombol "Pesan Jasa" di halaman detail dengan `onClick={() => alert("Fitur pemesanan akan tersedia di V4")}`.
    - _Requirements: 3.3, 3.4_
    - _Commit: "V2: Tombol Pesan Jasa - Tambahkan tombol dengan alert placeholder di halaman detail"_

- [ ] 4. Navigasi dan penyempurnaan
  - [~] 4.1 Verifikasi semua tombol "Lihat Detail" di `/services` mengarah ke halaman detail yang benar. Pastikan `href` di setiap `ProductCard` sesuai dengan `id` produk yang dirender.
    - _Requirements: 2.6_
    - _Commit: "V2: Verifikasi navigasi detail - Pastikan semua link Lihat Detail mengarah ke id yang benar"_

  - [~] 4.2 Pastikan `Navbar` memiliki link "Layanan" dengan `href="/services"` yang aktif dan berfungsi. Verifikasi Navbar tampil di halaman detail produk.
    - _Requirements: 4.1, 4.2, 4.3_
    - _Commit: "V2: Navbar /services aktif - Verifikasi dan perbaiki navigasi Navbar ke halaman layanan"_

- [ ] 5. Final checkpoint — Pastikan semua tests pass
  - Jalankan seluruh test suite dengan `vitest --run`
  - Pastikan semua property tests (Property 1–8) dan unit tests lulus
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan.

## Notes

- Subtask bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap subtask diakhiri satu git commit dengan format: `"V2: [nama subtask] - [deskripsi singkat]"`
- Property tests menggunakan **fast-check** dengan minimum 100 iterasi per property
- Property 1–4 adalah pure data tests (tanpa render), sangat cepat dieksekusi
- Property 5–8 menggunakan React Testing Library + fast-check
- Semua data diakses secara synchronous — tidak ada async/await di data layer
