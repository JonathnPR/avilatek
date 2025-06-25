// New type for Country
export interface Country {
  name: string;
  code: string;
  flag: string;
}

const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/all';

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(COUNTRIES_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    // Map to our Country type
    return data.map((country: any) => ({
      name: country.name.common,
      code: country.cca2,
      flag: country.flags?.svg || country.flags?.png || '',
    }));
  } catch (error) {
    console.error('Error fetching countries:', error);
    // Fallback
    return [
      { name: 'United States', code: 'US', flag: '' },
      { name: 'Spain', code: 'ES', flag: '' },
      { name: 'France', code: 'FR', flag: '' },
      { name: 'United Kingdom', code: 'GB', flag: '' },
      { name: 'Germany', code: 'DE', flag: '' },
      { name: 'Italy', code: 'IT', flag: '' },
      { name: 'Japan', code: 'JP', flag: '' },
      { name: 'Brazil', code: 'BR', flag: '' },
      { name: 'Argentina', code: 'AR', flag: '' },
      { name: 'Mexico', code: 'MX', flag: '' },
    ];
  }
}

export function filterCountries(countries: Country[], searchTerm: string): Country[] {
  if (!searchTerm) return countries.slice(0, 10);
  const lowerSearchTerm = searchTerm.toLowerCase();
  return countries
    .filter(country =>
      (country.name?.toLowerCase() || '').includes(lowerSearchTerm) ||
      (country.code?.toLowerCase() || '').includes(lowerSearchTerm)
    )
    .slice(0, 10);
}

// New type for Destination
export interface Destination {
  destination: string;
  class: string;
  priceUSD: number;
}

const DESTINATIONS_API_URL = 'https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json';

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const response = await fetch(DESTINATIONS_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    // Fallback
    return [
      { destination: 'Madrid', class: 'Economy', priceUSD: 450 },
      { destination: 'Madrid', class: 'Business', priceUSD: 920 },
      { destination: 'Madrid', class: 'First Class', priceUSD: 1500 },
      { destination: 'New York', class: 'Economy', priceUSD: 380 },
      { destination: 'New York', class: 'Business', priceUSD: 790 },
      { destination: 'New York', class: 'First Class', priceUSD: 1320 },
      { destination: 'Buenos Aires', class: 'Economy', priceUSD: 520 },
      { destination: 'Buenos Aires', class: 'Business', priceUSD: 1050 },
      { destination: 'Buenos Aires', class: 'First Class', priceUSD: 1700 },
    ];
  }
}

export function filterDestinations(destinations: Destination[], searchTerm: string): string[] {
  if (!searchTerm) {
    // Return unique destinations (max 10)
    return Array.from(new Set(destinations.map(d => d.destination))).slice(0, 10);
  }
  const lowerSearchTerm = searchTerm.toLowerCase();
  return Array.from(
    new Set(
      destinations
        .filter(d => d.destination.toLowerCase().includes(lowerSearchTerm))
        .map(d => d.destination)
    )
  ).slice(0, 10);
}

export function getClassesForDestination(destinations: Destination[], destination: string): { class: string; priceUSD: number }[] {
  return destinations
    .filter(d => d.destination === destination)
    .map(d => ({ class: d.class, priceUSD: d.priceUSD }));
} 