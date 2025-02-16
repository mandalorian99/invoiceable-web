/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Button from './ui/Button'; // Updated import path
import InvoicePreview from './InvoicePreview';
import { FileDown } from 'lucide-react';
import { Invoice } from '../types/invoice';

interface Props {
  invoice: Invoice;
}

export default function ExportPDFButton({ invoice }: Props) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    // Temporarily make preview visible for capture
    element.classList.remove('sr-only');
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Force white background for PDF
        clonedDoc.getElementById('pdf-preview')?.classList.add('!bg-white');
      }
    });

    // Restore hidden state
    element.classList.add('sr-only');

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = (canvas.height * pageWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight);
    pdf.save(`invoice-${invoice.id}.pdf`);
  };

  return (
    <>
      <div 
        id="pdf-preview" 
        className="sr-only absolute top-[-9999px] left-[-9999px] w-[210mm]"
      >
        <InvoicePreview ref={invoiceRef} invoice={invoice} />
      </div>
      <button 
        onClick={generatePDF}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <FileDown className="mr-2 h-4 w-4" /> 
        Export PDF
      </button>
    </>
  );
} 