// components/checkout/CheckoutStepper.tsx
"use client";

import { Check } from 'lucide-react';
import { CheckoutStep } from '@/types/checkout';

interface CheckoutStepperProps {
  currentStep: CheckoutStep;
}

const steps = [
  { id: 'shipping', label: 'Shipping', description: 'Address information' },
  { id: 'payment', label: 'Payment', description: 'Payment details' },
  { id: 'review', label: 'Review', description: 'Order confirmation' },
] as const;

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : isCurrent
                      ? 'border-blue-600 bg-white text-blue-600'
                      : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                
                {/* Step Label */}
                <div className="mt-2 text-center">
                  <div
                    className={`text-sm font-medium ${
                      isCompleted || isCurrent
                        ? 'text-blue-600'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}