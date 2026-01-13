import React, { useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2, Tag } from "lucide-react";
import DeleteEntityModal from "../../components/DeleteEntityModal";
import { GenericTable, Column } from "@/components/GenericTable";

interface Brand {
    id: number;
    name: string;
    description?: string;
}

export default function Brands() {
    // Tipamos auth para evitar errores de TS
    const { brands, auth } = usePage<{ brands: Brand[], auth: { user: { permissions: string[] } } }>().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // 🔴 CAMBIO: Renombramos de 'usePermissions' a 'hasPermission'
    // Al quitar el "use", React entiende que es una función normal y permite usarla donde quieras.
    const hasPermission = (perm: string) => auth.user?.permissions?.includes(perm);

    // 1. Filtrado simple en cliente
    const filteredBrands = brands.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Definición de Columnas
    const columns: Column<Brand>[] = [
        {
            header: "Marca",
            render: (brand) => (
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                        <Tag className="h-4 w-4" />
                    </div>
                    <div>
                        <span className="font-semibold block">{brand.name}</span>
                        <span className="md:hidden text-xs text-zinc-500 truncate max-w-[150px] block">
                            {brand.description || "Sin descripción"}
                        </span>
                    </div>
                </div>
            )
        },
        {
            header: "Descripción",
            className: "hidden md:table-cell text-zinc-600",
            render: (brand) => brand.description || "—"
        },
        {
            header: "Acciones",
            className: "text-right",
            render: (brand) => (
                <div className="flex justify-end gap-2">
                    {/* 🔴 CAMBIO: Usamos 'hasPermission' aquí */}
                    {hasPermission("editar marca") && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-blue-600">
                            <Link href={`/brands/${brand.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                        </Button>
                    )}
                    {/* 🔴 CAMBIO: Usamos 'hasPermission' aquí */}
                    {hasPermission("eliminar marca") && (
                        <Button
                            variant="ghost" size="icon"
                            className="h-8 w-8 hover:text-red-600"
                            onClick={() => { setSelectedBrand(brand); setIsDeleteModalOpen(true); }}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            )
        }
    ];

    return (
        <AppLayout>
            <Head title="Marcas" />
            <Toaster position="top-right" richColors />

            <div className="p-4 md:p-8 space-y-6">
                {/* Cabecera */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Marcas</h1>
                        <p className="text-zinc-500 text-sm">Gestión de fabricantes.</p>
                    </div>
                    {/* 🔴 CAMBIO: Usamos 'hasPermission' aquí también */}
                    {hasPermission("crear marca") && (
                        <Button asChild className="bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900">
                            <Link href="/brands/create"><Plus className="mr-2 h-4 w-4" /> Nueva</Link>
                        </Button>
                    )}
                </div>

                {/* Buscador */}
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                    <Input
                        placeholder="Buscar..."
                        className="pl-9 bg-white dark:bg-zinc-950"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Tabla Genérica */}
                <GenericTable data={filteredBrands} columns={columns} />
            </div>

            {/* Modal de Eliminación */}
            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedBrand}
                entityType="Marcas"
                deleteEndpoint="/brands"
            />
        </AppLayout>
    );
}
