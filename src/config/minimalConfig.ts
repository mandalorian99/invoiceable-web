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
  
  meta: {
    accentColor: '#4a5568',
    layoutType: 'compact'
  },
  
  industry: 'general',
}; 