/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { InvoiceTemplateConfig } from '../types/invoice';
import { TAX_TYPES, getAvailableTaxesForTemplate } from './taxConfig';

export const girnarConfig: InvoiceTemplateConfig = {
  id: 'girnar',
  name: 'GST Invoice',
  description: 'Professional GST-compliant invoice template for Indian businesses',
  industry: 'it',
  previewImage: 'https://images.unsplash.com/photo-1604594849809-4f9d0f738d2c?q=80&w=3082&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  itemFields: [
    {
      key: 'description',
      label: 'Service Description',
      type: 'text',
      required: true,
      validation: {
        minLength: 10,
        maxLength: 200
      }
    },
    {
      key: 'hsnSac',
      label: 'HSN/SAC Code',
      type: 'text',
      required: true,
      validation: {
        pattern: '^[0-9]{6,8}$'
      }
    },
    {
      key: 'resourceName',
      label: 'Resource Name',
      type: 'text',
      required: true,
      validation: {
        minLength: 2,
        maxLength: 50
      }
    },
    {
      key: 'rate',
      label: 'Daily Rate',
      type: 'number',
      required: true,
      validation: {
        min: 0,
        max: 100000
      }
    },
    {
      key: 'workedDays',
      label: 'Worked Days',
      type: 'number',
      required: true,
      validation: {
        min: 1,
        max: 31
      }
    },
    {
      key: 'period',
      label: 'Service Month',
      type: 'text',
      required: true,
      validation: {
        pattern: '^(January|February|March|April|May|June|July|August|September|October|November|December) \\d{4}$'
      }
    },
    {
      key: 'amount',
      label: 'Taxable Amount',
      type: 'number',
      required: true,
      calculate: (fields) => fields.workedDays * fields.rate,
      validation: {
        min: 0
      }
    }
  ],

  validationRules: {
    custom: [
      {
        condition: (items) => items.every(item => item.hsnSac?.match(/^[0-9]{6,8}$/)),
        message: 'Valid 6-8 digit HSN/SAC code required'
      },
      {
        condition: (items) => items.every(item => item.workedDays >= 1),
        message: 'Minimum 1 working day required per service item'
      }
    ]
  },

  defaultNotes: 'Payment terms: Net 15 days\nLate payment fee: 1.5% monthly interest',

  taxes: {
    enabled: true,
    config: {
      taxCalculation: (subtotal, selectedTaxes) => {
        const taxAmount = selectedTaxes.reduce((sum, tax) => 
          sum + (tax.isPercentage ? (subtotal * tax.rate / 100) : tax.rate), 0);
        return {
          taxAmount,
          total: subtotal + taxAmount,
          taxes: selectedTaxes
        };
      },
      availableTaxes: [
        {
          id: 'sgst',
          name: 'SGST',
          description: 'State Goods and Services Tax',
          defaultRate: 9,
          isPercentage: true
        },
        {
          id: 'cgst',
          name: 'CGST',
          description: 'Central Goods and Services Tax',
          defaultRate: 9,
          isPercentage: true
        }
      ]
    }
  },

  meta: {
    accentColor: '#1e40af',
    legalFields: ['gstin', 'pan', 'bankDetails'],
    requiredFields: ['hsnSac', 'resourceName'],
    paymentModes: ['NEFT', 'RTGS', 'Cheque', 'UPI']
  }
}; 