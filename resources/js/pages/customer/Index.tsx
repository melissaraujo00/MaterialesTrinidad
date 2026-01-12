import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "sonner";
import { Plus, Search } from "lucide-react";
import { GenericTable } from "@/components/GenericTable";
import DeleteEntityModal from "@/components/DeleteEntityModal"; // Importamos el modal
import { useCustomerTable } from "./hooks/useCustomerTable";

export default function CustomerIndex() {
    const {
        filteredCustomers,
        columns,
        searchTerm,
        setSearchTerm,
        selectedCustomer,     // Nuevo
        isDeleteModalOpen,    // Nuevo
        setIsDeleteModalOpen, // Nuevo
        useHasPermission         // Nuevo
    } = useCustomerTable();

    return (
        <AppLayout>
            <Head title="Gestión de Clientes" />
            <Toaster position="top-right" richColors />

            <div className="p-4 md:p-8 space-y-6">
                {/* Cabecera */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                            Clientes
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Gestiona tu cartera de clientes y su información fiscal.
                        </p>
                    </div>

                    {/* Botón Crear Protegido */}
                    {useHasPermission("crear clientes") && (
                        <Button asChild className="bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 shadow-lg shadow-zinc-900/20">
                            <Link href={route('customers.create')}>
                                <Plus className="mr-2 h-4 w-4" /> Nuevo Cliente
                            </Link>
                        </Button>
                    )}
                </div>

                {/* Buscador */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Buscar por nombre, NIT o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-500"
                    />
                </div>

                {/* Tabla Genérica */}
                <GenericTable
                    data={filteredCustomers}
                    columns={columns}
                    emptyMessage="No se encontraron clientes registrados."
                />

                {/* Modal de Eliminación Conectado */}
                <DeleteEntityModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    entity={selectedCustomer}
                    entityType="Clientes" // Texto para el modal: "¿Eliminar Clientes: Juan?"
                    deleteEndpoint="/customers" // Ruta base para router.delete
                />
            </div>
        </AppLayout>
    );
}
