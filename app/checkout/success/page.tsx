// app/checkout/success/page.tsx - SIMPLE VERSION
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '../../components/ui/Button';
import { Check, Home, ShoppingBag } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState('');

  // Get orderId from URL on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const urlOrderId = urlParams.get('orderId') || 'PESANAN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
      setOrderId(urlOrderId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Success Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pesanan Berhasil!
          </h1>
          
          <p className="text-xl text-gray-600 mb-2">
            Terima kasih telah berbelanja di UrbanCart
          </p>
          
          {orderId && (
            <p className="text-gray-500">
              ID Pesanan: <span className="font-mono font-semibold">{orderId}</span>
            </p>
          )}
        </div>

        {/* Order Info */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pesanan Anda Sedang Diproses</h2>
          <div className="space-y-3 text-gray-600">
            <p>✅ Pesanan telah dikonfirmasi</p>
            <p>📦 Akan diproses dalam 24 jam</p>
            <p>🚚 Estimasi pengiriman: 2-3 hari kerja</p>
            <p>📧 Konfirmasi akan dikirim ke email Anda</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto text-center">
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