import { products } from "@/data/products";

interface Props {
  params: { id: string };
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Produk tidak ditemukan</h1>
        <p className="text-gray-600">Produk dengan ID "{params.id}" tidak tersedia.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <p>Detail produk: {product.nama}</p>
    </div>
  );
}
