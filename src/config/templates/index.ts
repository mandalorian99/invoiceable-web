import { modernConfig } from '../modernConfig';
import { minimalConfig } from '../minimalConfig';
import { InvoiceTemplateConfig } from '../../types/invoice';
import { professionalConfig } from '../professionalConfig';
// Import other template configs here

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  // Add other templates
}; 