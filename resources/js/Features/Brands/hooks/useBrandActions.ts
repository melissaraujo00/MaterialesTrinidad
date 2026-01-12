import { useState } from "react";
import { Brand } from "@/types";
import { usePermissions } from "@/hooks/use-permissions";

export function useBrandsTable() {
    const { hasPermission } = usePermissions();
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
                return `<div id="actions-${row.id}" class="flex gap-2"></div>`;
            },
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: Brand) => {
                const container = td.querySelector(`#actions-${rowData.id}`);
                if (!container) return;

                let html = "";
                if (hasPermission("editar marca")) {
                    html += `<a href="/brands/${rowData.id}/edit" class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-zinc-200 h-8 px-3 transition-colors">Editar</a>`;
                }
                if (hasPermission("eliminar marca")) {
                    html += `<button class="delete-btn inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 h-8 px-3 transition-colors">Eliminar</button>`;
                }

                container.innerHTML = html;
                container.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        }
    ];

    return {
        columns,
        selectedBrand,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        hasPermission
    };
}
