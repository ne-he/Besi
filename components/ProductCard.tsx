import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <img
        src={product.gambar}
        alt={product.nama}
        className="w-full h-48 object-cover"
        width={400}
        height={300}
      />
      <div className="p-5 flex flex-col flex-1">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit">
          {product.kategori}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2">{product.nama}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-1">{product.deskripsiSingkat}</p>
        <p className="text-sm font-semibold text-gray-800 mb-4">
          Mulai dari Rp {product.hargaDasar.toLocaleString("id-ID")}
        </p>
        <Link
          href={`/product/${product.id}`}
          className="block text-center bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Lihat Detail
        </Link>
      </div>
    </article>
  );
}
