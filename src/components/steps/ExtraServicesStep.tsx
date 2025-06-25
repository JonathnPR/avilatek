'use client';

import { StepProps } from '@/types';
import { Shield, User, Heart, MessageSquare } from 'lucide-react';

export default function ExtraServicesStep({ formData, updateFormData, nextStep, prevStep }: StepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Extra Services</h2>
        <p className="text-gray-600">Enhance your travel experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium">Travel Insurance</span>
                <p className="text-sm text-gray-500">Comprehensive coverage for your trip</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">+$75</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.travelInsurance}
                  onChange={(e) => updateFormData({ travelInsurance: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium">Preferential Seats</span>
                <p className="text-sm text-gray-500">Choose your preferred seat location</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">+$25</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.preferentialSeats}
                  onChange={(e) => updateFormData({ preferentialSeats: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-gray-600" />
              <div>
                <span className="font-medium">Special Assistance</span>
                <p className="text-sm text-gray-500">Request special assistance if needed</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Free</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.specialAssistance}
                  onChange={(e) => updateFormData({ specialAssistance: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>

          {formData.specialAssistance && (
            <div className="mt-4">
              <label className="form-label">Special Requirements</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  value={formData.specialAssistanceNotes}
                  onChange={(e) => updateFormData({ specialAssistanceNotes: e.target.value })}
                  placeholder="Please describe any special assistance requirements..."
                  maxLength={200}
                  rows={3}
                  className="form-input pl-10 resize-none"
                />
              </div>
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.specialAssistanceNotes.length}/200
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">Service Summary</h3>
          <div className="space-y-1 text-sm text-gray-600">
            {formData.travelInsurance && <div>✓ Travel Insurance (+$75)</div>}
            {formData.preferentialSeats && <div>✓ Preferential Seats (+$25)</div>}
            {formData.specialAssistance && <div>✓ Special Assistance (Free)</div>}
            {!formData.travelInsurance && !formData.preferentialSeats && !formData.specialAssistance && (
              <div className="text-gray-500 italic">No extra services selected</div>
            )}
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
            type="submit"
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Review & Confirm</span>
          </button>
        </div>
      </form>
    </div>
  );
} 