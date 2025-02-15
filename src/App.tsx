import { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import { defaultInvoice } from './types/invoice';
import { saveInvoice } from './services/api';
import { Save } from 'lucide-react';

function App() {
  const [invoice, setInvoice] = useState(defaultInvoice);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);

    const result = await saveInvoice(invoice);
    
    setSaving(false);
    setMessage({
      text: result.message,
      type: result.success ? 'success' : 'error'
    });

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-[1800px] mx-auto">
        <header className="py-4 px-4 sm:px-6 lg:px-8 border-b bg-white">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Invoice Builder</h1>
            <div className="flex items-center gap-4">
              {message && (
                <p className={`text-sm ${
                  message.type === 'success' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message.text}
                </p>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  saving ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Invoice'}
              </button>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-80px)]">
          {/* Preview Panel - Left Side */}
          <div className="bg-gray-50 p-4 lg:p-8 overflow-auto">
            <div className="sticky top-0">
              <InvoicePreview invoice={invoice} />
            </div>
          </div>

          {/* Form Panel - Right Side */}
          <div className="bg-white p-4 lg:p-8 overflow-auto">
            <InvoiceForm invoice={invoice} onInvoiceChange={setInvoice} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;