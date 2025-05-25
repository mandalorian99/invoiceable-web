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
import { freelancerConfig } from './freelancerConfig';
import { girnarConfig } from './girnarConfig';

/**
 * Invoice Template Configuration Registry
 * 
 * Aggregates all template configurations for the invoice builder. Provides:
 * - Template metadata and display properties
 * - Field definitions for invoice line items
 * - Tax calculation configurations
 * - Validation rules and business logic
 * 
 * Template Key | Primary Use Case | Special Features
 * -------------------------------------------------
 * modern       | General business | Dynamic tax calculations
 * minimal      | Quick invoices   | Simplified layout
 * professional | Corporate        | Legal field support
 * legion       | Contract work    | 15-day billing cycles
 * freelancer   | Consulting       | Flexible time tracking
 * girnar       | GST compliance   | HSN/SAC code support
 * 
 * Configuration Structure:
 * - itemFields: Defines data structure for line items
 *   - Supported types: text/number/calculated
 *   - Validation rules per field
 * - taxes: Tax handling configuration
 *   - Enabled/disabled state
 *   - Calculation methodology
 *   - Available tax types
 * - validationRules: Custom business logic constraints
 * - meta: Presentation preferences
 * 
 * Usage Notes:
 * 1. New templates require:
 *    - Configuration file in src/config
 *    - Import statement in this registry
 *    - Entry in TEMPLATE_CONFIGS object
 * 2. Template IDs must be unique
 * 3. Maintain interface compatibility
 */



export const TEMPLATE_CONFIGS: Record<string, InvoiceTemplateConfig> = {
  modern: modernConfig,
  minimal: minimalConfig,
  professional: professionalConfig,
  legion: legionConfig,
  freelancer: freelancerConfig,
  girnar: girnarConfig,
  // add new templates here
}; 