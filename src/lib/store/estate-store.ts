// =============================================================================
// EstateHub Enterprise Store & Financial Engine
// =============================================================================

import {
  Property,
  LeadInquiry,
  MortgageQuote,
  EstateMetrics,
  PropertyType,
  ListingType,
} from '../types';
import { INITIAL_PROPERTIES, INITIAL_LEADS } from '../data/mock-estate-data';

class EstateStore {
  private properties: Property[] = [...INITIAL_PROPERTIES];
  private leads: LeadInquiry[] = [...INITIAL_LEADS];

  // --- PROPERTIES PORTFOLIO ---
  public listProperties(filters?: {
    type?: PropertyType | 'ALL';
    listing?: ListingType | 'ALL';
    city?: string;
    maxPrice?: number;
  }): Property[] {
    let list = [...this.properties];

    if (filters?.type && filters.type !== 'ALL') {
      list = list.filter((p) => p.propertyType === filters.type);
    }
    if (filters?.listing && filters.listing !== 'ALL') {
      list = list.filter((p) => p.listingType === filters.listing);
    }
    if (filters?.city && filters.city !== 'ALL') {
      list = list.filter((p) => p.location.city.toLowerCase() === filters.city?.toLowerCase());
    }
    if (filters?.maxPrice) {
      list = list.filter((p) => p.price <= filters.maxPrice!);
    }

    return list;
  }

  public getPropertyById(id: string): Property | null {
    return this.properties.find((p) => p.id === id || p.slug === id) || null;
  }

  public createProperty(dto: Omit<Property, 'id' | 'createdAt'>): Property {
    const newId = `PROP-${Math.floor(910 + Math.random() * 900)}`;
    const newProp: Property = {
      ...dto,
      id: newId,
      createdAt: new Date().toISOString(),
    };
    this.properties.unshift(newProp);
    return newProp;
  }

  // --- CRM & LEAD MANAGEMENT ---
  public listLeads(status?: string): LeadInquiry[] {
    if (status && status !== 'ALL') {
      return this.leads.filter((l) => l.status === status);
    }
    return [...this.leads];
  }

  public createLead(dto: Omit<LeadInquiry, 'id' | 'createdAt' | 'status'>): LeadInquiry {
    const newLead: LeadInquiry = {
      ...dto,
      id: `LEAD-${Math.floor(104 + Math.random() * 890)}`,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    this.leads.unshift(newLead);
    return newLead;
  }

  public updateLeadStatus(id: string, status: LeadInquiry['status']): LeadInquiry {
    const lead = this.leads.find((l) => l.id === id);
    if (!lead) throw new Error(`Lead ${id} not found`);
    lead.status = status;
    return lead;
  }

  // --- FINANCIAL MORTGAGE & AMORTIZATION ENGINE ---
  public calculateMortgage(params: {
    propertyPrice: number;
    downPaymentPercent: number; // e.g. 20
    interestRatePercent: number; // e.g. 7.75
    termYears: number; // e.g. 20
  }): MortgageQuote {
    const downPaymentAmount = Math.round((params.propertyPrice * params.downPaymentPercent) / 100);
    const loanAmount = params.propertyPrice - downPaymentAmount;

    const monthlyRate = params.interestRatePercent / 100 / 12;
    const totalPayments = params.termYears * 12;

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyPayment = loanAmount / totalPayments;
    }

    const totalCost = monthlyPayment * totalPayments + downPaymentAmount;
    const totalInterest = monthlyPayment * totalPayments - loanAmount;

    return {
      propertyPrice: params.propertyPrice,
      downPaymentPercent: params.downPaymentPercent,
      downPaymentAmount,
      loanAmount,
      interestRate: params.interestRatePercent,
      termYears: params.termYears,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
    };
  }

  // --- PORTFOLIO METRICS ---
  public getMetrics(): EstateMetrics {
    const totalPortfolioValue = this.properties.reduce((sum, p) => sum + p.price, 0);
    const activeListingsCount = this.properties.filter((p) => p.status === 'AVAILABLE').length;
    const dealsClosed = this.leads.filter((l) => l.status === 'CLOSED').length;

    const totalSqM = this.properties.reduce((sum, p) => sum + p.specs.areaSqM, 0);
    const averageSqMPrice =
      totalSqM > 0 ? Math.round(totalPortfolioValue / totalSqM) : 3400;

    return {
      totalPortfolioValue,
      activeListingsCount,
      leadsThisMonth: this.leads.length,
      dealsClosed,
      averageSqMPrice,
    };
  }
}

export const estateStore = new EstateStore();
