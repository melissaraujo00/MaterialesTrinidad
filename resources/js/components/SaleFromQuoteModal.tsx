import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface Props {
  quoteId: number;
  onClose: () => void;
}

export default function SaleFromQuoteModal({ quoteId, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCreateSale = async () => {
    setLoading(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';

      const response = await fetch(`/sales/from-quote/${quoteId}`, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Venta creada correctamente');
        onClose();
        router.visit(`/sales/${data.sale_id}`);
      } else {
        toast.error(data.message || 'Error al crear la venta');
      }
    } catch (error) {
      toast.error('Error en la conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full">
        <h2 className="text-xl font-semibold mb-4">Confirmar Venta</h2>
        <p className="mb-6">¿Deseas generar la venta a partir de esta cotización?</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreateSale}
            disabled={loading}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            {loading ? 'Procesando...' : 'Confirmar'}
          </button>
        </div>
      </div>
    </div>
  );
}
