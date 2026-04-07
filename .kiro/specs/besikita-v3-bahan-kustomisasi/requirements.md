# Requirements Document

## BesiKita V3 — Bahan Besi & Kustomisasi

## Introduction

BesiKita V3 membangun di atas halaman detail produk yang sudah ada dari V2. Tujuannya adalah menambahkan konsep "bahan besi" dan opsi kustomisasi pada halaman `/product/[id]`. User dapat memilih jenis bahan (Hollow Hitam, Hollow Galvanis, Siku Besi) dan ketebalan (1.2mm, 1.5mm, 2.0mm), lalu harga total berubah secara realtime. Tidak ada keranjang belanja — V3 hanya menampilkan preview harga dan menyimpan pilihan ke state lokal.

## Glossary

- **Product_Detail_Page**: Halaman `/product/[id]` yang menampilkan informasi lengkap satu produk beserta opsi kustomisasi
- **Material**: Objek data yang merepresentasikan satu jenis bahan besi dengan atribut id, nama, hargaTambahanPerUnit, dan satuan
- **Material_Data**: File `data/materials.ts` yang menjadi sumber data semua jenis bahan besi
- **Thickness_Option**: Objek data yang merepresentasikan satu pilihan ketebalan besi dengan atribut id, label, dan hargaTambahan
- **Thickness_Data**: File `data/thickness.ts` yang menjadi sumber data semua pilihan ketebalan
- **Material_Selector**: Komponen `components/MaterialSelector.tsx` untuk memilih jenis bahan besi
- **Thickness_Selector**: Komponen `components/ThicknessSelector.tsx` untuk memilih ketebalan besi
- **Harga_Total**: Hasil kalkulasi hargaDasar + material.hargaTambahanPerUnit + thicknessOption.hargaTambahan
- **Simpan_Pilihan_Button**: Tombol pengganti "Pesan Jasa" yang menyimpan pilihan ke state lokal
- **Price_Breakdown**: Rincian harga yang menampilkan komponen harga dasar, tambahan bahan, dan tambahan ketebalan secara terpisah

## Requirements

### Requirement 1: Data Bahan Besi

**User Story:** As a developer, I want a centralized material data file, so that all iron material options and their price additions are managed in one place.

#### Acceptance Criteria

1. THE Material_Data SHALL mendefinisikan tipe `Material` dengan field: `id` (string), `nama` (string), `hargaTambahanPerUnit` (number), `satuan` (string).
2. THE Material_Data SHALL mengekspor array `materials` yang berisi tepat 3 objek Material.
3. THE Material_Data SHALL memuat Material dengan nama "Hollow Hitam" dan `hargaTambahanPerUnit` sebesar 50000.
4. THE Material_Data SHALL memuat Material dengan nama "Hollow Galvanis" dan `hargaTambahanPerUnit` sebesar 75000.
5. THE Material_Data SHALL memuat Material dengan nama "Siku Besi" dan `hargaTambahanPerUnit` sebesar 40000.
6. WHEN Material_Data diimpor, THE Material_Data SHALL memastikan setiap Material memiliki `id` yang unik di antara semua Material.

### Requirement 2: Data Ketebalan

**User Story:** As a developer, I want a centralized thickness data file, so that all thickness options and their price additions are managed in one place.

#### Acceptance Criteria

1. THE Thickness_Data SHALL mendefinisikan tipe `ThicknessOption` dengan field: `id` (string), `label` (string), `hargaTambahan` (number).
2. THE Thickness_Data SHALL mengekspor array `thicknessOptions` yang berisi tepat 3 objek ThicknessOption.
3. THE Thickness_Data SHALL memuat ThicknessOption dengan label "1.2mm" dan `hargaTambahan` sebesar 0.
4. THE Thickness_Data SHALL memuat ThicknessOption dengan label "1.5mm" dan `hargaTambahan` sebesar 25000.
5. THE Thickness_Data SHALL memuat ThicknessOption dengan label "2.0mm" dan `hargaTambahan` sebesar 50000.
6. WHEN Thickness_Data diimpor, THE Thickness_Data SHALL memastikan setiap ThicknessOption memiliki `id` yang unik di antara semua ThicknessOption.

### Requirement 3: Komponen Material Selector

**User Story:** As a visitor, I want to select an iron material type from available options, so that I can customize the product to my preference.

#### Acceptance Criteria

1. THE Material_Selector SHALL menerima props `selectedMaterial` (Material) dan `onMaterialChange` (callback dengan parameter Material).
2. THE Material_Selector SHALL menampilkan semua Material dari Material_Data sebagai pilihan yang dapat dipilih.
3. WHEN visitor memilih sebuah Material, THE Material_Selector SHALL memanggil `onMaterialChange` dengan Material yang dipilih sebagai argumen.
4. THE Material_Selector SHALL menampilkan nama dan harga tambahan setiap Material sebagai label pilihan.
5. WHEN Material_Selector dirender, THE Material_Selector SHALL menandai pilihan yang sesuai dengan `selectedMaterial` sebagai aktif/terpilih.

### Requirement 4: Komponen Thickness Selector

**User Story:** As a visitor, I want to select a thickness option for the iron material, so that I can specify the exact specification I need.

#### Acceptance Criteria

1. THE Thickness_Selector SHALL menerima props `selectedThickness` (ThicknessOption) dan `onThicknessChange` (callback dengan parameter ThicknessOption).
2. THE Thickness_Selector SHALL menampilkan semua ThicknessOption dari Thickness_Data sebagai pilihan yang dapat dipilih.
3. WHEN visitor memilih sebuah ThicknessOption, THE Thickness_Selector SHALL memanggil `onThicknessChange` dengan ThicknessOption yang dipilih sebagai argumen.
4. THE Thickness_Selector SHALL menampilkan label dan harga tambahan setiap ThicknessOption sebagai label pilihan.
5. WHEN Thickness_Selector dirender, THE Thickness_Selector SHALL menandai pilihan yang sesuai dengan `selectedThickness` sebagai aktif/terpilih.

### Requirement 5: Integrasi Selector ke Halaman Detail

**User Story:** As a visitor, I want to see material and thickness selectors on the product detail page, so that I can customize the product directly from the detail view.

#### Acceptance Criteria

1. THE Product_Detail_Page SHALL menampilkan Material_Selector di bawah deskripsi produk dan sebelum tampilan harga.
2. THE Product_Detail_Page SHALL menampilkan Thickness_Selector di bawah Material_Selector dan sebelum tampilan harga.
3. THE Product_Detail_Page SHALL menginisialisasi `selectedMaterial` dengan Material pertama dari array `materials` saat halaman pertama kali dirender.
4. THE Product_Detail_Page SHALL menginisialisasi `selectedThickness` dengan ThicknessOption pertama dari array `thicknessOptions` saat halaman pertama kali dirender.

### Requirement 6: Kalkulasi dan Tampilan Harga Realtime

**User Story:** As a visitor, I want to see the total price update immediately when I change material or thickness selection, so that I can compare costs before deciding.

#### Acceptance Criteria

1. WHEN visitor mengubah pilihan Material atau ThicknessOption, THE Product_Detail_Page SHALL menghitung ulang Harga_Total sebagai `hargaDasar + selectedMaterial.hargaTambahanPerUnit + selectedThickness.hargaTambahan`.
2. THE Product_Detail_Page SHALL menampilkan Harga_Total yang telah diperbarui tanpa memerlukan reload halaman.
3. THE Product_Detail_Page SHALL menampilkan Price_Breakdown dengan tiga baris: "Harga dasar: Rp [hargaDasar]", "+ Bahan: Rp [hargaTambahanPerUnit]", dan "+ Ketebalan: Rp [hargaTambahan]".
4. WHEN Harga_Total ditampilkan, THE Product_Detail_Page SHALL memformat angka menggunakan format mata uang Indonesia (locale "id-ID").

### Requirement 7: Simpan Pilihan

**User Story:** As a visitor, I want to save my material and thickness selection locally, so that my customization choices are acknowledged before the ordering feature is available.

#### Acceptance Criteria

1. THE Product_Detail_Page SHALL menampilkan Simpan_Pilihan_Button sebagai pengganti tombol "Pesan Jasa" yang ada dari V2.
2. WHEN visitor mengklik Simpan_Pilihan_Button, THE Product_Detail_Page SHALL menyimpan `selectedMaterial` dan `selectedThickness` ke state lokal komponen.
3. WHEN visitor mengklik Simpan_Pilihan_Button, THE Product_Detail_Page SHALL menampilkan alert dengan pesan "Pilihan disimpan sementara".
