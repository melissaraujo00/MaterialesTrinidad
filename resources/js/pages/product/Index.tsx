import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "sonner";
import { Plus, Search } from "lucide-react";
import { GenericTable } from "@/components/GenericTable";
import DeleteEntityModal from "@/components/DeleteEntityModal";
// Asegúrate de que la ruta sea correcta según donde guardaste el archivo anterior
import { useProductTable } from "../../pages/product/hooks/useProductTable";

export default function ProductIndex() {
    const {
        filteredProducts,
        columns,
        searchTerm,
        setSearchTerm,
        selectedProduct,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission // <--- 1. CORREGIDO: Usamos el nombre correcto (sin 'use')
    } = useProductTable();

    return (
        <AppLayout>
            <Head title="Productos" />
            <Toaster position="top-right" richColors />

            <div className="p-4 md:p-8 space-y-6">
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                            Productos
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Gestiona tu inventario de materiales de construcción.
                        </p>
                    </div>

                    {/* 2. CORREGIDO: Usamos 'hasPermission' y quitamos el typo */}
                    {hasPermission("crear producto") && (
                        <Button asChild className="bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 shadow-lg shadow-zinc-900/20">
                            <Link href={route('products.create')}>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Buscador */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Buscar por nombre o descripción..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-500"
                    />
                </div>

                {/* Tabla Genérica */}
                <GenericTable
                    data={filteredProducts}
                    columns={columns}
                    emptyMessage="No se encontraron productos registrados."
                />

                {/* Modal de Eliminación */}
                <DeleteEntityModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    entity={selectedProduct}
                    entityType="Producto"
                    deleteEndpoint="/products"
                />
            </div>
        </AppLayout>
    );
}
