import React from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'sonner';
import { router } from '@inertiajs/react';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Quote {
  id: number;
  total: number | string;
  date: string;
  customer?: { name: string };
  products?: Product[];
}

interface SaleFromQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote: Quote | null;
  quoteDetails: Product[];
  onSaleCreated: () => void;
}

export default function SaleFromQuoteModal({
  isOpen,
  onClose,
  quote,
  quoteDetails,
  onSaleCreated,
}: SaleFromQuoteModalProps) {
  const handleCreateSale = async () => {
    if (!quote) {
      toast.error('No se ha proporcionado una cotización válida.');
      return;
    }

    // Solo enviar los datos que el backend espera
    const postData = {
      quote_id: quote.id,
      products: quoteDetails.map((p) => ({
        id: p.id,
        quantity: p.quantity,
        price: p.price
      })),
    };

    router.post('/sales/fromQuote', postData, {
        onSuccess: () => {
    toast.success('Venta creada exitosamente');
    onSaleCreated();
    onClose();
    },

      onError: (errors: any) => {
        console.error('Error al crear la venta:', errors);

        // Mostrar errores específicos o genéricos
        if (Object.keys(errors).length > 0) {
          Object.values(errors).forEach((msg) => toast.error(msg as string));
        } else {
          toast.error('Error al crear la venta. Verifica el stock o intenta nuevamente.');
        }
      },
      onFinish: () => {
        // Puedes agregar lógica aquí si es necesario
      },
      preserveScroll: true
    });
  };

  if (!quote) return null;

  const formattedTotal = Number(quote.total ?? 0).toFixed(2);
  const formattedDate = quote.date ? new Date(quote.date).toLocaleDateString() : 'Sin fecha';

  const calculatedProductsTotal = quoteDetails.reduce((sum, product) => {
    return sum + Number(product.price) * Number(product.quantity);
  }, 0);
  const formattedProductsTotal = calculatedProductsTotal.toFixed(2);

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white p-6 rounded shadow-lg dark:bg-gray-800 dark:text-white">
          <Dialog.Title className="text-lg font-bold mb-4">Confirmar venta</Dialog.Title>

          <div className="space-y-2">
            <p><strong>Cliente:</strong> {quote.customer?.name ?? 'Sin cliente'}</p>
            <p><strong>Total de la Cotización:</strong> ${formattedTotal}</p>
            <p><strong>Fecha:</strong> {formattedDate}</p>
          </div>

          <div className="mt-4">
            <h2 className="text-md font-semibold mb-2">Productos</h2>
            {quoteDetails && quoteDetails.length > 0 ? (
              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-3 py-2 text-left">Producto</th>
                    <th className="px-3 py-2 text-left">Cantidad</th>
                    <th className="px-3 py-2 text-left">Precio Unitario ($)</th>
                    <th className="px-3 py-2 text-left">Subtotal ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {quoteDetails.map((product, idx) => (
                    <tr key={idx} className="border-t">
                      <td className="px-3 py-2">{product.name}</td>
                      <td className="px-3 py-2">{product.quantity}</td>
                      <td className="px-3 py-2">{product.price.toFixed(2)}</td>
                      <td className="px-3 py-2">
                        {(Number(product.price) * Number(product.quantity)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 dark:bg-gray-700 font-bold">
                    <td colSpan={3} className="px-3 py-2 text-right">Total Productos:</td>
                    <td className="px-3 py-2">${formattedProductsTotal}</td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="text-sm text-gray-500">No hay productos en esta cotización.</p>
            )}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handleCreateSale}
            >
              Confirmar venta
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
