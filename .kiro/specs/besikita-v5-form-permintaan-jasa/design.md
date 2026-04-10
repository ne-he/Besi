# Design Document

## BesiKita V5 — Form Permintaan Jasa Kustom

## Overview

V5 menambahkan halaman `/request` sebagai jalur custom order di luar katalog produk standar. User mengisi form dengan data identitas, spesifikasi barang, pilihan bahan, catatan, dan gambar referensi (preview lokal). Data disimpan ke `localStorage` key `"besikita_requests"` sebagai array JSON untuk dikonsumsi panel admin di V6.

Fitur ini dibangun di atas fondasi V4 (cart system, Navbar) tanpa mengubah alur yang sudah ada. Satu-satunya modifikasi pada kode lama adalah penambahan link "Custom Order" di `components/Navbar.tsx`.

## Architecture

```
app/request/page.tsx          ← Client Component (form utama)
utils/requests.ts             ← Pure functions: buildRequest, saveRequest, getRequests
types/index.ts                ← Tambah interface RequestObject
components/Navbar.tsx         ← Tambah link "Custom Order" → /request
```

Alur data:

```
User Input → FormState (useState) → validate() → buildRequestObject() → saveRequest() → localStorage
                                        ↓
                                   errors state → tampil di UI
```

Tidak ada server action, API route, atau upload file ke server. Semua operasi berjalan di sisi klien.

## Components and Interfaces

### `app/request/page.tsx`

Client Component (`"use client"`). Mengelola seluruh state form dan orkestrasi submit.

State yang dikelola:

```typescript
// Field form
const [nama, setNama] = useState("");
const [email, setEmail] = useState("");
const [telepon, setTelepon] = useState("");
const [jenisBarang, setJenisBarang] = useState("");
const [lainnyaJikaAda, setLainnyaJikaAda] = useState("");
const [panjang, setPanjang] = useState<number | "">("");
const [lebar, setLebar] = useState<number | "">("");
const [tinggi, setTinggi] = useState<number | "">("");
const [bahan, setBahan] = useState("vendor");
const [catatan, setCatatan] = useState("");

// UI state
const [imagePreview, setImagePreview] = useState<string | null>(null);
const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
```

Fungsi utama:

- `handleImageChange(e)` — membaca file dengan `FileReader.readAsDataURL`, menyimpan data URL ke `imagePreview`
- `handleSubmit(e)` — memanggil `validate()`, jika valid memanggil `buildRequestObject()` + `saveRequest()`, lalu reset form
- `handleReset()` — mereset semua state ke nilai awal

### `utils/requests.ts`

Pure functions tanpa side effect (kecuali `saveRequest` yang menulis ke localStorage):

```typescript
export function validate(form: FormState): FormErrors
export function buildRequestObject(form: FormState, imagePreview: string | null): RequestObject
export function saveRequest(req: RequestObject): void
export function getRequests(): RequestObject[]
```

`validate` mengembalikan semua error sekaligus (tidak berhenti di error pertama).

### `components/Navbar.tsx`

Tambah satu `<Link>` di antara "Galeri" dan "Kontak":

```tsx
<Link href="/request" className="hover:text-slate-300 transition-colors">
  Custom Order
</Link>
```

## Data Models

### `RequestObject` (tambah ke `types/index.ts`)

```typescript
export interface RequestObject {
  id: string;           // String dari Date.now()
  nama: string;
  email: string;
  telepon: string;
  jenisBarang: string;  // "Kursi Besi" | "Pagar Besi" | "Kanopi" | "Lainnya"
  lainnyaJikaAda: string; // String kosong jika jenisBarang !== "Lainnya"
  panjang: number;
  lebar: number;
  tinggi: number;
  bahan: string;        // material id atau "vendor"
  catatan: string;
  gambarPreview: string | null; // data URL atau null
  status: "baru";
  createdAt: string;    // ISO string
}
```

### `FormState` (internal di `utils/requests.ts`)

```typescript
export interface FormState {
  nama: string;
  email: string;
  telepon: string;
  jenisBarang: string;
  lainnyaJikaAda: string;
  panjang: number | "";
  lebar: number | "";
  tinggi: number | "";
  bahan: string;
  catatan: string;
}
```

### `FormErrors`

```typescript
export type FormErrors = Partial<Record<
  "nama" | "email" | "telepon" | "jenisBarang" | "lainnyaJikaAda" |
  "panjang" | "lebar" | "tinggi" | "bahan",
  string
>>;
```

### localStorage Schema

```
key: "besikita_requests"
value: JSON.stringify(RequestObject[])
```

Pola baca-tulis mengikuti `utils/cart.ts`: `getRequests()` parse dengan try/catch, `saveRequest()` append ke array yang ada.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Validasi nama kosong selalu menghasilkan error

*For any* FormState di mana field `nama` adalah string kosong atau hanya whitespace, fungsi `validate()` SHALL mengembalikan objek errors yang mengandung key `"nama"` dengan pesan error yang tidak kosong.

**Validates: Requirements 2.4**

---

### Property 2: Validasi email format invalid selalu menghasilkan error

*For any* FormState di mana field `email` tidak mengandung format email yang valid (tidak ada `@` atau domain tidak valid), fungsi `validate()` SHALL mengembalikan objek errors yang mengandung key `"email"`.

**Validates: Requirements 2.5**

---

### Property 3: Validasi telepon kurang dari 10 digit selalu menghasilkan error

*For any* FormState di mana field `telepon` mengandung kurang dari 10 karakter digit (0–9), fungsi `validate()` SHALL mengembalikan objek errors yang mengandung key `"telepon"`.

**Validates: Requirements 2.6**

---

### Property 4: Validasi dimensi kurang dari 1 selalu menghasilkan error

*For any* FormState di mana salah satu field `panjang`, `lebar`, atau `tinggi` bernilai kurang dari 1 atau kosong, fungsi `validate()` SHALL mengembalikan objek errors yang mengandung key field yang bersangkutan.

**Validates: Requirements 4.3**

---

### Property 5: Validasi mengembalikan semua error sekaligus

*For any* FormState yang memiliki N field tidak valid (N ≥ 2), fungsi `validate()` SHALL mengembalikan objek errors yang mengandung semua N key yang tidak valid secara bersamaan — tidak hanya error pertama yang ditemukan.

**Validates: Requirements 7.2**

---

### Property 6: buildRequestObject menghasilkan struktur yang lengkap dan benar

*For any* FormState yang valid dan nilai `imagePreview` (string atau null), fungsi `buildRequestObject()` SHALL menghasilkan `RequestObject` yang memiliki semua field wajib dengan tipe yang benar: `id` adalah string non-kosong, `status` selalu `"baru"`, `createdAt` adalah ISO string yang valid, dan semua field form terefleksi dengan benar.

**Validates: Requirements 7.4, 8.4, 8.5**

---

### Property 7: saveRequest mempertahankan data yang sudah ada

*For any* array `RequestObject[]` yang sudah tersimpan di localStorage dan `RequestObject` baru yang valid, setelah memanggil `saveRequest(newRequest)`, semua request yang sebelumnya ada SHALL tetap ada di storage, dan `newRequest` SHALL ditambahkan di akhir array.

**Validates: Requirements 7.5, 8.2, 8.3**

## Error Handling

| Skenario | Penanganan |
|---|---|
| `localStorage` tidak tersedia (SSR / private browsing) | `getRequests()` dan `saveRequest()` dibungkus try/catch, silent fail — form tetap berfungsi |
| `FileReader` error saat baca gambar | `onerror` handler set `imagePreview` ke null, tidak crash |
| JSON parse error pada data lama di localStorage | `getRequests()` return `[]` jika parse gagal |
| Submit saat loading | Tombol disabled, handler return early jika `loading === true` |
| File bukan gambar | Atribut `accept="image/*"` mencegah di level browser; tidak ada validasi server-side karena tidak ada upload |

## Testing Strategy

### Unit Tests (Vitest)

Fokus pada fungsi pure di `utils/requests.ts`:

- `validate()` — contoh spesifik untuk setiap field (nama kosong, email tanpa @, telepon 9 digit, dimensi 0)
- `buildRequestObject()` — contoh dengan form valid, verifikasi semua field ada
- `saveRequest()` / `getRequests()` — round-trip dengan mock localStorage

### Property-Based Tests (fast-check)

Library: **fast-check** (sudah kompatibel dengan Vitest).

Setiap property test dikonfigurasi minimum **100 iterasi**.

Tag format: `// Feature: besikita-v5-form-permintaan-jasa, Property N: <teks>`

**Property 1** — Generator: `fc.string()` yang difilter hanya whitespace/kosong → assert `errors.nama` ada.

**Property 2** — Generator: `fc.string()` yang tidak cocok regex email → assert `errors.email` ada.

**Property 3** — Generator: `fc.string()` dengan digit count < 10 → assert `errors.telepon` ada.

**Property 4** — Generator: `fc.record({ panjang: fc.integer({ max: 0 }), ... })` → assert error field dimensi ada.

**Property 5** — Generator: `fc.record` dengan beberapa field invalid sekaligus → assert semua key error hadir.

**Property 6** — Generator: `fc.record` dengan semua field valid → assert output `buildRequestObject` memiliki semua field dengan tipe benar.

**Property 7** — Generator: `fc.array(arbitraryRequest)` sebagai state awal + `arbitraryRequest` baru → assert semua item lama masih ada setelah `saveRequest`.

### Integration / Example Tests

- Render `Navbar` → assert link "Custom Order" dengan href `/request` ada
- Render `RequestPage` → assert heading "Permintaan Jasa Kustom" ada
- Render form → assert semua field input hadir
- Pilih "Lainnya" → assert field tambahan muncul
- Submit form valid → assert success message muncul dan form reset
- Submit form invalid → assert error messages muncul, localStorage tidak berubah
