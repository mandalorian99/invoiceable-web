/**
 * @license
 * Invoiceable - Open Source Invoice Builder
 * Copyright (C) 2024 Mahendra Choudhary
 * AGPL-3.0 License with commercial terms
 * https://github.com/mandalorian99/invoiceable-web
 */
import { Invoice } from '../types/invoice';

export default function GirnarTemplate({ invoice }: { invoice: Invoice }) {
  // Calculate totals
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.amount || 0), 0);
  const taxAmount = invoice.taxes?.reduce((sum, tax) => sum + (tax.enabled ? tax.amount : 0), 0) || 0;
  const total = subtotal + taxAmount;

  return (
    <div className="p-10 bg-white" style={{ fontFamily: 'Arial, sans-serif' }}>
      <h1 className="text-center text-2xl font-bold mb-8">TAX INVOICE</h1>

      {/* Vendor Details */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Vendor Details</h2>
        <p><span className="font-semibold">Vendor Name:</span> {invoice.from.name}</p>
        <p><span className="font-semibold">Vendor Address:</span> {invoice.from.address}</p>
        <p><span className="font-semibold">GSTIN:</span> {invoice.from.gstin}</p>
        <p><span className="font-semibold">Invoice No:</span> {invoice.invoiceNumber}</p>
        <p><span className="font-semibold">Invoice Date:</span> {invoice.date}</p>
      </div>

      {/* Bill To */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Bill To</h2>
        <p><span className="font-semibold">Company Name:</span> {invoice.to.name}</p>
        <p><span className="font-semibold">Address:</span> {invoice.to.address}</p>
        <p><span className="font-semibold">GSTIN:</span> {invoice.to.gstin}</p>
      </div>

      {/* Services Table */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Details of Services Provided</h2>
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">Sl.</th>
              <th className="border border-black p-2">Description</th>
              <th className="border border-black p-2">HSN/SAC</th>
              <th className="border border-black p-2">Resource</th>
              <th className="border border-black p-2">Days</th>
              <th className="border border-black p-2">Month</th>
              <th className="border border-black p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-black p-2">{index + 1}</td>
                <td className="border border-black p-2">{item.description}</td>
                <td className="border border-black p-2">{item.hsnSac}</td>
                <td className="border border-black p-2">{item.resourceName}</td>
                <td className="border border-black p-2">{item.quantity}</td>
                <td className="border border-black p-2">{item.period}</td>
                <td className="border border-black p-2">₹{item.amount?.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tax Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Tax Summary</h2>
        <table className="w-full border-collapse border border-black">
          <thead>
            <tr>
              <th className="border border-black p-2">Tax Type</th>
              <th className="border border-black p-2">Rate</th>
              <th className="border border-black p-2">Taxable Value</th>
              <th className="border border-black p-2">Tax Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.taxes?.map((tax) => (
              tax.enabled && (
                <tr key={tax.id}>
                  <td className="border border-black p-2">{tax.name}</td>
                  <td className="border border-black p-2">{tax.rate}%</td>
                  <td className="border border-black p-2">₹{subtotal.toLocaleString('en-IN')}</td>
                  <td className="border border-black p-2">₹{tax.amount.toLocaleString('en-IN')}</td>
                </tr>
              )
            ))}
            <tr>
              <td colSpan={3} className="border border-black p-2 text-right font-semibold">
                Total Tax Amount
              </td>
              <td className="border border-black p-2 font-semibold">
                ₹{taxAmount.toLocaleString('en-IN')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Total Section */}
      <div className="mb-6">
        <p className="font-semibold">
          Total Invoice Value (INR): ₹{total.toLocaleString('en-IN')}
        </p>
        <p className="font-semibold">Amount in Words:</p>
        <p>{invoice.amountInWords}</p>
      </div>

      {/* Declaration */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Declaration</h2>
        <p>We declare that this invoice reflects the actual price of the services rendered and that all particulars stated herein are true and correct.</p>
        <p className="mt-2">Mode of Payment: {invoice.paymentMode || 'NEFT / RTGS / Cheque / UPI'}</p>
      </div>

      {/* Bank Details */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-2">Bank Details</h2>
        <p><span className="font-semibold">Account Holder:</span> {invoice.bankDetails?.accountName}</p>
        <p><span className="font-semibold">Account Number:</span> {invoice.bankDetails?.accountNumber}</p>
        <p><span className="font-semibold">IFSC Code:</span> {invoice.bankDetails?.ifscCode}</p>
      </div>

      {/* Signature */}
      <div className="mt-8">
        <p className="font-semibold">Authorized Signatory: {invoice.signatory}</p>
      </div>
    </div>
  );
} 