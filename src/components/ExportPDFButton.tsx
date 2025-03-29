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

interface ExportPDFButtonProps {
  invoice: Invoice;
}

const ExportPDFButton: React.FC<ExportPDFButtonProps> = ({ invoice }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);

      // Prepare data for the template
      const data = {
        invoiceNumber: invoice.invoiceNumber,
        date: invoice.date,
        dueDate: invoice.dueDate,
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
        items: invoice.items.map(item => ({
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          amount: item.quantity * item.price
        })),
        total: invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
        notes: invoice.notes
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