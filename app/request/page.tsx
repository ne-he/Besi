"use client";

import { useState } from "react";
import { materials } from "@/data/materials";
import {
  validate,
  buildRequestObject,
  saveRequest,
  FormState,
  FormErrors,
} from "@/utils/requests";

export default function RequestPage() {
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.onerror = () => setImagePreview(null);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formState: FormState = {
      nama,
      email,
      telepon,
      jenisBarang,
      lainnyaJikaAda,
      panjang,
      lebar,
      tinggi,
      bahan,
      catatan,
    };

    const errs = validate(formState);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setErrors({});

    const req = buildRequestObject(formState, imagePreview);
    saveRequest(req);

    setSuccessMessage(
      "Permintaan berhasil dikirim! Tim kami akan menghubungi Anda segera."
    );

    // Reset semua field ke nilai awal
    setNama("");
    setEmail("");
    setTelepon("");
    setJenisBarang("");
    setLainnyaJikaAda("");
    setPanjang("");
    setLebar("");
    setTinggi("");
    setBahan("vendor");
    setCatatan("");
    setImagePreview(null);

    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Permintaan Jasa Kustom
      </h1>
      <p className="text-slate-600">
        Pesan produk besi kustom sesuai kebutuhan Anda. Isi form di bawah dan
        tim kami akan menghubungi Anda.
      </p>

      {successMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            required
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.nama && (
            <p className="text-red-500 text-xs">{errors.nama}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Nomor Telepon
          </label>
          <input
            type="tel"
            required
            value={telepon}
            onChange={(e) => setTelepon(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.telepon && (
            <p className="text-red-500 text-xs">{errors.telepon}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Jenis Barang
          </label>
          <select
            required
            value={jenisBarang}
            onChange={(e) => {
              setJenisBarang(e.target.value);
              if (e.target.value !== "Lainnya") setLainnyaJikaAda("");
            }}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="">-- Pilih Jenis Barang --</option>
            <option value="Kursi Besi">Kursi Besi</option>
            <option value="Pagar Besi">Pagar Besi</option>
            <option value="Kanopi">Kanopi</option>
            <option value="Lainnya">Lainnya</option>
          </select>
          {errors.jenisBarang && (
            <p className="text-red-500 text-xs">{errors.jenisBarang}</p>
          )}
        </div>

        {jenisBarang === "Lainnya" && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Sebutkan jenis barang
            </label>
            <input
              type="text"
              required
              value={lainnyaJikaAda}
              onChange={(e) => setLainnyaJikaAda(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.lainnyaJikaAda && (
              <p className="text-red-500 text-xs">{errors.lainnyaJikaAda}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Panjang (cm)
            </label>
            <input
              type="number"
              min={1}
              value={panjang}
              onChange={(e) =>
                setPanjang(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.panjang && (
              <p className="text-red-500 text-xs">{errors.panjang}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Lebar (cm)
            </label>
            <input
              type="number"
              min={1}
              value={lebar}
              onChange={(e) =>
                setLebar(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.lebar && (
              <p className="text-red-500 text-xs">{errors.lebar}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
              Tinggi (cm)
            </label>
            <input
              type="number"
              min={1}
              value={tinggi}
              onChange={(e) =>
                setTinggi(e.target.value === "" ? "" : Number(e.target.value))
              }
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {errors.tinggi && (
              <p className="text-red-500 text-xs">{errors.tinggi}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Pilihan Bahan Besi
          </label>
          <select
            value={bahan}
            onChange={(e) => setBahan(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
          >
            <option value="vendor">Sesuai rekomendasi vendor</option>
            {materials.map((material) => (
              <option key={material.id} value={material.id}>
                {material.nama}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Catatan Tambahan{" "}
            <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <textarea
            rows={4}
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            placeholder="Deskripsikan detail tambahan..."
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            Upload Gambar Referensi{" "}
            <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
          />
          {imagePreview !== null && (
            <img src={imagePreview} width={100} alt="Preview" className="rounded mt-2" />
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            {loading ? "Mengirim..." : "Kirim Permintaan"}
          </button>
          <button
            type="button"
            onClick={() => {
              setNama("");
              setEmail("");
              setTelepon("");
              setJenisBarang("");
              setLainnyaJikaAda("");
              setPanjang("");
              setLebar("");
              setTinggi("");
              setBahan("vendor");
              setCatatan("");
              setImagePreview(null);
              setErrors({});
            }}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </main>
  );
}
