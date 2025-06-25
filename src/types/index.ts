export interface Country {
  name: string;
  code: string;
  flag: string;
}

export interface Traveler {
  fullName: string;
  dateOfBirth: string;
  idType: string;
  idNumber: string;
}

export interface TravelFormData {
  // Step 1: Travel Information
  destination: string;
  departureDate: string;
  returnDate: string;
  flightClass: string;
  
  // Step 2: Traveler Information
  numberOfTravelers: number;
  travelers: Traveler[];
  travelingWithPets: boolean;
  numberOfPets: number;
  extraLuggage: boolean;
  numberOfExtraBags: number;
  
  // Step 3: Extra Services
  travelInsurance: boolean;
  preferentialSeats: boolean;
  specialAssistance: boolean;
  specialAssistanceNotes: string;
}

export type FormStep = 1 | 2 | 3 | 4;

export interface StepProps {
  formData: TravelFormData;
  updateFormData: (data: Partial<TravelFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
} 