# Requirements Document

## BesiKita V5 — Form Permintaan Jasa Kustom

## Introduction

BesiKita V5 membangun di atas V4 yang sudah memiliki sistem keranjang belanja. Tujuan V5 adalah menyediakan halaman khusus `/request` untuk custom order di luar produk standar yang ada di katalog. User dapat mengisi detail barang yang diinginkan (jenis, ukuran, bahan pilihan, catatan) dan mengunggah gambar referensi (simulasi preview, tidak benar-benar upload ke server). Data permintaan disimpan ke `localStorage` dengan status "baru" dan timestamp untuk ditampilkan di panel admin pada V6.

## Glossary

- **Request_Page**: Halaman `/request` yang menampilkan form permintaan jasa kustom
- **Request_Form**: Komponen form di Request_Page yang mengumpulkan data permintaan dari user
- **Request_Object**: Objek data yang merepresentasikan satu permintaan jasa kustom, berisi semua field yang diisi user beserta metadata
- **Request_Storage**: Mekanisme penyimpanan permintaan menggunakan `localStorage` dengan key `"besikita_requests"`
- **Validator**: Logika validasi yang memverifikasi input user sebelum data disimpan
- **Image_Preview**: Komponen thumbnail yang menampilkan pratinjau gambar referensi yang dipilih user
- **Navbar**: Komponen `components/Navbar.tsx` yang menampilkan navigasi utama situs
- **Material**: Tipe data dari `data/materials.ts` dengan field `id`, `nama`, `hargaTambahanPerUnit`, `satuan`
- **JenisBarang**: Enum pilihan jenis barang: "Kursi Besi", "Pagar Besi", "Kanopi", "Lainnya"

## Requirements

### Requirement 1: Navigasi ke Halaman Permintaan Jasa

**User Story:** As a visitor, I want to access the custom order page from the Navbar, so that I can easily find and submit a custom order request.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan link "Custom Order" yang mengarahkan user ke halaman `/request`.
2. THE Request_Page SHALL dapat diakses melalui URL `/request`.
3. THE Request_Page SHALL menampilkan judul "Permintaan Jasa Kustom" dan deskripsi singkat tentang layanan custom order.

---

### Requirement 2: Field Identitas User

**User Story:** As a visitor, I want to fill in my personal contact information, so that BesiKita can reach me regarding my custom order.

#### Acceptance Criteria

1. THE Request_Form SHALL menampilkan field input teks "Nama Lengkap" yang wajib diisi.
2. THE Request_Form SHALL menampilkan field input email "Email" yang wajib diisi.
3. THE Request_Form SHALL menampilkan field input telepon "Nomor Telepon" yang wajib diisi.
4. IF field "Nama Lengkap" dikosongkan saat submit, THEN THE Validator SHALL menampilkan pesan error "Nama lengkap wajib diisi" di bawah field tersebut.
5. IF field "Email" tidak mengandung format email yang valid saat submit, THEN THE Validator SHALL menampilkan pesan error "Format email tidak valid" di bawah field tersebut.
6. IF field "Nomor Telepon" memiliki kurang dari 10 digit angka saat submit, THEN THE Validator SHALL menampilkan pesan error "Nomor telepon minimal 10 digit" di bawah field tersebut.

---

### Requirement 3: Field Jenis Barang

**User Story:** As a visitor, I want to select the type of iron product I need, so that BesiKita knows what kind of item to fabricate.

#### Acceptance Criteria

1. THE Request_Form SHALL menampilkan dropdown select "Jenis Barang" dengan opsi: "Kursi Besi", "Pagar Besi", "Kanopi", "Lainnya".
2. WHEN visitor memilih opsi "Lainnya" pada dropdown "Jenis Barang", THE Request_Form SHALL menampilkan field input teks tambahan "Sebutkan jenis barang" yang wajib diisi.
3. WHEN visitor memilih opsi selain "Lainnya" pada dropdown "Jenis Barang", THE Request_Form SHALL menyembunyikan field input teks tambahan tersebut.
4. IF dropdown "Jenis Barang" belum dipilih saat submit, THEN THE Validator SHALL menampilkan pesan error "Jenis barang wajib dipilih".
5. IF visitor memilih "Lainnya" dan field "Sebutkan jenis barang" dikosongkan saat submit, THEN THE Validator SHALL menampilkan pesan error "Mohon sebutkan jenis barang yang diinginkan".

---

### Requirement 4: Field Ukuran Barang

**User Story:** As a visitor, I want to specify the dimensions of the item I need, so that BesiKita can fabricate it to the correct size.

#### Acceptance Criteria

1. THE Request_Form SHALL menampilkan tiga field input number: "Panjang (cm)", "Lebar (cm)", dan "Tinggi (cm)", ditata dalam grid 3 kolom.
2. THE Request_Form SHALL membatasi nilai minimum setiap field ukuran menjadi 1.
3. IF salah satu field ukuran (panjang, lebar, atau tinggi) tidak diisi atau bernilai kurang dari 1 saat submit, THEN THE Validator SHALL menampilkan pesan error "Ukuran harus diisi dengan angka lebih dari 0" di bawah field yang bersangkutan.

---

### Requirement 5: Field Pilihan Bahan Besi

**User Story:** As a visitor, I want to choose the iron material for my custom order, so that I can specify the material preference or let the vendor decide.

#### Acceptance Criteria

1. THE Request_Form SHALL menampilkan dropdown "Pilihan Bahan Besi" yang memuat semua nama bahan dari `data/materials.ts`.
2. THE Request_Form SHALL menambahkan opsi "Sesuai rekomendasi vendor" sebagai pilihan pertama pada dropdown "Pilihan Bahan Besi".
3. THE Request_Form SHALL menetapkan "Sesuai rekomendasi vendor" sebagai nilai default dropdown "Pilihan Bahan Besi".
4. IF dropdown "Pilihan Bahan Besi" belum dipilih saat submit, THEN THE Validator SHALL menampilkan pesan error "Pilihan bahan wajib dipilih".

---

### Requirement 6: Field Catatan dan Upload Gambar Referensi

**User Story:** As a visitor, I want to add notes and upload a reference image, so that I can provide additional details to help BesiKita understand my custom order.

#### Acceptance Criteria

1. THE Request_Form SHALL menampilkan textarea "Catatan Tambahan" yang bersifat opsional.
2. THE Request_Form SHALL menampilkan field input file "Upload Gambar Referensi" dengan atribut `accept="image/*"` yang bersifat opsional.
3. WHEN visitor memilih file gambar melalui input file, THE Image_Preview SHALL menampilkan thumbnail gambar dengan lebar 100px di bawah input file.
4. WHEN visitor mengganti file gambar yang sudah dipilih, THE Image_Preview SHALL memperbarui thumbnail dengan gambar yang baru dipilih.

---

### Requirement 7: Validasi dan Pengiriman Form

**User Story:** As a visitor, I want the form to validate my input before submission, so that I can correct any mistakes before my request is saved.

#### Acceptance Criteria

1. WHEN visitor mengklik tombol "Kirim Permintaan", THE Validator SHALL memvalidasi semua field wajib sebelum menyimpan data.
2. IF terdapat field wajib yang tidak valid saat submit, THEN THE Request_Form SHALL menampilkan semua pesan error yang relevan tanpa menyimpan data ke Request_Storage.
3. WHEN semua field wajib valid, THE Request_Form SHALL menonaktifkan tombol "Kirim Permintaan" (loading state) selama proses penyimpanan berlangsung.
4. WHEN semua field wajib valid, THE Request_Form SHALL membuat Request_Object dengan field: `id` (string dari `Date.now()`), `nama`, `email`, `telepon`, `jenisBarang`, `lainnyaJikaAda` (string kosong jika tidak relevan), `panjang` (number), `lebar` (number), `tinggi` (number), `bahan`, `catatan`, `gambarPreview` (data URL string atau null), `status` ("baru"), `createdAt` (ISO string dari `new Date()`).
5. WHEN Request_Object berhasil dibuat, THE Request_Form SHALL membaca array yang ada di Request_Storage, menambahkan Request_Object baru, dan menyimpan kembali ke Request_Storage.
6. WHEN data berhasil disimpan ke Request_Storage, THE Request_Form SHALL menampilkan notifikasi sukses kepada user.
7. WHEN data berhasil disimpan ke Request_Storage, THE Request_Form SHALL mereset semua field form ke nilai awal dan menghapus Image_Preview.
8. WHEN data berhasil disimpan ke Request_Storage, THE Request_Form SHALL menggulir halaman ke atas (scroll to top).
9. THE Request_Form SHALL menampilkan tombol "Batal" yang mereset semua field form ke nilai awal dan menghapus Image_Preview tanpa menyimpan data.

---

### Requirement 8: Persistensi Data Permintaan

**User Story:** As a developer, I want all submitted requests to be stored in localStorage, so that the data can be retrieved and displayed in the admin panel in V6.

#### Acceptance Criteria

1. THE Request_Storage SHALL menyimpan data permintaan sebagai array JSON dengan key `"besikita_requests"` di `localStorage`.
2. WHEN Request_Object pertama kali disimpan dan `"besikita_requests"` belum ada di `localStorage`, THE Request_Storage SHALL membuat array baru berisi satu Request_Object tersebut.
3. WHEN Request_Object baru disimpan dan `"besikita_requests"` sudah ada di `localStorage`, THE Request_Storage SHALL menambahkan Request_Object baru ke array yang sudah ada tanpa menghapus data sebelumnya.
4. THE Request_Object SHALL selalu memiliki field `status` bernilai "baru" saat pertama kali disimpan.
5. THE Request_Object SHALL selalu memiliki field `createdAt` berisi ISO string timestamp saat data disimpan.
