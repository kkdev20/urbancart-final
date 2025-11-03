// app/page.tsx - UPDATED BAHASA INDONESIA
"use client";

import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';
import { useProducts } from '@/hooks/useProducts';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Home() {
  const { products, loading, error } = useProducts();

  // Error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">UrbanCart </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Error Memuat Produk</h2>
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white rounded-2xl p-8 md:p-10 mb-12 text-center shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Selamat Datang di UrbanCart</h2>
          <p className="text-base md:text-lg mb-6 opacity-95 max-w-2xl mx-auto leading-relaxed">
            Temukan produk terbaik dengan harga terjangkau dan kualitas premium
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products">
              <Button 
                variant="outline" 
                size="md" 
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-md"
              >
                Jelajahi Semua Produk
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="md" 
              className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-md"
              onClick={() => {
                document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Produk Unggulan
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured-products" className="mb-16">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Produk Unggulan</h2>
            <p className="text-gray-600">Koleksi pilihan terbaik untuk Anda</p>
          </div>
          {!loading && (
            <Link href="/products" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2 group transition-colors">
              <span>Lihat Semua</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          )}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div>
            <ProductGridSkeleton count={8} />
          </div>
        )}
        
        {/* Success State */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
            {products.slice(0, 8).map(product => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-10 max-w-md mx-auto shadow-lg border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tidak Ada Produk Ditemukan</h3>
              <p className="text-gray-600 mb-6">Kami tidak dapat menemukan produk saat ini.</p>
              <Button 
                onClick={() => window.location.reload()}
                size="md"
              >
                Muat Ulang Halaman
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center">
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }}></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Siap Menjelajah Lebih Banyak?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Temukan koleksi lengkap kami dengan filter lanjutan, pencarian, dan opsi penyortiran yang mudah digunakan.
            </p>
            <Link href="/products">
              <Button size="md" className="shadow-lg">
                Jelajahi Semua Produk
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}