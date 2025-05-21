/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

import { 
  modernTemplateString, 
  minimalTemplateString, 
  professionalTemplateString,
  freelancerTemplateString,
  legionTemplateString
} from './templateStrings';
import Mustache from 'mustache';
import { InvoiceTax } from '../types/invoice';

// Type declaration for template data
export interface InvoiceTemplateData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  from: {
    name: string;
    email: string;
    address: string;
  };
  to: {
    name: string;
    email: string;
    address: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    price: number;
    amount: number;
    rate?: number;
    hours?: number;
    period?: string;
  }>;
  subtotal: number;
  total: number;
  taxes?: InvoiceTax[];
  taxEnabled?: boolean;
  notes?: string;
  currency: string;
  currencySymbol: string;
}

// Helper function to process templates
function processTemplate(template: string, data: InvoiceTemplateData): string {
  return Mustache.render(template, data);
}

// Export processed templates
export const modernTemplate = (data: InvoiceTemplateData) => processTemplate(modernTemplateString, data);
export const minimalTemplate = (data: InvoiceTemplateData) => processTemplate(minimalTemplateString, data);
export const professionalTemplate = (data: InvoiceTemplateData) => processTemplate(professionalTemplateString, data);
export const freelancerTemplate = (data: InvoiceTemplateData) => processTemplate(freelancerTemplateString, data);
export const legionTemplate = (data: InvoiceTemplateData) => processTemplate(legionTemplateString, data);

export const templates = {
  modern: modernTemplate,
  minimal: minimalTemplate,
  professional: professionalTemplate,
  freelancer: freelancerTemplate,
  legion: legionTemplate
} as const; 