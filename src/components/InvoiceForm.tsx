import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types/invoice';

interface Props {
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

export default function InvoiceForm({ invoice, onInvoiceChange }: Props) {
  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: '',
      quantity: 1,
      price: 0
    };
    onInvoiceChange({
      ...invoice,
      items: [...invoice.items, newItem]
    });
  };

  const removeItem = (id: string) => {
    onInvoiceChange({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    onInvoiceChange({
      ...invoice,
      items: invoice.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Template</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={invoice.template}
            onChange={(e) => onInvoiceChange({ ...invoice, template: e.target.value as Invoice['template'] })}
          >
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => onInvoiceChange({ ...invoice, invoiceNumber: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={invoice.date}
              onChange={(e) => onInvoiceChange({ ...invoice, date: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* From Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">From</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={invoice.from.name}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, name: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={invoice.from.email}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, email: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Address"
              value={invoice.from.address}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, address: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        {/* To Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">To</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={invoice.to.name}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, name: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Client Email"
              value={invoice.to.email}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, email: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <textarea
              placeholder="Client Address"
              value={invoice.to.address}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, address: e.target.value }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Items</h3>
            <button
              onClick={addItem}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </button>
          </div>
          <div className="space-y-4">
            {invoice.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value))}
                  className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value))}
                  className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notes Section */}
        <div className="border-t pt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={invoice.notes}
            onChange={(e) => onInvoiceChange({ ...invoice, notes: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            placeholder="Add any notes or terms of service"
          />
        </div>
      </div>
    </div>
  );
}