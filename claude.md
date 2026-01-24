# Invoiceable - Open Source Invoice Builder

## Project Overview

Invoiceable is a modern, open-source invoice builder application built with React, TypeScript, and Vite. It provides a professional, user-friendly interface for creating, customizing, and exporting invoices with multiple templates and flexible configurations.

**Tech Stack:**
- React 18.3.1
- TypeScript 5.5.3
- Vite 5.4.2
- TailwindCSS 3.4.1
- React PDF Renderer
- html2pdf.js / jspdf

**License:** Dual-licensed under AGPL-3.0 (open source) and Commercial License for production use.

**Repository:** https://github.com/mandalorian99/invoiceable-web

---

## Key Modules and Features

### 1. Core Components (`src/components/`)

- **InvoiceForm.tsx** - Main form component for invoice data entry with dynamic field management
- **InvoicePreview.tsx** - Real-time preview of invoice based on selected template
- **InvoiceItemFields.tsx** - Configurable line item fields (quantity, price, description, etc.)
- **TemplateSelector.tsx** - Template picker interface
- **CurrencySelector.tsx** - Multi-currency support
- **ExportPDFButton.tsx** - PDF export functionality with multiple rendering options

### 2. Invoice Templates (`src/templates/`)

Six professional invoice templates with both React and HTML versions:
- **Modern Template** - Clean, contemporary design
- **Minimal Template** - Simple, minimalist layout
- **Professional Template** - Formal business style
- **Freelancer Template** - Casual, creative design
- **Legion Template** - Bold, structured layout
- **Girnar Template** - Enterprise-grade template

Each template includes:
- React component (`.tsx`) for live preview
- HTML template (`.html`) for PDF generation
- Template-specific styling and branding

### 3. Configuration System (`src/config/`)

Modular configuration files for each template:
- **invoiceTemplates.ts** - Template registry and metadata
- **modernConfig.ts**, **minimalConfig.ts**, **professionalConfig.ts**, etc. - Template-specific configurations
- **taxConfig.ts** - Tax calculation and configuration (GST, VAT, sales tax)
- **visualTemplates.ts** - Preview images and visual assets

Each config defines:
- Item field configurations (description, quantity, rate, hours, etc.)
- Validation rules
- Tax calculation methods
- Default notes and metadata
- Industry categorization

### 4. Type System (`src/types/`)

- **invoice.ts** - Comprehensive TypeScript interfaces:
  - `Invoice` - Core invoice data structure
  - `InvoiceItem` - Line item with dynamic fields
  - `InvoiceTemplateConfig` - Template configuration schema
  - `TaxConfig` & `TaxType` - Tax management types
  - `ItemFieldConfig` - Dynamic field configuration

### 5. Services (`src/services/`)

- **api.ts** - API integration layer for saving/loading invoices
- **pdfGenerator.ts** - PDF export logic using html2pdf.js, jspdf, and puppeteer

### 6. Core Features

#### Dynamic Invoice Types
- **Hourly billing** - Time-based invoicing with hours tracking
- **Fixed term** - Project-based invoicing with deliverables

#### Flexible Tax System
- Multiple tax types (GST, CGST/SGST, IGST, VAT, sales tax)
- Configurable tax rates
- Automatic tax calculations
- Tax-inclusive and tax-exclusive modes

#### Multi-Currency Support
- USD, EUR, GBP, INR, and more
- Automatic currency symbol formatting

#### Bank Details Integration
- Account name, number, IFSC code
- Payment mode specifications
- Signatory fields

#### Export Options
- PDF generation with high-quality rendering
- Multiple export formats
- Preview before export

#### Real-Time Preview
- Split-screen interface
- Live preview updates as you type
- Template switching with instant preview

---

## Project Structure

```
invoiceable-web/
├── src/
│   ├── components/       # React UI components
│   ├── templates/        # Invoice template implementations
│   ├── config/          # Template and tax configurations
│   ├── types/           # TypeScript type definitions
│   ├── services/        # API and utility services
│   ├── utils/           # Helper functions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── dist/                # Production build output
└── package.json         # Dependencies and scripts

**IMPORTANT: node_modules/ is excluded from all context and analysis.**
```

---

## Development Workflow

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn deploy` - Deploy to GitHub Pages

### Key Development Notes

1. **Template Development**: To add a new template:
   - Create React component in `src/templates/`
   - Create HTML template for PDF export
   - Add configuration in `src/config/`
   - Register in `src/config/invoiceTemplates.ts`

2. **Field Customization**: Invoice item fields are fully configurable via template configs:
   - Supports text, number, date, and calculated fields
   - Custom validation rules
   - Dynamic field rendering

3. **Tax Configuration**: Tax system is highly flexible:
   - Template-specific tax rules
   - Multiple tax types per invoice
   - Automatic subtotal and total calculations

4. **PDF Export**: Multi-stage export pipeline:
   - React component renders preview
   - HTML template populated with Mustache
   - html2pdf.js/jspdf generates final PDF

---

## API Integration

Currently implements:
- `saveInvoice()` - Save invoice data (local storage implementation)
- Extensible for backend integration

---

## Deployment

Configured for GitHub Pages deployment:
- Build generates static assets in `dist/`
- Automatic deployment via `gh-pages` branch
- Custom domain support via `vite.config.ts`

---

## Context Exclusions

**Always exclude from context:**
- `node_modules/` - Third-party dependencies (never include in analysis)
- `dist/` - Build artifacts
- `.git/` - Version control data
- `.vite/` - Build cache

---

## Industry Use Cases

Templates categorized by industry:
- **General Business** - Modern, Professional
- **IT/Tech** - Legion, Girnar
- **Freelance/Creative** - Freelancer, Minimal
- **All-purpose** - Templates work across industries

---

## Recent Changes (Git History)

Latest commits focus on:
- Template 006 integration and configuration
- Export functionality improvements
- Invoice form enhancements for template-specific fields
