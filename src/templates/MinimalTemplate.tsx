/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

export default function MinimalTemplate({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  
  // Calculate tax amount if taxes are enabled
  const taxAmount = invoice.taxEnabled && invoice.taxes 
    ? invoice.taxes.reduce((sum, tax) => sum + (tax.enabled ? tax.amount : 0), 0) 
    : 0;
  
  // Calculate total including taxes
  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const currencySymbol = invoice.currency || '$';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-mono">
      <div className="mb-12">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-normal">INVOICE #{invoice.invoiceNumber}</h1>
          </div>
          <div className="text-right text-sm">
            <p>Date: {invoice.date}</p>
            <p>Due: {invoice.dueDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12 text-sm">
        <div>
          <p className="mb-1">From:</p>
          <div className="space-y-1">
            <p>{invoice.from.name}</p>
            <p>{invoice.from.email}</p>
            <p className="whitespace-pre-line">{invoice.from.address}</p>
          </div>
        </div>
        <div>
          <p className="mb-1">To:</p>
          <div className="space-y-1">
            <p>{invoice.to.name}</p>
            <p>{invoice.to.email}</p>
            <p className="whitespace-pre-line">{invoice.to.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-black">
              <th className="py-2 text-left font-normal">Description</th>
              <th className="py-2 text-right font-normal">Qty</th>
              <th className="py-2 text-right font-normal">Price</th>
              <th className="py-2 text-right font-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.description}</td>
                <td className="py-2 text-right">{item.quantity}</td>
                <td className="py-2 text-right">{currencySymbol}{item.price.toFixed(2)}</td>
                <td className="py-2 text-right">{currencySymbol}{(item.amount || (item.quantity * item.price)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-4 text-right">Subtotal:</td>
              <td className="py-4 text-right">{currencySymbol}{subtotal.toFixed(2)}</td>
            </tr>
            
            {/* Display taxes if enabled */}
            {invoice.taxEnabled && invoice.taxes && invoice.taxes.filter(tax => tax.enabled).map(tax => (
              <tr key={tax.id}>
                <td colSpan={3} className="py-2 text-right">
                  {tax.name} ({tax.isPercentage ? `${tax.rate}%` : currencySymbol + tax.rate}):
                </td>
                <td className="py-2 text-right">{currencySymbol}{tax.amount.toFixed(2)}</td>
              </tr>
            ))}
            
            <tr className="border-t border-black">
              <td colSpan={3} className="py-4 text-right font-bold">Total:</td>
              <td className="py-4 text-right font-bold">{currencySymbol}{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="text-sm">
          <p className="mb-2">Notes:</p>
          <p className="whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}