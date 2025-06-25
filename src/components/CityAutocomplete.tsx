'use client';

import { useState, useEffect, useRef } from 'react';
import { Country } from '@/types';
import { fetchCountries, filterCountries } from '@/lib/cities';
import { Search, Globe } from 'lucide-react';

interface CountryAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CountryAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Search country..." 
}: CountryAutocompleteProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCountries().then(setCountries);
  }, []);

  useEffect(() => {
    setFilteredCountries(filterCountries(countries, searchTerm));
  }, [countries, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCountrySelect = (country: Country) => {
    const countryString = `${country.name} (${country.code})`;
    onChange(countryString);
    setSearchTerm(countryString);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="form-input pl-10"
        />
      </div>
      
      {isOpen && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <button
              key={`${country.code}-${index}`}
              onClick={() => handleCountrySelect(country)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
            >
              {country.flag ? (
                <img src={country.flag} alt={country.name} className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <Globe className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
              <div>
                <div className="font-medium text-gray-900">
                  {country.name}
                </div>
                <div className="text-sm text-gray-500">
                  {country.code}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 