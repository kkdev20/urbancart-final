// context/CheckoutContext.tsx
"use client";

import React, { createContext, useContext, useReducer } from 'react';
import { CheckoutState, ShippingInfo, PaymentInfo, CheckoutStep } from '@/types/checkout';

type CheckoutAction =
  | { type: 'SET_SHIPPING_INFO'; payload: ShippingInfo }
  | { type: 'SET_PAYMENT_INFO'; payload: PaymentInfo }
  | { type: 'SET_STEP'; payload: CheckoutStep }
  | { type: 'COMPLETE_ORDER'; payload: string }
  | { type: 'RESET_CHECKOUT' };

const initialState: CheckoutState = {
  currentStep: 'shipping',
  shippingInfo: null,
  paymentInfo: null,
  orderComplete: false,
  orderId: null,
};

function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case 'SET_SHIPPING_INFO':
      return {
        ...state,
        shippingInfo: action.payload,
        currentStep: 'payment',
      };
    case 'SET_PAYMENT_INFO':
      return {
        ...state,
        paymentInfo: action.payload,
        currentStep: 'review',
      };
    case 'SET_STEP':
      return {
        ...state,
        currentStep: action.payload,
      };
    case 'COMPLETE_ORDER':
      return {
        ...state,
        orderComplete: true,
        orderId: action.payload,
      };
    case 'RESET_CHECKOUT':
      return initialState;
    default:
      return state;
  }
}

interface CheckoutContextType extends CheckoutState {
  setShippingInfo: (info: ShippingInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setStep: (step: CheckoutStep) => void;
  completeOrder: (orderId: string) => void;
  resetCheckout: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const setShippingInfo = (info: ShippingInfo) => {
    dispatch({ type: 'SET_SHIPPING_INFO', payload: info });
  };

  const setPaymentInfo = (info: PaymentInfo) => {
    dispatch({ type: 'SET_PAYMENT_INFO', payload: info });
  };

  const setStep = (step: CheckoutStep) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const completeOrder = (orderId: string) => {
    dispatch({ type: 'COMPLETE_ORDER', payload: orderId });
  };

  const resetCheckout = () => {
    dispatch({ type: 'RESET_CHECKOUT' });
  };

  const value: CheckoutContextType = {
    ...state,
    setShippingInfo,
    setPaymentInfo,
    setStep,
    completeOrder,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
}