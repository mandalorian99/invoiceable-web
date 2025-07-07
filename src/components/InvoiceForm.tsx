/**AGPL-3.0 License
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
// import { Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem, InvoiceTax } from '../types/invoice';
import { TEMPLATE_CONFIGS } from '../config/templates';
import { useState, useEffect } from 'react';
import TemplateSelector from './TemplateSelector';
import InvoiceItems from './InvoiceItems';
import CurrencySelector from './CurrencySelector';

interface Props {
  invoice: Invoice;
  onInvoiceChange: (invoice: Invoice) => void;
}

export default function InvoiceForm({ invoice, onInvoiceChange }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize taxes from template if available
  useEffect(() => {
    const templateConfig = TEMPLATE_CONFIGS[invoice.template];
    // Always reset taxes when template changes
    const initialTaxes = templateConfig.taxes.config.availableTaxes.map(tax => ({
      id: tax.id,
      name: tax.name,
      rate: tax.defaultRate,
      isPercentage: tax.isPercentage,
      amount: 0,
      enabled: false
    })) || [];
    
  
    onInvoiceChange({
      ...invoice,
      currency: invoice.currency || '$', // Add default currency if not set
      taxes: initialTaxes,
      taxEnabled: templateConfig.taxes.enabled
    });
  }, [invoice.template]); // Trigger only on template change

  // Calculate tax amounts whenever items change
  useEffect(() => {
    if (invoice.taxes && invoice.taxEnabled) {
      // Calculate subtotal based on template type
      let subtotal = 0;
      
      // Different templates might use different item structures
      if (invoice.template === 'freelancer') {
        // Freelancer template uses rate and hours
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || (item.rate * item.hours) || 0), 0);
      } else if (invoice.template === 'legion') {
        // Legion template has a direct amount
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || 0), 0);
      } else {
        // Other templates use quantity and price
        subtotal = invoice.items.reduce((sum, item) => 
          sum + (item.amount || (item.quantity * item.price) || 0), 0);
      }
      
      const updatedTaxes = invoice.taxes.map(tax => ({
        ...tax,
        amount: tax.enabled ? (tax.isPercentage ? (subtotal * tax.rate / 100) : tax.rate) : 0
      }));
      
      onInvoiceChange({
        ...invoice,
        taxes: updatedTaxes
      });
    }
  }, [
    invoice.items, 
    invoice.template,
    invoice.taxes?.map(t => t.rate).join(','), 
    invoice.taxes?.map(t => t.enabled).join(',')
  ]);

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

  // Toggle tax display
  const toggleTax = (enabled: boolean) => {
    onInvoiceChange({
      ...invoice,
      taxEnabled: enabled
    });
  };

  // Update tax rate
  const updateTaxRate = (taxId: string, rate: number) => {
    if (!invoice.taxes) return;
    
    const updatedTaxes = invoice.taxes.map(tax => 
      tax.id === taxId ? { ...tax, rate } : tax
    );
    
    onInvoiceChange({
      ...invoice,
      taxes: updatedTaxes
    });
  };

  // Toggle individual tax
  const toggleTaxItem = (taxId: string, enabled: boolean) => {
    if (!invoice.taxes) return;
    
    const updatedTaxes = invoice.taxes.map(tax => 
      tax.id === taxId ? { ...tax, enabled } : tax
    );
    
    onInvoiceChange({
      ...invoice,
      taxes: updatedTaxes
    });
  };

  // Calculate subtotal
  let subtotal = 0;
  
  // Different templates might use different item structures
  if (invoice.template === 'freelancer') {
    // Freelancer template uses rate and hours
    subtotal = invoice.items.reduce((sum, item) => 
      sum + (item.amount || (item.rate * item.hours) || 0), 0);
  } else if (invoice.template === 'legion') {
    // Legion template has a direct amount
    subtotal = invoice.items.reduce((sum, item) => 
      sum + (item.amount || 0), 0);
  } else {
    // Other templates use quantity and price
    subtotal = invoice.items.reduce((sum, item) => 
      sum + (item.amount || (item.quantity * item.price) || 0), 0);
  }

  // Get current template config
  const currentTemplate = TEMPLATE_CONFIGS[invoice.template];
  const taxesEnabled = currentTemplate?.taxes?.enabled;

  const handleTemplateChange = (templateId: keyof typeof TEMPLATE_CONFIGS) => {
    const newConfig = TEMPLATE_CONFIGS[templateId];
    
    onInvoiceChange({
      ...invoice,
     template: templateId,
      from: invoice.from,
      to: invoice.to,
      taxes: newConfig.taxes.config.availableTaxes.map(tax => ({
        id: tax.id,
        name: tax.name,
        rate: tax.defaultRate,
        isPercentage: tax.isPercentage,
        amount: 0,
        enabled: tax.id === 'none' // Or your default logic
      })),
      taxEnabled: newConfig.taxes.enabled
    });
  };

  return (
    <div className="bg-white p-6 pb-20">
      <div className="space-y-6">
        <TemplateSelector
          selectedTemplate={invoice.template}
          templates={Object.values(TEMPLATE_CONFIGS)}
          onSelect={handleTemplateChange}
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
            <CurrencySelector
              value={invoice.currency}
              onChange={(currencyCode) => onInvoiceChange({ ...invoice, currency: currencyCode })}
              className="mt-4"
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

        {/* Service Period */}
        {invoice.template === 'legion' && (
          <div className="pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              Service Period
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="e.g. January 2024"
                value={invoice.servicePeriod || ''}
                onChange={(e) => onInvoiceChange({
                  ...invoice,
                  servicePeriod: e.target.value
                })}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        )}

        <InvoiceItems
          invoice={invoice}
          templateConfig={TEMPLATE_CONFIGS[invoice.template]}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onUpdateItem={updateItem}
        />

        {/* Tax Section */}
        {taxesEnabled && (
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center mr-4">
                <span className="mr-2">💲</span>
                Taxes
              </h3>
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={invoice.taxEnabled}
                    onChange={(e) => toggleTax(e.target.checked)}
                  />
                  <div className={`block w-14 h-8 rounded-full ${invoice.taxEnabled ? 'bg-blue-600' : 'bg-gray-400'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${invoice.taxEnabled ? 'transform translate-x-6' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  {invoice.taxEnabled ? 'Enabled' : 'Disabled'}
                </div>
              </label>
            </div>

            {invoice.taxEnabled && invoice.taxes && (
              <div className="space-y-4 mt-4">
                <div className="text-sm text-gray-500 mb-2">
                  Subtotal: {invoice.currency} {subtotal.toFixed(2)}
                </div>
                
                {invoice.taxes.map(tax => (
                  <div key={tax.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`tax-${tax.id}`}
                        checked={tax.enabled}
                        onChange={(e) => toggleTaxItem(tax.id, e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`tax-${tax.id}`} className="ml-2 block text-sm text-gray-700">{tax.name}</label>
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={tax.rate}
                          onChange={(e) => updateTaxRate(tax.id, parseFloat(e.target.value) || 0)}
                          disabled={!tax.enabled}
                          className="block w-24 rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-right"
                        />
                        <span className="ml-2">{tax.isPercentage ? '%' : '$'}</span>
                      </div>
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      {invoice.currency} {tax.enabled ? tax.amount.toFixed(2) : '0.00'}
                    </div>
                  </div>
                ))}
                
                <div className="text-right font-semibold">
                  Total: {invoice.currency} {(subtotal + invoice.taxes.reduce((sum, tax) => sum + (tax.enabled ? tax.amount : 0), 0)).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        )}

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