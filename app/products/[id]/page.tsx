// app/products/page.tsx
"use client";

import React from 'react';
import { useSearch } from '@/context/SearchContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/product/ProductCard';
import ProductGridSkeleton from '@/components/product/ProductGridSkeleton';
import FilterSidebar from '@/components/filter/FilterSidebar';
import SortOptions from '@/components/filter/SortOptions';
import { Filter, Grid, List } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ProductsPage() {
  const { filters } = useSearch();
  const { products, loading } = useProducts();
  const [showFilters, setShowFilters] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  // Filter products berdasarkan filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = !filters.query || 
      product.title.toLowerCase().includes(filters.query.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.query.toLowerCase());
    
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductGridSkeleton count={12} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">
            {sortedProducts.length} products found
            {filters.query && ` for "${filters.query}"`}
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort Options */}
          <SortOptions />

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar - Desktop */}
        <div className="hidden lg:block w-80 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Overlay */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilters(false)}
            />
            <div className="absolute left-0 top-0 h-full w-80 bg-white overflow-y-auto">
              <FilterSidebar onClose={() => setShowFilters(false)} />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  No products match your current filters.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}