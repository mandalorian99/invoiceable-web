import { InvoiceTemplateConfig } from '../types/invoice';

export const modernConfig: InvoiceTemplateConfig = {
  id: 'modern',
  name: 'Modern',
  description: 'Clean, contemporary invoice design',
  
  itemFields: [
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      validation: {
        minLength: 3,
        maxLength: 200
      }
    },
    {
      key: 'quantity',
      label: 'Quantity',
      type: 'number',
      required: true,
      validation: {
        min: 1,
        max: 1000
      }
    },
    {
      key: 'price',
      label: 'Unit Price',
      type: 'number',
      required: true,
      validation: {
        min: 0,
        max: 100000
      }
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'calculated',
      calculate: (fields) => fields.quantity * fields.price
    }
  ],
  
  validationRules: {
    custom: [
      {
        condition: (items) => items.every(item => item.quantity > 0),
        message: 'All items must have quantity greater than 0'
      }
    ]
  },
  
  defaultNotes: 'Thank you for your business!',
  
  // Extensible metadata
  meta: {
    accentColor: '#2563eb',
    layoutType: 'vertical'
  },
  
  previewImage: 'https://images.unsplash.com/photo-1613243555978-636c48dc653c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
}; 