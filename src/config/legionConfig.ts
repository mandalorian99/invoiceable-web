import { InvoiceTemplateConfig } from '../types/invoice';

export const legionConfig: InvoiceTemplateConfig = {
  id: 'legion',
  name: 'Legion',
  description: '15-day billing cycle for contract work',
  industry: 'freelance',
  previewImage: 'https://images.unsplash.com/photo-1613243555978-636c48dc653c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  
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
      key: 'period',
      label: 'Billing Period',
      type: 'text',
      required: true,
      validation: {
        pattern: '^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d{1,2}-\\d{1,2}, \\d{4}$'
      }
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'number',
      required: true,
      validation: {
        min: 100,
        max: 100000
      }
    }
  ],

  defaultNotes: 'Payment due within 15 days of invoice date\nLate payment interest: 1.5% per month',

  validationRules: {
    custom: [
      {
        condition: (items) => items.every(item => item.amount >= 100),
        message: 'Minimum invoice amount is $100 per period'
      }
    ]
  },

  meta: {
    billingInterval: 15,
    currency: 'USD',
    taxSettings: {
      includeTax: false,
      taxRate: 0
    }
  }
}; 