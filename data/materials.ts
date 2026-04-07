export interface Material {
  id: string;
  nama: string;
  hargaTambahanPerUnit: number;
  satuan: string;
}

export const materials: Material[] = [
  {
    id: "hollow-hitam",
    nama: "Hollow Hitam",
    hargaTambahanPerUnit: 50000,
    satuan: "per unit",
  },
  {
    id: "hollow-galvanis",
    nama: "Hollow Galvanis",
    hargaTambahanPerUnit: 75000,
    satuan: "per unit",
  },
  {
    id: "siku-besi",
    nama: "Siku Besi",
    hargaTambahanPerUnit: 40000,
    satuan: "per unit",
  },
];
