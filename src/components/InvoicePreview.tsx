/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import FreelancerTemplate from '../templates/FreelancerTemplate';
import { forwardRef } from 'react';
import LegionTemplate from '../templates/LegionTemplate';

interface Props {
  invoice: Invoice;
}

const InvoicePreview = forwardRef<HTMLDivElement, Props>(({ invoice }, ref) => {
  const templates = {
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
    freelancer: FreelancerTemplate,
    legion: LegionTemplate
  };

  const TemplateComponent = templates[invoice.template];

  return (
    <div ref={ref} className="invoice-preview bg-white">
      <div className="p-6">
        <TemplateComponent 
          invoice={{
            ...invoice,
            taxes: invoice.taxes?.filter(t => t.enabled) || []
          }} 
        />
      </div>
    </div>
  );
});

export default InvoicePreview;