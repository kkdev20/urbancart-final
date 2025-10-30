// components/checkout/OrderReview.tsx
"use client";

import { useCheckout } from '@/context/CheckoutContext';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';
import { OrderSummary as OrderSummaryType } from '@/types/checkout';
import { Edit2, Shield, Truck, Package } from 'lucide-react';

interface OrderReviewProps {
  orderSummary: OrderSummaryType;
}

export default function OrderReview({ orderSummary }: OrderReviewProps) {
  const { shippingInfo, paymentInfo, completeOrder, setStep } = useCheckout();
  const { items } = useCart();

  const handleEditShipping = () => {
    setStep('shipping');
  };

  const handleEditPayment = () => {
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    // Generate random order ID
    const orderId = 'PESANAN-' + Date.now().toString().slice(-8);
    completeOrder(orderId);
  };

  if (!shippingInfo || !paymentInfo) {
    return <div>Informasi tidak lengkap. Silakan kembali.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tinjau Pesanan</h2>
      
      {/* Order Items */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Pesanan</h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                  <Package className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.product.title}</p>
                  <p className="text-sm text-gray-500">Jml: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Truck className="h-5 w-5 mr-2 text-blue-600" />
            Alamat Pengiriman
          </h3>
          <Button variant="outline" size="sm" onClick={handleEditShipping}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
          <p>{shippingInfo.address}</p>
          <p>{shippingInfo.city}, {shippingInfo.postalCode}</p>
          <p>{shippingInfo.country}</p>
          <p className="mt-1">{shippingInfo.phone}</p>
          <p>{shippingInfo.email}</p>
        </div>
      </div>

      {/* Payment Information */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-green-600" />
            Metode Pembayaran
          </h3>
          <Button variant="outline" size="sm" onClick={handleEditPayment}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
        <div className="text-sm text-gray-600">
          <p>Kartu Kredit berakhiran {paymentInfo.cardNumber.slice(-4)}</p>
          <p>Kadaluarsa {paymentInfo.expiryDate}</p>
          <p>{paymentInfo.cardHolder}</p>
        </div>
      </div>

      {/* Order Summary */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Pesanan</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({orderSummary.itemsCount} item)</span>
            <span>${orderSummary.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Pengiriman</span>
            <span>{orderSummary.shipping === 0 ? 'Gratis' : `$${orderSummary.shipping}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Pajak</span>
            <span>${orderSummary.tax.toFixed(2)}</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-600">${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8">
        <Button onClick={handlePlaceOrder} size="lg" className="w-full">
          Buat Pesanan
        </Button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Dengan membuat pesanan, Anda menyetujui Syarat Layanan dan Kebijakan Privasi kami
        </p>
      </div>
    </div>
  );
}