/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

import { Invoice } from '../types/invoice';

export default function LegionTemplate({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  // Calculate tax amount if taxes are enabled
  const taxAmount = invoice.taxEnabled && invoice.taxes 
    ? invoice.taxes.reduce((sum, tax) => sum + (tax.enabled ? tax.amount : 0), 0) 
    : 0;
  
  // Calculate total including taxes
  const total = invoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const currencySymbol = invoice.currency || '$';

  return (
    <div className="font-sans p-8 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold">{invoice.from.name}</h1>
          <p className="text-gray-600 mt-1">{invoice.from.address}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-bold">INVOICE</h2>
          <div className="mt-4 space-y-1">
            <p><span className="font-semibold">Invoice #:</span> {invoice.invoiceNumber}</p>
            <p><span className="font-semibold">Date:</span> {new Date(invoice.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Recipient and Service Section */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-bold text-lg mb-2">Bill To:</h3>
          <p className="font-medium">{invoice.to.name}</p>
          <p className="text-gray-600">{invoice.to.address}</p>
        </div>
        <div className="text-right">
          <h3 className="font-bold text-lg mb-2">Service Period:</h3>
          <p className="text-gray-600">{invoice.items[0]?.period || 'N/A'}</p>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-3 px-4">DESCRIPTION</th>
            <th className="py-3 px-4">PERIOD</th>
            <th className="text-right py-3 px-4">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-3 px-4">{item.description}</td>
              <td className="py-3 px-4 text-center">{item.period}</td>
              <td className="py-3 px-4 text-right">{currencySymbol}{(item.amount || 0).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2} className="py-3 px-4 text-right">SUBTOTAL:</td>
            <td className="py-3 px-4 text-right">{currencySymbol}{subtotal.toFixed(2)}</td>
          </tr>
          
          {/* Display taxes if enabled */}
          {invoice.taxEnabled && invoice.taxes && invoice.taxes.filter(tax => tax.enabled).map(tax => (
            <tr key={tax.id}>
              <td colSpan={2} className="py-2 px-4 text-right text-gray-600">
                {tax.name} ({tax.isPercentage ? `${tax.rate}%` : currencySymbol + tax.rate}):
              </td>
              <td className="py-2 px-4 text-right text-gray-600">{currencySymbol}{tax.amount.toFixed(2)}</td>
            </tr>
          ))}
          
          <tr className="bg-gray-50">
            <td colSpan={2} className="py-3 px-4 text-right font-bold">TOTAL:</td>
            <td className="py-3 px-4 text-right font-bold">{currencySymbol}{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Notes Section */}
      {invoice.notes && (
        <div className="border-t pt-6">
          <h3 className="font-bold mb-2">Notes:</h3>
          <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
} 