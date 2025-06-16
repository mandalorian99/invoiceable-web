/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

/**
 * Invoice Template Registry
 * 
 * Central configuration hub for invoice templates. This file:
 * - Aggregates all template configurations
 * - Serves as the single source of truth for available templates
 * - Enables template discovery across the application
 * 
 * Template Structure Requirements:
 * - Must implement InvoiceTemplateConfig interface
 * - Require unique template ID (lowercase, no spaces)
 * - Need corresponding HTML template in templates directory
 * - Should include preview image URL
 * 
 * Adding New Templates:
 * 1. Create config file in src/config/[templateName]Config.ts
 * 2. Import configuration in this file
 * 3. Add entry to TEMPLATE_CONFIGS object below
 * 
 * Example:
 * import { newTemplateConfig } from '../newTemplateConfig';
 * TEMPLATE_CONFIGS: { ..., newTemplate: newTemplateConfig }
 * 
 * Required Checks:
 * - Template ID must be unique
 * - All required interface fields implemented
 * - Corresponding HTML template exists
 * - Preview image accessible via URL
 * 
 * Configuration Validation:
 * - itemFields must have at least description and amount
 * - Tax calculations must handle percentage/flat rates
 * - Validation rules should cover common edge cases
 */

import { modernConfig } from '../modernConfig';
import { minimalConfig } from '../minimalConfig';
import { InvoiceTemplateConfig } from '../../types/invoice';
import { professionalConfig } from '../professionalConfig';
import { freelancerConfig } from '../freelancerConfig';
import { legionConfig } from '../legionConfig';
import { girnarConfig } from '../girnarConfig';
// Import other template configs here

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  freelancer: freelancerConfig,
  legion: legionConfig,
  girnar: girnarConfig,
  // Add other templates
}; 