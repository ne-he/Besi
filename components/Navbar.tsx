"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCart } from "@/utils/cart";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCart().length);
  }, []);

  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            BesiKita
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Beranda
            </Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Layanan
            </Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors">
              Galeri
            </Link>
            <Link href="/request" className="hover:text-slate-300 transition-colors">
              Custom Order
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Kontak
            </Link>
            <Link href="/cart" className="relative hover:text-slate-300 transition-colors">
              <span>🛒</span>
              <span className="sr-only">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
