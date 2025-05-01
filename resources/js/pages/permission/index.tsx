import { useState } from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { Link } from "@inertiajs/react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import languageES from "datatables.net-plugins/i18n/es-ES.mjs";
import "datatables.net-buttons-dt";
import "datatables.net-responsive-dt";
import DeleteEntityModal from "../../components/DeleteEntityModal"
// import "datatables.net-buttons/js/buttons.html5";
// import "datatables.net-buttons/js/buttons.print";
import jszip from "jszip";

window.JSZip = jszip;
DataTable.use(DT);

interface Permission {
    id: number;
    name: string;
}

export default function Permissions() {
    const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = (Permission: Permission) => {
        setSelectedPermission(Permission);
        setIsDeleteModalOpen(true);
    };
    
    const columns = [
        { data: 'id' },
        { data: 'name' },
        {
            data: null,
            orderable: false,
            searchable: false,
            createdCell: (td: HTMLTableCellElement, cellData: any, rowData: any) => {
                td.innerHTML = `
                <a href="permissions/${rowData.id}/edit" class="edit-btn bg-orange-400 text-sm text-white px-3 py-1 rounded hover:bg-orange-500">Editar</a>
                <button class="delete-btn bg-red-500 text-sm text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</button>
            `;
                td.querySelector('.delete-btn')?.addEventListener('click', () => openDeleteModal(rowData));
            }
        }
    ];

    return (
        <AppLayout>
            <Head title="Permisos" />
            <Toaster position="top-right" richColors />

            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">

                <div className="flex justify-end">
                    <Link
                        href="/permissions/create"
                        className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                        Agregar Permisos
                    </Link>
                </div>

                <DataTable ajax="/api/permissions/getPermissionData" options={{
                    language: languageES,
                    responsive: true,
                    dom: 'lBrtip',
                    layout: {
                        topStart: ['pageLength'],

                    },
                }} columns={columns} className="display">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre del Permiso</th>
                        </tr>
                    </thead>
                </DataTable>
            </div>
            <DeleteEntityModal
                isOpen={isDeleteModalOpen}
                closeModal={() => setIsDeleteModalOpen(false)}
                entity={selectedPermission}
                entityType="Marcas"
                deleteEndpoint="/permissions"
            />
        </AppLayout>
    );
}
