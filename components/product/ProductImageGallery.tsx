// components/product/ProductImageGallery.tsx
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/types/products';
import { ZoomIn } from 'lucide-react'; // Ganti Zoom dengan ZoomIn

interface ProductImageGalleryProps {
  product: Product;
}

export default function ProductImageGallery({ product }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Create multiple image views from single product image
  const productImages = [
    product.image,
    product.image, // Simulate different angles
    product.image,
    product.image
  ];

  const imageSrc = imageError 
    ? `https://picsum.photos/600/600?random=${product.id}`
    : productImages[selectedImage];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          onError={() => setImageError(true)}
        />
        
        {/* Zoom Indicator */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-4 w-4" /> {/* Ganti Zoom dengan ZoomIn */}
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {productImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${
              selectedImage === index 
                ? 'border-blue-500 ring-2 ring-blue-200' 
                : 'border-transparent hover:border-gray-300'
            }`}
          >
            <Image
              src={imageError ? `https://picsum.photos/150/150?random=${product.id}-${index}` : image}
              alt={`${product.title} view ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}