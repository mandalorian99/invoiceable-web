import { InvoiceTemplateConfig } from '../types/invoice';

interface Props {
  selectedTemplate: string;
  templates: InvoiceTemplateConfig[];
  onSelect: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, templates, onSelect }: Props) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Choose Template</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((template) => (
          <label
            key={template.id}
            className={`relative cursor-pointer rounded-lg p-2 transition-all ${
              selectedTemplate === template.id
                ? 'ring-2 ring-blue-200 bg-blue-50'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <input
              type="radio"
              name="template"
              value={template.id}
              checked={selectedTemplate === template.id}
              onChange={(e) => onSelect(e.target.value)}
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
  );
} 