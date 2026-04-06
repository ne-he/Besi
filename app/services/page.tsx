import { products } from "@/data/products";

export default function ServicesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Layanan Olah Besi Kami
      </h1>
      {/* Grid produk akan ditambahkan di task 2.2 */}
      <p className="text-gray-500 text-center">Memuat {products.length} produk...</p>
    </div>
  );
}
