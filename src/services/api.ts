/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

const API_BASE_URL = 'https://anpmchp6apjae7kv22tfiwscwe0bdfka.lambda-url.ap-south-1.on.aws'; // Replace with your actual API URL

export async function saveInvoice(invoice: Invoice): Promise<{ success: boolean; message: string }> {
  console.log(invoice);
  
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1234567890',
      },
      body: JSON.stringify(invoice),
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