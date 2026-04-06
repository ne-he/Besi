import { products } from "@/data/products";
import Link from "next/link";
import PesanJasaButton from "@/components/PesanJasaButton";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h1>
        <p className="text-gray-600 mb-6">Produk dengan ID "{params.id}" tidak tersedia.</p>
        <Link href="/services" className="text-blue-600 hover:underline">
          ← Kembali ke Layanan
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/services" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Kembali ke Layanan
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <img
            src={product.gambar}
            alt={product.nama}
            className="w-full rounded-xl shadow-md"
            width={400}
            height={300}
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit">
            {product.kategori}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">{product.nama}</h1>
          <p className="text-gray-600 leading-relaxed">{product.deskripsiPanjang}</p>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Dimensi Contoh</span>
              <span className="font-medium text-gray-800">{product.dimensiContoh}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Harga Dasar</span>
              <span className="font-semibold text-gray-800">
                Rp {product.hargaDasar.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <PesanJasaButton />
        </div>
      </div>
    </div>
  );
}
