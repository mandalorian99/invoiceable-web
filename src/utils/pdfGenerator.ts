/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

import html2pdf from 'html2pdf.js';
import { InvoiceTemplateData } from '../templates/pdfTemplates';
import * as templateStrings from '../templates/templateStrings';
import Mustache from 'mustache';

export const generatePDF = async (data: InvoiceTemplateData, templateStyle: string = 'modern'): Promise<Blob> => {
  try {
    // Format the data for the template based on template type
    const formattedData: InvoiceTemplateData = {
      ...data,
      currencySymbol: data.currencySymbol || '$', // Ensure currency symbol is available with fallback
    };

    // Process items based on template type
    if (templateStyle === 'freelancer') {
      formattedData.items = data.items.map((item) => ({
        ...item,
        description: item.description || '',
        rate: item.rate || 0,
        hours: item.hours || 0,
        amount: item.amount || 0
      }));
    } else if (templateStyle === 'legion') {
      formattedData.items = data.items.map((item) => ({
        ...item,
        description: item.description || '',
        period: item.period || '',
        amount: item.amount || 0
      }));
    } else {
      // Standard templates (modern, minimal, professional)
      formattedData.items = data.items.map((item) => ({
        ...item,
        description: item.description || '',
        quantity: item.quantity || 0,
        price: item.price || 0,
        amount: item.amount || 0
      }));
    }

    // Ensure tax data is properly formatted
    if (data.taxEnabled && data.taxes) {
      formattedData.taxes = data.taxes.map(tax => ({
        ...tax,
        amount: tax.amount || 0,
        rate: tax.rate || 0,
        isPercentage: tax.isPercentage
      }));
    }

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