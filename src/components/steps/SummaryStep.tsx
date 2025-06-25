'use client';

import { useState, useEffect } from 'react';
import { StepProps } from '@/types';
import { CheckCircle, Calendar, MapPin, Users, Dog, Briefcase, Shield, User, Heart } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface SummaryStepProps extends StepProps {
  onConfirm: () => void;
  isConfirmed: boolean;
}

export default function SummaryStep({ formData, prevStep, onConfirm, isConfirmed }: SummaryStepProps) {
  const basePrice = (() => {
    if (formData.destination && formData.flightClass) {
      const allDestinations = require('@/lib/cities');
      return 500;
    }
    return 500;
  })();

  const [flightPrice, setFlightPrice] = useState<number>(500);
  useEffect(() => {
    async function getPrice() {
      if (formData.destination && formData.flightClass) {
        const { fetchDestinations } = await import('@/lib/cities');
        const all = await fetchDestinations();
        const found = all.find(
          d => d.destination === formData.destination && d.class === formData.flightClass
        );
        setFlightPrice(found ? found.priceUSD : 500);
      }
    }
    getPrice();
  }, [formData.destination, formData.flightClass]);

  const travelersPrice = flightPrice * formData.numberOfTravelers;
  const petsPrice = formData.travelingWithPets ? formData.numberOfPets * 100 : 0;
  const luggagePrice = formData.extraLuggage ? formData.numberOfExtraBags * 50 : 0;
  const insurancePrice = formData.travelInsurance ? 75 : 0;
  const seatsPrice = formData.preferentialSeats ? 25 : 0;
  
  const totalPrice = travelersPrice + petsPrice + luggagePrice + insurancePrice + seatsPrice;

  const [confirmed, setConfirmed] = useState(isConfirmed);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm();
  };

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (confirmed) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h2>
          <p className="text-green-700 mb-4">
            Your booking has been successfully confirmed. You will receive a confirmation email shortly.
          </p>
          <div className="bg-white rounded-lg p-4 text-left">
            <h3 className="font-medium text-gray-900 mb-2">Booking Reference</h3>
            <p className="text-gray-600 font-mono">BK{Date.now().toString().slice(-8)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Summary</h2>
        <p className="text-gray-600">Review your trip details before confirming</p>
      </div>

      <div className="space-y-6">
        {/* Travel Information */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Travel Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-500">Destination</span>
              <p className="font-medium">{formData.destination}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Flight Class</span>
              <p className="font-medium capitalize">{formData.flightClass}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Departure</span>
              <p className="font-medium">
                {formData.departureDate && format(new Date(formData.departureDate), 'MMM dd, yyyy')}
              </p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Return</span>
              <p className="font-medium">
                {formData.returnDate && format(new Date(formData.returnDate), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          {formData.departureDate && formData.returnDate && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">Trip Duration</span>
              <p className="font-medium">
                {differenceInDays(new Date(formData.returnDate), new Date(formData.departureDate))} days
              </p>
            </div>
          )}
        </div>

        {/* Travelers */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Travelers ({formData.numberOfTravelers})
          </h3>
          <div className="space-y-2">
            {formData.travelers.map((traveler, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium">{traveler.fullName}</p>
                  <p className="text-sm text-gray-500">
                    {traveler.dateOfBirth && `${calculateAge(traveler.dateOfBirth)} years old`}
                  </p>
                </div>
                <span className="text-sm text-gray-500 capitalize">{traveler.idType}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Extras */}
        {(formData.travelingWithPets || formData.extraLuggage) && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Items</h3>
            <div className="space-y-2">
              {formData.travelingWithPets && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Dog className="w-4 h-4 mr-2 text-gray-600" />
                    <span>Pets ({formData.numberOfPets})</span>
                  </div>
                  <span className="font-medium">${formData.numberOfPets * 100}</span>
                </div>
              )}
              {formData.extraLuggage && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-600" />
                    <span>Extra Luggage ({formData.numberOfExtraBags} bags)</span>
                  </div>
                  <span className="font-medium">${formData.numberOfExtraBags * 50}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Services */}
        {(formData.travelInsurance || formData.preferentialSeats || formData.specialAssistance) && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Extra Services</h3>
            <div className="space-y-2">
              {formData.travelInsurance && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-gray-600" />
                    <span>Travel Insurance</span>
                  </div>
                  <span className="font-medium">$75</span>
                </div>
              )}
              {formData.preferentialSeats && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-gray-600" />
                    <span>Preferential Seats</span>
                  </div>
                  <span className="font-medium">$25</span>
                </div>
              )}
              {formData.specialAssistance && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-gray-600" />
                    <span>Special Assistance</span>
                  </div>
                  <span className="font-medium">Free</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base Flight ({formData.numberOfTravelers} travelers)</span>
              <span>${travelersPrice.toFixed(2)}</span>
            </div>
            {petsPrice > 0 && (
              <div className="flex justify-between">
                <span>Pets</span>
                <span>${petsPrice.toFixed(2)}</span>
              </div>
            )}
            {luggagePrice > 0 && (
              <div className="flex justify-between">
                <span>Extra Luggage</span>
                <span>${luggagePrice.toFixed(2)}</span>
              </div>
            )}
            {insurancePrice > 0 && (
              <div className="flex justify-between">
                <span>Travel Insurance</span>
                <span>${insurancePrice.toFixed(2)}</span>
              </div>
            )}
            {seatsPrice > 0 && (
              <div className="flex justify-between">
                <span>Preferential Seats</span>
                <span>${seatsPrice.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-2 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={prevStep}
            className="btn-secondary flex-1"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Confirm Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
} 