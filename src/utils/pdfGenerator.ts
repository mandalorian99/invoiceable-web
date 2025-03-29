import html2pdf from 'html2pdf.js';
import { InvoiceTemplateData } from '../types/invoice';
import * as templateStrings from '../templates/templateStrings';
import Mustache from 'mustache';

export const generatePDF = async (data: InvoiceTemplateData, templateStyle: string = 'modern'): Promise<Blob> => {
  try {
    // Format the data for the template
    const formattedData: InvoiceTemplateData = {
      ...data,
      items: data.items.map((item: { description?: string; quantity?: number; price?: number }) => ({
        ...item,
        description: item.description || '',
        quantity: item.quantity || 0,
        price: item.price || 0,
        amount: (item.quantity || 0) * (item.price || 0)
      })),
      total: data.total || 0
    };

    // Get the template string dynamically
    const templateKey = `${templateStyle}TemplateString` as keyof typeof templateStrings;
    let template = templateStrings[templateKey];

    if (!template) {
      console.warn(`Template "${templateStyle}" not found, falling back to modern template`);
      template = templateStrings.modernTemplateString;
    }

    // Render the template with data
    const html = Mustache.render(template, formattedData);

    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = html;

    // Generate PDF
    const opt = {
      margin: 0,
      filename: `invoice-${data.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
    };

    const pdf = await html2pdf().set(opt).from(container).save();
    return pdf;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}; 