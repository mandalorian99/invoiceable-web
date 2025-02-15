import { modernConfig } from '../modernConfig';
import { minimalConfig } from '../minimalConfig';
import { InvoiceTemplateConfig } from '../../types/invoice';
import { professionalConfig } from '../professionalConfig';
import { freelancerConfig } from '../freelancerConfig';
// Import other template configs here

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  freelancer: freelancerConfig,
  // Add other templates
}; 