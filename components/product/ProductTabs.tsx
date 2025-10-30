// components/product/ProductTabs.tsx
"use client";

import { useState } from 'react';
import { Product } from '@/types/products';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Deskripsi' },
    { id: 'specifications', label: 'Spesifikasi' },
    { id: 'reviews', label: 'Ulasan' },
  ];

  const tabContent = {
    description: (
      <div className="space-y-4">
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Kualitas Premium</h4>
            <p className="text-blue-700 text-sm">
              Dibuat dengan bahan berkualitas tinggi dan pengerjaan ahli untuk daya tahan yang tahan lama.
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Mudah Digunakan</h4>
            <p className="text-green-700 text-sm">
              Desain yang ramah pengguna dengan fitur intuitif untuk penggunaan sehari-hari yang mudah.
            </p>
          </div>
        </div>
      </div>
    ),
    
    specifications: (
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Detail Produk</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Kategori:</span>
                <span className="font-medium capitalize">{product.category}</span>
              </li>
              <li className="flex justify-between">
                <span>Material:</span>
                <span className="font-medium">Kualitas Premium</span>
              </li>
              <li className="flex justify-between">
                <span>Berat:</span>
                <span className="font-medium">1.2 kg</span>
              </li>
              <li className="flex justify-between">
                <span>Dimensi:</span>
                <span className="font-medium">10 × 15 × 8 cm</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Fitur</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Daya tahan tinggi
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Mudah dibersihkan
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Material ramah lingkungan
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Garansi 2 tahun
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
    
    reviews: (
      <div className="space-y-6">
        {/* Review Summary */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{product.rating.rate}</div>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < Math.floor(product.rating.rate) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {product.rating.count} ulasan
              </div>
            </div>
            
            <div className="flex-1">
              <div className="space-y-1">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-4">{star}</span>
                    <span className="text-yellow-400">★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ 
                          width: `${(star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : star === 2 ? 3 : 2)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sample Reviews */}
        <div className="space-y-4">
          <div className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Budi S.</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "Produk yang bagus! Kualitasnya melebihi ekspektasi saya. Pengiriman juga cepat!"
            </p>
            <span className="text-gray-400 text-xs">2 hari yang lalu</span>
          </div>
          
          <div className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Sari M.</span>
              <div className="flex items-center space-x-1">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
                <span className="text-gray-300 text-sm">★</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              "Nilai yang bagus untuk uang. Bekerja sesuai deskripsi. Akan merekomendasikan ke teman."
            </p>
            <span className="text-gray-400 text-xs">1 minggu yang lalu</span>
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div>
      {/* Tab Headers */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {tabContent[activeTab as keyof typeof tabContent]}
      </div>
    </div>
  );
}