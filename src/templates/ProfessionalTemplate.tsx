/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

export default function ProfessionalTemplate({ invoice }: { invoice: Invoice }) {
  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="border-b-4 border-gray-900 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">INVOICE</h1>
            <p className="text-gray-600 mt-2 text-lg">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="space-y-1 text-gray-600">
              <p><span className="font-semibold">Date:</span> {invoice.date}</p>
              <p><span className="font-semibold">Due Date:</span> {invoice.dueDate}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">From</h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">{invoice.from.name}</p>
            <p className="text-gray-600">{invoice.from.email}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoice.from.address}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bill To</h2>
          <div className="space-y-2">
            <p className="text-lg font-semibold text-gray-900">{invoice.to.name}</p>
            <p className="text-gray-600">{invoice.to.email}</p>
            <p className="text-gray-600 whitespace-pre-line">{invoice.to.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900 text-white">
              <th className="py-4 px-6 text-left">Description</th>
              <th className="py-4 px-6 text-right">Quantity</th>
              <th className="py-4 px-6 text-right">Price</th>
              <th className="py-4 px-6 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr 
                key={item.id} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}
              >
                <td className="py-4 px-6">{item.description}</td>
                <td className="py-4 px-6 text-right">{item.quantity}</td>
                <td className="py-4 px-6 text-right">${item.price.toFixed(2)}</td>
                <td className="py-4 px-6 text-right">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-900">
              <td colSpan={3} className="py-6 px-6 text-right font-bold text-gray-900">Total:</td>
              <td className="py-6 px-6 text-right font-bold text-gray-900">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="border-t-2 border-gray-200 pt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Notes</h2>
          <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}