'use client';

import { FormStep } from '@/types';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: FormStep;
  isConfirmed?: boolean;
}

const steps = [
  { number: 1, title: 'Travel Info' },
  { number: 2, title: 'Travelers' },
  { number: 3, title: 'Services' },
  { number: 4, title: 'Summary' },
];

export default function StepIndicator({ currentStep, isConfirmed }: StepIndicatorProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Mark step 4 as completed if isConfirmed is true
          const completed = isConfirmed && step.number === 4;
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`step-indicator ${
                    completed
                      ? 'step-completed'
                      : currentStep > step.number
                      ? 'step-completed'
                      : currentStep === step.number
                      ? 'step-active'
                      : 'step-pending'
                  }`}
                >
                  {completed || currentStep > step.number ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 mx-2 ${
                    completed || currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
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