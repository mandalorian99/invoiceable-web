/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { modernConfig } from '../modernConfig';
import { minimalConfig } from '../minimalConfig';
import { InvoiceTemplateConfig } from '../../types/invoice';
import { professionalConfig } from '../professionalConfig';
import { freelancerConfig } from '../freelancerConfig';
import { legionConfig } from '../legionConfig';
// Import other template configs here

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  freelancer: freelancerConfig,
  legion: legionConfig,
  // Add other templates
}; 