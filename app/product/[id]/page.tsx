import { products } from "@/data/products";
import Link from "next/link";
import ProductDetailClient from "@/components/ProductDetailClient";

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

  return <ProductDetailClient product={product} />;
}
