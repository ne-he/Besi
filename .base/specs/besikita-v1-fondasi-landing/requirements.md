# Requirements Document

## Introduction

BesiKita V1 adalah fondasi proyek website untuk menjual jasa pembuatan produk berbahan besi: kursi besi, pagar besi, kanopi, dan kebutuhan besi bangunan lainnya. V1 mencakup inisialisasi proyek Next.js, komponen layout global (Navbar & Footer), halaman landing yang lengkap, serta routing ke halaman-halaman placeholder (/services, /gallery, /contact).

## Glossary

- **Website**: Aplikasi web BesiKita yang dibangun dengan Next.js App Router
- **Navbar**: Komponen navigasi global yang tampil di bagian atas setiap halaman
- **Footer**: Komponen informasi bawah halaman yang tampil di semua halaman
- **RootLayout**: Layout utama Next.js yang membungkus seluruh halaman dengan Navbar dan Footer
- **Hero_Section**: Bagian utama halaman beranda yang menampilkan judul, subjudul, dan CTA
- **Service_Card**: Kartu yang menampilkan informasi singkat satu jenis layanan
- **Advantage_Section**: Bagian halaman beranda yang menampilkan keunggulan bisnis
- **Placeholder_Page**: Halaman dengan konten minimal yang menandai rute sudah tersedia
- **CTA**: Call-to-action, tombol atau tautan yang mendorong pengguna mengambil tindakan

## Requirements

### Requirement 1: Inisialisasi Proyek

**User Story:** As a developer, I want a properly initialized Next.js project with TypeScript and Tailwind CSS, so that I have a clean, consistent foundation to build upon.

#### Acceptance Criteria

1. THE Website SHALL menggunakan Next.js dengan App Router dan TypeScript sebagai bahasa utama.
2. THE Website SHALL menggunakan Tailwind CSS sebagai framework styling.
3. THE Website SHALL memiliki struktur folder: `components`, `app`, `public`, `utils`, `types`.
4. WHEN developer menjalankan `npm run dev`, THE Website SHALL dapat diakses tanpa error.
5. THE Website SHALL dikonfigurasi dengan ESLint dan Prettier untuk menjaga konsistensi kode.
6. THE Website SHALL memiliki `next.config.js` yang siap untuk deployment ke Vercel.

### Requirement 2: Komponen Navbar

**User Story:** As a visitor, I want a navigation bar on every page, so that I can easily move between sections of the website.

#### Acceptance Criteria

1. THE Navbar SHALL menampilkan menu navigasi dengan empat item: Beranda, Layanan, Galeri, Kontak.
2. THE Navbar SHALL menggunakan `next/link` untuk setiap item menu agar navigasi berjalan tanpa full page reload.
3. THE Navbar SHALL tampil di bagian atas setiap halaman melalui RootLayout.
4. WHEN visitor mengklik item menu Beranda, THE Navbar SHALL mengarahkan ke rute `/`.
5. WHEN visitor mengklik item menu Layanan, THE Navbar SHALL mengarahkan ke rute `/services`.
6. WHEN visitor mengklik item menu Galeri, THE Navbar SHALL mengarahkan ke rute `/gallery`.
7. WHEN visitor mengklik item menu Kontak, THE Navbar SHALL mengarahkan ke rute `/contact`.

### Requirement 3: Komponen Footer

**User Story:** As a visitor, I want a footer on every page, so that I can find contact information and copyright notice.

#### Acceptance Criteria

1. THE Footer SHALL menampilkan teks copyright bisnis BesiKita.
2. THE Footer SHALL menampilkan informasi kontak: email `info@besikita.com` dan nomor telepon `0812-3456-7890`.
3. THE Footer SHALL tampil di bagian bawah setiap halaman melalui RootLayout.

### Requirement 4: Root Layout Global

**User Story:** As a developer, I want a root layout that wraps all pages with Navbar and Footer, so that the global structure is consistent across the entire website.

#### Acceptance Criteria

1. THE RootLayout SHALL membungkus seluruh konten halaman dengan Navbar di atas dan Footer di bawah.
2. THE RootLayout SHALL menyertakan meta tag dasar: title dan description untuk SEO.
3. THE RootLayout SHALL mendefinisikan font dan warna dasar melalui Tailwind CSS.

### Requirement 5: Hero Section Halaman Beranda

**User Story:** As a visitor, I want a compelling hero section on the homepage, so that I immediately understand what services BesiKita offers.

#### Acceptance Criteria

1. THE Hero_Section SHALL menampilkan judul utama: "Jasa Olah Besi Profesional untuk Bangunan Anda".
2. THE Hero_Section SHALL menampilkan subjudul: "Kursi, Pagar, Kanopi, dan segala kebutuhan besi Anda".
3. THE Hero_Section SHALL menampilkan tombol CTA "Lihat Layanan".
4. WHEN visitor mengklik tombol CTA "Lihat Layanan", THE Hero_Section SHALL mengarahkan visitor ke rute `/services`.

### Requirement 6: Section Layanan Kami

**User Story:** As a visitor, I want to see a summary of available services on the homepage, so that I can quickly understand what BesiKita offers.

#### Acceptance Criteria

1. THE Website SHALL menampilkan section "Layanan Kami" yang berisi tepat 3 Service_Card.
2. THE Service_Card pertama SHALL menampilkan layanan Kursi Besi beserta ikon placeholder dan deskripsi singkat.
3. THE Service_Card kedua SHALL menampilkan layanan Pagar Besi beserta ikon placeholder dan deskripsi singkat.
4. THE Service_Card ketiga SHALL menampilkan layanan Kanopi beserta ikon placeholder dan deskripsi singkat.
5. WHEN visitor mengklik tombol "Detail" pada sebuah Service_Card, THE Website SHALL mengarahkan visitor ke rute `/services`.

### Requirement 7: Section Keunggulan Kami

**User Story:** As a visitor, I want to see the advantages of using BesiKita, so that I feel confident choosing their services.

#### Acceptance Criteria

1. THE Advantage_Section SHALL menampilkan 3 kolom keunggulan: Bahan Berkualitas, Harga Bersaing, Pengerjaan Tepat Waktu.
2. THE Advantage_Section SHALL menampilkan setiap keunggulan dengan judul dan deskripsi singkat yang relevan.

### Requirement 8: Routing dan Halaman Placeholder

**User Story:** As a visitor, I want all main routes to be accessible without errors, so that I can navigate the website without encountering broken pages.

#### Acceptance Criteria

1. THE Website SHALL menyediakan rute `/` yang menampilkan halaman beranda lengkap.
2. THE Website SHALL menyediakan rute `/services` yang dapat diakses tanpa error.
3. THE Website SHALL menyediakan rute `/gallery` yang dapat diakses tanpa error.
4. THE Website SHALL menyediakan rute `/contact` yang dapat diakses tanpa error.
5. WHEN visitor mengakses rute `/services`, `/gallery`, atau `/contact`, THE Placeholder_Page SHALL menampilkan konten minimal yang menandai halaman tersebut tersedia.
6. IF visitor mengakses rute yang tidak terdefinisi, THEN THE Website SHALL menampilkan halaman 404 bawaan Next.js.
