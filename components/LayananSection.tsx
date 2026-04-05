import ServiceCard from "./ServiceCard";
import { ServiceItem } from "@/types";

const services: ServiceItem[] = [
  {
    id: "kursi-besi",
    title: "Kursi Besi",
    description: "Kursi besi custom untuk kebutuhan indoor maupun outdoor.",
    icon: "🪑",
  },
  {
    id: "pagar-besi",
    title: "Pagar Besi",
    description: "Pagar besi kokoh dengan desain sesuai kebutuhan Anda.",
    icon: "🔩",
  },
  {
    id: "kanopi",
    title: "Kanopi",
    description: "Kanopi besi tahan cuaca untuk carport dan teras rumah.",
    icon: "🏠",
  },
];

export default function LayananSection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 text-center text-3xl font-bold text-gray-800">
          Layanan Kami
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
