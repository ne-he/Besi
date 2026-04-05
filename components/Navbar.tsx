import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold tracking-tight">
            BesiKita
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Beranda
            </Link>
            <Link href="/services" className="hover:text-slate-300 transition-colors">
              Layanan
            </Link>
            <Link href="/gallery" className="hover:text-slate-300 transition-colors">
              Galeri
            </Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
