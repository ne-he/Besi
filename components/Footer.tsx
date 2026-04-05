export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">© 2024 BesiKita. Semua hak dilindungi.</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm">
            <a href="mailto:info@besikita.com" className="hover:text-white transition-colors">
              info@besikita.com
            </a>
            <a href="tel:081234567890" className="hover:text-white transition-colors">
              0812-3456-7890
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
