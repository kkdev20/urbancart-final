// app/checkout/success/page.tsx - UPDATED BAHASA INDONESIA
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Confetti from '@/components/checkout/Confetti';
import { Check, Package, Truck, Home, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const orderDetails = {
    id: orderId || 'PESANAN-' + Date.now().toString().slice(-8),
    date: new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    shipping: {
      name: 'Budi Santoso',
      address: 'Jalan Merdeka No. 123, Jakarta, 12345',
      email: 'budi.santoso@example.com'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {showConfetti && <Confetti />}
      
      <div className="container mx-auto px-4">
        {/* Success Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pesanan Dikonfirmasi!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Terima kasih atas pembelian Anda
          </p>
          
          <p className="text-gray-500">
            ID Pesanan: <span className="font-mono font-semibold">{orderDetails.id}</span>
          </p>
        </div>

        {/* Order Timeline */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Status Pesanan</h2>
            
            <div className="space-y-6">
              {/* Step 1: Order Confirmed */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Pesanan Dikonfirmasi</h3>
                  <p className="text-gray-600">Pesanan Anda telah dikonfirmasi dan sedang diproses</p>
                  <p className="text-sm text-gray-400 mt-1">{orderDetails.date}</p>
                </div>
              </div>

              {/* Step 2: Processing */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Diproses</h3>
                  <p className="text-gray-600">Kami sedang mempersiapkan item Anda untuk pengiriman</p>
                  <p className="text-sm text-gray-400 mt-1">Perkiraan: Dalam 24 jam</p>
                </div>
              </div>

              {/* Step 3: Shipping */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">Pengiriman</h3>
                  <p className="text-gray-600">Pesanan Anda akan segera dikirim</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Perkiraan tiba: {orderDetails.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Track Your Order */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Truck className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Lacak Pesanan</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Kami akan mengirimkan informasi pelacakan segera setelah pesanan dikirim.
            </p>
            <Button variant="outline" className="w-full">
              Lihat Detail Pesanan
            </Button>
          </div>

          {/* Continue Shopping */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center space-x-3 mb-4">
              <ShoppingBag className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Lanjutkan Belanja</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Temukan lebih banyak produk menarik di toko kami.
            </p>
            <Link href="/" className="block">
              <Button className="w-full">
                Kembali ke Toko
              </Button>
            </Link>
          </div>
        </div>

        {/* Support Information */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Butuh Bantuan?
            </h3>
            <p className="text-gray-600 mb-4">
              Tim dukungan pelanggan kami siap membantu dengan pertanyaan apa pun.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Button variant="outline">
                Hubungi Dukungan
              </Button>
              <Button variant="outline">
                Lihat FAQ
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-4xl mx-auto mt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link href="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Kembali ke Beranda</span>
              </Button>
            </Link>
            
            <Link href="/products">
              <Button className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4" />
                <span>Lanjutkan Belanja</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}