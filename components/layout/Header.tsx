// components/layout/Header.tsx - UPDATED BAHASA INDONESIA
"use client";

import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useSearch } from '@/context/SearchContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { getTotalItems } = useCart();
  const { setSearchQuery, filters } = useSearch();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState(filters.query);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    
    if (localSearch.trim()) {
      router.push(`/search?q=${encodeURIComponent(localSearch)}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:via-blue-800 hover:to-purple-700 transition-all duration-300">
                UrbanCart
              </h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Cari produk... (tekan Enter untuk mencari)"
                value={localSearch}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                className="w-full px-5 py-3 pl-12 pr-12 rounded-xl border-2 border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-300 placeholder:text-gray-400 shadow-sm"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 hover:text-gray-600 hover:scale-110 transition-transform duration-200"
                >
                  ×
                </button>
              )}
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              <User className="h-6 w-6 text-gray-600" />
            </button>
            
            <Link href="/cart" className="relative p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 hover:scale-105">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex items-center space-x-4 pb-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            Semua Produk
          </button>
          <button
            onClick={() => setSearchQuery('electronics')}
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            Elektronik
          </button>
          <button
            onClick={() => setSearchQuery('clothing')}
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            Fashion
          </button>
          <button
            onClick={() => setSearchQuery('jewelery')}
            className="text-sm font-semibold text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
          >
            Perhiasan
          </button>
          <Link 
            href="/products"
            className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white whitespace-nowrap px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
          >
            Jelajahi Semua →
          </Link>
        </div>
      </div>
    </header>
  );
}