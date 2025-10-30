// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">UrbanCart</h3>
            <p className="text-gray-300">
              Platform ecommerce terpercaya untuk kebutuhan sehari-hari.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Beranda</a></li>
              <li><a href="/products" className="hover:text-white">Produk</a></li>
              <li><a href="/about" className="hover:text-white">Tentang</a></li>
              <li><a href="/contact" className="hover:text-white">Kontak</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:text-white">Pengembalian</a></li>
              <li><a href="#" className="hover:text-white">Info Pengiriman</a></li>
              <li><a href="#" className="hover:text-white">Panduan Ukuran</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <div className="text-gray-300 space-y-2">
              <p>Email: support@urbancart.com</p>
              <p>Telepon: (021) 1234-5678</p>
              <p>Jam Operasional: Senin-Jumat 09:00-18:00</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 UrbanCart. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}