import { Invoice } from '../types/invoice';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';

interface Props {
  invoice: Invoice;
}

export default function InvoicePreview({ invoice }: Props) {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate
  };

  const TemplateComponent = templates[invoice.template];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <TemplateComponent invoice={invoice} />
      </div>
    </div>
  );
}