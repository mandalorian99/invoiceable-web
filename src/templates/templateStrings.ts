/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */

/**
 * Template String Registry
 * 
 * Central repository for HTML templates used by the invoice generator. Each template
 * is imported as a raw HTML string and made available to the Mustache template engine
 * via the pdfGenerator module.
 * 
 * Key Responsibilities:
 * - Import raw HTML templates from external files
 * - Export template strings with standardized naming convention
 * - Provide template availability for PDF generation workflow
 * 
 * Template Requirements:
 * 1. Must use Mustache-style placeholders ({{property}})
 * 2. Should reference properties from InvoiceTemplateData interface
 * 3. Must maintain HTML structure compatible with html2pdf
 * 
 * Usage in PDF Generation:
 * @see pdfGenerator.ts - Uses these template strings with Mustache.render()
 *                        to generate final HTML for PDF conversion
 * 
 * Adding New Templates:
 * 1. Create new .html file in templates directory
 * 2. Import as raw string: import newTemplateHtml from './new.html?raw';
 * 3. Export with naming convention: export const newTemplateString = newTemplateHtml;
 * 
 * Current Available Templates:
 * - modern: General business invoices
 * - minimal: Simplified layout for quick invoices
 * - professional: Corporate-style with legal sections
 * - freelancer: Time-based consulting format
 * - legion: 15-day billing cycle contracts
 * - girnar: GST-compliant Indian format
 */


import modernHtml from './modern.html?raw';
import minimalHtml from './minimal.html?raw';
import professionalHtml from './professional.html?raw';
import freelancerHtml from './freelancer.html?raw';
import legionHtml from './legion.html?raw';
import girnarHtml from './girnar.html?raw';

export const modernTemplateString = modernHtml;
export const minimalTemplateString = minimalHtml;
export const professionalTemplateString = professionalHtml;
export const freelancerTemplateString = freelancerHtml;
export const legionTemplateString = legionHtml;
export const girnarTemplateString = girnarHtml;