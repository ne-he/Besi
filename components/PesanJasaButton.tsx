"use client";

export default function PesanJasaButton() {
  return (
    <button
      onClick={() => alert("Fitur pemesanan akan tersedia di V4")}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-2"
    >
      Pesan Jasa
    </button>
  );
}
