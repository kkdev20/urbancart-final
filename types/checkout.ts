// types/checkout.ts
export interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemsCount: number;
}

export type CheckoutStep = 'shipping' | 'payment' | 'review';

export interface CheckoutState {
  currentStep: CheckoutStep;
  shippingInfo: ShippingInfo | null;
  paymentInfo: PaymentInfo | null;
  orderComplete: boolean;
  orderId: string | null;
}