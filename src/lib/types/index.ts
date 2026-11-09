// =============================================================================
// EstateHub Luxury Real Estate & Asset Management - Core Domain Model
// =============================================================================

export type PropertyType = 'VILLA' | 'PENTHOUSE' | 'DUPLEX' | 'APARTMENT' | 'COMMERCIAL';
export type ListingType = 'FOR_SALE' | 'FOR_RENT';
export type PropertyStatus = 'AVAILABLE' | 'UNDER_CONTRACT' | 'SOLD' | 'RENTED';
export type CurrencyCode = 'TND' | 'USD' | 'EUR';

export interface FloorplanRoom {
  id: string;
  name: { ar: string; en: string };
  areaSqM: number;
  dimensions: string;
  features: string[];
  svgCoords: { x: number; y: number; width: number; height: number; color?: string };
}

export interface AgentProfile {
  name: string;
  role: { ar: string; en: string };
  phone: string;
  email: string;
  licenseNumber: string;
  agency: string;
}

export interface Property {
  id: string;
  title: { ar: string; en: string };
  slug: string;
  propertyType: PropertyType;
  listingType: ListingType;
  price: number;
  currency: CurrencyCode;
  location: {
    city: string;
    district: string;
    address: string;
  };
  specs: {
    bedrooms: number;
    bathrooms: number;
    livingRooms: number;
    areaSqM: number;
    landAreaSqM?: number;
    parkingSpots: number;
    floorNumber?: number;
    yearBuilt: number;
  };
  status: PropertyStatus;
  featured: boolean;
  description: { ar: string; en: string };
  amenities: { ar: string; en: string }[];
  floorplan: FloorplanRoom[];
  agent: AgentProfile;
  createdAt: string;
}

export interface LeadInquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  inquiryType: 'BUY' | 'RENT' | 'SCHEDULE_TOUR';
  preferredTourDate?: string;
  budget?: number;
  status: 'NEW' | 'CONTACTED' | 'TOUR_SCHEDULED' | 'OFFER_MADE' | 'CLOSED';
  notes: string;
  createdAt: string;
}

export interface MortgageQuote {
  propertyPrice: number;
  downPaymentPercent: number;
  downPaymentAmount: number;
  loanAmount: number;
  interestRate: number; // e.g. 7.5% in Tunisia or 6.5% international
  termYears: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface EstateMetrics {
  totalPortfolioValue: number;
  activeListingsCount: number;
  leadsThisMonth: number;
  dealsClosed: number;
  averageSqMPrice: number;
}
