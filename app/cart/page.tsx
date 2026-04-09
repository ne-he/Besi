"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, CartItem } from "@/utils/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Keranjang Belanja
      </h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 text-lg mb-6">Keranjang kosong</p>
          <Link
            href="/services"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Lihat Layanan
          </Link>
        </div>
      )}
    </div>
  );
}
