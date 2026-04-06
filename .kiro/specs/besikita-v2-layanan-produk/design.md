# Design Document

## BesiKita V2 — Layanan & Produk

## Overview

V2 membangun di atas fondasi Next.js 14 App Router yang sudah ada dari V1. Tujuannya adalah mengubah halaman `/services` dari placeholder menjadi halaman daftar produk yang fungsional, dan menambahkan halaman detail produk di `/product/[id]`.

Pendekatan desain:
- Data produk disimpan sebagai static array di `data/products.ts` (tidak ada database atau API eksternal)
- Komponen baru `ProductCard` dibuat terpisah dari `ServiceCard` yang sudah ada
- Routing dinamis Next.js App Router digunakan untuk halaman detail
- Semua data diakses secara synchronous (tidak ada async/await untuk data layer)

## Architecture

```
app/
  services/
    page.tsx          ← diupdate: grid ProductCard
  product/
    [id]/
      page.tsx        ← baru: halaman detail produk

components/
  ProductCard.tsx     ← baru: kartu produk dengan link detail

data/
  products.ts         ← baru: tipe Product + array 6 produk

types/
  index.ts            ← diupdate: tambah interface Product
```

Alur data:

```
data/products.ts
    │
    ├──► app/services/page.tsx ──► ProductCard (×6)
    │
    └──► app/product/[id]/page.tsx ──► detail view
```

## Components and Interfaces

### `Product` (types/index.ts)

```typescript
export interface Product {
  id: string;
  nama: string;
  slug: string;
  kategori: string;
  deskripsiSingkat: string;
  deskripsiPanjang: string;
  gambar: string;
  hargaDasar: number;
  dimensiContoh: string;
}
```

### `ProductCard` (components/ProductCard.tsx)

Props:
```typescript
interface ProductCardProps {
  product: Product;
}
```

Render: gambar (`<img>`), nama, deskripsiSingkat, dan `<Link href={/product/${product.id}}>Lihat Detail</Link>`.

### `app/services/page.tsx`

- Import `products` dari `data/products.ts`
- Render heading "Layanan Olah Besi Kami"
- Grid responsif: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Map `products` → `<ProductCard />`

### `app/product/[id]/page.tsx`

- Terima `params: { id: string }` dari Next.js dynamic routing
- Cari produk dengan `products.find(p => p.id === params.id)`
- Jika tidak ditemukan: render pesan "Produk tidak ditemukan"
- Jika ditemukan: render semua field + tombol "Pesan Jasa" dengan `onClick={() => alert("Fitur pemesanan akan tersedia di V4")}`

## Data Models

### `data/products.ts`

Ekspor dua hal:
1. Tipe `Product` (re-export dari `types/index.ts`)
2. Array `products: Product[]` berisi 6 objek

Distribusi kategori:
| Kategori     | Jumlah | Contoh id         |
|--------------|--------|-------------------|
| Kursi Besi   | 2      | `kursi-lipat-01`, `kursi-taman-01` |
| Pagar Besi   | 2      | `pagar-minimalis-01`, `pagar-klasik-01` |
| Kanopi       | 2      | `kanopi-carport-01`, `kanopi-teras-01` |

Semua `gambar` menggunakan URL `https://placehold.co/400x300`.

Setiap `id` bersifat unik di seluruh array.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Semua produk memiliki field yang lengkap dan bertipe benar

*For any* produk dalam array `products`, setiap field wajib (`id`, `nama`, `slug`, `kategori`, `deskripsiSingkat`, `deskripsiPanjang`, `gambar`, `hargaDasar`, `dimensiContoh`) harus ada, tidak kosong (untuk string), dan bertipe sesuai interface `Product`.

**Validates: Requirements 1.1**

### Property 2: Semua id produk unik

*For any* dua produk berbeda dalam array `products`, nilai `id`-nya tidak boleh sama. Ukuran Set dari semua id harus sama dengan panjang array.

**Validates: Requirements 1.6**

### Property 3: Semua gambar produk menggunakan URL placeholder yang benar

*For any* produk dalam array `products`, field `gambar` harus dimulai dengan `https://placehold.co`.

**Validates: Requirements 1.7**

### Property 4: Distribusi kategori sesuai spesifikasi

*For any* kategori yang diharapkan ("Kursi Besi", "Pagar Besi", "Kanopi"), jumlah produk dalam kategori tersebut harus tepat 2. Total produk harus tepat 6.

**Validates: Requirements 1.2, 1.3, 1.4, 1.5**

### Property 5: ProductCard merender informasi produk dengan benar

*For any* produk dalam array `products`, merender `<ProductCard product={p} />` harus menghasilkan output yang mengandung `p.nama`, `p.deskripsiSingkat`, dan link dengan `href` yang mengandung `/product/${p.id}`.

**Validates: Requirements 2.4, 2.5, 2.6**

### Property 6: Halaman daftar merender semua produk

*For any* state halaman `/services`, jumlah elemen `ProductCard` yang dirender harus sama dengan panjang array `products`.

**Validates: Requirements 2.2**

### Property 7: Halaman detail menampilkan semua field untuk id yang valid

*For any* produk dalam array `products`, mengakses `/product/${p.id}` harus merender semua field: nama, kategori, deskripsiPanjang, dimensiContoh, dan hargaDasar.

**Validates: Requirements 3.1**

### Property 8: Id tidak valid menampilkan pesan not-found (edge case)

*For any* string yang bukan merupakan id produk yang ada, merender halaman detail dengan id tersebut harus menampilkan teks "Produk tidak ditemukan" dan tidak merender field produk apapun.

**Validates: Requirements 3.2**

## Error Handling

| Skenario | Penanganan |
|----------|------------|
| `id` tidak ditemukan di `products` | Render pesan "Produk tidak ditemukan" (tidak throw error) |
| `products` array kosong | `/services` render grid kosong tanpa crash |
| Gambar gagal load | Browser fallback default (`alt` text tersedia) |

Tidak ada async operation di data layer, sehingga tidak ada error handling untuk network/fetch.

## Testing Strategy

### Dual Testing Approach

Dua jenis test digunakan secara komplementer:
- **Unit tests**: verifikasi contoh spesifik, edge case, dan integrasi komponen
- **Property tests**: verifikasi properti universal di semua input

### Unit Tests (Vitest + React Testing Library)

Fokus pada:
- Render `ProductCard` dengan satu produk spesifik → cek teks dan href
- Render `/services` page → cek heading "Layanan Olah Besi Kami"
- Render `/product/[id]` dengan id valid → cek semua field tampil
- Render `/product/[id]` dengan id tidak valid → cek pesan not-found
- Klik "Pesan Jasa" → cek `window.alert` dipanggil dengan pesan yang benar
- Render `Navbar` → cek link "Layanan" memiliki href `/services`

### Property Tests (fast-check via Vitest)

Library: **fast-check** (tersedia di ekosistem TypeScript/Vitest)

Konfigurasi: minimum **100 iterasi** per property test.

Setiap property test diberi tag komentar dengan format:
`// Feature: besikita-v2-layanan-produk, Property {N}: {deskripsi singkat}`

| Property | Test | Tag |
|----------|------|-----|
| Property 1 | Generate arbitrary Product object, validasi semua field | `Property 1: semua field lengkap` |
| Property 2 | Verifikasi Set(ids).size === products.length | `Property 2: id unik` |
| Property 3 | For all products, gambar.startsWith("https://placehold.co") | `Property 3: URL gambar valid` |
| Property 4 | Filter per kategori, cek count === 2 | `Property 4: distribusi kategori` |
| Property 5 | For all products, render ProductCard → cek nama, deskripsi, href | `Property 5: ProductCard render` |
| Property 6 | Render ServicesPage → cek jumlah card === products.length | `Property 6: semua produk dirender` |
| Property 7 | For all products, render detail page → cek semua field | `Property 7: detail page valid id` |
| Property 8 | Generate arbitrary non-id string, render detail → cek not-found | `Property 8: detail page invalid id` |

### Catatan Implementasi

- Property 1–4 adalah pure data tests (tidak perlu render), sangat cepat
- Property 5–8 menggunakan React Testing Library dengan fast-check
- Property 8 menggunakan `fc.string()` yang difilter untuk mengecualikan id yang valid
