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
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rate) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-1">({rating.count})</span>
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
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <Link href={`/products/${id}`}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              onError={() => setImageError(true)}
            />
          </Link>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium capitalize">
              {category}
            </span>
          </div>

          {/* In Cart Badge */}
          {isInCart && (
            <div className="absolute top-2 right-2">
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                <Check className="h-3 w-3" />
                <span>In Cart</span>
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link href={`/products/${id}`}>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-12 hover:text-blue-600 cursor-pointer">
              {title}
            </h3>
          </Link>
          
          {/* Rating */}
          {renderStars(rating.rate)}
          
          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${price}
              </span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
              className={`flex items-center space-x-1 ${
                isInCart ? 'bg-green-500 hover:bg-green-600' : ''
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
                  <span>Ditambahkan</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Tambah</span>
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
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="flex">
        {/* Product Image */}
        <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden bg-gray-100">
          <Link href={`/products/${id}`}>
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
              sizes="128px"
              onError={() => setImageError(true)}
            />
          </Link>
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <Link href={`/products/${id}`}>
                <h3 className="font-semibold text-gray-800 text-lg hover:text-blue-600 cursor-pointer line-clamp-2">
                  {title}
                </h3>
              </Link>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium capitalize ml-2 flex-shrink-0">
                {category}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
            
            {/* Rating */}
            {renderStars(rating.rate)}
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">
                ${price}
              </span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding || isInCart}
              className={`flex items-center space-x-1 ${
                isInCart ? 'bg-green-500 hover:bg-green-600' : ''
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