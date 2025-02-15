import { Invoice } from '../types/invoice';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

export async function saveInvoice(invoice: Invoice): Promise<{ success: boolean; message: string }> {
  console.log(invoice);
  
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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