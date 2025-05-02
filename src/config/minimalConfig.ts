/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { InvoiceTemplateConfig } from '../types/invoice';

export const minimalConfig: InvoiceTemplateConfig = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Simple and clean invoice design',
  previewImage: 'https://images.unsplash.com/photo-1586232702178-f044c5f4d4b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  
  itemFields: [
    {
      key: 'description',
      label: 'Item Description',
      type: 'text',
      required: true,
      validation: {
        minLength: 5,
        maxLength: 100
      }
    },
    {
      key: 'quantity',
      label: 'Qty',
      type: 'number',
      required: true,
      validation: {
        min: 1,
        max: 999
      }
    },
    {
      key: 'price',
      label: 'Unit Price',
      type: 'number',
      required: true,
      validation: {
        min: 0,
        max: 10000
      }
    },
    {
      key: 'amount',
      label: 'Total',
      type: 'calculated',
      calculate: (fields) => fields.quantity * fields.price
    }
  ],
  
  validationRules: {
    custom: [
      {
        condition: (items) => items.some(item => item.price > 0),
        message: 'At least one item must have a price greater than 0'
      }
    ]
  },
  
  defaultNotes: 'Payment due within 30 days',
  
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
        id: 'sales',
        name: 'Sales Tax',
        description: 'Standard sales tax',
        defaultRate: 7.5,
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
    accentColor: '#4a5568',
    layoutType: 'compact'
  },
  
  industry: 'general',
}; 