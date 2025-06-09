import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Customer {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  nit: string;
  district_id: number;
  address: string;
  description: string;
  status: string;
}


interface Props {
  isOpen: boolean;
  closeModal: () => void;
  onSelectCustomer?: (customer: Customer) => void;
}

export default function CustomersList({ isOpen, closeModal, onSelectCustomer }: Props) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/customers/getCustomerData")
        .then((res) => res.json())
        .then((data) => setCustomers(data.data || []))
        .finally(() => setLoading(false));
    }
  }, [isOpen]);

  const handleSelect = (customer: Customer) => {
    onSelectCustomer?.(customer);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-300 dark:border-gray-600">
          <h2 className="text-xl font-bold">Seleccionar Cliente</h2>
          <button onClick={closeModal}>
            <X className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <p className="text-center text-gray-500">Cargando clientes...</p>
          ) : (
            <table className="w-full table-auto text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="p-2">Cliente</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Teléfono</th>
                  <th className="p-2">Distrito</th>
                  <th className="p-2">Acción</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-800">
                    <td className="p-2">{c.name}</td>
                    <td className="p-2">{c.email}</td>
                    <td className="p-2">{c.phoneNumber}</td>
                    <td className="p-2">{c.district}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleSelect(c)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                      >
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-600">
          <button
            onClick={closeModal}
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
