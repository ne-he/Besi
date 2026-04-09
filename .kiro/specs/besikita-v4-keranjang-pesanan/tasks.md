# Implementation Plan: BesiKita V4 — Keranjang Pesanan

## Overview

Implementasi sistem keranjang belanja (cart) berbasis `localStorage` di atas fondasi V3. Terdiri dari utilitas cart (`utils/cart.ts`), halaman `/cart`, modifikasi `ProductDetailClient`, dan modifikasi `Navbar`. Setiap subtask diakhiri dengan commit git.

## Tasks

- [ ] 1. Struktur data keranjang dan fungsi localStorage
  - [x] 1.1 Buat `utils/cart.ts` — definisikan tipe dan fungsi baca
    - Buat file `utils/cart.ts`
    - Definisikan dan ekspor interface `CartItem` dengan field: `id`, `productId`, `productName`, `materialName`, `thickness`, `quantity`, `pricePerUnit`, `subtotal`
    - Implementasikan dan ekspor `getCart(): CartItem[]` — baca dari `localStorage["besikita_cart"]`, return `[]` jika tidak ada atau parse error (try/catch)
    - Implementasikan dan ekspor `saveCart(cart: CartItem[]): void` — `JSON.stringify` lalu `localStorage.setItem`
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
    - Commit: `git add . && git commit -m "V4: 1.1 cart.ts - definisi CartItem, getCart, saveCart"`

  - [ ]* 1.1.1 Tulis property test untuk round-trip saveCart/getCart
    - File: `utils/cart.test.ts`
    - **Property 1: saveCart/getCart round-trip**
    - **Validates: Requirements 1.2, 1.4, 5.1**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 1: saveCart/getCart round-trip`
    - Gunakan `fc.array(cartItemArb)` → `saveCart` → `getCart` → deep equal
    - Minimum 100 iterasi

  - [x] 1.2 Tambahkan `addToCart`, `removeFromCart`, `clearCart` ke `utils/cart.ts`
    - Implementasikan `addToCart(item: Omit<CartItem, 'subtotal'>): void`
      - Hitung `subtotal = pricePerUnit * quantity`
      - Cek duplikat via `productId + materialName + thickness`; jika ada → tambah quantity dan hitung ulang subtotal; jika tidak → push item baru dengan `id = crypto.randomUUID()`
      - Panggil `saveCart` setelah perubahan
    - Implementasikan `removeFromCart(id: string): void` — filter by `id`, panggil `saveCart`
    - Implementasikan `clearCart(): void` — panggil `saveCart([])`
    - _Requirements: 1.5, 1.6, 1.7, 1.8, 1.9_
    - Commit: `git add . && git commit -m "V4: 1.2 cart.ts - addToCart, removeFromCart, clearCart"`

  - [ ]* 1.2.1 Tulis property test untuk subtotal addToCart (Property 2)
    - **Property 2: subtotal dihitung benar saat addToCart**
    - **Validates: Requirements 1.5**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 2: subtotal benar saat addToCart`
    - Gunakan `fc.record({ pricePerUnit: fc.nat(), quantity: fc.nat({ min: 1 }) })`

  - [ ]* 1.2.2 Tulis property test untuk merge duplikat addToCart (Property 3)
    - **Property 3: addToCart menggabungkan item duplikat**
    - **Validates: Requirements 1.6**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 3: addToCart merge duplikat`
    - Generate item, panggil `addToCart` dua kali → quantity = sum, subtotal = pricePerUnit * sum

  - [ ]* 1.2.3 Tulis property test untuk item baru menambah panjang array (Property 4)
    - **Property 4: addToCart menambah panjang array untuk item baru**
    - **Validates: Requirements 1.7**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 4: addToCart item baru menambah panjang`
    - Generate cart + item unik → length + 1

  - [ ]* 1.2.4 Tulis property test untuk removeFromCart (Property 5)
    - **Property 5: removeFromCart menghapus item yang tepat**
    - **Validates: Requirements 1.8**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 5: removeFromCart tepat`
    - Generate cart → `removeFromCart(item.id)` → item tidak ada, sisanya utuh

  - [ ]* 1.2.5 Tulis property test untuk clearCart (Property 6)
    - **Property 6: clearCart selalu menghasilkan keranjang kosong**
    - **Validates: Requirements 1.9**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 6: clearCart selalu kosong`
    - Generate cart → `clearCart()` → `getCart()` = `[]`

- [ ] 2. Tambahkan `updateQuantity` ke `utils/cart.ts`
  - [x] 2.1 Implementasikan `updateQuantity(id: string, newQuantity: number): CartItem[]`
    - Cari item berdasarkan `id`
    - Ubah `quantity` menjadi `newQuantity`, hitung ulang `subtotal = pricePerUnit * newQuantity`
    - Jika `newQuantity < 1`, tidak lakukan perubahan (return cart saat ini)
    - Panggil `saveCart`, return array `CartItem[]` terbaru
    - _Requirements: 1.10, 4.4, 5.3_
    - Commit: `git add . && git commit -m "V4: 2.1 cart.ts - updateQuantity"`

  - [ ]* 2.1.1 Tulis property test untuk updateQuantity (Property 7)
    - **Property 7: updateQuantity memperbarui quantity dan subtotal**
    - **Validates: Requirements 1.10, 4.4**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 7: updateQuantity benar`
    - Generate cart + `newQuantity` positif → `quantity === newQuantity`, `subtotal === pricePerUnit * newQuantity`

- [ ] 3. Checkpoint — Pastikan semua tests utils/cart.ts lulus
  - Jalankan `npm test` dan pastikan semua test di `utils/cart.test.ts` lulus
  - Tanya user jika ada pertanyaan sebelum melanjutkan

- [ ] 4. Integrasi "Simpan Pilihan" dari halaman detail ke keranjang
  - [x] 4.1 Modifikasi `components/ProductDetailClient.tsx` — hubungkan ke `addToCart`
    - Import `addToCart` dari `@/utils/cart`
    - Tambahkan state `addedToCart: boolean` (default `false`)
    - Ubah `handleSimpanPilihan`: panggil `addToCart({ id: crypto.randomUUID(), productId: product.id, productName: product.nama, materialName: selectedMaterial.nama, thickness: selectedThickness.label, quantity: 1, pricePerUnit: hargaTotal })`, lalu `setAddedToCart(true)`
    - Tampilkan notifikasi "Produk ditambahkan ke keranjang" saat `addedToCart === true`
    - _Requirements: 2.1, 2.2_
    - Commit: `git add . && git commit -m "V4: 4.1 ProductDetailClient - addToCart saat Simpan Pilihan"`

  - [x] 4.2 Tambahkan link "Lihat Keranjang" di `ProductDetailClient` setelah produk ditambahkan
    - Saat `addedToCart === true`, tampilkan link `<Link href="/cart">Lihat Keranjang →</Link>` di bawah notifikasi
    - _Requirements: 2.3_
    - Commit: `git add . && git commit -m "V4: 4.2 ProductDetailClient - link Lihat Keranjang"`

- [ ] 5. Halaman /cart — struktur dasar dan empty state
  - [x] 5.1 Buat `app/cart/page.tsx` dengan empty state
    - Tambahkan `"use client"` directive
    - Import `getCart`, `CartItem` dari `@/utils/cart`
    - Inisialisasi state `const [cart, setCart] = useState<CartItem[]>([])`
    - `useEffect` saat mount: `setCart(getCart())`
    - Tampilkan judul "Keranjang Belanja"
    - Jika `cart.length === 0`: tampilkan pesan "Keranjang kosong" dan tombol `<Link href="/services">Lihat Layanan</Link>`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_
    - Commit: `git add . && git commit -m "V4: 5.1 cart/page.tsx - struktur dasar dan empty state"`

- [ ] 6. Halaman /cart — daftar item dan total harga
  - [x] 6.1 Tampilkan tabel/daftar item keranjang di `app/cart/page.tsx`
    - Render daftar `CartItem` dengan kolom: `productName`, `materialName`, `thickness`, input number `quantity` (min=1), `subtotal` diformat `toLocaleString("id-ID")`, tombol hapus per item (ikon tempat sampah atau teks "Hapus")
    - Implementasikan handler `handleRemove(id)` → `removeFromCart(id)` → `setCart(getCart())`
    - _Requirements: 3.5, 4.5, 5.4_
    - Commit: `git add . && git commit -m "V4: 6.1 cart/page.tsx - daftar item dan tombol hapus"`

  - [-] 6.2 Tambahkan total harga, tombol kosongkan, dan tombol lanjutkan di `app/cart/page.tsx`
    - Hitung `totalHarga = cart.reduce((sum, item) => sum + item.subtotal, 0)`
    - Tampilkan `totalHarga` diformat `toLocaleString("id-ID")` di bagian bawah daftar
    - Implementasikan handler `handleClear()` → `clearCart()` → `setCart([])`
    - Tambahkan tombol "Kosongkan Keranjang" yang memanggil `handleClear`
    - Tambahkan tombol "Lanjutkan ke Pemesanan" (hanya tampil jika `cart.length > 0`) yang memanggil `alert("Fitur pemesanan akan tersedia di V5")`
    - _Requirements: 3.6, 4.1, 4.2, 7.1, 7.2, 7.3_
    - Commit: `git add . && git commit -m "V4: 6.2 cart/page.tsx - total harga, kosongkan, lanjutkan"`

  - [ ]* 6.2.1 Tulis property test untuk Total_Harga (Property 8)
    - **Property 8: Total_Harga adalah jumlah semua subtotal**
    - **Validates: Requirements 4.1**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 8: Total_Harga = sum subtotal`
    - Generate array `CartItem` → `total = cart.reduce((sum, item) => sum + item.subtotal, 0)` → verifikasi konsistensi

- [ ] 7. Penyempurnaan cart — update quantity real-time
  - [~] 7.1 Hubungkan input quantity ke `updateQuantity` di `app/cart/page.tsx`
    - Implementasikan handler `handleQuantityChange(id: string, qty: number)` → `setCart(updateQuantity(id, qty))`
    - Pasang `onChange` pada input number setiap item yang memanggil `handleQuantityChange`
    - Pastikan perubahan quantity memicu re-render `subtotal` per item dan `totalHarga`
    - _Requirements: 4.3, 4.4, 5.3_
    - Commit: `git add . && git commit -m "V4: 7.1 cart/page.tsx - update quantity real-time"`

- [ ] 8. Checkpoint — Pastikan semua tests lulus dan halaman /cart berfungsi
  - Jalankan `npm test` dan pastikan semua test lulus
  - Tanya user jika ada pertanyaan sebelum melanjutkan

- [ ] 9. Navigasi keranjang di Navbar
  - [~] 9.1 Modifikasi `components/Navbar.tsx` — tambahkan link dan Cart_Badge
    - Tambahkan `"use client"` directive
    - Import `getCart` dari `@/utils/cart`
    - Tambahkan state `const [cartCount, setCartCount] = useState(0)`
    - `useEffect` saat mount: `setCartCount(getCart().length)`
    - Tambahkan link `<Link href="/cart">` di nav dengan ikon keranjang atau teks "Keranjang"
    - Tampilkan Cart_Badge (angka kecil) di atas link jika `cartCount > 0`; sembunyikan jika `cartCount === 0`
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
    - Commit: `git add . && git commit -m "V4: 9.1 Navbar - link cart dan Cart_Badge"`

  - [ ]* 9.1.1 Tulis property test untuk Cart_Badge (Property 9)
    - **Property 9: Cart_Badge menampilkan jumlah item yang benar**
    - **Validates: Requirements 6.2**
    - Tag: `// Feature: besikita-v4-keranjang-pesanan, Property 9: Cart_Badge = cart.length`
    - Generate array `CartItem` → `saveCart` → `getCart().length` === jumlah yang ditampilkan badge

- [ ] 10. Final checkpoint — Semua tests lulus dan integrasi lengkap
  - Jalankan `npm test` dan pastikan semua test lulus
  - Verifikasi alur end-to-end: detail produk → tambah ke cart → lihat di `/cart` → update quantity → hapus item → kosongkan
  - Tanya user jika ada pertanyaan

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP lebih cepat
- Setiap subtask diakhiri dengan commit git sesuai format `V4: [nomor] [komponen] - [deskripsi singkat]`
- Property tests menggunakan `fast-check` (sudah tersedia di `devDependencies`)
- Minimum 100 iterasi per property test
- `getCart()` dan `saveCart()` harus dibungkus `try/catch` untuk menangani SSR dan localStorage tidak tersedia
- `updateQuantity` tidak memproses `newQuantity < 1`
- Cart_Badge di Navbar ter-update saat komponen remount (navigasi antar halaman); update real-time dalam satu halaman bersifat opsional
