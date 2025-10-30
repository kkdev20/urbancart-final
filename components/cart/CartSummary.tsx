// components/cart/CartSummary.tsx - UPDATED BAHASA INDONESIA
"use client";

import Button from '@/components/ui/Button';
import { CartItem } from '@/types/cart';
import { useRouter } from 'next/navigation';

interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  onCheckout?: () => void;
}

export default function CartSummary({ 
  items, 
  totalPrice, 
  totalItems, 
  onCheckout 
}: CartSummaryProps) {
  const router = useRouter();
  
  const shippingFee = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shippingFee + tax;

  const handleCheckoutClick = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Item ({totalItems})</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Pengiriman</span>
          <span className="font-medium">
            {shippingFee === 0 ? 'Gratis' : `$${shippingFee}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Pajak (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        {totalPrice > 100 && (
          <div className="text-green-600 text-sm bg-green-50 rounded px-2 py-1">
            🎉 Gratis ongkir untuk pesanan di atas $100!
          </div>
        )}
        
        <div className="border-t pt-3">
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <Button 
        onClick={handleCheckoutClick}
        disabled={items.length === 0}
        className="w-full"
      >
        Lanjut ke Checkout
      </Button>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm text-center mt-2">
          Tambahkan item ke keranjang untuk checkout
        </p>
      )}
    </div>
  );
}