// components/cart/CartItem.tsx
"use client";

import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import Button from '@/components/ui/Button';
type CartItemType = any;
import { useState } from 'react';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [imageError, setImageError] = useState(false);
  const { product, quantity } = item;

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };

  const handleRemove = () => {
    onRemove(product.id);
  };

  const imageSrc = imageError 
    ? `https://picsum.photos/200/200?random=${product.id}`
    : product.image;

  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg border border-gray-200 p-4">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover rounded-md"
          onError={() => setImageError(true)}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm capitalize">{product.category}</p>
        <div className="flex items-center mt-1">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          {quantity > 1 && (
            <span className="text-gray-500 text-sm ml-2">
              = ${(product.price * quantity).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <span className="w-8 text-center font-semibold">
          {quantity}
        </span>
        
        <Button
          size="sm"
          variant="outline"
          onClick={handleIncrease}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {/* Remove Button */}
      <Button
        size="sm"
        variant="outline"
        onClick={handleRemove}
        className="text-red-600 border-red-200 hover:bg-red-50 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}