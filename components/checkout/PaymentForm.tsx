// components/checkout/PaymentForm.tsx
"use client";

import { useState } from 'react';
import { useCheckout } from '@/context/CheckoutContext';
import Button from '@/components/ui/Button';
import { PaymentInfo } from '@/types/checkout';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentForm() {
  const { setPaymentInfo, setStep } = useCheckout();
  const [formData, setFormData] = useState<Partial<PaymentInfo>>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleBack = () => {
    setStep('shipping');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.cardNumber || !formData.cardHolder || !formData.expiryDate || !formData.cvv) {
      alert('Harap isi semua detail pembayaran');
      return;
    }

    setPaymentInfo(formData as PaymentInfo);
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 text-blue-800">
          <Lock className="h-4 w-4" />
          <span className="text-sm font-medium">Informasi pembayaran Anda aman dan terenkripsi</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Kartu *
          </label>
          <div className="relative">
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                setFormData(prev => ({ ...prev, cardNumber: formatted }));
              }}
              className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Card Holder */}
        <div>
          <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Pemegang Kartu *
          </label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            value={formData.cardHolder}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="BUDI SANTOSO"
            required
          />
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Kadaluarsa *
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={(e) => {
                const formatted = formatExpiryDate(e.target.value);
                setFormData(prev => ({ ...prev, expiryDate: formatted }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="MM/TT"
              maxLength={5}
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
              CVV *
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        {/* Save Card */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
            Simpan kartu untuk pembelian berikutnya
          </label>
        </div>

        {/* Payment Methods Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Metode Pembayaran yang Diterima</h4>
          <div className="flex space-x-4 text-2xl text-gray-400">
            <span>💳</span>
            <span>🏦</span>
            <span>📱</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button type="button" variant="outline" onClick={handleBack}>
            Kembali ke Pengiriman
          </Button>
          <Button type="submit" size="lg">
            Tinjau Pesanan
          </Button>
        </div>
      </form>
    </div>
  );
}