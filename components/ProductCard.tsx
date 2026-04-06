import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={product.gambar}
        alt={product.nama}
        className="w-full h-48 object-cover"
        width={400}
        height={300}
      />
      <div className="p-5">
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
          {product.kategori}
        </span>
        <h3 className="text-lg font-semibold text-gray-800 mt-3 mb-2">{product.nama}</h3>
        <p className="text-sm text-gray-600 mb-4">{product.deskripsiSingkat}</p>
        <p className="text-sm font-semibold text-gray-800">
          Mulai dari Rp {product.hargaDasar.toLocaleString("id-ID")}
        </p>
      </div>
    </article>
  );
}
