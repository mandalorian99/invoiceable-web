/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import InvoiceItemFields from './InvoiceItemFields';
import { Invoice } from '../types/invoice';
import { InvoiceTemplateConfig } from '../types/invoice';

interface Props {
  invoice: Invoice;
  templateConfig: InvoiceTemplateConfig;
  onUpdateItem: (id: string, field: string, value: any) => void;
  onRemoveItem: (id: string) => void;
  onAddItem: () => void;
}

export default function InvoiceItems({ 
  invoice, 
  templateConfig,
  onUpdateItem,
  onRemoveItem,
  onAddItem
}: Props) {
  return (
    <div className="pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <span className="mr-2">🛒</span>
          Items
        </h3>
        <button
          onClick={onAddItem}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add Item
        </button>
      </div>
      <div className="space-y-4">
        {invoice.items.map((item) => (
          <InvoiceItemFields
            key={item.id}
            item={item}
            templateConfig={templateConfig}
            onUpdate={onUpdateItem}
            onRemove={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
} 