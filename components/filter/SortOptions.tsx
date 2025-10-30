// components/filter/SortOptions.tsx
"use client";

import { useSearch } from '@/context/SearchContext';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const sortOptions = [
  { value: 'name', label: 'Nama A-Z' },
  { value: 'price-low', label: 'Harga: Terendah ke Tertinggi' },
  { value: 'price-high', label: 'Harga: Tertinggi ke Terendah' },
  { value: 'rating', label: 'Rating Tertinggi' },
] as const;

export default function SortOptions() {
  const { filters, setSortBy } = useSearch();
  const [isOpen, setIsOpen] = useState(false);

  const currentSortLabel = sortOptions.find(opt => opt.value === filters.sortBy)?.label || 'Urutkan';

  const handleSortChange = (sortValue: typeof filters.sortBy) => {
    setSortBy(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">{currentSortLabel}</span>
        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Urutkan Berdasarkan
              </div>
              
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
                    filters.sortBy === option.value
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{option.label}</span>
                  {filters.sortBy === option.value && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}