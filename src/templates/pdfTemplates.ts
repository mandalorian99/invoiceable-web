import { modernTemplateString, minimalTemplateString, professionalTemplateString } from './templateStrings';
import Mustache from 'mustache';

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
  }>;
  total: number;
  notes?: string;
}

// Helper function to process templates
function processTemplate(template: string, data: InvoiceTemplateData): string {
  return Mustache.render(template, data);
}

// Export processed templates
export const modernTemplate = (data: InvoiceTemplateData) => processTemplate(modernTemplateString, data);
export const minimalTemplate = (data: InvoiceTemplateData) => processTemplate(minimalTemplateString, data);
export const professionalTemplate = (data: InvoiceTemplateData) => processTemplate(professionalTemplateString, data);

export const templates = {
  modern: modernTemplate,
  minimal: minimalTemplate,
  professional: professionalTemplate
} as const; 