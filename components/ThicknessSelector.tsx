"use client";

import { ThicknessOption, thicknessOptions } from "@/data/thickness";

interface ThicknessSelectorProps {
  selectedThickness: ThicknessOption;
  onThicknessChange: (thickness: ThicknessOption) => void;
}

export default function ThicknessSelector({
  selectedThickness,
  onThicknessChange,
}: ThicknessSelectorProps) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">Ketebalan</p>
      <div className="flex flex-wrap gap-2">
        {thicknessOptions.map((option) => {
          const isActive = option.id === selectedThickness.id;
          return (
            <button
              key={option.id}
              onClick={() => onThicknessChange(option)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                isActive
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-gray-700 border-gray-300 hover:border-slate-500"
              }`}
              aria-pressed={isActive}
            >
              <span>{option.label}</span>
              <span className="block text-xs mt-0.5 opacity-80">
                {option.hargaTambahan === 0
                  ? "Gratis"
                  : `+Rp ${option.hargaTambahan.toLocaleString("id-ID")}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
