/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
// import { Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types/invoice';
import { TEMPLATE_CONFIGS } from '../config/templates';
import { useState } from 'react';
import TemplateSelector from './TemplateSelector';
import InvoiceItems from './InvoiceItems';

interface Props {
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

export default function InvoiceForm({ invoice, onInvoiceChange }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    const templateConfig = TEMPLATE_CONFIGS[invoice.template];
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      quantity: 1,
      price: 0,
      amount: 0
    };

    // Initialize fields from config
    templateConfig.itemFields.forEach(field => {
      if (field.type !== 'calculated') {
        newItem[field.key] = field.type === 'number' ? 0 : '';
      }
    });

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

  const updateItem = (id: string, field: string, value: any) => {
    const updatedItems = invoice.items.map(item => {
      if (item.id !== id) return item;
      
      const updatedItem = { ...item, [field]: value };
      
      // Auto-calculate calculated fields
      TEMPLATE_CONFIGS[invoice.template].itemFields.forEach(configField => {
        if (configField.type === 'calculated' && configField.calculate) {
          updatedItem[configField.key] = configField.calculate(updatedItem);
        }
      });

      return updatedItem;
    });

    onInvoiceChange({ ...invoice, items: updatedItems });
  };

  return (
    <div className="bg-white p-6 pb-20">
      <div className="space-y-6">
        <TemplateSelector
          selectedTemplate={invoice.template}
          templates={Object.values(TEMPLATE_CONFIGS)}
          onSelect={(templateId) => onInvoiceChange({ ...invoice, template: templateId })}
        />

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
              onChange={(e) => {
                const newDate = e.target.value;
                const newDueDate = new Date(new Date(newDate).getTime() + 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split('T')[0];

                onInvoiceChange({ ...invoice, date: newDate, dueDate: newDueDate })
              }}
              
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* From Section */}
        <div className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📨</span>
            From
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={invoice.from.name}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, name: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={invoice.from.email}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, email: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <textarea
              placeholder="Your Address"
              value={invoice.from.address}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                from: { ...invoice.from, address: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>
        </div>

        {/* To Section */}
        <div className="pt-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📧</span>
            To
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={invoice.to.name}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, name: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <input
              type="email"
              placeholder="Client Email"
              value={invoice.to.email}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, email: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <textarea
              placeholder="Client Address"
              value={invoice.to.address}
              onChange={(e) => onInvoiceChange({
                ...invoice,
                to: { ...invoice.to, address: e.target.value }
              })}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              rows={3}
            />
          </div>
        </div>

        <InvoiceItems
          invoice={invoice}
          templateConfig={TEMPLATE_CONFIGS[invoice.template]}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onUpdateItem={updateItem}
        />

        {/* Notes Section */}
        <div className="pt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={invoice.notes}
            onChange={(e) => onInvoiceChange({ ...invoice, notes: e.target.value })}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            rows={4}
            placeholder="Add any notes or terms of service"
          />
        </div>
      </div>

      {/* <div className="fixed bottom-6 right-6">
        <button
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          onClick={() => console.log('Save invoice')}
        >
          <Plus className="h-5 w-5 mr-2" />
          Save Invoice
        </button>
      </div> */}
    </div>
  );
}