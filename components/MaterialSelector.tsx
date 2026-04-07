"use client";

import { Material, materials } from "@/data/materials";

interface MaterialSelectorProps {
  selectedMaterial: Material;
  onMaterialChange: (material: Material) => void;
}

export default function MaterialSelector({
  selectedMaterial,
  onMaterialChange,
}: MaterialSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">Jenis Bahan</p>
      <div className="flex flex-wrap gap-2">
        {materials.map((material) => {
          const isActive = material.id === selectedMaterial.id;
          return (
            <button
              key={material.id}
              onClick={() => onMaterialChange(material)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-gray-700 border-gray-300 hover:border-slate-500"
              }`}
              aria-pressed={isActive}
            >
              <span>{material.nama}</span>
              <span className="block text-xs mt-0.5 opacity-80">
                +Rp {material.hargaTambahanPerUnit.toLocaleString("id-ID")}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
