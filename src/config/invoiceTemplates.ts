import { InvoiceTemplateConfig } from '../types/invoice';
import { modernConfig } from './modernConfig';
import { minimalConfig } from './minimalConfig';
import { professionalConfig } from './professionalConfig';
export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig
}; 