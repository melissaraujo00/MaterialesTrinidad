import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { router } from '@inertiajs/react';

interface Customer {
  name: string;
}

interface Sale {
  id: number;
  date: string;
  customer: Customer;
  total: number;
  subtotal: number;
}

interface AuthUser {
  id: number;
  name: string;
  permissions: string[];
}

interface Props {
  sales: Sale[];
  auth: {
    user: AuthUser;
  };
}

export default function SalesIndex({ sales, auth }: Props) {
  const [filterText, setFilterText] = useState('');
  const [filteredSales, setFilteredSales] = useState<Sale[]>(sales);

  useEffect(() => {
    const filtered = sales.filter(sale =>
      sale.customer?.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      String(sale.id).includes(filterText)
    );
    setFilteredSales(filtered);
  }, [filterText, sales]);

  const columns: TableColumn<Sale>[] = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Cliente',
      selector: row => row.customer?.name ?? 'Sin cliente',
      sortable: true,
    },
    {
      name: 'Fecha',
      selector: row => new Date(row.date).toLocaleDateString(),
      sortable: true,
    },
    {
      name: 'Subtotal ($)',
      selector: row => row.subtotal.toFixed(2),
      sortable: true,
      right: true,
    },
    {
      name: 'Total ($)',
      selector: row => row.total.toFixed(2),
      sortable: true,
      right: true,
    },
    {
      name: 'Acciones',
      cell: row => (
        <button
          onClick={() => router.visit(`/sales/${row.id}`)}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
        >
          Ver
        </button>
      ),
    }
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Ventas de {auth.user.name}</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por cliente o ID..."
          className="w-full md:w-1/3 px-4 py-2 border rounded"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredSales}
        pagination
        highlightOnHover
        striped
        responsive
        persistTableHead
        noDataComponent="No se encontraron ventas."
      />
    </div>
  );
}
