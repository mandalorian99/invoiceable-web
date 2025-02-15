import { Invoice } from '../types/invoice';

export default function ModernTemplate({ invoice }: { invoice: Invoice }) {
  const total = invoice.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">INVOICE</h1>
          <p className="text-gray-600 mt-2">#{invoice.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Date: {invoice.date}</p>
          <p className="text-gray-600">Due Date: {invoice.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">From:</h2>
          <div className="text-gray-600">
            <p className="font-medium">{invoice.from.name}</p>
            <p>{invoice.from.email}</p>
            <p className="whitespace-pre-line">{invoice.from.address}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">To:</h2>
          <div className="text-gray-600">
            <p className="font-medium">{invoice.to.name}</p>
            <p>{invoice.to.email}</p>
            <p className="whitespace-pre-line">{invoice.to.address}</p>
          </div>
        </div>
      </div>

      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-2 border-blue-600">
            <th className="py-3 text-left">Description</th>
            <th className="py-3 text-right">Qty</th>
            <th className="py-3 text-right">Price</th>
            <th className="py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="py-4">{item.description}</td>
              <td className="py-4 text-right">{item.quantity}</td>
              <td className="py-4 text-right">${item.price.toFixed(2)}</td>
              <td className="py-4 text-right">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="py-4 text-right font-semibold">Total:</td>
            <td className="py-4 text-right font-semibold">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {invoice.notes && (
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Notes:</h2>
          <p className="text-gray-600 whitespace-pre-line">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}