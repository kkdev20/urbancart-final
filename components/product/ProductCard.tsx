// components/product/ProductCard.tsx - UPDATE UNTUK SUPPORT LIST VIEW
"use client";

import Image from 'next/image';
import { Star, ShoppingCart, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useState } from 'react';
import { Product } from '@/types/products';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list'; // Tambah prop variant
}

export default function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, items } = useCart();
  
  const { title, price, image, category, rating, description, id } = product;

  // Check if product is already in cart
  const isInCart = items.some(item => item.product.id === product.id);

  const renderStars = (rate: number) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 transition-all duration-200 ${
              i < Math.floor(rate) 
                ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-xs text-gray-500 ml-1">({rating.count})</span>
      </div>
    );
  };

  const handleAddToCart = async () => {
    if (isInCart) return;
    
    setIsAdding(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addItem(product);
    setIsAdding(false);
  };

  // Fallback image URL jika gambar dari API error
  const imageSrc = imageError 
    ? `https://picsum.photos/400/400?random=${product.id}`
    : image;

  // Grid View (default)
  if (variant === 'grid') {
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-blue-200 flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
          <Link href={`/products/${id}`}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
              onError={() => setImageError(true)}
            />
          </Link>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 py-0.5 rounded-full text-xs font-semibold capitalize shadow-lg backdrop-blur-sm">
              {category}
            </span>
          </div>

          {/* In Cart Badge */}
          {isInCart && (
            <div className="absolute top-2 right-2">
              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                <Check className="h-3 w-3" />
                <span>In Cart</span>
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-1 min-h-0">
          <Link href={`/products/${id}`} className="flex-shrink-0">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-10 hover:text-blue-600 cursor-pointer transition-colors duration-200 text-sm leading-tight">
              {title}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="mb-3 flex-shrink-0">
            {renderStars(rating.rate)}
          </div>
          
          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex-shrink-0">
              <span className="text-base font-bold text-gray-900">
                ${price}
              </span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
              className={`flex items-center space-x-1 flex-shrink-0 ${
                isInCart 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                  : ''
              }`}
            >
              {isAdding ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs">Menambah...</span>
                </>
              ) : isInCart ? (
                <>
                  <Check className="h-4 w-4" />
                  <span className="text-xs">Ditambahkan</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-xs">Tambah</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-blue-200">
      <div className="flex">
        {/* Product Image */}
        <div className="relative w-40 h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <Link href={`/products/${id}`}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
              sizes="160px"
              onError={() => setImageError(true)}
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <Link href={`/products/${id}`}>
                <h3 className="font-semibold text-gray-900 text-base hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors duration-200 leading-tight">
                  {title}
                </h3>
              </Link>
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize ml-3 flex-shrink-0 shadow-md">
                {category}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-2 line-clamp-2 leading-relaxed">
              {description}
            </p>
            
            {/* Rating */}
            <div className="mb-2">
              {renderStars(rating.rate)}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                ${price}
              </span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
              className={`flex items-center space-x-1 ${
                isInCart 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                  : ''
              }`}
            >
              {isAdding ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menambah...</span>
                </>
              ) : isInCart ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tambah</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Tambah ke Keranjang</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}