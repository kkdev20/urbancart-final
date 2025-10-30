// components/filter/FilterSidebar.tsx
"use client";

import { useSearch } from '@/context/SearchContext';
import { useCategories } from '@/hooks/useProducts';
import Button from '@/components/ui/Button';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  onClose?: () => void;
}

export default function FilterSidebar({ onClose }: FilterSidebarProps) {
  const { filters, setCategory, setPriceRange, clearFilters } = useSearch();
  const { categories, loading } = useCategories();

// Dalam FilterSidebar.tsx - update price range labels:
const priceRanges = [
  { label: 'Dibawah $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $100', min: 50, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: 'Diatas $200', min: 200, max: 1000 },
];

  const hasActiveFilters = filters.category !== 'all' || 
    filters.minPrice > 0 || filters.maxPrice < 1000;

  return (
    <div className="bg-white p-6 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filter</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full"
          >
            Hapus Semua Filter
          </Button>
        </div>
      )}

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Kategori</h3>
        <div className="space-y-2">
          <button
            onClick={() => setCategory('all')}
            className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
              filters.category === 'all'
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
             Semua Kategori
          </button>
          
          {!loading && categories.map(category => (
            <button
              key={category}
              onClick={() => setCategory(category)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm capitalize ${
                filters.category === category
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Rentang Harga</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <button
              key={range.label}
              onClick={() => setPriceRange(range.min, range.max)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${
                filters.minPrice === range.min && filters.maxPrice === range.max
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Price Range */}
      <div className="mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Harga Kustom</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Min</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setPriceRange(Number(e.target.value), filters.maxPrice)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="0"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Maks</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="border-t pt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Filter Aktif</h3>
          <div className="space-y-2">
            {filters.category !== 'all' && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Kategori:</span>
                <span className="font-medium capitalize">{filters.category}</span>
              </div>
            )}
            {(filters.minPrice > 0 || filters.maxPrice < 1000) && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Harga:</span>
                <span className="font-medium">
                  ${filters.minPrice} - ${filters.maxPrice}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}