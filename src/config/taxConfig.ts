/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

export type TaxType = {
  id: string;
  name: string;
  description: string;
  defaultRate: number;
  isPercentage: boolean;
  applicableTemplates?: string[]; // Optional template restrictions
};

export const TAX_TYPES: TaxType[] = [
  {
    id: 'vat',
    name: 'VAT',
    description: 'Value Added Tax',
    defaultRate: 20,
    isPercentage: true,
    applicableTemplates: ['modern', 'minimal', 'professional']
  },
  {
    id: 'gst',
    name: 'GST',
    description: 'Goods and Services Tax',
    defaultRate: 5,
    isPercentage: true,
    applicableTemplates: ['modern', 'professional', 'freelancer', 'legion']
  },
  {
    id: 'sales',
    name: 'Sales Tax',
    description: 'Standard sales tax',
    defaultRate: 7.5,
    isPercentage: true,
    applicableTemplates: ['minimal', 'modern']
  },
  {
    id: 'income',
    name: 'Income Tax',
    description: 'Income tax for contract work',
    defaultRate: 10,
    isPercentage: true,
    applicableTemplates: ['legion']
  },
  {
    id: 'freelance',
    name: 'Freelance Tax',
    description: 'Tax for freelance services',
    defaultRate: 15,
    isPercentage: true,
    applicableTemplates: ['freelancer']
  },
  {
    id: 'igst',
    name: 'IGST',
    description: 'Integrated Goods and Services Tax',
    defaultRate: 9,
    isPercentage: true,
    applicableTemplates: ['freelancer', 'legion']
  },
  {
    id: 'sgst',
    name: 'SGST',
    description: 'State Goods and Services Tax',
    defaultRate: 9,
    isPercentage: true,
    applicableTemplates: ['freelancer', 'legion']
  },
  {
    id: 'cgst',
    name: 'CGST',
    description: 'Central Goods and Services Tax',
    defaultRate: 9,
    isPercentage: true,
    applicableTemplates: ['freelancer', 'legion']
  }
];

export const getAvailableTaxesForTemplate = (templateId: string): TaxType[] => {
  return TAX_TYPES.filter(tax => 
    !tax.applicableTemplates || 
    tax.applicableTemplates.includes(templateId)
  );
};

// // Example expected output for different templates
// console.log(getAvailableTaxesForTemplate('freelancer')); 
// // Should show only Freelance Tax (id: freelance)

// console.log(getAvailableTaxesForTemplate('legion')); 
// // Should show Income Tax (id: income)

// console.log(getAvailableTaxesForTemplate('modern')); 
// // Should show VAT and GST 