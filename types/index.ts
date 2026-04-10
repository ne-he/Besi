export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
}

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

export interface RequestObject {
  id: string;
  nama: string;
  email: string;
  telepon: string;
  jenisBarang: string;
  lainnyaJikaAda: string;
  panjang: number;
  lebar: number;
  tinggi: number;
  bahan: string;
  catatan: string;
  gambarPreview: string | null;
  status: "baru";
  createdAt: string;
}
