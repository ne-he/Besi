export interface ThicknessOption {
  id: string;
  label: string;
  hargaTambahan: number;
}

export const thicknessOptions: ThicknessOption[] = [
  {
    id: "1-2mm",
    label: "1.2mm",
    hargaTambahan: 0,
  },
  {
    id: "1-5mm",
    label: "1.5mm",
    hargaTambahan: 25000,
  },
  {
    id: "2-0mm",
    label: "2.0mm",
    hargaTambahan: 50000,
  },
];
