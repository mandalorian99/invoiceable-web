export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  from: {
    name: string;
    email: string;
    address: string;
  };
  to: {
    name: string;
    email: string;
    address: string;
  };
  items: InvoiceItem[];
  notes: string;
  template: 'modern' | 'minimal' | 'professional';
}

export const defaultInvoice: Invoice = {
  id: '1',
  invoiceNumber: 'INV-001',
  date: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  from: {
    name: 'Your Company',
    email: 'your@email.com',
    address: 'Your Address'
  },
  to: {
    name: 'Client Name',
    email: 'client@email.com',
    address: 'Client Address'
  },
  items: [],
  notes: '',
  template: 'modern'
};