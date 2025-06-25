'use client';

import { useState } from 'react';
import { TravelFormData, FormStep } from '@/types';
import StepIndicator from './StepIndicator';
import TravelInfoStep from './steps/TravelInfoStep';
import TravelerInfoStep from './steps/TravelerInfoStep';
import ExtraServicesStep from './steps/ExtraServicesStep';
import SummaryStep from './steps/SummaryStep';

const initialFormData: TravelFormData = {
  // Step 1: Travel Information
  destination: '',
  departureDate: '',
  returnDate: '',
  flightClass: 'economy',
  
  // Step 2: Traveler Information
  numberOfTravelers: 1,
  travelers: [{
    fullName: '',
    dateOfBirth: '',
    idType: 'passport',
    idNumber: '',
  }],
  travelingWithPets: false,
  numberOfPets: 0,
  extraLuggage: false,
  numberOfExtraBags: 0,
  
  // Step 3: Extra Services
  travelInsurance: false,
  preferentialSeats: false,
  specialAssistance: false,
  specialAssistanceNotes: '',
};

export default function TravelBookingForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<TravelFormData>(initialFormData);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const updateFormData = (data: Partial<TravelFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1 as FormStep);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1 as FormStep);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      updateFormData,
      nextStep,
      prevStep,
    };

    switch (currentStep) {
      case 1:
        return <TravelInfoStep {...stepProps} />;
      case 2:
        return <TravelerInfoStep {...stepProps} />;
      case 3:
        return <ExtraServicesStep {...stepProps} />;
      case 4:
        return <SummaryStep {...stepProps} onConfirm={handleConfirm} isConfirmed={isConfirmed} />;
      default:
        return <TravelInfoStep {...stepProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Travel Booking</h1>
          <p className="text-gray-600">Plan your perfect trip in just a few steps</p>
        </div>

        <StepIndicator currentStep={currentStep} isConfirmed={isConfirmed} />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
} 