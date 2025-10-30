// app/cart/page.tsx - UPDATED BAHASA INDONESIA
"use client";

import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import Button from '../../components/ui/Button';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Keranjang Anda kosong</h1>
          
          <p className="text-gray-600 mb-8 text-lg">
            Sepertinya Anda belum menambahkan item apapun ke keranjang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Lanjutkan Belanja</span>
              </Button>
            </Link>
            
            <Button variant="outline" onClick={() => window.location.reload()}>
              Muat Ulang Keranjang
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Keranjang Belanja</h1>
          <p className="text-gray-600 mt-2">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'item'} di keranjang Anda
          </p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={clearCart}
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          Kosongkan Keranjang
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
           {items.map((item: any) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8 pt-6 border-t">
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Lanjutkan Belanja</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <CartSummary
            items={items}
            totalPrice={getTotalPrice()}
            totalItems={getTotalItems()}
            onCheckout={handleCheckout}
          />
        </div>
      </div>
    </div>
  );
}