import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-slate-700 to-slate-900 text-white py-24 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Jasa Olah Besi Profesional untuk Bangunan Anda
      </h1>
      <p className="text-lg md:text-xl text-slate-300 mb-8">
        Kursi, Pagar, Kanopi, dan segala kebutuhan besi Anda
      </p>
      <Link
        href="/services"
        className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
      >
        Lihat Layanan
      </Link>
    </section>
  );
}
