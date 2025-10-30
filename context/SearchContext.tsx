// context/SearchContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'name' | 'price-low' | 'price-high' | 'rating';
}

interface SearchContextType {
  filters: SearchFilters;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sort: SearchFilters['sortBy']) => void;
  clearFilters: () => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 1000,
  sortBy: 'name',
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);

  const setSearchQuery = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, query }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters(prev => ({ ...prev, category }));
  }, []);

  const setPriceRange = useCallback((min: number, max: number) => {
    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
  }, []);

  const setSortBy = useCallback((sortBy: SearchFilters['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const value: SearchContextType = {
    filters,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setSortBy,
    clearFilters,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}