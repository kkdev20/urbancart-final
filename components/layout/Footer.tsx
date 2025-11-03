// components/layout/Footer.tsx
import { Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4">
              UrbanCart
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Platform ecommerce terpercaya untuk kebutuhan sehari-hari dengan kualitas premium.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Tautan Cepat</h4>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a href="/" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Produk
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Tentang
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Layanan Pelanggan</h4>
            <ul className="space-y-3 text-blue-100">
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Pengembalian
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Info Pengiriman
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 inline-block">
                  Panduan Ukuran
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-white">Hubungi Kami</h4>
            <div className="text-blue-100 space-y-3 leading-relaxed">
              <p className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>support@urbancart.com</span>
              </p>
              <p className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>(021) 1234-5678</span>
              </p>
              <p className="flex items-start">
                <Clock className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>Senin-Jumat<br />09:00-18:00</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-500 mt-12 pt-8 text-center">
          <p className="text-blue-100 mb-2">
            &copy; 2024 UrbanCart. Hak cipta dilindungi.
          </p>
          <p className="text-blue-200 text-sm">
            Powered by{' '}
            <a 
              href="https://wistack.site" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 font-semibold"
            >
              wistack.site
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}