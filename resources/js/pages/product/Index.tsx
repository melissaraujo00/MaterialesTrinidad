// pages/product/index.tsx
import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/tables/DataTable';
import { useDataTable } from '@/hooks/data/useDataTable';
import { Product } from '@/types/entities/product';

interface PageProps {
  products: Product[];
}

export default function ProductIndex() {
  const { products } = usePage<PageProps>().props;

  const {
    data,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    totalRecords
  } = useDataTable({
    data: products,
    initialPageSize: 10,
    searchableFields: ['name', 'description', 'unit']
  });

  const handleDelete = (product: Product) => {
    if (window.confirm(`¿Está seguro de eliminar "${product.name}"?`)) {
      router.delete(`/products/${product.id}`, {
        onSuccess: () => {
          toast.success('Producto eliminado exitosamente');
        },
        onError: () => {
          toast.error('Error al eliminar el producto');
        }
      });
    }
  };

  // Formatear precio
  const formatPrice = (price: number) => {
    // Validación extra para evitar NaN si el valor viene null
    if (price === undefined || price === null) return '$0.00';

    return new Intl.NumberFormat('es-SV', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const columns = [
    {
      key: 'name',
      label: 'Nombre',
      sortable: true,
      width: '30%'
    },
    // CORRECCIÓN 1: Cambiar key de 'price' a 'priceWithTax'
    {
      key: 'priceWithTax',
      label: 'Precio',
      width: '15%',
      render: (value: number) => formatPrice(value)
    },
    {
      key: 'stock',
      label: 'Stock',
      width: '15%', // Ajusté un poco el ancho
      // CORRECCIÓN 2: Usar row.stockMinimun en lugar de 10 fijo
      render: (value: number, row: Product) => (
        <span className={value <= row.stockMinimun ? 'text-red-600 font-bold flex items-center gap-1' : ''}>
          {value} {row.unit}
          {value <= row.stockMinimun && (
             <span title="Stock bajo" className="text-xs">⚠️</span>
          )}
        </span>
      )
    },
    {
      key: 'unit',
      label: 'Unidad',
      width: '10%'
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
      <Head title="Productos" />
      <Toaster position="top-right" richColors />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Productos
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Gestiona tu inventario de materiales de construcción
            </p>
          </div>

          <Link
            href="/products/create"
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
            Nuevo Producto
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
                  placeholder="Buscar por nombre, descripción o unidad..."
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
              {totalRecords === products.length ? (
                `Mostrando ${totalRecords} ${totalRecords === 1 ? 'producto' : 'productos'}`
              ) : (
                `Mostrando ${totalRecords} de ${products.length} productos`
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
                onEdit={(row) => router.visit(`/products/${row.id}/edit`)}
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  {searchTerm ? 'No se encontraron resultados' : 'No hay productos'}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {searchTerm
                    ? 'Intenta con otros términos de búsqueda'
                    : 'Comienza agregando productos a tu inventario'}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link
                      href="/products/create"
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
                      Crear Producto
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
