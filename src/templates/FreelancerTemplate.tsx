/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

export default function FreelancerTemplate({ invoice }: { invoice: Invoice }) {
  const total = invoice.items.reduce((sum, item) => sum + (item.rate * item.hours), 0);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-sans">
      <div className="mb-12">
        <div className="flex justify-between items-start border-b-2 border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
            <p className="text-gray-600 mt-1">#{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Date: {invoice.date}</p>
            <p className="text-gray-600">Due: {invoice.dueDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">From:</h2>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium">{invoice.from.name}</p>
            <p>{invoice.from.email}</p>
            <p className="whitespace-pre-line">{invoice.from.address}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h2>
          <div className="text-gray-600 space-y-1">
            <p className="font-medium">{invoice.to.name}</p>
            <p>{invoice.to.email}</p>
            <p className="whitespace-pre-line">{invoice.to.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-3 px-4 font-semibold">Description</th>
              <th className="py-3 px-4 font-semibold text-right">Rate</th>
              <th className="py-3 px-4 font-semibold text-right">Hours</th>
              <th className="py-3 px-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-3 px-4">{item.description}</td>
                <td className="py-3 px-4 text-right">${item.rate?.toFixed(2)}/hr</td>
                <td className="py-3 px-4 text-right">{item.hours?.toFixed(1)}</td>
                <td className="py-3 px-4 text-right">${(item.rate * item.hours)?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50">
              <td colSpan={3} className="py-4 px-4 text-right font-semibold">Total Due:</td>
              <td className="py-4 px-4 text-right font-semibold">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {invoice.notes && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Notes:</h3>
          <p className="text-gray-600 whitespace-pre-line text-sm">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
} 