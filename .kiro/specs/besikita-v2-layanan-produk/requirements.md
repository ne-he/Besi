# Requirements Document

## Introduction

BesiKita V2 membangun di atas fondasi V1 dengan menambahkan halaman daftar produk/layanan yang fungsional dan halaman detail produk statis. Data produk disimpan di file lokal sebagai array of objects. V2 mencakup 6 produk (kursi, pagar, kanopi), grid responsif di `/services`, dan halaman detail di `/product/[id]` dengan tombol pemesanan placeholder.

## Glossary

- **Product**: Objek data yang merepresentasikan satu produk/layanan besi dengan atribut lengkap
- **Product_List_Page**: Halaman `/services` yang menampilkan semua produk dalam bentuk grid
- **Product_Detail_Page**: Halaman `/product/[id]` yang menampilkan informasi lengkap satu produk
- **Product_Card**: Komponen kartu yang menampilkan ringkasan satu produk di grid
- **Product_Data**: File `data/products.ts` yang menjadi sumber data tunggal semua produk
- **Navbar**: Komponen navigasi global yang sudah ada dari V1
- **Placeholder_Alert**: Pesan alert browser yang muncul saat fitur belum tersedia

## Requirements

### Requirement 1: Data Produk

**User Story:** As a developer, I want a centralized product data file, so that all product information is managed in one place and can be reused across pages.

#### Acceptance Criteria

1. THE Product_Data SHALL mendefinisikan tipe `Product` dengan field: `id` (string), `nama` (string), `slug` (string), `kategori` (string), `deskripsiSingkat` (string), `deskripsiPanjang` (string), `gambar` (string), `hargaDasar` (number), `dimensiContoh` (string).
2. THE Product_Data SHALL mengekspor array `products` yang berisi tepat 6 objek Product.
3. THE Product_Data SHALL memuat tepat 2 produk dengan kategori "Kursi Besi".
4. THE Product_Data SHALL memuat tepat 2 produk dengan kategori "Pagar Besi".
5. THE Product_Data SHALL memuat tepat 2 produk dengan kategori "Kanopi".
6. WHEN Product_Data diimpor, THE Product_Data SHALL memastikan setiap produk memiliki `id` yang unik di antara semua produk.
7. THE Product_Data SHALL menggunakan URL gambar placeholder dari `https://placehold.co/400x300` untuk setiap produk.

### Requirement 2: Halaman Daftar Produk (/services)

**User Story:** As a visitor, I want to see all available iron products in a grid layout, so that I can browse and choose the product that suits my needs.

#### Acceptance Criteria

1. THE Product_List_Page SHALL menampilkan judul "Layanan Olah Besi Kami" di bagian atas halaman.
2. THE Product_List_Page SHALL menampilkan semua produk dari Product_Data dalam bentuk grid.
3. THE Product_List_Page SHALL menggunakan layout grid 1 kolom pada layar mobile, 2 kolom pada layar tablet, dan 3 kolom pada layar desktop.
4. WHEN Product_List_Page dirender, THE Product_Card SHALL menampilkan gambar produk, nama produk, dan deskripsi singkat produk.
5. THE Product_Card SHALL menampilkan tombol "Lihat Detail" menggunakan `next/link`.
6. WHEN visitor mengklik tombol "Lihat Detail" pada sebuah Product_Card, THE Product_List_Page SHALL mengarahkan visitor ke rute `/product/[id]` yang sesuai dengan `id` produk tersebut.

### Requirement 3: Halaman Detail Produk (/product/[id])

**User Story:** As a visitor, I want to see complete information about a specific product, so that I can make an informed decision before ordering.

#### Acceptance Criteria

1. WHEN visitor mengakses `/product/[id]` dengan `id` yang valid, THE Product_Detail_Page SHALL menampilkan gambar produk, nama produk, kategori, deskripsi panjang, dimensi contoh, dan harga dasar.
2. IF visitor mengakses `/product/[id]` dengan `id` yang tidak ditemukan di Product_Data, THEN THE Product_Detail_Page SHALL menampilkan pesan "Produk tidak ditemukan".
3. THE Product_Detail_Page SHALL menampilkan tombol "Pesan Jasa".
4. WHEN visitor mengklik tombol "Pesan Jasa", THE Product_Detail_Page SHALL menampilkan Placeholder_Alert dengan pesan "Fitur pemesanan akan tersedia di V4".

### Requirement 4: Navigasi

**User Story:** As a visitor, I want consistent navigation that correctly links to the services page, so that I can always find my way to the product list.

#### Acceptance Criteria

1. WHEN visitor mengklik menu "Layanan" di Navbar, THE Navbar SHALL mengarahkan visitor ke rute `/services`.
2. THE Product_List_Page SHALL dapat diakses dari Navbar tanpa error.
3. WHEN visitor berada di Product_Detail_Page, THE Navbar SHALL tetap tampil di bagian atas halaman.
