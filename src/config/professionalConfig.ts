/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { InvoiceTemplateConfig } from '../types/invoice';

export const professionalConfig: InvoiceTemplateConfig = {
  id: 'professional',
  name: 'Professional',
  description: 'Formal business invoice template',
  previewImage: 'https://plus.unsplash.com/premium_photo-1679784204539-7c17ffd10f1c?q=80&w=2133&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  
  itemFields: [
    {
      key: 'description',
      label: 'Service Description',
      type: 'text',
      required: true,
      validation: {
        minLength: 10,
        maxLength: 500
      }
    },
    {
      key: 'quantity',
      label: 'Units',
      type: 'number',
      required: true,
      validation: {
        min: 1,
        max: 10000
      }
    },
    {
      key: 'price',
      label: 'Rate',
      type: 'number',
      required: true,
      validation: {
        min: 0,
        max: 100000
      }
    },
    {
      key: 'amount',
      label: 'Subtotal',
      type: 'calculated',
      calculate: (fields) => fields.quantity * fields.price
    }
  ],
  
  validationRules: {
    custom: [
      {
        condition: (items) => items.length > 0,
        message: 'At least one item is required'
      }
    ]
  },
  
  defaultNotes: 'Terms: Net 30 days. Late fees may apply.',
  
  // Tax configuration
  taxes: {
    enabled: true,
    types: [
      {
        id: 'vat',
        name: 'VAT',
        description: 'Value Added Tax',
        defaultRate: 20,
        isPercentage: true
      },
      {
        id: 'gst',
        name: 'GST',
        description: 'Goods and Services Tax',
        defaultRate: 5,
        isPercentage: true
      },
      {
        id: 'servicesTax',
        name: 'Services Tax',
        description: 'Tax on services',
        defaultRate: 10,
        isPercentage: true
      },
      {
        id: 'custom',
        name: 'Custom Tax',
        description: 'User-defined tax',
        defaultRate: 0,
        isPercentage: true
      }
    ]
  },
  
  meta: {
    accentColor: '#1a365d',
    layoutType: 'detailed',
    industrySpecific: {
      showHourlyRates: true,
      serviceCategories: ['Software Development', 'Consulting', 'Maintenance']
    }
  },
  
  industry: 'it',
}; 