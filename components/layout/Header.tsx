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
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
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
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {localSearch && (
                <button
                  type="button"
                  onClick={() => {
                    setLocalSearch('');
                    setSearchQuery('');
                  }}
                  className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <User className="h-6 w-6 text-gray-600" />
            </button>
            
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="flex items-center space-x-6 pb-3 overflow-x-auto">
          <button
            onClick={() => setSearchQuery('')}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap"
          >
            Semua Produk
          </button>
          <button
            onClick={() => setSearchQuery('electronics')}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap"
          >
            Elektronik
          </button>
          <button
            onClick={() => setSearchQuery('clothing')}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap"
          >
            Fashion
          </button>
          <button
            onClick={() => setSearchQuery('jewelery')}
            className="text-sm font-medium text-gray-600 hover:text-blue-600 whitespace-nowrap"
          >
            Perhiasan
          </button>
          <Link 
            href="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
          >
            Jelajahi Semua →
          </Link>
        </div>
      </div>
    </header>
  );
}