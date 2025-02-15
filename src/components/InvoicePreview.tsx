import { Invoice } from '../types/invoice';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import FreelancerTemplate from '../templates/FreelancerTemplate';
import { forwardRef } from 'react';

interface Props {
  invoice: Invoice;
}

const InvoicePreview = forwardRef<HTMLDivElement, Props>(({ invoice }, ref) => {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
    freelancer: FreelancerTemplate
  };

  const TemplateComponent = templates[invoice.template];

  return (
    <div ref={ref} className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <TemplateComponent invoice={invoice} />
      </div>
    </div>
  );
});

export default InvoicePreview;