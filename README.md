# Travel Booking App

A modern, mobile-first travel booking form built with Next.js 14, TypeScript, and Tailwind CSS. This application features a clean, minimalist design with a multi-step form process for booking flights.

## Features

### ✈️ Multi-Step Booking Process

- **Step 1: Travel Information** - Destination selection with autocomplete, departure/return dates, and flight class
- **Step 2: Traveler Information** - Multiple travelers with personal details, pets, and extra luggage
- **Step 3: Extra Services** - Travel insurance, preferential seats, and special assistance
- **Step 4: Summary & Confirmation** - Complete booking review with pricing breakdown

### 🎨 Design & UX

- Mobile-first responsive design
- Clean and minimalist interface
- Smooth step transitions
- Visual progress indicators
- Form validation and error handling
- Accessible form controls

### 🛠️ Technical Features

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- React Hook Form for form management
- Lucide React for icons
- Date-fns for date manipulation
- Cities API integration for destination search

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd travel-booking-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind directives
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── TravelBookingForm.tsx    # Main form container
│   ├── StepIndicator.tsx        # Progress indicator
│   ├── CityAutocomplete.tsx     # Destination search component
│   └── steps/
│       ├── TravelInfoStep.tsx       # Step 1: Travel information
│       ├── TravelerInfoStep.tsx     # Step 2: Traveler details
│       ├── ExtraServicesStep.tsx    # Step 3: Additional services
│       └── SummaryStep.tsx          # Step 4: Review and confirm
├── lib/
│   └── cities.ts            # Cities API utilities
└── types/
    └── index.ts             # TypeScript type definitions
```

## Features Breakdown

### Step 1: Travel Information

- **Destination Search**: Autocomplete with cities from external API
- **Date Selection**: Departure and return date pickers with validation
- **Flight Class**: Economy, Business, and First Class options with pricing

### Step 2: Traveler Information

- **Multiple Travelers**: Add/remove travelers (1-10 passengers)
- **Personal Details**: Full name, date of birth, ID type and number
- **Pets**: Optional pet travel with quantity selection (\$100 each)
- **Extra Luggage**: Optional additional bags (\$50 each)

### Step 3: Extra Services

- **Travel Insurance**: Comprehensive coverage (+\$75)
- **Preferential Seats**: Seat selection (+\$25)
- **Special Assistance**: Free service with notes (200 char limit)

### Step 4: Summary & Confirmation

- **Complete Review**: All booking details with pricing breakdown
- **Dynamic Pricing**: Real-time calculation based on selections
- **Confirmation**: Success message with booking reference

## Pricing Structure

- **Base Flight**: \$500 per traveler
- **Flight Class Multipliers**:
  - Economy: 1x
  - Business: 1.5x
  - First Class: 2.5x
- **Additional Services**:
  - Pets: \$100 each
  - Extra Luggage: \$50 per bag
  - Travel Insurance: \$75
  - Preferential Seats: \$25
  - Special Assistance: Free

## Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Form Management**: React Hook Form
- **API**: External cities API for destination search

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Cities data provided by [cities-permalink](https://github.com/Lstanislao/cities-permalink)
- Icons from [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
