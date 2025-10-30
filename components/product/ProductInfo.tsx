// components/product/ProductInfo.tsx
"use client";

import { Star, Truck, Shield, RotateCcw } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Product } from '@/types/products';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem, items } = useCart();

  const isInCart = items.some(item => item.product.id === product.id);

  const renderStars = (rate: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rate) 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-500 ml-2">
          {rate} • {product.rating.count} reviews
        </span>
      </div>
    );
  };

  const handleAddToCart = async () => {
    setIsAdding(true);
    
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAdding(false);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    // Redirect to cart page
    window.location.href = '/cart';
  };

  return (
    <div className="space-y-6">
      {/* Category & Title */}
      <div>
        <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
          {product.title}
        </h1>
        
        {/* Rating */}
        {renderStars(product.rating.rate)}
      </div>

      {/* Price */}
      <div className="flex items-baseline space-x-2">
        <span className="text-4xl font-bold text-gray-900">
          ${product.price}
        </span>
        <span className="text-lg text-gray-500 line-through">
          ${(product.price * 1.2).toFixed(2)}
        </span>
        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
          20% OFF
        </span>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Quantity Selector */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 font-semibold min-w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {quantity} {quantity === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || isInCart}
          size="lg"
          className={`flex-1 ${
            isInCart ? 'bg-green-500 hover:bg-green-600' : ''
          }`}
        >
          {isAdding ? (
            <>
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Adding...
            </>
          ) : isInCart ? (
            '✓ Added to Cart'
          ) : (
            'Add to Cart'
          )}
        </Button>
        
        <Button
          onClick={handleBuyNow}
          disabled={isAdding}
          variant="outline"
          size="lg"
          className="flex-1"
        >
          Buy Now
        </Button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
        <div className="flex items-center space-x-3">
          <Truck className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">Free Shipping</p>
            <p className="text-sm text-gray-500">On orders over $100</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Shield className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">2-Year Warranty</p>
            <p className="text-sm text-gray-500">Quality guaranteed</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <RotateCcw className="h-6 w-6 text-blue-600" />
          <div>
            <p className="font-semibold text-gray-900">Easy Returns</p>
            <p className="text-sm text-gray-500">30-day return policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}