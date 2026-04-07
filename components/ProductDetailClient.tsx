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

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/services" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        ← Kembali ke Layanan
      </Link>
      <p>Placeholder - akan diisi di task berikutnya</p>
    </div>
  );
}
