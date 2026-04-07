"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { Material, materials } from "@/data/materials";
import { ThicknessOption, thicknessOptions } from "@/data/thickness";
import MaterialSelector from "@/components/MaterialSelector";
import ThicknessSelector from "@/components/ThicknessSelector";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(materials[0]);
  const [selectedThickness, setSelectedThickness] = useState<ThicknessOption>(thicknessOptions[0]);
  const [savedSelection, setSavedSelection] = useState<{
    material: Material;
    thickness: ThicknessOption;
  } | null>(null);

  const hargaTotal =
    product.hargaDasar +
    selectedMaterial.hargaTambahanPerUnit +
    selectedThickness.hargaTambahan;

  const handleSimpanPilihan = () => {
    setSavedSelection({ material: selectedMaterial, thickness: selectedThickness });
    alert("Pilihan disimpan sementara");
  };

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

          {/* Selectors */}
          <div className="space-y-4 pt-2">
            <MaterialSelector
              selectedMaterial={selectedMaterial}
              onMaterialChange={setSelectedMaterial}
            />
            <ThicknessSelector
              selectedThickness={selectedThickness}
              onThicknessChange={setSelectedThickness}
            />
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Harga dasar</span>
              <span>Rp {product.hargaDasar.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>+ Bahan ({selectedMaterial.nama})</span>
              <span>Rp {selectedMaterial.hargaTambahanPerUnit.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>+ Ketebalan ({selectedThickness.label})</span>
              <span>
                {selectedThickness.hargaTambahan === 0
                  ? "Gratis"
                  : `Rp ${selectedThickness.hargaTambahan.toLocaleString("id-ID")}`}
              </span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800 pt-2 border-t border-gray-200">
              <span>Total</span>
              <span>Rp {hargaTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Dimensi */}
          <div className="flex justify-between text-sm text-gray-500">
            <span>Dimensi Contoh</span>
            <span className="font-medium text-gray-800">{product.dimensiContoh}</span>
          </div>

          {/* Simpan Pilihan Button */}
          <button
            onClick={handleSimpanPilihan}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-2"
          >
            Simpan Pilihan
          </button>
        </div>
      </div>
    </div>
  );
}
