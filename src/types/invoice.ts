/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
export interface InvoiceItemConfig {
  key: string;
  label: string;
  type: 'number' | 'text' | 'date' | 'hours';
  required?: boolean;
  calculate?: (fields: Record<string, any>) => number;
}

// Tax type definition
export interface TaxType {
  id: string;
  name: string;
  description: string;
  defaultRate: number;
  isPercentage: boolean;
}

// Tax configuration for template
export interface TaxConfig {
  id: string;
  enabled: boolean;
  rate: number;
  isPercentage: boolean;
  amount?: number;
}

export interface InvoiceTemplateConfig {
  id: string;
  name: string;
  description: string;
  itemFields: ItemFieldConfig[];
  validationRules?: ValidationRules;
  defaultNotes?: string;
  taxes: {
    enabled: boolean;
    config: {
      taxCalculation: (subtotal: number, selectedTaxes: TaxConfig[]) => {
        taxAmount: number;
        total: number;
        taxes: TaxConfig[];
      };
      availableTaxes: TaxType[];
    };
  };
  meta?: Record<string, any>;
  previewImage: string;
  industry: 'general' | 'it' | 'construction' | 'healthcare' | 'legal' | 'freelance';
}

export interface ItemFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'calculated';
  required?: boolean;
  validation?: FieldValidation;
  calculate?: (fields: Record<string, any>) => number;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  step?: number;
}

export interface ValidationRules {
  custom?: Array<{
    condition: (items: InvoiceItem[]) => boolean;
    message: string;
  }>;
}

export interface InvoiceItem {
  id: string;
  [key: string]: any; // Allows dynamic fields from config
  quantity: number;
  price: number;
  amount: number;
}

// Tax applied to an invoice
export interface InvoiceTax {
  id: string;
  name: string;
  rate: number;
  isPercentage: boolean;
  amount: number;
  enabled: boolean;
}

export interface Invoice {
  id: string;
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
  items: InvoiceItem[];
  notes: string;
  template: 'modern' | 'minimal' | 'professional' | 'freelancer' | 'legion';
  invoiceType: 'hourly' | 'fixed_term';
  templateConfig: string; // Reference to template config ID
  taxes?: InvoiceTax[]; // Added tax information
  taxEnabled?: boolean; // Flag to toggle tax display
}

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
  }>;
  total: number;
  taxes?: InvoiceTax[]; // Added tax information
  taxEnabled?: boolean; // Flag to toggle tax display
  notes?: string;
}

export const defaultInvoice: Invoice = {
  id: '1',
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  from: {
    name: 'Your Company',
    email: 'your@email.com',
    address: 'Your Address'
  },
  to: {
    name: 'Client Name',
    email: 'client@email.com',
    address: 'Client Address'
  },
  items: [],
  notes: '',
  template: 'modern',
  invoiceType: 'hourly',
  templateConfig: 'hourly',
  taxes: [],
  taxEnabled: false
};