"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, removeFromCart, clearCart, updateQuantity, CartItem } from "@/utils/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const totalHarga = cart.reduce((sum, item) => sum + item.subtotal, 0);

  function handleRemove(id: string) {
    removeFromCart(id);
    setCart(getCart());
  }

  function handleClear() {
    clearCart();
    setCart([]);
  }

  function handleQuantityChange(id: string, qty: number) {
    setCart(updateQuantity(id, qty));
  }

  function handleLanjutkan() {
    alert("Fitur pemesanan akan tersedia di V5");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-lg mb-6">Keranjang kosong</p>
          <Link
            href="/services"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Lihat Layanan
          </Link>
        </div>
      ) : (
        <>
          {/* Daftar Item */}
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
              >
                {/* Info Produk */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-base truncate">
                    {item.productName}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.materialName} &bull; {item.thickness}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600 whitespace-nowrap">
                    Qty:
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                {/* Subtotal */}
                <div className="text-right min-w-[120px]">
                  <p className="font-semibold text-orange-600 text-base">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </p>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap"
                  aria-label={`Hapus ${item.productName}`}
                >
                  🗑️ Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Footer: Total + Aksi */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-700 font-medium text-lg">
                Total Harga
              </span>
              <span className="text-2xl font-bold text-orange-600">
                Rp {totalHarga.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <button
                onClick={handleClear}
                className="border border-gray-300 text-gray-600 hover:bg-gray-100 font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                Kosongkan Keranjang
              </button>
              <button
                onClick={handleLanjutkan}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
              >
                Lanjutkan ke Pemesanan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
