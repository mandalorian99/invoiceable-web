import { Trash2 } from 'lucide-react';
import { InvoiceItem } from '../types/invoice';
import { InvoiceTemplateConfig } from '../types/invoice';

interface Props {
  item: InvoiceItem;
  templateConfig: InvoiceTemplateConfig;
  onUpdate: (id: string, field: string, value: any) => void;
  onRemove: (id: string) => void;
}

export default function InvoiceItemFields({ item, templateConfig, onUpdate, onRemove }: Props) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1 grid grid-cols-3 gap-4">
        {templateConfig.itemFields.map((field) => {
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
                onChange={(e) => onUpdate(item.id, field.key, 
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
            </div>
          );
        })}
      </div>

      <div className="w-32 space-y-1">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="w-full rounded-md bg-gray-100 px-3 py-2 text-right 
                      text-sm font-medium text-gray-700">
          ${item.amount.toFixed(2)}
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        className="mt-7 p-2 text-gray-400 hover:text-red-500 self-start"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
} 