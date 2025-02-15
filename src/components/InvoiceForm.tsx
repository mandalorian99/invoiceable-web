import { Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem } from '../types/invoice';
import { TEMPLATE_CONFIGS } from '../config/templates';
import { useState } from 'react';

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
        {/* Template Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Template</h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.values(TEMPLATE_CONFIGS).map((template) => (
              <label
                key={template.id}
                className={`relative cursor-pointer rounded-lg p-2 transition-all ${
                  invoice.template === template.id
                    ? 'ring-2 ring-blue-200 bg-blue-50'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name="template"
                  value={template.id}
                  checked={invoice.template === template.id}
                  onChange={(e) => onInvoiceChange({ ...invoice, template: e.target.value as Invoice['template'] })}
                  className="hidden"
                />
                <div className="h-32 bg-gray-50 rounded-md overflow-hidden">
                  <img
                    src={template.previewImage}
                    alt={`${template.name} template`}
                    className="object-cover w-full h-full"
                    style={{ background: '#f8fafc' }}
                  />
                </div>
                <span className="block text-center mt-2 font-medium">
                  {template.name}
                </span>
              </label>
            ))}
          </div>
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

        {/* Items Section */}
        <div className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center">
              <span className="mr-2">🛒</span>
              Items
            </h3>
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
                {/* Dynamic fields */}
                <div className="flex-1 grid grid-cols-3 gap-4">
                  {TEMPLATE_CONFIGS[invoice.template].itemFields.map((field) => {
                    if (field.type === 'calculated') return null;
                    
                    return (
                      <div key={field.key} className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">
                          {field.label}
                          {field.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type={field.type === 'number' ? 'number' : 'text'}
                          value={item[field.key] || ''}
                          onChange={(e) => updateItem(item.id, field.key, 
                            field.type === 'number' ? parseFloat(e.target.value) : e.target.value
                          )}
                          className="w-full rounded-md border-gray-300 shadow-sm 
                                    focus:border-blue-500 focus:ring-blue-500 
                                    text-sm px-3 py-2"
                          min={field.validation?.min}
                          max={field.validation?.max}
                          step={field.validation?.step || (field.type === 'number' ? 0.01 : undefined)}
                          required={field.required}
                        />
                        {errors[`${item.id}-${field.key}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`${item.id}-${field.key}`]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Amount display */}
                <div className="w-32 space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Amount</label>
                  <div className="w-full rounded-md bg-gray-100 px-3 py-2 text-right 
                                text-sm font-medium text-gray-700">
                    ${item.amount.toFixed(2)}
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-7 p-2 text-gray-400 hover:text-red-500 self-start"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

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