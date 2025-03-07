/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

const API_BASE_URL = 'http://localhost:3000/api'; // Replace with your actual API URL

function convertToSnakeCase(invoice: Invoice): any {
  return {
    id: invoice.id,
    invoice_number: invoice.invoiceNumber,
    date: invoice.date,
    due_date: invoice.dueDate,
    from: invoice.from,
    to: invoice.to,
    items: invoice.items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
      amount: item.amount,
      description: item.description
    })),
    notes: invoice.notes,
    template: invoice.template,
    invoice_type: invoice.invoiceType, 
    template_config: invoice.templateConfig 
  };
}

export async function saveInvoice(invoice: Invoice): Promise<{ success: boolean; message: string }> {
  console.log("Before conversion:", invoice);
  const transformedInvoice = convertToSnakeCase(invoice);
  console.log("After conversion:", transformedInvoice);

  
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ invoice: transformedInvoice }),
    });

    if (!response.ok) {
      throw new Error('Failed to save invoice');
    }

    const data = await response.json();
    return { success: true, message: 'Invoice saved successfully' };
  } catch (error) {
    console.error('Error saving invoice:', error);
    return { success: false, message: 'Failed to save invoice. Please try again.' };
  }
}