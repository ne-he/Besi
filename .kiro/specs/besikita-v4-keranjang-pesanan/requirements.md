# Requirements Document

## BesiKita V4 — Halaman Pesanan (Keranjang) & Kalkulasi Total

## Introduction

BesiKita V4 membangun di atas V3 yang sudah memiliki halaman detail produk dengan pemilihan bahan dan ketebalan. Tujuan V4 adalah menambahkan sistem keranjang belanja (cart) yang persisten. User dapat menambahkan produk beserta pilihan bahan dan ketebalannya ke keranjang, mengatur kuantitas, menghapus item, dan melihat total harga. Data keranjang disimpan di `localStorage` agar tetap ada saat halaman di-refresh. Halaman `/cart` dapat diakses dari Navbar, dan terdapat tombol "Lanjutkan ke Pemesanan" sebagai placeholder untuk fitur V5.

## Glossary

- **Cart**: Sistem keranjang belanja yang menyimpan daftar item yang dipilih user
- **Cart_Page**: Halaman `/cart` yang menampilkan isi keranjang beserta kalkulasi total
- **CartItem**: Objek data yang merepresentasikan satu item dalam keranjang, berisi informasi produk, bahan, ketebalan, kuantitas, dan subtotal
- **Cart_Utils**: File `utils/cart.ts` yang berisi semua fungsi manajemen keranjang dan tipe `CartItem`
- **Cart_Storage**: Mekanisme penyimpanan keranjang menggunakan `localStorage` dengan key `"besikita_cart"`
- **Subtotal**: Hasil kalkulasi `pricePerUnit * quantity` untuk satu CartItem
- **Total_Harga**: Jumlah dari semua `subtotal` seluruh CartItem dalam keranjang
- **Navbar**: Komponen `components/Navbar.tsx` yang menampilkan navigasi utama situs
- **Cart_Badge**: Indikator jumlah item di Navbar yang menampilkan total item dalam keranjang
- **Product_Detail_Page**: Halaman `/product/[id]` yang sudah ada dari V3, tempat user memilih bahan dan ketebalan sebelum menambahkan ke keranjang
- **Simpan_Pilihan_Button**: Tombol di Product_Detail_Page yang diubah fungsinya untuk menambahkan item ke Cart
- **Material**: Tipe data dari V3 (`data/materials.ts`) dengan field `id`, `nama`, `hargaTambahanPerUnit`, `satuan`
- **ThicknessOption**: Tipe data dari V3 (`data/thickness.ts`) dengan field `id`, `label`, `hargaTambahan`

## Requirements

### Requirement 1: Struktur Data dan Utilitas Keranjang

**User Story:** As a developer, I want a centralized cart utility file, so that all cart operations and data structures are managed consistently in one place.

#### Acceptance Criteria

1. THE Cart_Utils SHALL mendefinisikan tipe `CartItem` dengan field: `id` (string), `productId` (string), `productName` (string), `materialName` (string), `thickness` (string), `quantity` (number), `pricePerUnit` (number), `subtotal` (number).
2. THE Cart_Utils SHALL mengekspor fungsi `getCart()` yang membaca data dari Cart_Storage dan mengembalikan array `CartItem`.
3. IF Cart_Storage tidak memiliki data dengan key `"besikita_cart"`, THEN THE Cart_Utils SHALL mengembalikan array kosong dari fungsi `getCart()`.
4. THE Cart_Utils SHALL mengekspor fungsi `saveCart(cart: CartItem[])` yang menyimpan array `CartItem` ke Cart_Storage sebagai JSON string.
5. THE Cart_Utils SHALL mengekspor fungsi `addToCart(item: Omit<CartItem, 'subtotal'>)` yang menghitung `subtotal` sebagai `item.pricePerUnit * item.quantity` sebelum menyimpan.
6. WHEN `addToCart` dipanggil dengan item yang memiliki kombinasi `productId`, `materialName`, dan `thickness` yang sudah ada di keranjang, THE Cart_Utils SHALL menambahkan `quantity` item baru ke `quantity` item yang sudah ada dan menghitung ulang `subtotal`.
7. WHEN `addToCart` dipanggil dengan item yang belum ada di keranjang, THE Cart_Utils SHALL menambahkan item baru ke array keranjang.
8. THE Cart_Utils SHALL mengekspor fungsi `removeFromCart(id: string)` yang menghapus CartItem dengan `id` yang sesuai dari keranjang dan menyimpan perubahan ke Cart_Storage.
9. THE Cart_Utils SHALL mengekspor fungsi `clearCart()` yang menghapus semua CartItem dari keranjang dan menyimpan array kosong ke Cart_Storage.
10. THE Cart_Utils SHALL mengekspor fungsi `updateQuantity(id: string, newQuantity: number)` yang mencari CartItem berdasarkan `id`, mengubah `quantity` menjadi `newQuantity`, menghitung ulang `subtotal` sebagai `pricePerUnit * newQuantity`, menyimpan perubahan ke Cart_Storage, dan mengembalikan array `CartItem` yang telah diperbarui.

### Requirement 2: Integrasi Tombol "Simpan Pilihan" ke Keranjang

**User Story:** As a visitor, I want to add a product with my selected material and thickness to the cart by clicking "Simpan Pilihan", so that I can collect multiple products before placing an order.

#### Acceptance Criteria

1. WHEN visitor mengklik Simpan_Pilihan_Button di Product_Detail_Page, THE Product_Detail_Page SHALL memanggil `addToCart` dengan data: `productId` dari produk yang sedang dilihat, `productName` dari nama produk, `materialName` dari `selectedMaterial.nama`, `thickness` dari `selectedThickness.label`, `quantity` sebesar 1, dan `pricePerUnit` sebagai `hargaDasar + selectedMaterial.hargaTambahanPerUnit + selectedThickness.hargaTambahan`.
2. WHEN `addToCart` berhasil dipanggil, THE Product_Detail_Page SHALL menampilkan notifikasi kepada user bahwa produk telah ditambahkan ke keranjang.
3. THE Product_Detail_Page SHALL menampilkan link atau tombol yang mengarahkan user ke halaman `/cart` setelah produk ditambahkan ke keranjang.

### Requirement 3: Halaman Keranjang — Tampilan Daftar Item

**User Story:** As a visitor, I want to see all items in my cart with their details, so that I can review my selections before proceeding.

#### Acceptance Criteria

1. THE Cart_Page SHALL dapat diakses melalui URL `/cart`.
2. WHEN Cart_Page pertama kali dirender, THE Cart_Page SHALL memanggil `getCart()` dan menyimpan hasilnya ke state komponen.
3. THE Cart_Page SHALL menampilkan judul "Keranjang Belanja".
4. WHEN keranjang kosong, THE Cart_Page SHALL menampilkan pesan "Keranjang kosong" dan tombol yang mengarahkan user ke halaman `/services`.
5. WHEN keranjang memiliki item, THE Cart_Page SHALL menampilkan daftar CartItem dengan informasi: `productName`, `materialName`, `thickness`, input number untuk `quantity`, `subtotal` yang diformat sebagai mata uang Rupiah (locale `"id-ID"`), dan tombol hapus per item.
6. THE Cart_Page SHALL menampilkan tombol "Kosongkan Keranjang" yang memanggil `clearCart()` dan memperbarui state keranjang menjadi array kosong.

### Requirement 4: Kalkulasi dan Tampilan Total Harga

**User Story:** As a visitor, I want to see the total price of all items in my cart, so that I know how much I will spend.

#### Acceptance Criteria

1. THE Cart_Page SHALL menghitung Total_Harga sebagai jumlah dari `subtotal` semua CartItem yang ada di state.
2. THE Cart_Page SHALL menampilkan Total_Harga di bagian bawah daftar item, diformat sebagai mata uang Rupiah (locale `"id-ID"`).
3. WHEN quantity sebuah CartItem diubah melalui input number, THE Cart_Page SHALL memanggil `updateQuantity` dengan `id` CartItem dan nilai quantity baru.
4. WHEN `updateQuantity` dipanggil, THE Cart_Page SHALL memperbarui state keranjang dengan array CartItem yang dikembalikan oleh `updateQuantity`, sehingga `subtotal` item dan Total_Harga ter-render ulang secara otomatis.
5. WHEN tombol hapus per item diklik, THE Cart_Page SHALL memanggil `removeFromCart` dengan `id` CartItem yang bersangkutan dan memperbarui state keranjang.

### Requirement 5: Persistensi Data Keranjang

**User Story:** As a visitor, I want my cart data to persist after a page refresh, so that I don't lose my selections when I navigate away or reload the page.

#### Acceptance Criteria

1. WHEN user menambahkan item ke keranjang melalui `addToCart`, THE Cart_Storage SHALL menyimpan data keranjang terbaru ke `localStorage` dengan key `"besikita_cart"`.
2. WHEN user me-refresh halaman `/cart`, THE Cart_Page SHALL memuat ulang data keranjang dari Cart_Storage dan menampilkan item yang sama seperti sebelum refresh.
3. WHEN user mengubah quantity melalui `updateQuantity`, THE Cart_Storage SHALL menyimpan data keranjang terbaru ke `localStorage`.
4. WHEN user menghapus item melalui `removeFromCart` atau `clearCart`, THE Cart_Storage SHALL memperbarui data di `localStorage` untuk mencerminkan perubahan tersebut.

### Requirement 6: Navigasi Keranjang di Navbar

**User Story:** As a visitor, I want to access the cart from the Navbar, so that I can quickly navigate to my cart from any page.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan link atau ikon yang mengarahkan user ke halaman `/cart`.
2. THE Cart_Badge SHALL menampilkan jumlah total item (jumlah elemen array) yang ada di Cart_Storage.
3. WHEN Cart_Storage berubah (item ditambah, dihapus, atau keranjang dikosongkan), THE Cart_Badge SHALL memperbarui jumlah yang ditampilkan tanpa memerlukan reload halaman penuh.
4. WHEN Cart_Storage kosong atau tidak ada data, THE Cart_Badge SHALL tidak menampilkan badge atau menampilkan angka 0.

### Requirement 7: Tombol Lanjutkan ke Pemesanan

**User Story:** As a visitor, I want to see a "Lanjutkan ke Pemesanan" button in the cart, so that I know the next step in the ordering process even if it's not yet available.

#### Acceptance Criteria

1. THE Cart_Page SHALL menampilkan tombol "Lanjutkan ke Pemesanan" di bagian bawah halaman keranjang.
2. WHEN visitor mengklik tombol "Lanjutkan ke Pemesanan", THE Cart_Page SHALL menampilkan alert dengan pesan "Fitur pemesanan akan tersedia di V5".
3. WHILE keranjang kosong, THE Cart_Page SHALL tidak menampilkan tombol "Lanjutkan ke Pemesanan".
