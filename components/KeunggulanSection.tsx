import { AdvantageItem } from "@/types";

const advantages: (AdvantageItem & { icon: string })[] = [
  {
    id: "bahan-berkualitas",
    title: "Bahan Berkualitas",
    description:
      "Menggunakan besi pilihan berstandar SNI untuk ketahanan jangka panjang.",
    icon: "🏆",
  },
  {
    id: "harga-bersaing",
    title: "Harga Bersaing",
    description: "Harga transparan dan kompetitif tanpa biaya tersembunyi.",
    icon: "💰",
  },
  {
    id: "pengerjaan-tepat-waktu",
    title: "Pengerjaan Tepat Waktu",
    description: "Komitmen penyelesaian sesuai jadwal yang disepakati.",
    icon: "⏰",
  },
];

export default function KeunggulanSection() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-800">
          Keunggulan Kami
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.id}
              className="rounded-xl bg-white p-6 text-center shadow-sm"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
