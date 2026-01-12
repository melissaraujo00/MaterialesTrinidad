import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "sonner";
import { Plus, Search } from "lucide-react";
import { GenericTable } from "@/components/GenericTable";
import DeleteEntityModal from "@/components/DeleteEntityModal";
import { useCategoryTable } from "./hooks/useCategoryTable";

export default function Categories() {
    // Usamos el hook
    const {
        filteredCategories,
        columns,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission
    } = useCategoryTable();

    return (
        <AppLayout>
            <Head title="Categorías" />
            <Toaster position="top-right" richColors />

            <div className="p-4 md:p-8 space-y-6">
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                            Categorías
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Clasifica tus productos para una mejor organización.
                        </p>
                    </div>

                    {hasPermission("crear categoria") && (
                        <Button asChild className="bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 shadow-lg shadow-zinc-900/20">
                            <Link href={route('categories.create')}>
                                <Plus className="mr-2 h-4 w-4" /> Nueva Categoría
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Buscador */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Buscar categoría..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-500"
                    />
                </div>

                {/* Tabla Genérica */}
                <GenericTable
                    data={filteredCategories}
                    columns={columns}
                    emptyMessage="No se encontraron categorías."
                />

                {/* Modal de Eliminación */}
                <DeleteEntityModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    entity={selectedCategory}
                    entityType="Categoría"
                    deleteEndpoint="/categories"
                />
            </div>
        </AppLayout>
    );
}
