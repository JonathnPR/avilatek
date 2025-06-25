'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchDestinations, filterDestinations } from '@/lib/cities';
import { Search, MapPin } from 'lucide-react';

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function DestinationAutocomplete({
  value,
  onChange,
  placeholder = 'Search destination...'
}: DestinationAutocompleteProps) {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [allDestinations, setAllDestinations] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchDestinations().then((data) => {
      setAllDestinations(data);
      setDestinations(filterDestinations(data, searchTerm));
    });
  }, []);

  useEffect(() => {
    setDestinations(filterDestinations(allDestinations, searchTerm));
  }, [allDestinations, searchTerm]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationSelect = (destination: string) => {
    onChange(destination);
    setSearchTerm(destination);
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
      {isOpen && destinations.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {destinations.map((destination, index) => (
            <button
              key={`${destination}-${index}`}
              onClick={() => handleDestinationSelect(destination)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
            >
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="font-medium text-gray-900">{destination}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 