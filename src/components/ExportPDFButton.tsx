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

    // Capture the invoice as image
    const canvas = await html2canvas(element, {
      scale: 2, // Increase for better resolution
      useCORS: true,
      logging: true,
    });

    // Create PDF
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`invoice-${invoice.id}.pdf`);
  };

  return (
    <>
      <div className="sr-only"> {/* Screen-reader only */}
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