"use client";

import { useState } from "react";

export default function RequestPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jenisBarang, setJenisBarang] = useState("");
  const [lainnyaJikaAda, setLainnyaJikaAda] = useState("");

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-800 mb-4">
        Permintaan Jasa Kustom
      </h1>
      <p className="text-slate-600">
        Pesan produk besi kustom sesuai kebutuhan Anda. Isi form di bawah dan
        tim kami akan menghubungi Anda.
      </p>

      <form className="mt-8 space-y-6">
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
          </div>
        )}
      </form>
    </main>
  );
}
