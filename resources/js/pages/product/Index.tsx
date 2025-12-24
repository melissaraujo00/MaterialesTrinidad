import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { DataTable } from '@/components/tables/DataTable';
import { useDataTable } from '@/hooks/data/useDataTable';
import { Product } from '@/types/entities/product';
import DeleteEntityModal from "@/components/DeleteEntityModal";

interface PageProps {
    products: Product[];
    auth: {
        user: {
            permissions: string[];
        };
    };
}

export default function ProductIndex() {
    const { products, auth } = usePage<PageProps>().props;

    const permissions = auth?.user?.permissions || [];
    const hasPermission = (perm: string) => permissions.includes(perm);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        searchableFields: ['name', 'description']
    });

    const openDeleteModal = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteModalOpen(true);
    };

    const formatPrice = (price: number) => {
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
        {
            key: 'priceWithTax',
            label: 'Precio',
            width: '15%',
            render: (value: number) => formatPrice(value)
        },
        {
            key: 'stock',
            label: 'Stock',
            width: '15%',
            render: (value: number, row: Product) => (
                <span className={value <= row.stockMinimun ? 'text-red-600 font-bold flex items-center gap-1' : ''}>
                    {value}
                    {value <= row.stockMinimun && (
                        <span title="Stock bajo" className="cursor-help text-xs">⚠️</span>
                    )}
                </span>
            )
        },
        {
            key: 'image',
            label: 'Imagen',
            width: '15%',
            render: (value: string) => value ? (
                <img src={value} alt="Producto" className="w-10 h-10 object-cover rounded shadow-sm border" />
            ) : (
                <span className="text-gray-400 text-xs italic">Sin imagen</span>
            )
        }
    ];

    return (
        <AppLayout>
            <Head title="Productos" />
            <Toaster position="top-right" richColors />

            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Productos
                        </h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Gestiona tu inventario de materiales de construcción
                        </p>
                    </div>

                    {hasPermission("crear producto") && (
                        <Link
                            href="/products/create"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Nuevo Producto
                        </Link>
                    )}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Buscar producto..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <DataTable
                            data={data}
                            columns={columns}
                            keyExtractor={(row) => row.id}
                            onEdit={hasPermission("editar producto") ? (row) => router.visit(`/products/${row.id}/edit`) : undefined}
                            onDelete={hasPermission("eliminar producto") ? (row) => openDeleteModal(row) : undefined}
                        />
                    </div>

                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Página {currentPage} de {totalPages}
                            </span>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 border rounded-md disabled:opacity-50 dark:text-white"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 border rounded-md disabled:opacity-50 dark:text-white"
                                >
                                    Siguiente
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedProduct}
                entityType="producto"
                deleteEndpoint="/products"
            />
        </AppLayout>
    );
}
