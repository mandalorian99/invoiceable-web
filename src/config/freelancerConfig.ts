/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { InvoiceTemplateConfig } from '../types/invoice';

export const freelancerConfig: InvoiceTemplateConfig = {
  id: 'freelancer',
  name: 'Freelancer',
  description: 'Specialized template for independent software consultants',
  industry: 'freelance',
  previewImage: 'https://plus.unsplash.com/premium_photo-1677865215510-2dfc9d04c29e?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

  itemFields: [
    {
      key: 'description',
      label: 'Work Description',
      type: 'text',
      required: true,
      validation: {
        minLength: 10,
        maxLength: 500
      }
    },
    {
      key: 'rate',
      label: 'Hourly Rate',
      type: 'number',
      required: true,
      validation: {
        min: 25,
        max: 500
      }
    },
    {
      key: 'hours',
      label: 'Hours Worked',
      type: 'number',
      required: true,
      validation: {
        min: 0.5,
        max: 200,
        step: 0.5
      }
    },
    {
      key: 'amount',
      label: 'Total',
      type: 'calculated',
      calculate: (fields) => fields.rate * fields.hours
    }
  ],

  validationRules: {
    custom: [
      {
        condition: (items) => items.every(item => item.hours >= 0.5),
        message: 'Minimum 0.5 hours per work item'
      },
      {
        condition: (items) => items.some(item => item.rate >= 50),
        message: 'Professional rate recommendation: $50+/hour'
      }
    ]
  },

  defaultNotes: 'Payment terms: Net 15 days\nLate payment fee: 1.5% monthly interest',

  meta: {
    accentColor: '#2d3748',
    preferredUnits: 'hours',
    rateVisibility: 'prominent',
    timeEntryFields: ['date', 'task', 'hours']
  }
}; 