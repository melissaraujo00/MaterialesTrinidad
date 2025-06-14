import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import axios from 'axios';

type Sale = {
  id: number;
  date: string;
  total: number;
  customer?: { id: number; name: string } | null;
  user: { id: number; name: string };
};

const SaleIndex: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('/api/sales'); // Asegúrate de tener esta ruta en el backend
        setSales(res.data.data);
      } catch (error) {
        console.error('Error al cargar las ventas', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const columns: TableColumn<Sale>[] = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '80px',
    },
    {
      name: 'Fecha',
      selector: (row) => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Cliente',
      selector: (row) => row.customer?.name || 'Venta directa',
      sortable: true,
    },
    {
      name: 'Vendedor',
      selector: (row) => row.user.name,
    },
    {
      name: 'Total',
      selector: (row) => `$${row.total.toFixed(2)}`,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <a href={`/sales/${row.id}`} className="text-blue-600 hover:underline">
          Ver
        </a>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Listado de Ventas</h2>

      <DataTable
        columns={columns}
        data={sales}
        progressPending={loading}
        pagination
        highlightOnHover
        responsive
        noDataComponent="No hay ventas registradas"
      />
    </div>
  );
};

export default SaleIndex;
