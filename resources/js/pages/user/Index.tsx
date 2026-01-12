import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "sonner";
import { UserPlus, Search } from "lucide-react";
import { GenericTable } from "@/components/GenericTable";
import DeleteEntityModal from "@/components/DeleteEntityModal"; // Modal genérico
import { useUserTable } from "./hooks/useUserTable";

export default function UserIndex() {
    const {
        filteredUsers,
        columns,
        searchTerm,
        setSearchTerm,
        selectedUser,           // Nuevo
        isDeleteModalOpen,      // Nuevo
        setIsDeleteModalOpen,   // Nuevo
        hasPermission           // Nuevo: Traemos la función
    } = useUserTable();

    return (
        <AppLayout>
            <Head title="Gestión de Usuarios" />
            <Toaster position="top-right" richColors />

            <div className="p-4 md:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-instrument">
                            Usuarios
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Administra los accesos y roles de tu equipo.
                        </p>
                    </div>

                    {/* AQUI APLICAMOS EL PERMISO DE CREAR */}
                    {hasPermission("crear usuarios") && (
                        <Button asChild className="bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 shadow-lg shadow-zinc-900/20">
                            <Link href={route('users.create')}>
                                <UserPlus className="mr-2 h-4 w-4" /> Nuevo Usuario
                            </Link>
                        </Button>
                    )}
                </div>

                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                    <Input
                        placeholder="Buscar por nombre o correo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 focus:ring-zinc-500"
                    />
                </div>

                <GenericTable
                    data={filteredUsers}
                    columns={columns}
                    emptyMessage="No se encontraron usuarios coincidentes."
                />

                {/* Modal de Eliminación conectado */}
                <DeleteEntityModal
                    isOpen={isDeleteModalOpen}
                    closeModal={() => setIsDeleteModalOpen(false)}
                    entity={selectedUser}
                    entityType="Usuarios"
                    deleteEndpoint="/users" // La ruta base para eliminar (users.destroy)
                />
            </div>
        </AppLayout>
    );
}
