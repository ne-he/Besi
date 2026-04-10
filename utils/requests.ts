import { RequestObject } from "@/types";

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

export type FormErrors = Partial<
  Record<
    | "nama"
    | "email"
    | "telepon"
    | "jenisBarang"
    | "lainnyaJikaAda"
    | "panjang"
    | "lebar"
    | "tinggi"
    | "bahan",
    string
  >
>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUESTS_KEY = "besikita_requests";

export function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.nama.trim()) {
    errors.nama = "Nama lengkap wajib diisi";
  }

  if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Format email tidak valid";
  }

  const digitCount = (form.telepon.match(/[0-9]/g) ?? []).length;
  if (digitCount < 10) {
    errors.telepon = "Nomor telepon minimal 10 digit";
  }

  if (!form.jenisBarang) {
    errors.jenisBarang = "Jenis barang wajib dipilih";
  }

  if (form.jenisBarang === "Lainnya" && !form.lainnyaJikaAda.trim()) {
    errors.lainnyaJikaAda = "Mohon sebutkan jenis barang yang diinginkan";
  }

  if (form.panjang === "" || (form.panjang as number) < 1) {
    errors.panjang = "Ukuran harus diisi dengan angka lebih dari 0";
  }

  if (form.lebar === "" || (form.lebar as number) < 1) {
    errors.lebar = "Ukuran harus diisi dengan angka lebih dari 0";
  }

  if (form.tinggi === "" || (form.tinggi as number) < 1) {
    errors.tinggi = "Ukuran harus diisi dengan angka lebih dari 0";
  }

  return errors;
}

export function buildRequestObject(
  form: FormState,
  imagePreview: string | null
): RequestObject {
  return {
    id: String(Date.now()),
    nama: form.nama,
    email: form.email,
    telepon: form.telepon,
    jenisBarang: form.jenisBarang,
    lainnyaJikaAda: form.jenisBarang === "Lainnya" ? form.lainnyaJikaAda : "",
    panjang: form.panjang as number,
    lebar: form.lebar as number,
    tinggi: form.tinggi as number,
    bahan: form.bahan,
    catatan: form.catatan,
    gambarPreview: imagePreview,
    status: "baru",
    createdAt: new Date().toISOString(),
  };
}

export function saveRequest(req: RequestObject): void {
  try {
    const existing = getRequests();
    existing.push(req);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(existing));
  } catch {
    // silent fail — localStorage tidak tersedia (SSR / private browsing)
  }
}

export function getRequests(): RequestObject[] {
  try {
    const raw = localStorage.getItem(REQUESTS_KEY);
    return raw ? (JSON.parse(raw) as RequestObject[]) : [];
  } catch {
    return [];
  }
}
