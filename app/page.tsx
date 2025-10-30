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
      <div className="container mx-auto px-4 py-8">
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">UrbanCart </h1>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4">Selamat Datang di UrbanCart</h2>
        <p className="text-xl mb-6 opacity-90">Temukan produk terbaik dengan harga terjangkau</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 transition-all"
            >
              Jelajahi Semua Produk
            </Button>
          </Link>
<Button 
  variant="outline"
  size="lg" 
  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all font-semibold shadow-lg"
  onClick={() => {
    document.getElementById('featured-products')?.scrollIntoView({ behavior: 'smooth' });
  }}
>
  Produk Unggulan
</Button>
        </div>
      </div>

      {/* Featured Products */}
      <div id="featured-products">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Produk Unggulan</h2>
          {!loading && (
            <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
              Lihat Semua →
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Produk Ditemukan</h3>
              <p className="text-gray-600 mb-4">Kami tidak dapat menemukan produk saat ini.</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Muat Ulang Halaman
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="mt-16 text-center">
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Siap Menjelajah Lebih Banyak?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Temukan koleksi lengkap kami dengan filter lanjutan, pencarian, dan opsi penyortiran.
          </p>
          <Link href="/products">
            <Button size="lg">
              Jelajahi Semua Produk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}