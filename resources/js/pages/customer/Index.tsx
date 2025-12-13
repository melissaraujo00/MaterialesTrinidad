// pages/customer/index.tsx
import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/tables/DataTable';
import { useDataTable } from '@/hooks/data/useDataTable';
import { Customer } from '@/types';

interface PageProps {
  customers: Customer[];
}

export default function CustomerIndex() {
  const { customers } = usePage<PageProps>().props;

  // Hook para manejar la tabla con búsqueda, paginación y ordenamiento
  const {
    data,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    totalRecords
  } = useDataTable({
    data: customers,
    initialPageSize: 10,
    searchableFields: ['name', 'email', 'phoneNumber', 'nit']
  });

  // Función para eliminar cliente
  const handleDelete = (customer: Customer) => {
    if (window.confirm(`¿Está seguro de eliminar a ${customer.name}?`)) {
      router.delete(`/customers/${customer.id}`, {
        onSuccess: () => {
          toast.success('Cliente eliminado exitosamente');
        },
        onError: () => {
          toast.error('Error al eliminar el cliente');
        }
      });
    }
  };

  // Definir columnas de la tabla
  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
      width: '25%'
    },
    {
      key: 'email',
      label: 'Correo',
      width: '25%',
      render: (value: string) => value || '-'
    },
    {
      key: 'phoneNumber',
      label: 'Teléfono',
      width: '15%'
    },
    {
      key: 'nit',
      label: 'NIT',
      width: '20%',
      render: (value: string) => value || '-'
    },
    {
      key: 'status',
      label: 'Estado',
      width: '15%',
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'activo'
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}
        >
          {value === 'activo' ? 'Activo' : 'Inactivo'}
        </span>
      )
    }
  ];

  return (
    <AppLayout>
      <Head title="Clientes" />
      <Toaster position="top-right" richColors />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Clientes
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestiona todos tus clientes en un solo lugar
            </p>
          </div>

          <Link
            href="/customers/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Cliente
          </Link>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre, correo, teléfono o NIT..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Limpiar
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {totalRecords === customers.length ? (
                `Mostrando ${totalRecords} ${totalRecords === 1 ? 'cliente' : 'clientes'}`
              ) : (
                `Mostrando ${totalRecords} de ${customers.length} clientes`
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {data.length > 0 ? (
              <DataTable
                data={data}
                columns={columns}
                keyExtractor={(row) => row.id}
                onEdit={(row) => router.visit(`/customers/${row.id}/edit`)}
                onDelete={handleDelete}
              />
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay clientes'}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Comienza creando un nuevo cliente'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link
                      href="/customers/create"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Crear Cliente
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Página <span className="font-medium">{currentPage}</span> de{' '}
                  <span className="font-medium">{totalPages}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  >
                    Anterior
                  </button>

                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
