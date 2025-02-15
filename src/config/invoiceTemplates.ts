import { InvoiceTemplateConfig } from '../types/invoice';

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  hourly: {
    id: 'hourly',
    name: 'Hourly Rate',
    description: 'For hourly based work',
    itemFields: [
      { key: 'hours', label: 'Hours', type: 'number', required: true },
      { key: 'rate', label: 'Rate/Hour', type: 'number', required: true },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        calculate: (fields) => fields.hours * fields.rate
      }
    ],
    defaultNotes: 'Hours calculated based on time tracking logs'
  },
  fixed_term: {
    id: 'fixed_term',
    name: 'Fixed Term',
    description: 'For fixed period contracts',
    itemFields: [
      { key: 'start_date', label: 'Start Date', type: 'date', required: true },
      { key: 'end_date', label: 'End Date', type: 'date', required: true },
      { key: 'daily_rate', label: 'Daily Rate', type: 'number', required: true },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        calculate: (fields) => {
          const days = Math.ceil(
            (new Date(fields.end_date).getTime() - new Date(fields.start_date).getTime()) / 
            (1000 * 3600 * 24)
          );
          return days * fields.daily_rate;
        }
      }
    ]
  }
}; 