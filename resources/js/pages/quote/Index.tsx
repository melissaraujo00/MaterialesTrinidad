// pages/quote/index.tsx
import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/tables/DataTable';
import { useDataTable } from '@/hooks/data/useDataTable';
import { Quote } from '@/types/entities/quote';
import { QUOTE_STATUS_COLORS } from '@/schemas/quoteSchema';

interface PageProps {
  quotes: Quote[];
}

export default function QuoteIndex() {
  const { quotes } = usePage<PageProps>().props;

  const {
    data,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    totalRecords
  } = useDataTable({
    data: quotes,
    initialPageSize: 10,
    searchableFields: ['customer_name', 'status']
  });

  const handleDelete = (quote: Quote) => {
    if (window.confirm(`¿Está seguro de eliminar la cotización #${quote.id}?`)) {
      router.delete(`/quotes/${quote.id}`, {
        onSuccess: () => {
          toast.success('Cotización eliminada exitosamente');
        },
        onError: () => {
          toast.error('Error al eliminar la cotización');
        }
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-SV', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const columns = [
    {
      key: 'id',
      label: '#',
      width: '5%',
      render: (value: number) => `#${value}`
    },
    {
      key: 'customer_name',
      label: 'Cliente',
      width: '25%',
      render: (value: string) => value || 'Sin cliente'
    },
    {
      key: 'date',
      label: 'Fecha',
      width: '15%',
      render: (value: string) => formatDate(value)
    },
    {
      key: 'items',
      label: 'Items',
      width: '10%',
      render: (value: any[]) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {value?.length || 0} producto(s)
        </span>
      )
    },
    {
      key: 'total',
      label: 'Total',
      width: '15%',
      render: (value: number) => (
        <span className="font-semibold">{formatPrice(value)}</span>
      )
    },
    {
      key: 'status',
      label: 'Estado',
      width: '15%',
      render: (value: string) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            QUOTE_STATUS_COLORS[value as keyof typeof QUOTE_STATUS_COLORS]
          }`}
        >
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    }
  ];

  return (
    <AppLayout>
      <Head title="Cotizaciones" />
      <Toaster position="top-right" richColors />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cotizaciones
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestiona todas las cotizaciones de tus clientes
            </p>
          </div>

          <Link
            href="/quotes/create"
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
            Nueva Cotización
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Total',
              count: quotes.length,
              color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            },
            {
              label: 'Pendientes',
              count: quotes.filter(q => q.status === 'pendiente').length,
              color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            },
            {
              label: 'Aprobadas',
              count: quotes.filter(q => q.status === 'aprobada').length,
              color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            },
            {
              label: 'Rechazadas',
              count: quotes.filter(q => q.status === 'rechazada').length,
              color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              <p className={`text-2xl font-bold mt-1 ${stat.color}`}>
                {stat.count}
              </p>
            </div>
          ))}
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
                  placeholder="Buscar por cliente o estado..."
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

            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {totalRecords === quotes.length ? (
                `Mostrando ${totalRecords} ${totalRecords === 1 ? 'cotización' : 'cotizaciones'}`
              ) : (
                `Mostrando ${totalRecords} de ${quotes.length} cotizaciones`
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
                onEdit={(row) => router.visit(`/quotes/${row.id}/edit`)}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay cotizaciones'}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Comienza creando una nueva cotización'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link
                      href="/quotes/create"
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
                      Crear Cotización
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
