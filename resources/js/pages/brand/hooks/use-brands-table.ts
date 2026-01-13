import { useState } from "react";
import { Brand } from "@/types";
import { usePermissions } from "@/hooks/use-permissions";

export function useBrandsTable() {
    // 1. SOLUCIÓN: Renombramos 'useHasPermission' a 'hasPermission' usando alias (:).
    // Esto evita que React piense que estás intentando registrar un Hook dentro de un callback.
    const { useHasPermission: hasPermission } = usePermissions();

    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (brand: Brand) => {
        setSelectedBrand(brand);
        setIsDeleteModalOpen(true);
    };

    const columns = [
        { data: 'name', title: 'Nombre' },
        { data: 'description', title: 'Descripción' },
        {
            data: null,
            title: 'Acciones',
            orderable: false,
            searchable: false,
            render: (data: any, type: any, row: Brand) => {
                // Solo retornamos el contenedor vacío para que createdCell lo llene
                return `<div id="actions-${row.id}" class="flex gap-2"></div>`;
            },
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Brand) => {
                const container = td.querySelector(`#actions-${rowData.id}`);
                if (!container) return;

                let html = "";

                // 2. USO: Ahora usamos 'hasPermission' (sin 'use').
                // Como 'usePermissions' ya se ejecutó arriba, esta función ya tiene
                // los permisos cargados en memoria y es seguro llamarla aquí.

                if (hasPermission("editar marca")) {
                    html += `
                        <a href="/brands/${rowData.id}/edit"
                           class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
                                  bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                                  dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
                                  h-8 px-3">
                            Editar
                        </a>`;
                }

                if (hasPermission("eliminar marca")) {
                    html += `
                        <button class="delete-btn inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors
                                        bg-red-50 text-red-600 hover:bg-red-100
                                        dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-950/50
                                        h-8 px-3">
                            Eliminar
                        </button>`;
                }

                container.innerHTML = html;

                // Nota: Asegúrate de limpiar estos event listeners si la tabla se destruye
                // para evitar fugas de memoria (memory leaks), aunque en DataTables
                // suele manejarse bien.
                container.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        }
    ];

    return {
        columns,
        selectedBrand,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission // Retornamos la versión renombrada
    };
}
