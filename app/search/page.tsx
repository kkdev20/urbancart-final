// app/search/page.tsx
"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/context/SearchContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';
import { Filter, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { filters, setSearchQuery, clearFilters } = useSearch();
  const { products, loading } = useProducts();

  // Update search context dengan query dari URL
  React.useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query, setSearchQuery]);

  // Filter products berdasarkan search query
  const filteredProducts = products.filter(product => {
    const matchesSearch = !filters.query || 
      product.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.query.toLowerCase());
    
    const matchesCategory = filters.category === 'all' || 
      product.category === filters.category;
    
    const matchesPrice = product.price >= filters.minPrice && 
      product.price <= filters.maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort products
  const sortedProducts = React.useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (filters.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'name':
      default:
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }
  }, [filteredProducts, filters.sortBy]);

  const hasActiveFilters = filters.query || filters.category !== 'all' || 
    filters.minPrice > 0 || filters.maxPrice < 1000;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {filters.query ? `Pencarian: "${filters.query}"` : 'Semua Produk'}
          </h1>
          <p className="text-gray-600">
            Ditemukan {sortedProducts.length} produk
            {filters.query && ` untuk "${filters.query}"`}
          </p>
        </div>

        {/* Filter Button & Clear */}
        <div className="flex items-center space-x-3">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Hapus Filter</span>
            </Button>
          )}
          
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Results Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        /* No Results State */
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak Ada Produk Ditemukan</h3>
            <p className="text-gray-600 mb-4">
              {filters.query 
                ? `Tidak ada produk yang cocok dengan "${filters.query}". Coba kata kunci lain.`
                : 'Tidak ada produk yang cocok dengan filter Anda.'
              }
            </p>
            <Button onClick={clearFilters}>
              Hapus Pencarian & Filter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}