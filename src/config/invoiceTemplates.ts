/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { InvoiceTemplateConfig } from '../types/invoice';
import { modernConfig } from './modernConfig';
import { minimalConfig } from './minimalConfig';
import { professionalConfig } from './professionalConfig';
import { legionConfig } from './legionConfig';

export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  legion: legionConfig
}; 