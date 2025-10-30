// app/checkout/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { useCheckout } from '../../context/CheckoutContext';
import CheckoutStepper from '../../components/checkout/CheckoutStepper';
import ShippingForm from '../../components/checkout/ShippingForm';
import PaymentForm from '../../components/checkout/PaymentForm';
import OrderReview from '../../components/checkout/OrderReview';
import { CheckoutProvider } from '../../context/CheckoutContext';

function CheckoutContent() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { currentStep, orderComplete, orderId } = useCheckout();

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push('/cart');
    }
  }, [items.length, orderComplete, router]);

  // Redirect to success page when order is complete
  useEffect(() => {
    if (orderComplete && orderId) {
      // Clear cart and redirect to success page
      setTimeout(() => {
        clearCart();
        router.push(`/checkout/success?orderId=${orderId}`);
      }, 100);
    }
  }, [orderComplete, orderId, router, clearCart]); // clearCart sekarang aman karena pakai useCallback

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
        <h1 className="text-2xl font-bold text-yellow-800 mb-4">Keranjang Anda kosong</h1>
<p className="text-yellow-600 mb-6">
  Silakan tambahkan beberapa item ke keranjang sebelum melanjutkan ke checkout.
</p>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  const orderSummary = {
    subtotal: getTotalPrice(),
    shipping: getTotalPrice() > 100 ? 0 : 9.99,
    tax: getTotalPrice() * 0.1,
    total: getTotalPrice() + (getTotalPrice() > 100 ? 0 : 9.99) + (getTotalPrice() * 0.1),
    itemsCount: getTotalItems(),
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'shipping':
        return <ShippingForm />;
      case 'payment':
        return <PaymentForm />;
      case 'review':
        return <OrderReview orderSummary={orderSummary} />;
      default:
        return <ShippingForm />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
 <div className="text-center mb-8">
  <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
  <p className="text-gray-600">Selesaikan pembelian Anda dalam beberapa langkah</p>
</div>

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto mb-8">
        <CheckoutStepper currentStep={currentStep} />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderStepContent()}
          </div>
        </div>

        {/* Order Summary Sidebar */}


{/* Order Summary Sidebar */}
<div className="lg:col-span-1">
  <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-4">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
    
    <div className="space-y-3 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Item ({orderSummary.itemsCount})</span>
        <span className="font-medium">${orderSummary.subtotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Pengiriman</span>
        <span className="font-medium">
          {orderSummary.shipping === 0 ? 'Gratis' : `$${orderSummary.shipping}`}
        </span>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Pajak (10%)</span>
        <span className="font-medium">${orderSummary.tax.toFixed(2)}</span>
      </div>
    </div>
    
    <div className="border-t pt-3">
      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span className="text-blue-600">${orderSummary.total.toFixed(2)}</span>
      </div>
    </div>

    {orderSummary.subtotal > 100 && (
      <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
        🎉 Anda memenuhi syarat untuk pengiriman gratis!
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <CheckoutProvider>
      <CheckoutContent />
    </CheckoutProvider>
  );
}