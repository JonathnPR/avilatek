'use client';

import { StepProps, Traveler } from '@/types';
import { Users, Calendar, CreditCard, Plus, Minus, Dog, Briefcase } from 'lucide-react';

export default function TravelerInfoStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const addTraveler = () => {
    if (formData.numberOfTravelers < 10) {
      const newTraveler: Traveler = {
        fullName: '',
        dateOfBirth: '',
        idType: 'passport',
        idNumber: '',
      };
      
      updateFormData({
        numberOfTravelers: formData.numberOfTravelers + 1,
        travelers: [...formData.travelers, newTraveler],
      });
    }
  };

  const removeTraveler = () => {
    if (formData.numberOfTravelers > 1) {
      updateFormData({
        numberOfTravelers: formData.numberOfTravelers - 1,
        travelers: formData.travelers.slice(0, -1),
      });
    }
  };

  const updateTraveler = (index: number, field: keyof Traveler, value: string) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    updateFormData({ travelers: updatedTravelers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const allTravelersValid = formData.travelers.every(
      traveler => traveler.fullName && traveler.dateOfBirth && traveler.idNumber
    );
    if (allTravelersValid) {
      nextStep();
    }
  };

  const isFormValid = formData.travelers.every(
    traveler => traveler.fullName && traveler.dateOfBirth && traveler.idNumber
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Traveler Information</h2>
        <p className="text-gray-600">Tell us about the passengers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="form-label">Number of Travelers</label>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={removeTraveler}
              disabled={formData.numberOfTravelers <= 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-medium min-w-[3rem] text-center">
              {formData.numberOfTravelers}
            </span>
            <button
              type="button"
              onClick={addTraveler}
              disabled={formData.numberOfTravelers >= 10}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {formData.travelers.map((traveler, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Traveler {index + 1}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    value={traveler.fullName}
                    onChange={(e) => updateTraveler(index, 'fullName', e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="date"
                      value={traveler.dateOfBirth}
                      onChange={(e) => updateTraveler(index, 'dateOfBirth', e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      className="form-input pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">ID Type</label>
                  <select
                    value={traveler.idType}
                    onChange={(e) => updateTraveler(index, 'idType', e.target.value)}
                    className="form-input"
                  >
                    <option value="passport">Passport</option>
                    <option value="national_id">National ID</option>
                    <option value="drivers_license">Driver's License</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">ID Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={traveler.idNumber}
                      onChange={(e) => updateTraveler(index, 'idNumber', e.target.value)}
                      className="form-input pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Dog className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Traveling with pets?</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.travelingWithPets}
                onChange={(e) => updateFormData({ travelingWithPets: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {formData.travelingWithPets && (
            <div>
              <label className="form-label">Number of Pets</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updateFormData({ numberOfPets: Math.max(0, formData.numberOfPets - 1) })}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {formData.numberOfPets}
                </span>
                <button
                  type="button"
                  onClick={() => updateFormData({ numberOfPets: formData.numberOfPets + 1 })}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">($100 each)</span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Briefcase className="w-5 h-5 text-gray-600" />
              <span className="font-medium">Extra luggage?</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.extraLuggage}
                onChange={(e) => updateFormData({ extraLuggage: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          {formData.extraLuggage && (
            <div>
              <label className="form-label">Number of Extra Bags</label>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => updateFormData({ numberOfExtraBags: Math.max(0, formData.numberOfExtraBags - 1) })}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-medium min-w-[3rem] text-center">
                  {formData.numberOfExtraBags}
                </span>
                <button
                  type="button"
                  onClick={() => updateFormData({ numberOfExtraBags: formData.numberOfExtraBags + 1 })}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500">($50 each)</span>
              </div>
            </div>
          )}
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
            type="submit"
            disabled={!isFormValid}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Continue to Services</span>
          </button>
        </div>
      </form>
    </div>
  );
} 