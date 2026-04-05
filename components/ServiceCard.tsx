import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-4xl" role="img" aria-label={title}>
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="flex-1 text-sm text-gray-600">{description}</p>
      <Link
        href="/services"
        className="mt-2 inline-block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Detail
      </Link>
    </article>
  );
}
