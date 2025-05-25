/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

import React, { useState } from 'react';
import Button from './ui/Button';
import { generatePDF } from '../utils/pdfGenerator';
import { Invoice } from '../types/invoice';
import { TEMPLATE_CONFIGS } from '../config/invoiceTemplates';
import { TAX_TYPES } from '../config/taxConfig';

interface ExportPDFButtonProps {
  invoice: Invoice;
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ invoice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);

      // Get template config
      const templateConfig = TEMPLATE_CONFIGS[invoice.template];

      // Calculate subtotal based on item types
      let subtotal = 0;
      
      if (invoice.template === 'freelancer') {
        // Freelancer template uses rate and hours
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || (item.rate * item.hours) || 0), 0);
      } else if (invoice.template === 'legion') {
        // Legion template has a direct amount
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || 0), 0);
      } else {
        // Other templates use quantity and price
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || (item.quantity * item.price) || 0), 0);
      }

      // Calculate taxes using template's method
      const taxCalculation = templateConfig.taxes.config.taxCalculation(
        subtotal,
        invoice.taxes?.filter(t => t.enabled) || []
      );

      // Add null check for tax calculation
      if (!taxCalculation) {
        throw new Error('Tax calculation method missing for template');
      }

      // Prepare data for the template
      const data = {
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        dueDate: invoice.dueDate,
        currency: invoice.currency,
        currencySymbol: invoice.currency || '$',
        from: {
          name: invoice.from.name,
          email: invoice.from.email,
          address: invoice.from.address
        },
        to: {
          name: invoice.to.name,
          email: invoice.to.email,
          address: invoice.to.address
        },
        items: invoice.items.map(item => {
          // Create a base item with common properties
          const exportItem: any = {
          description: item.description,
            amount: item.amount || 0
          };

          // Add template-specific properties
          if (invoice.template === 'freelancer') {
            exportItem.rate = item.rate || 0;
            exportItem.hours = item.hours || 0;
          } else if (invoice.template === 'legion') {
            exportItem.period = item.period || '';
          } else {
            exportItem.quantity = item.quantity || 0;
            exportItem.price = item.price || 0;
          }

          return exportItem;
        }),
        subtotal,
        total: taxCalculation.total,
        taxes: taxCalculation.taxes.map(tax => {
          const taxType = TAX_TYPES.find(t => t.id === tax.id) || {
            name: 'Tax',
            description: '',
            defaultRate: 0,
            isPercentage: true
          };
          
          return {
            ...tax,
            name: taxType.name,
            description: taxType.description,
            amount: tax.amount || 0
          };
        }),
        taxEnabled: templateConfig.taxes.enabled,
        notes: invoice.notes,
        bankDetails: invoice.bankDetails || {
          accountName: '',
          accountNumber: '',
          ifscCode: ''
        }
      };

      // Generate PDF using the invoice's template style
      await generatePDF(data, invoice.template);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isLoading}
      variant="default"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      {isLoading ? 'Exporting...' : 'Export PDF'}
    </Button>
  );
};

export default ExportPDFButton; 