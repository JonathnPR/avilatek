'use client';

import { useEffect, useState } from 'react';
import { StepProps } from '@/types';
import DestinationAutocomplete from '../DestinationAutocomplete';
import { getClassesForDestination, fetchDestinations, Destination } from '@/lib/cities';
import { Calendar, Plane } from 'lucide-react';

export default function TravelInfoStep({ formData, updateFormData, nextStep }: StepProps) {
  const [allDestinations, setAllDestinations] = useState<Destination[]>([]);
  const [availableClasses, setAvailableClasses] = useState<{ class: string; priceUSD: number }[]>([]);

  useEffect(() => {
    fetchDestinations().then((data) => {
      setAllDestinations(data);
    });
  }, []);

  useEffect(() => {
    if (formData.destination) {
      setAvailableClasses(getClassesForDestination(allDestinations, formData.destination));
    } else {
      setAvailableClasses([]);
    }
  }, [formData.destination, allDestinations]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.destination && formData.departureDate && formData.returnDate && formData.flightClass) {
      nextStep();
    }
  };

  const isFormValid = formData.destination && formData.departureDate && formData.returnDate && formData.flightClass;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Travel Information</h2>
        <p className="text-gray-600">Tell us about your trip</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Destination</label>
          <DestinationAutocomplete
            value={formData.destination}
            onChange={(value) => {
              updateFormData({ destination: value, flightClass: '' });
            }}
            placeholder="Where are you going?"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Departure Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.departureDate}
                onChange={(e) => updateFormData({ departureDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="form-input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Return Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="date"
                value={formData.returnDate}
                onChange={(e) => updateFormData({ returnDate: e.target.value })}
                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                className="form-input pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="form-label">Flight Class</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {availableClasses.length === 0 && (
              <div className="col-span-3 text-gray-400 text-center py-2">Select a destination first</div>
            )}
            {availableClasses.map((option) => (
              <button
                key={option.class}
                type="button"
                onClick={() => updateFormData({ flightClass: option.class })}
                className={`p-4 border-2 rounded-lg text-center transition-colors w-full ${
                  formData.flightClass === option.class
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-medium">{option.class}</div>
                <div className="text-sm text-gray-500">${option.priceUSD}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={!isFormValid}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Plane className="w-5 h-5" />
            <span>Continue to Travelers</span>
          </button>
        </div>
      </form>
    </div>
  );
} 